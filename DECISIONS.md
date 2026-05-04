Decisões Técnicas e Arquitetura

 Estrutura do Projeto: Monorepo & Docker
Optei por um Monorepo para manter a coesão entre o motor (Backend) e a interface (Frontend).
• Docker Compose: Na raiz do projeto, configurei um ecossistema completo que permite subir toda a aplicação com um único comando (docker-compose up). Isso garante o princípio da Imutabilidade de Ambiente, onde a aplicação roda exatamente da mesma forma na máquina do avaliador.

 Arquitetura do Backend (Layered Architecture)
Escolhi a Arquitetura em Camadas para equilibrar a organização técnica com a agilidade de entrega.
• Controllers: Porta de entrada e contrato da API REST.
• Services: Concentram a regra de negócio. Optei pelo uso de termos em português nesta camada para garantir a clareza e expressividade do domínio.
• Clients/Infrastructure: Isolamento da comunicação externa com a OMDb usando OpenFeign, tornando o código declarativo e fácil de manter.
• DTOs: Padronização e segurança no tráfego de dados.

 Gestão de Segurança (Mindset Privacy)
• API Gateway: Decidi não expor a OMDB_API_KEY no Frontend. A chave fica protegida no ambiente do servidor, reduzindo o risco de roubo de credenciais e permitindo controle total sobre as requisições (Rate Limiting).

 Frontend: UX & Performance
• Paginação Dinâmica: Para cumprir o requisito de listagem paginada, implementei o padrão "Carregar Mais". Isso evita o carregamento desnecessário de dados e melhora a experiência de navegação em grandes volumes de resultados.
• Suporte a Temas (Dark/Light): Utilizei variáveis de CSS nativas e Tailwind CSS para garantir uma interface moderna e acessível, respeitando a preferência visual do usuário.
• Feedback de Interface: Uso de Skeletons/Spinners e tratamento de erros amigáveis para garantir que o usuário nunca fique sem resposta visual.

 Qualidade e Testes
• Testes de Integração: Foquei em testes na camada de Controller utilizando MockMvc e Mockito, garantindo que os contratos da API estejam íntegros e funcionais.

 Stack Tecnológico
• Java 21 + Spring Boot 3: Uso de versões LTS para performance e estabilidade.
• React + Vite: Escolhido pela velocidade de desenvolvimento e build otimizado.
• Lombok: Redução de boilerplate para foco total na lógica do desafio.
• Spring Boot Actuator: Adicionado para garantir a Observabilidade (saúde do sistema), requisito essencial para software em produção.
