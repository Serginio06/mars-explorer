# Test task 

## Mission: Expose an API that list the picture of Mars

### Objective
The UI developer needs to have an API that will provide a list of image as JSON structure. As a developer backend you will provide it.

### Constraints
- Image will come from the NASA API (https://api.nasa.gov/)
- Input will be the name of the rover, sol (Martian day starting at 0 for landing day) and the
  camera
- Data will be cached to avoid over quota
- Technology is Nodejs and Typescript
  **We will monitor**
- Code quality
- Testing method and use cases
- Architecture
- Technology chosen
  **Deliverable**
- Git repo
- Readme with instruction to launch the code and contribute to it.

## Chosen technology and approach

To implement this task I choose [Nest framework](https://github.com/nestjs/nest). 
This is modern framework developed with OOP and SOLID principles in mind.  
It is well-supported, tested and extremely well documented.
Out of the box it supports services requested in test task.

Just some services Nest provides our of the box:
- Fully supports TypeScript
- Dependency injection
- In-memory cache service with possibility to easily switch to a more comprehensive solution, like Redis.
- Tests ready
- Swagger

In the code I left more detailed comments for some approaches of implementation and used principles

### Tests coverage:
- E2E test - implemented for main endpoint to check it fulfill API contract. 
- Unit test - provided for nasa services method "getImagesBySol" only to check memory cache

### Out of the scope:
-  vulnerability protection
---
# Description

This API provides a list of image of Martian rover based on sol and camera.

## Prerequisites

Please make sure that Node.js (>= 10.13.0, except for v13) is installed on your operating system.

## Running the app with docker

```bash
# start
$ docker-compose up -d

# stop
$ docker-compose down
```

## Run app locally for development and run tests

#### Installation to run

```bash
$ npm ci
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---
## For developers/contributors:

#### Environment variables

To launch API you need to create file .env at root folder. Example of environment variables:
- APP_HOST=mars.explorer.local
- APP_ENV=local
- APP_DEBUG=false
- APP_PORT=7000
- APP_BASE_API_PATH=api/v1
- APP_CORS_ORIGINS=http://localhost
- API_KEY={NASA-API-KEY}

**Example of request with curl for rover Curiosity, sol 1000 from main camera:**
```bash
_curl -XGET http://localhost:7000/api/v1/mars/nasa/rover-image\?rover\=curiosity\&sol\=1000\&camera\=main_
```

#### API documentation

After run please open link to see documentation for the endpoint:

_http://localhost:7000/api/v1/docs_

#### Postman workspace link
If you prefer postman here is the link to workspace:

https://go.postman.co/workspace/My-Workspace~fa254c73-81e3-4214-8367-5c7d5e9eb851/collection/4218028-585c8906-c0c5-48db-89f0-e66487408864

If you have any questions or in need of clarification, my email: _sergius.iva@gmail.com_
