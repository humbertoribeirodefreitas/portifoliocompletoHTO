import axios from 'axios';
import { Repository } from '../types/github';

export const getGithubRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await axios.get<Repository[]>(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
      },
    });
    
    // Get topics for each repository
    const reposWithTopics = await Promise.all(
      response.data.map(async (repo) => {
        try {
          const topicsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/topics`, {
            headers: { Accept: 'application/vnd.github.mercy-preview+json' },
          });
          return { ...repo, topics: topicsResponse.data.names };
        } catch (error) {
          return { ...repo, topics: [] };
        }
      })
    );
    
    return reposWithTopics;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};