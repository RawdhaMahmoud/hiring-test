import { useQuery } from "@tanstack/react-query";
import type { GithubUser } from "../types";

const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("Could not find that GitHub user.");
  }

  return response.json();
};

const useGithubUser = (username: string) => {
  return useQuery({
    queryKey: ["githubUser", username],
    queryFn: () => fetchGithubUser(username),
    enabled: !!username, 
    staleTime: 1000 * 60 * 5, 
  });
};

export default useGithubUser;