import { DFS, DFSCallback, Child } from "@stylebit/types";
import logger from "./logger";

/**
 *  Depth first search higher order function
 *
 *  @param { DFSCallback } cb callback function implementing business logic.
 *  @param { Map } map Map where the found keys are stored.
 *  @return { DFS } function which will do actual depth first search.
 */
export const dfsHOF = (cb: DFSCallback, map?: Map<string, string>): DFS => {
  // INFO: cut extra recursive searches if the token is already found.
  // The same token can appear multiple times in the tree.
  // actually as many times as style is reused in the figma design.

  const dfs = (children: Array<Child>, key?: string) => {
    // INFO: stop propagation
    if (map && key && !!map.get(key)) {
      return;
    }

    children.forEach((child: Child) => {
      cb(child);

      if (child.children) {
        dfs(child.children, key);
      }
    });
  };

  return dfs;
};

export const tap = (data: unknown): unknown => {
  logger.log(data);
  return data;
};

export const getBase64String = (data: string): string => {
  return Buffer.from(data).toString("base64");
};

export const normalizeNumber = (num: number, fractionDigits = 2): number => {
  // INFO: round to fractionDigits, drop trailing 0s.
  return parseFloat(num.toFixed(fractionDigits));
};

export const normalizeDegree = (deg: number): number => {
  return normalizeNumber((deg + 360) % 360);
};

export const isNumber = (value: number): boolean => {
  return typeof value === "number" && isFinite(value);
};

export const isPrimitive = (value: unknown): boolean => {
  return value !== Object(value);
};

export const wrapKeyIntoBracketsIfNeeded = (key: string): string => {
  if (/^[a-zA-Z0-9]+$/.test(key)) {
    return key;
  } else {
    return `"${key}"`;
  }
};

export const isNumeric = (value: unknown): boolean => {
  return !isNaN(value as number);
};