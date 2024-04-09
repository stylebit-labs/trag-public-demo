import fetch from "node-fetch";
import { BitbucketPrResponse, Response } from "@stylebit/types";

const API_BASE_URL = "https://api.bitbucket.org/2.0";

export const getLastCommitSha = async (
  accessToken: string,
  {
    owner,
    repo,
    sha,
  }: {
    owner: string;
    repo: string;
    sha?: string;
  }
): Promise<string> => {
  const params = { fields: "values.hash" };
  if (sha) {
    Object.assign(params, { until: sha });
  }
  console.log("sha", sha);

  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/commits`;

  const { values } = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());

  return values[0]?.hash;
};

export const getBranch = async (
  accessToken: string,
  {
    owner,
    repo,
    branch,
  }: {
    owner: string;
    repo: string;
    branch: string;
  }
): Promise<{ name: string } | { type: string }> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/refs/branches/${branch}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return data;
};

export const removeBranch = async (
  accessToken: string,
  {
    owner,
    repo,
    branchName,
  }: {
    owner: string;
    repo: string;
    branchName: string;
  }
): Promise<void> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/refs/branches/${branchName}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createBranch = async (
  accessToken: string,
  {
    owner,
    repo,
    branchName,
    sha,
  }: {
    owner: string;
    repo: string;
    branchName: string;
    sha: string;
  }
): Promise<Response> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/refs/branches`;
  const body = {
    name: branchName,
    target: {
      hash: sha,
    },
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  }).then((data) => data.json());

  return response;
};

export const getFileContent = async (
  accessToken: string,
  {
    owner,
    repo,
    path,
    ref,
  }: {
    owner: string;
    repo: string;
    path: string;
    ref: string;
  }
): Promise<Response> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/src/${ref}/${path}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());

  return data;
};

export const createOrUpdateFileContent = async (
  accessToken: string,
  {
    owner,
    repo,
    path,
    message,
    content,
    sha,
    branch,
  }: {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    sha?: string | null;
    branch?: string;
  }
): Promise<void> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/src`;

  const data = {
    branch: branch || "main",
    [path]: content,
    message,
  };
  if (sha) {
    Object.assign(data, { parents: sha });
  }

  const options = new URLSearchParams(data);

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: options,
  });
};

export const getPullRequests = async (
  accessToken: string,
  {
    owner,
    repo,
    branch,
  }: {
    owner: string;
    repo: string;
    branch: string;
  }
): Promise<Array<{ id: number }>> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/pullrequests?q=source.branch.name="${branch}"`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  return response.values;
};

export const closePullRequest = async (
  accessToken: string,
  {
    owner,
    repo,
    pullNumber,
  }: {
    owner: string;
    repo: string;
    pullNumber: number;
  }
): Promise<Response> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/pullrequests/${pullNumber}`;
  const data = { state: "DECLINED" };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
  return response;
};

export const createPullRequest = async (
  accessToken: string,
  {
    owner,
    repo,
    head,
    base,
    title,
    body,
  }: {
    owner: string;
    repo: string;
    head: string;
    base: string;
    title?: string;
    body?: string;
  }
): Promise<BitbucketPrResponse> => {
  const url = `${API_BASE_URL}/repositories/${owner}/${repo}/pullrequests`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      source: {
        branch: {
          name: head,
        },
      },
      destination: {
        branch: {
          name: base,
        },
      },
      title,
      description: {
        raw: body,
      },
    }),
  };

  const response = await fetch(url, options).then((data) => data.json());
  return response;
};
