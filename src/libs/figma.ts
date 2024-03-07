import fetch from "node-fetch";
import { dfsHOF } from "./utils";
import { FIGMA_URL_BASE } from "../consts";

import {
  Child,
  FigmaTree,
  Token,
  RawColor,
  FigmaFailure,
} from "@stylebit/types";
import logger from "./logger";

export async function fetchFigma(
  figmaUrl: string,
  access_token: string
): Promise<FigmaTree | FigmaFailure> {
  const response = await fetch(figmaUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  return (await response.json()) as Promise<FigmaTree | FigmaFailure>;
}

export const getFigmaColors = (figmaJson: FigmaTree): Array<Token> => {
  const children = Object.assign(figmaJson.document.children, {});

  const colorPalette = new Map();

  const buildColorToken = (
    child: Child,
    key: string
  ): { name: string; value: RawColor; type: string } | undefined => {
    // INFO: in case of background images or avatars we still have root level `styleType`
    // as FILL. In tree details child.fills[0] doesn't have color key instead have `imageRef`

    if (!child.fills || !child?.fills[0]?.color) return;

    const value = {
      r: child.fills[0].color.r,
      g: child.fills[0].color.g,
      b: child.fills[0].color.b,
      a: child.fills[0].opacity ?? child.fills[0].color.a,
    };

    return { name: figmaJson.styles[key].name, value, type: "color" };
  };

  for (const key in figmaJson.styles) {
    const handleColor = (child: Child) => {
      if (child?.styles?.fills === key || child?.styles?.fill === key) {
        const token = buildColorToken(child, key);
        if (token) {
          colorPalette.set(key, token);
        }
      }
    };

    if (figmaJson.styles[key].styleType === "FILL") {
      dfsHOF(handleColor, colorPalette)(children, key);
    }
  }

  return [...colorPalette.values()];
};

export const getFigmaTypography = (figmaJson: FigmaTree): Array<Token> => {
  const children = Object.assign(figmaJson.document.children, {});

  const typography = new Map();

  const buildTypographyToken = (child: Child, key: string) => {
    const typographyTokenValues = [] as Array<Token>;

    const name = figmaJson.styles[key].name;

    if (child.style?.fontFamily) {
      typographyTokenValues.push({
        name,
        value: child.style?.fontFamily,
        type: "font-family",
      });
    }

    if (child.style?.fontWeight) {
      typographyTokenValues.push({
        name,
        value: child.style?.fontWeight,
        type: "font-weight",
      });
    }

    if (child.style?.fontSize) {
      typographyTokenValues.push({
        name,
        value: child.style?.fontSize,
        type: "font-size",
      });
    }

    if (child.style?.letterSpacing) {
      typographyTokenValues.push({
        name,
        value: child.style?.letterSpacing,
        type: "letter-spacing",
      });
    }

    if (child.style?.lineHeightPx) {
      typographyTokenValues.push({
        name,
        value: child.style?.lineHeightPx,
        type: "line-height",
      });
    }
    return typographyTokenValues;
  };

  for (const key in figmaJson.styles) {
    if (figmaJson.styles[key].styleType === "TEXT") {
      const handleTypography = (child: Child) => {
        if (child?.styles?.text && child?.styles?.text === key) {
          const typographyToken = buildTypographyToken(child, key);
          typography.set(key, typographyToken);
        }
      };

      dfsHOF(handleTypography, typography)(children, key);
    }
  }

  return [...typography.values()].flat();
};

export const getFigmaVectors = async (
  figmaJson: FigmaTree,
  key: string,
  accessToken: string
): Promise<Array<Token>> => {
  const children = Object.assign(figmaJson.document.children, {});

  const componentMap = new Map();
  const iconMap = new Map();

  const searchForVector = (parent: Child, key: string) => {
    if (!parent || !parent.children) return;
    const children = Object.assign(parent.children, {});

    // INFO: eliminate cases when the vector is used inside instance, component, frame.
    const hasImproperType = children.some((child) => {
      return child.type === "INSTANCE" || child.type === "COMPONENT";
    });
    if (hasImproperType) return;

    const hasVector = children.some((child) => child.type === "VECTOR");
    if (hasVector) {
      iconMap.set(key, figmaJson.components[key].name);
      // INFO: there is an option also to pick the direct parent, both approaches have their pros and cons
      // iconMap.set(parent.id, figmaJson.components[key].name);
    } else {
      if (children) {
        for (let i = 0; i < children.length; ++i) {
          searchForVector(children[i], key);
        }
      }
    }
  };

  for (const key in figmaJson.components) {
    const handleIcon = (child: Child) => {
      if (child?.type === "COMPONENT" && child?.id === key) {
        componentMap.set(key, figmaJson.components[key].name);
        searchForVector(child, key);
      }
    };

    dfsHOF(handleIcon, componentMap)(children, key);
  }

  const idList = [...iconMap.keys()].join(",");

  logger.debug("image id list", idList);
  if (!idList) {
    return [];
  }

  const FIGMA_URL = `${FIGMA_URL_BASE}/images/${key}?ids=${idList}&format=svg`;

  const response = (await fetchFigma(FIGMA_URL, accessToken)) as unknown as {
    images: { [key: string]: string };
    err: unknown;
  };

  const result = Object.keys(response.images).reduce((acc, key) => {
    const url = response.images[key];
    if (url) {
      const name = iconMap.get(key);
      acc.push({ name, value: url, type: "vector" });
    }
    return acc;
  }, [] as Array<Token>);

  return result.reverse();
};
