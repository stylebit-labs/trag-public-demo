import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

// INFO: predefining env variables in consts are not read properly in cloud function
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const FIGMA_URL_BASE = "https://api.figma.com/v1";
export const PROJECT_BUCKET = "gs://stylebit-9983f.appspot.com";

export const DOC_ENCRYPT_KEY = process.env.DOC_ENCRYPT_KEY;

export const GITHUB_HEAD = "trag-branch";
export const BITBUCKET_HEAD = "trag-branch";
export const GITHUB_BASE = "main";
export const BITBUCKET_BASE = "main";

export const GITHUB_APP_ID = process.env.GITHUB_APP_ID || "";

export const FIGMA_APP_CLIENT_ID = process.env.FIGMA_APP_CLIENT_ID || "";
export const FIGMA_APP_CLIENT_SECRET =
  process.env.FIGMA_APP_CLIENT_SECRET || "";

export const BITBUCKET_CONSUMER_KEY = process.env.BITBUCKET_CONSUMER_KEY || "";
export const BITBUCKET_CONSUMER_SECRET =
  process.env.BITBUCKET_CONSUMER_SECRET || "";

export const GITHUB_APP_PEM = process.env.GITHUB_APP_PEM || "";

export const PORT = process.env.PORT || 3000;
