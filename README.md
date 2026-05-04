# Movie & Series Catalog Gateway

Este projeto é uma aplicação **Fullstack** desenvolvida como desafio técnico. A plataforma permite a pesquisa e visualização detalhada de filmes e séries, consumindo a API pública da OMDb através de um **Gateway interno** robusto.

---

## Como Executar o Projeto

A aplicação foi conteinerizada para garantir que rode sem erros em qualquer ambiente.

###  Opção 1: Via Docker (Recomendado)

1. Certifique-se de ter o **Docker** e o **Docker Compose** instalados.
2. Na raiz do projeto, localize o arquivo `docker-compose.yml`.
3. Insira sua chave da OMDb na linha: `OMDB_API_KEY=SUA_CHAVE_AQUI`.
4. No terminal, execute:
   ```bash
   docker-compose up --build
   ```
5. Acesse:
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend:** [http://localhost:8080](http://localhost:8080)

---

###  Opção 2: Execução Manual

**1. Backend (Java):**
- Navegue até a pasta `/backend`.
- Configure sua chave da OMDb no arquivo `application.properties`.
- Execute: `./mvnw spring-boot:run`

**2. Frontend (React):**
- Navegue até a pasta `/frontend`.
- Execute: `npm install` para baixar as dependências.
- Inicie a aplicação com: `npm run dev`

---

##  Tecnologias e Destaques

### **Backend (Java 21 + Spring Boot 3)**
- **Arquitetura em Camadas:** Organização clara entre Controllers, Services e DTOs.
- **OpenFeign:** Consumo declarativo da API externa.
- **Segurança:** Implementação de Gateway para proteção de credenciais e Rate Limit.
- **Testes:** Testes de integração com MockMvc e Mockito.
- **Observabilidade:** Spring Boot Actuator configurado.

### **Frontend (React + JS + Vite + Tailwind)**
- **Busca Paginada:** Sistema de "Carregar Mais" para otimização de tráfego.
- **UX Adaptável:** Suporte a **Dark/Light Mode** com persistência.
- **Feedback Visual:** Tratamento de estados de erro e carregamento (Spinners/Skeletons).

---

##  Decisões Técnicas
Para detalhes sobre as escolhas de arquitetura e ferramentas, consulte o arquivo [DECISIONS.md](./DECISIONS.md).

