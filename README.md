# Strapi.js + Nuxt.js Blog Starter Kit

Contained in this repository is an empty blog, setup with the following:

- [Strapi.js Backend](https://strapi.io/)
- [Strapi.js GraphQL](https://strapi.io/documentation/3.0.0-alpha.x/guides/graphql.html)
- [Postgres](https://www.postgresql.org/)
- [Nuxt.js Frontend SPA](https://nuxtjs.org/)
- [Nust.js + SCSS/SASS](https://sass-lang.com/)
- [Traefik Edge Router](https://containo.us/traefik/)
- [Docker Deployment](https://www.docker.com/)

The default blog model includes:

- Blog Posts
- Blog Series (collection of Blog Posts)
- Blog Post Categories (generic categories for blog posts)
- Links (generic links that can be grouped and organized with posts)
- Images (generic image upload for hero image, etc.)

There is a full default layout, including:

- Home Page
- Blog Post by id
- Blog Series by id

You will probably end up changing all the styling of the above, but I include it just so you can get started with something :)

# Getting Started

## One-Time Setup.sh

Make sure that `node` is installed on your system. I built this using version `12.16.1`.

Then run:

    chmod +x setup.sh
    ./setup.sh

This file only needs to be run once.

## Setting up .env file

The `setup.sh` script creates a `.env` file that you can edit. `.gitignore` is setup so
that this file is not checked into your repository.

Now edit the `.env` file so that all the variables are what you desire. I recommend only
changing the obvious things, like passwords, secrets. etc. but ports might be sketchy
to edit.

## Local Postgres (recommended)

Recommend installing Postgres locally and not running the entire docker compose locally.
The reason is that you will have much better development speeding without using Docker
on your local machine. This, however, is your preference.

## Create Local Postgres Database

You will need to log into your Postgres instance and create the database that you
specified in your `.env` file in the `POSTGRES_DB` variable.

    psql -U postgres -c 'create database myblog;'

For more information if you get stuck, see [here](https://stackoverflow.com/questions/30641512/create-database-from-command-line).

*NOTE: you do not need to do this when deploying the Docker containers because the
postgres imagedoes this automatically from the `.env`. You only need to run this
locally.*

## Starting Strapi.js

Note: You might be interested in editing the default name in your `backend/package.json`.

By default, Strapi.js loads its configuration from the `.env` file. If you need
to customize things take a look at the `backend/config/` folder.

To start the server with debugging enabled on port 9229:

    cd backend
    yarn debug

If this works, your browser will open to `http://localhost:1337/admin/auth/register`.

You can create your first user and log into the Strapi Admin section here, where
you can see your blogs default models :D

## Starting Nuxt.js

Note: You might be interested in editing the default name in your `frontend/package.json`.

While the backend *is still running*, go ahead and start the frontend in a *new terminal*:

    cd frontend
    yarn dev

Then navigate to `http://localhost:3000/`.

You will get an error that says `Cannot read property 'filter' of undefined` (or something
similar).

If you check the `Developer Tools -> Network` panel and refresh, you will see that all
the GraphQL calls are returning content that will have an error `Forbidden`. The reason
for this is that permissions for access to the models are configured within the Postgres
database and we have not done that yet.

## Setting up Strapi.js Model Permissions

With the backend still running:

1. Navigate to `http://localhost:1337/admin/plugins/users-permissions/roles` or choose `Roles & Permissions` in the admin interface.

2. Select `Public` in the available roles.

3. For `Blog-Post`, `Blog-Post-Category`, `Image`, `Blog-Series`, and `Link`:

4. Check the boxes for `count`, `find`, and `findone`.

5. After checking all 12 checkboxes, click `Save`.

You need to check all 12 checkboxes. This will allow the GraphQL for the Nuxt.js frontend
to retrieve all the objects we need in our public blog.

6. Refresh the page at `localhost:3000`! You will now see your empty blog.

# Creating your first Blog Post

Go back to the Strapi.js administrative panel:

1. Click `Blog Posts`
2. Click `Add New Blog Post`
3. Enter in a `Title`
4. Set `Public` to `On`
5. Add an optional `image_header`
6. Add `Content`
7. Set a `Description`
8. Set `Show_description` to `On`
9. Click `Save`
10. Refresh `localhost:3000` and you will see your blog post!

# Creating a Hero Image

Go back to the Strapi.js administrative panel:

1. Click `Images`
2. Click `Add New Image`
3. Enter in a `Title`
4. Choose an image (large, preferably, so it can fill a monitor)
5. Set `Target` to `hero_image`
6. Click `Save`
7. Refresh `localhost:3000` and make sure you are on the homepage, and you will see your hero image :D

# Continuing...

For more information on how stuff works, setting more things up, etc. you can check out my blog
series on setting up this blog at [Building this Blog w/ Strapi JS](https://www.joshoncode.com/blogSeries/1).

# Connecting to AWS S3

Eventually you will want to setup S3 or something similar. When you do, you can do the following:

1. First see the [Strapi File Upload Instructions](https://strapi.io/documentation/3.0.0-alpha.x/guides/upload.html)
2. [Install the Strapi S3 Upload Plugin](https://www.npmjs.com/package/strapi-provider-upload-aws-s3)
3. Set `IMAGE_BASE_URI=` (empty) in your `.env` file (the S3 urls already have a domain)
4. Completely restart your local Strapi.js develop

# Deploying to Production

## 1. Prerequisites

**Important! Everything that follows assumes you have a working knowledge of Docker, DSN A and CNAME records, shell scripts, and SSH.**

- Make sure that your `.env` file has all appropriate settings
- Make sure that you have a docker repository. I recommend making a free one at [Docker Hub](https://hub.docker.com/).
- Make sure you have proper `A` and `CNAME` records in your DNS settings for your domain name. You will need `CNAME` records for `BLOG_DOMAIN`, `www.BLOG_DOMAIN`, `BLOG_API_DOMAIN`, and `TRAEFIK_DASHBOARD_DOMAIN`. See `.env` file for what you have chosen.
- Make sure you have a server with at least *2 GB of RAM* and *8 GB of free disk space* and SSH access. You might be able to run more lean, but I would not recommend it.
- Install Docker on your server (if not already installed)
- Install Docker Compose on your server (if not already installed)
- Make sure your server is running `rsync`
- Make sure that nothing on the server is running on the ports you have chosen in your `.env`
- Make sure you can actually SSH into your server easily (best bet is to add your public ssh key into the `~/.ssh/authorized_keys` of the server)
- IMPORTANT! Verify with something like `https://dnschecker.org/` that your `CNAME` records have propagated and are pointing to the right IP address. The reason for this is that Traefik uses [LetsEncrypt](https://letsencrypt.org/) to create your `https` certificates. If your `CNAME` records have not propagated, LetsEncrypt cannot verify that you own the domain and Traefik will fail when starting your containers.

## 2. Setup Traefik

You will need to edit the `traefik/traefik.toml` file. Make sure the domain names are correct in the `[acme]` section according to your `.env` file and the `CNAME` records you have created.

## 3. Building

From the root folder:

    ./build-all.sh

## 4. Pushing Docker Images to Public/Private Repo

    source .env
    docker push $DOCKER_EXTERNAL_REPO/$DOCKER_BACKEND_IMAGE:latest && docker push $DOCKER_EXTERNAL_REPO/$DOCKER_FRONTEND_IMAGE:latest

## 5. Deploying

    ./deploy-to-production.sh

# Contributing

There are probably a lot of things that can be improved, feel free to make a fork and a PR!
