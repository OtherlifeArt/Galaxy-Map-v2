# Galaxy-Map-v2

Our goal is to display a complete 2D map of star wars Galaxy in both Legends and Canon continuity.

## Prerequisites before launching application

### Unix/Linux

- install docker and docker compose : https://docs.docker.com/engine/install/

### Windows

- install docker desktop : https://docs.docker.com/desktop/install/windows-install/

## Run application

### Unix/Linux

- Copy source code in chosen directory: `git clone https://github.com/OtherlifeArt/Galaxy-Map-v2.git`
- Go to source code directory : `cd Galaxy-Map-v2`
- Copy .env.example file and rename its copy .env : `cp .env.example .env`
- Change .env parameters to suit your needs : `nano .env`
- Launch application : `docker compose up -d`

Application should be now available at http://localhost:8080 with default environment (.env) values

### Windows

- Start docker desktop and let it run
- Download and extract sources or pull sources using git
- Copy .env.example file and rename its copy .env
- Open powershell terminal then :
  - Go to application directory `<Drive letter>:` then `cd path/to/application/sources`
  - Launch docker compose : `docker compose up -d`

## Other commands

- Stop application : `docker compose down`

## Deploy and run to production

- Compile (minify and compress) sources : `docker compose -f docker-compose-prod.yml build web-prod-builder --no-cache`  
- Copy sources to local dist directory (into current/sources directory) : `docker compose -f docker-compose-prod.yml up -d web-prod-builder`
- Clean running processes : `docker compose -f docker-compose-prod.yml down` 
- Once sources are available you may copy/replace inner *dist* directory to any web server source directory

- Extra steps to deploy with docker : 
  - Build Docker prod container `docker compose -f docker-compose-prod.yml build web-prod --no-cache`
  - Run container : `docker compose -f docker-compose-prod.yml up  web-prod`  
