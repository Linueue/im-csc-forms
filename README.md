# CSC Professional Application
> DISCLAIMER: This repo is a University project requirement, and is not affiliated, endorsed by, or connected to any government agencies. The form structure used in this project is entirely based on publicly available [forms](https://csc.gov.ph/downloads/category/459-cse-application-form). Any data used is fictional. However, some fields of the forms are intentionally omitted to keep the project in a manageable scope.

## Tech Stack
The tech stack used are the following:
1. [SvelteKit](https://svelte.dev/docs/kit/introduction) - frontend/backend
2. [MySQL](https://www.mysql.com) - database
3. [shadcn-svelte](https://www.shadcn-svelte.com) - UI components

## Routes
The project uses two primary routes, that is,
1. `application` - contains the actual application form code, including the landing page
2. `cms` - the Content Management System (CMS), or admin access

Routes in SvelteKit are through folders/directories itself, for example, `routes/dashboard` is `something.com/dashboard`. The `+layout` file is the UI that is shared across children. Thus, if `routes/dashboard/+layout.svelte` exists, then all of its subroutes share the same UI. This is the case for our UI since the top bar are shared across routes.

However, as you may see that the folder/directory name for our routes starts with `routes/(app)/`, and `routes/(cms)/`. The parenthesis simply means that you won't need to do `something.com/app/` to access our site, that is, it does not appear in our URL. This is useful, because `(app)` contains our landing page, and `(cms)` does not.

Why bother? Because I want to share the dark mode watcher, and the toast across all routes. If we don't have this separation, that is, there is no parenthesis routes, then the `+layout` of the landing page will be shared to `cms` route too, which is not what we want.

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

Copy the `.env.example` to `.env`, and modify all of the fields. I recommend going to our document IMG5_SQLproblems, and copy the .env there.

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

### Presentation

For presentation, I recommend doing the following,

```
npm run build
npm run preview
```

This will give an optimized, and faster execution of the website. Think of it as the lcoal production deployment.
