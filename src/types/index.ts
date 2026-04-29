
export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  timeRange: string;
  completed: boolean;
  color: string;
}

export type TabType = "active" | "completed";