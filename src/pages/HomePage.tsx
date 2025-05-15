import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Code, Database, FileText, Server, Terminal, BookOpen, Bot } from 'lucide-react';

const HomePage: React.FC = () => {
  const skills = [
    { name: 'Desenvolvimento Frontend', icon: <Code className="w-6 h-6" />, description: 'HTML, CSS, JavaScript, React, Vue.js, Angular' },
    { name: 'Desenvolvimento Backend', icon: <Server className="w-6 h-6" />, description: 'Node.js, Python, Java, PHP, ASP.NET' },
    { name: 'Bancos de Dados', icon: <Database className="w-6 h-6" />, description: 'MySQL, PostgreSQL, MongoDB, SQL Server, Oracle' },
    { name: 'DevOps', icon: <Terminal className="w-6 h-6" />, description: 'Docker, Kubernetes, CI/CD, AWS, Azure' },
    { name: 'Análise de Sistemas', icon: <FileText className="w-6 h-6" />, description: 'UML, Levantamento de Requisitos, Modelagem de Dados' },
    { name: 'Gestão de Projetos', icon: <BookOpen className="w-6 h-6" />, description: 'Scrum, Kanban, Agile, Waterfall' },
    { name: 'Inteligência Artificial', icon: <Bot className="w-6 h-6" />, description: 'Machine Learning, NLP, Python, TensorFlow' },
    { name: 'Certificações', icon: <Award className="w-6 h-6" />, description: 'AWS, Microsoft, Oracle, CompTIA' },
  ];

  return (
    <div className="animate-fadeIn">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 overflow-hidden rounded-full shadow-lg">
            <img
              src="https://github.com/humbertoribeirodefreitas.png"
              alt="Humberto Ribeiro"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg";
              }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Humberto Ribeiro
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6">
              Analista de Sistemas & Desenvolvedor
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Sou um profissional apaixonado por tecnologia com mais de 8 anos de experiência em análise e desenvolvimento de sistemas.
              Especializado em soluções web e mobile, com foco em criar aplicações eficientes, escaláveis e intuitivas.
              Tenho expertise em gerenciamento de projetos ágeis e arquitetura de software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/certifications"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-colors duration-200 flex items-center"
              >
                <Award className="w-5 h-5 mr-2" />
                Certificações
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md shadow-md transition-colors duration-200 flex items-center"
              >
                <Code className="w-5 h-5 mr-2" />
                Projetos
              </Link>
              <a
                href="https://github.com/humbertoribeirodefreitas"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-md shadow-md transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-300 dark:border-gray-700 pb-2">
          Habilidades & Competências
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mr-3">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-300 dark:border-gray-700 pb-2">
          Experiência Profissional
        </h2>
        <div className="space-y-10">
          {[
            {
              role: 'Analista de Sistemas Sênior',
              company: 'TechSolutions Brasil',
              period: 'Jan 2021 - Presente',
              description: 'Lidero a análise, desenvolvimento e implementação de soluções empresariais complexas. Responsável pela arquitetura de sistemas, gerenciamento de equipes e comunicação com stakeholders.',
            },
            {
              role: 'Desenvolvedor Fullstack',
              company: 'Digital Inovação',
              period: 'Mar 2018 - Dez 2020',
              description: 'Desenvolvimento de aplicações web com React, Node.js e MongoDB. Implementação de APIs RESTful e integração com serviços de terceiros. Participação em todo o ciclo de desenvolvimento de software.',
            },
            {
              role: 'Analista de Sistemas Júnior',
              company: 'SoftwareMaster',
              period: 'Fev 2016 - Fev 2018',
              description: 'Atuação no levantamento de requisitos, modelagem de dados e documentação de sistemas. Suporte ao desenvolvimento e testes de aplicações corporativas.',
            }
          ].map((experience, index) => (
            <div 
              key={index}
              className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900"
            >
              <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full transform -translate-x-1/2 mt-1.5"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1 mb-2">
                <span className="text-blue-600 dark:text-blue-400 font-medium">{experience.company}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm mt-1 sm:mt-0">{experience.period}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;