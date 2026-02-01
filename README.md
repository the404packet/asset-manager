# 🖥️ Asset Manager (Dockerized)

A fully containerized **IT Asset Management System** that manages infrastructure assets such as:

- Laptops
- Servers
- Switches
- Firewalls
- Access Points

The system is built using a **frontend + backend + database** architecture, with all components running in **separate Docker containers** and communicating over a shared Docker network.

---

## 🚀 Features

- Asset-wise segregation (Laptops, Servers, Network devices, etc.)
- Read, Create, Delete operations (CRUD)
- Dynamic table rendering
- Automatic filter generation based on asset schema
- Generic frontend (schema-driven, no duplicate UI code)
- PostgreSQL-backed persistent storage
- Fully Dockerized setup using `docker-compose`

---

## 🧱 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript
- Served using **Nginx**

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- PostgreSQL 15
- Schema auto-initialized using Docker entrypoint

### Containerization
- Docker
- Docker Compose

---

## ✅ Requirements
### 1. Windows

Docker Desktop (required).<br>
Includes Docker Engine and Docker Compose<br>
WSL2 must be enabled (Docker Desktop guides this automatically)

Check installation:
```bash
docker --version
docker compose version
```
### 2. Linux
Docker Engine<br>
Docker Compose plugin

Installation example (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin
```
(Optional but recommended)
```bash
sudo usermod -aG docker $USER
sudo chmod 777 /var/lib/docker
```
Log out and back in after this.

Check installation:
```bash
docker --version
docker compose version
```

## ▶️ How to Run

#### Clone the repository
```bash
git clone <your-repo-url>
cd asset-manager
docker-compose up --build
```

#### Access the application : http://localhost:3000

#### To reset the database:
```bash
docker-compose down -v
docker-compose up --build
```

## ⭐ Support

If you found this project useful or interesting, please consider starring the repository ⭐.
It really helps and is appreciated!
