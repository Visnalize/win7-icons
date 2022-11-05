import { Octokit } from "@octokit/rest";

const client = new Octokit();

export const repo = {
  owner: "visnalize",
  repo: "resources",
  path: "icons/win7",
};

export default client;
