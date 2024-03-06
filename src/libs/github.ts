import { Octokit } from "octokit";
import { Response, ResponseList } from "@stylebit/types";

/**
 *
 * @param {*} owner
 * @param {*} repo
 * @param {*} sha  sha or branchName to get commits from.
 * @returns
 */
export const getLastCommitSha = async (
	octokit: Octokit,
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
	const params = { owner, repo };
	if (sha) {
		Object.assign(params, { sha });
	}

	return octokit.rest.repos
		.listCommits(params)
		.then(({ data }) => data[0]?.sha);
};

export const getBranch = async (
	octokit: Octokit,
	{
		owner,
		repo,
		branch,
	}: {
		owner: string;
		repo: string;
		branch: string;
	}
): Promise<Response> => {
	return octokit.rest.repos.getBranch({
		owner,
		repo,
		branch,
	});
};

export const removeBranch = async (
	octokit: Octokit,
	{
		owner,
		repo,
		branchName,
	}: {
		owner: string;
		repo: string;
		branchName: string;
	}
): Promise<Response> => {
	return octokit.rest.git.deleteRef({
		owner,
		repo,
		ref: `heads/${branchName}`,
	});
};

export const createBranch = async (
	octokit: Octokit,
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
	return octokit.rest.git.createRef({
		owner,
		repo,
		ref: `refs/heads/${branchName}`,
		sha,
	});
};

export const getFileContent = async (
	octokit: Octokit,
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
	return octokit.rest.repos.getContent({
		owner,
		repo,
		path,
		ref,
	});
};

export const createOrUpdateFileContent = async (
	octokit: Octokit,
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
): Promise<Response> => {
	const params = { owner, repo, path, message, content };
	if (sha) {
		Object.assign(params, { sha });
	}
	if (branch) {
		Object.assign(params, { branch });
	}

	return octokit.rest.repos.createOrUpdateFileContents(params);
};

export const getPullRequests = async (
	octokit: Octokit,
	{
		owner,
		repo,
		branch,
	}: {
		owner: string;
		repo: string;
		branch: string;
	}
): Promise<ResponseList> => {
	return octokit.rest.pulls.list({
		owner,
		repo,
		state: "open",
		head: branch,
	});
};

export const closePullRequest = async (
	octokit: Octokit,
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
	return octokit.rest.pulls.update({
		owner,
		repo,
		pull_number: pullNumber,
		state: "closed",
	});
};

export const createPullRequest = async (
	octokit: Octokit,
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
): Promise<Response> => {
	const params = { owner, repo, head, base };

	if (title) {
		Object.assign(params, { title });
	}
	if (body) {
		Object.assign(params, { body });
	}

	return octokit.rest.pulls.create(params);
};

export const listReposAccessibleToInstallation = async (
	octokit: Octokit
): Promise<Response> => {
	return octokit.rest.apps.listReposAccessibleToInstallation();
};
