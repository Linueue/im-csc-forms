# CSC Professional Application
> DISCLAIMER: This repo is a University project requirement, and is not affiliated, endorsed by, or connected to any government agencies. The form structure used in this project is entirely based on publicly available [forms](https://csc.gov.ph/downloads/category/459-cse-application-form). Any data used is fictional. However, some fields of the forms are intentionally omitted to keep the project in a manageable scope.

## Tech Stack
The tech stack used are the following:
1. [SvelteKit](https://svelte.dev/docs/kit/introduction) - frontend/backend
2. [MySQL](https://www.mysql.com) - database
3. [shadcn-svelte](https://www.shadcn-svelte.com) - UI components

## Build Instructions
### Dev

First off, clone the repo,

```
git clone https://github.com/Linueue/im-csc-forms
```

Open up the cloned repo to any of your favorite IDEs/code editors,

```
npm install
```

Copy the `.env.example` to `.env`, and modify the fields, `DB_USER`, and `DB_PASSWORD`.

If you have yet to create a database locally through Workbench, or other DBMS GUI, run,

```
npm run db:create
```

However, if you did, please modify the `DB_DATABASE` in `.env` to the corresponding name you assigned to Workbench

Populate the database,

> Database migration just means the controlled process of transferring data, schemma, and application logic from a source DB to a target system. This is useful, since we all have different machines, and we wouldn't want to manually do it in MySQL

```
npm run db:migrate
```

And if you want a fresh DB,

```
npm run db:destroy
```

Host it locally,

```
npm run dev
```

### Production

TODO
