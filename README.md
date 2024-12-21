# Project Setup

#### Project initialize command

```
npm init -y
```

#### TypeScript install and configuaration

```
npm install typescript --save-dev
```

```
tsc -init
```

#### Add script to configure rootDir and outDir in 'tsconfig.json' file.

```
{
  "rootDir": "./src,
  "outDir": "./dist"
}
```

#### Install all dependencies

```
npm i express mongoose dotenv bcryptjs jsonwebtoken cookie-parser zod http-status-kit
```

#### Install All devDependencies

```
npm i --save-dev @types/node @types/express @types/bcryptjs @types/jsonwebtoken @types/cookie-parser
```

#### TypeScript code runs on the server

```
npm i ts-node-dev --save-dev
```

```
ts-node-dev --respawn --transpile-only src/server.ts
```

#### Add script in package.json

```
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "prod": "node ./dist/server.js",
  "build": "tsc",
}
```

# Tech Stack

- TypeScript
- Node.js
- Express.js
- MongooDB
- Mongoose

# NPM package

- zod
- dotenv
- bcryptjs
- jsonwebtoken
- cookie-parser
- http-status-kit

# Functional Requirements:

### `1. Features of User Role`

- #### Admin

  - all access to database.
  - Can delete any blog.
  - Can block any user by updating a property isBlocked.

- #### User
  - User can register and log in.
  - User can create blogs (authenticate user).
  - user can read, write and delete their own blogs.

### `2. Authentication & Authorization`

- #### Authentication

  - Authenticate users can perform write, update, and delete operations.

- #### Authorization
  - Admin and User roles must be differentiated and secured.

### `3. Blog API Management`

- #### Blog API
  - A public API for reading blogs (should not authenticated)
  - Includes blog title, content, author details & other necessary information.
  - Supports search, sorting, and filtering functionalities.

### `4. API Endpoints`

- #### Auth API

  - `/api/auth/register` for POST method
  - `/api/auth/login` for POST method
  - `/api/auth/logout` for GET method

- #### Blog API
  - `/api/blogs` for POST method
  - `/api/blogs/:id` for PATCH method
  - `/api/blogs/:id` for DELETE method
  - `/api/blogs` for GET method
  - `/api/blogs/:id` for DELETE method
  -
- #### Admin API
  - `/api/admin/users/:userId/block` for PATCH method
  - `/api/admin/blogs/:id` for DELETE method

### `5. Error Handling`

- `Zod Validation Error` zod error from zod npm package
- `Not Found Error` api not found or invalid url
- `Validation Error ` it comes from mongoose
- `Authentication Error` it handles with jwt token
- `Authorization Error` it handle with jwt implementation
- `Internal Server Error ` any internal issue
- `Custom Error ` it mades by developer
- `Application Error` it comes from Error class
