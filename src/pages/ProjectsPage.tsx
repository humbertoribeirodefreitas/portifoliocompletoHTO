import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Search, Code, Star, GitFork, Calendar, Loader2 } from 'lucide-react';
import { getGithubRepositories } from '../services/github';
import { Repository } from '../types/github';

const ProjectsPage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const data = await getGithubRepositories('humbertoribeirodefreitas');
        setRepositories(data);
        setFilteredRepos(data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar repositórios. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => repo.topics?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredRepos(filtered);
  }, [searchTerm, selectedTags, repositories]);

  const getAllTags = () => {
    const tags = new Set<string>();
    repositories.forEach(repo => {
      if (repo.topics) {
        repo.topics.forEach(topic => tags.add(topic));
      }
    });
    return Array.from(tags);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meus Projetos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Projetos de desenvolvimento disponíveis no GitHub
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="w-full lg:w-3/4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar projetos..."
              className="w-full p-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Carregando projetos...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-md mb-6">
              <p>{error}</p>
              <p className="mt-2 text-sm">Verifique a conexão com o GitHub ou tente novamente mais tarde.</p>
            </div>
          ) : filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {repo.name}
                      </h3>
                      <div className="flex space-x-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          aria-label="Ver no GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Visitar site"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {repo.description || "Sem descrição disponível"}
                    </p>
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 4 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                            +{repo.topics.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <Code className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || selectedTags.length > 0
                  ? 'Nenhum projeto corresponde aos critérios de filtro atuais.'
                  : 'Não foi possível encontrar projetos no GitHub.'}
              </p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Filtrar por tecnologias
            </h3>
            
            {loading ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {getAllTags().map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {selectedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;