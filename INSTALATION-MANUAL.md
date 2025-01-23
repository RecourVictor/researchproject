# Installatiehandleiding Simurace

Deze handleiding beschrijft hoe je Simurace installeert en configureert.

## Inhoudstabel
1. [Stap 1: Repository clonen of zip-bestand uitpakken](#stap-1-repository-clonen-of-zip-bestand-uitpakken)
2. [Stap 2: `.env`-files aanmaken](#stap-2-env-files-aanmaken)
   - [API `.env`-file](#api-env-file)
   - [PWA `.env`-file](#pwa-env-file)
3. [Stap 3: Installeren van benodigde npm packages](#stap-3-installeren-van-benodigde-npm-packages)
4. [Stap 4: Docker Desktop configureren](#stap-4-docker-desktop-configureren)
5. [Stap 5: Database seeden](#stap-5-database-seeden)
   - [Alles seeden](#alles-seeden)
   - [Alles resetten](#alles-resetten)
   - [Tabellen apart seeden](#tabellen-apart-seeden)
   - [Tabellen apart resetten](#tabellen-apart-resetten)
6. [Stap 6: Het project opstarten](#stap-6-het-project-opstarten)
   - [Development server starten](#development-server-starten)
   - [Demo-omgeving starten](#demo-omgeving-starten)
7. [Stap 7: Meer weten over functionaliteiten?](#stap-7-meer-weten-over-functionaliteiten)

## Stap 1: Repository clonen of zip-bestand uitpakken
Clone de repository of pak het zip-bestand uit in een gewenste map.

```bash
# Clone de repository
git clone https://github.com/RecourVictor/researchproject
```

## Stap 2: `.env`-files aanmaken
### API `.env`-file
Maak in de map `packages/api` een bestand genaamd `.env` met de volgende inhoud:

```env
URL_FRONTEND=localhost:5173
DB_HOST=localhost
DB_PORT=27027
DB_NAME=api
PWA_PORT=3001
NODE_ENV=dev
```
Er is ook een voorbeeldbestand beschikbaar: `.env.example`.

### PWA `.env`-file
Maak in de map `packages/pwa` een bestand genaamd `.env` met de volgende inhoud:

```env
VITE_BACKEND_URL=http://localhost:3000
```
Ook hier is een voorbeeldbestand beschikbaar: `.env.example`.

## Stap 3: Installeren van benodigde npm packages
Open een terminal en navigeer naar de rootmap van het project. Voer het volgende commando uit:

```bash
# Installeer de dependencies
npm install
```

## Stap 4: Docker Desktop configureren
1. Installeer Docker Desktop indien dit nog niet is gebeurd. [Download hier](https://www.docker.com/products/docker-desktop).
2. Open Docker Desktop.
3. Navigeer naar de map `infrastructure` en open de file `docker-compose-dev.yaml`.
4. Start Docker Compose:
   - Open een terminal en voer het volgende commando uit:
     ```bash
     docker-compose -f docker-compose-dev.yaml up
     ```
   - Of gebruik een GUI-tool zoals Docker Desktop om de services op te starten.

## Stap 5: Database seeden
Navigeer in je terminal naar de map `packages/api` en voer een van de volgende commando's uit:

### Alles seeden
```bash
npx nestjs-command seed:database:all
```

### Alles resetten
```bash
npx nestjs-command seed:reset:all
```

### Tabellen apart seeden
- Landen:
  ```bash
  npx nestjs-command seed:database:countries
  ```
- Disciplines:
  ```bash
  npx nestjs-command seed:database:disciplines
  ```
- Instellingen:
  ```bash
  npx nestjs-command seed:database:settings
  ```
- Atleten:
  ```bash
  npx nestjs-command seed:database:athletes
  ```
- Simulaties:
  ```bash
  npx nestjs-command seed:database:simulations
  ```

### Tabellen apart resetten
- Landen:
  ```bash
  npx nestjs-command seed:reset:countries
  ```
- Disciplines:
  ```bash
  npx nestjs-command seed:reset:disciplines
  ```
- Instellingen:
  ```bash
  npx nestjs-command seed:reset:settings
  ```
- Atleten:
  ```bash
  npx nestjs-command seed:reset:athletes
  ```
- Simulaties:
  ```bash
  npx nestjs-command seed:reset:simulations
  ```

## Stap 6: Het project opstarten
Navigeer naar de rootmap van het project in je terminal.

### Development server starten
```bash
npm run dev
```

### Demo-omgeving starten
```bash
npm run start
```

## Stap 7: Meer weten over functionaliteiten?
Lees de [gebruikershandleiding](USER-MANUAL.md) om meer te ontdekken over de functionaliteiten van Simurace.
