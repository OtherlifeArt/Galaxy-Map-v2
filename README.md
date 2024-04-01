# Galaxy-Map-v2

Our goal is to display a complete 2D map of star wars Galaxy in both Legends and Canon continuity.

## Launch application

### Prerequisites

- install docker and docker compose : https://docs.docker.com/engine/install/

# Run application

- Copy source code in chosen directory: `git clone https://github.com/OtherlifeArt/Galaxy-Map-v2.git`
- Go to source code directory : `cd Galaxy-Map-v2`
- Copy .env.example to .env : `cp .env.example .env`
- Change .env parameters to suit your needs : `nano .env`
- Launch application : `docker compose up -d`

Application should be now available at http://localhost:8080 with default environment (.env) values

## Other commands

- Stop application : `docker compose down`