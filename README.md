# Convo

**Convo** is a minimal, multi-tenant chatbot platform that allows users to create projects, configure AI agents with custom system prompts, and interact with them through persistent conversations powered by **Google Gemini**.

The project is designed to mirror real-world conversational AI platforms, focusing on **clean architecture, security, scalability, and extensibility** rather than UI polish.

---

## Features

### Core Functionality
- User registration and login (JWT-based authentication)
- Secure authentication using **HTTP-only cookies**
- Multi-tenant architecture (User → Project → Agent)
- Agent-level system prompt configuration
- Persistent chat sessions with message history
- AI-powered responses using **Google Gemini**
- Ownership enforcement at every layer

### Platform Capabilities
- Multiple projects per user
- Multiple agents per project
- Multiple chat sessions per agent
- Role-based message storage (`user`, `assistant`)
- Clean separation of concerns (routes, controllers, services)

---




The backend is **stateless**, making it horizontally scalable behind a load balancer.

---

## Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing

### AI Integration
- **Google Gemini API**
- Model: *Flash* (low-latency conversational responses)

### Tooling
- ES Modules
- dotenv (environment configuration)
- Cookie-based auth (secure by default)

---

## Authentication & Security

- Passwords are securely hashed using bcrypt
- JWT tokens are stored in **HTTP-only cookies**
- No sensitive data stored in localStorage
- All protected routes require authentication
- Ownership checks enforced at service layer (defense-in-depth)

---

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Projects
- `POST /api/projects`
- `GET /api/projects`

### Agents
- `POST /api/projects/:projectId/agents`
- `GET /api/projects/:projectId/agents`

### Chat
- `POST /api/chat/start/:agentId`
- `POST /api/chat/:chatSessionId/message`
- `GET /api/chat/:chatSessionId/messages`

---


