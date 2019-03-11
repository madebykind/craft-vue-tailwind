# Vue-cli 💕 CraftCMS 💕 Fractal 💕 Tailwind 💕 Nanobox 💕 Oh my!

## What is it?

Fork of [craft-vue-tailwind](https://github.com/chasegiunta/craft-vue) composer project template that integrates:

- [Nanobox](https://nanobox.io/) for development environments
- [git-flow](https://github.com/nvie/gitflow) as a branching/release strategy
- [CraftCMS](https://craftcms.com/) for content management
- [Fractal](https://fractal.build/) as a living styleguide
- [Tailwind](https://tailwindcss.com/) utility first CSS framework
- [Purgecss](https://www.purgecss.com/) for build optimisation
- [Jest](https://jestjs.io/) for front end unit tests
- [Vuejs](https://vuejs.org/) for fancypants JavaScript stuff
- [Husky](https://github.com/typicode/husky) for git hooks
- [Hygen](https://www.hygen.io/) for scaffolding components
- [eslint](https://eslint.org/) & [Prettier](https://prettier.io/) for linting and code formatting

Via the combined magic of [composer](https://getcomposer.org/) and [vue-cli](https://cli.vuejs.org/) to give you an all singing, all dancing, pre-configured dev environment


## What's included?

- Webpack + `vue-loader` for single file Vue components
- State preserving hot-reload
- Page reloading on file edits (twig, html, etc)
- State preserving compilation error overlay
- Lint-on-save with ESLint
- Source maps
- Fractal living styleguide with asset sync
- Load styleguide twig templates in Craft by prefixing include name with `@`


## Requirements

This template requires the following software / packages to be installed in the host machine

- [Nanobox](https://dashboard.nanobox.io/download) (requiress free account signup)
- PHP 7.3
- git and [git-flow](https://github.com/nvie/gitflow)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [vue-cli](https://cli.vuejs.org/)

Installing on a new machine? Not actually a developer? Install homebrew and then grab all the above apart from Nanobox at once:

```sh
brew install php composer node yarn git git-flow

```

**NB if installing Nanobox for the first time be sure to follow the post-install instructions for recent versions of macOS**


# How to use

## Creating a new project


```bash
# create & install project
composer create-project madebykind/craft-vue-tailwind <path>
cd <path>
# install deps and basic setup
./scripts/project/after-install
# customise the project
yarn project:configure
# apply environment settings
yarn project:apply-env
# install Craft in nanobox
nanobox run
# once you're inside the nanobox container
yarn project:setup-craft

```

## Getting an existing project running

```bash
git clone <project-git-url> <path>
cd <path>
# create .env
cp .env.example .env

# install deps and basic setup
./scripts/project/after-install
# install Craft
yarn project:setup-craft

```

## Accessing the CraftCMS database

By default Craft is set up to use [Project Config](https://docs.craftcms.com/v3/project-config.html), so you shouldn't often need to import / export a database  from the site, however, if you do, you can get local mysql credentials in your host machine by running

```
nanobox info local
```

You can then use the credentials shown under `data.db` to access mysql via the cli or a [GUI](https://sequelpro.com/) as you wish

## Dev workflow...

Run the servers:

```bash
# run each of these in their own terminal pane
yarn serve
yarn test:watch
yarn serve:craft
```
Create a new front end component:

```bash
# Interactively skeleton a new component
yarn generate:component
```

## Commands

### Dev environment

- `yarn serve`: start the webpack dev server + fractal server (NB  this does not start the craft/PHP server, as you will often want this to run in another process)
- `yarn serve:assets` start the webpack server above but without fractal running
- `yarn serve:fractal`  start the fractal server
- `yarn serve:craft`  start the nanobox container that serves CraftCMS

### Generators

Via Hygen, templates in `_templates/`

- `yarn generate:component` interactively generate a new front end component

### Linting

- `lint` what you'd expect
- `lint:autofix` lint and fix automatically where possible (run automatically pre-commit and pre-push)
- `lint:config-check`  check the eslint config for rules that conflict with prettier

### Tests

- `test:unit` run the unit tests (run automatically pre-push)
- `test:watch` run the tests on code change
- `test:coverage` calc code coverage stats


### Building for production

- `yarn build`: Production ready build.
  - JavaScript minification with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony)
  - Babel compiling
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano)
  - Static assets compiled with version hashes for efficient long-term caching
  - Removes unused CSS with Purgecss. Includes whitelister to keep third-party libraries untouched.
  - Bundle size analytics
  - Builds the living tyleguide to static HTML


## Configuration (optional)

To edit the vue-cli config via the UI you will require Vue CLI 3 to be [installed globally on your machine](https://cli.vuejs.org/guide/installation.html). You can  run `vue ui` and import your the project to get started customising the configuration with vue-cli plugins of your choice.

**NB** By default the project uses a randomly allocated ports for webpack dev server and fractal server, which are set by the `project:configure` command run during project setup, stored project-wide under the `kindConfig` key in `package.json` and loaded into your `.env` file via the `project:apply-env` command.

In order for the UI to work`vue-cli` requires you to run the project on it's default port (8080). To use the UI to configure your project you'll therefore need to temporarily change `ASSET_SERVER_PORT` in your `.env` file to `8080` and restart your `serve` process, then change it back to its previous value once you've finished.


# Under the hood

## WTF is all this dark magic?

This project automates a *lot* of dull manual tasks. If you want to understand what's going on, here's a quick rundown

1. After composer creates the project, it runs the `post-create-project-cmd` script, which:

- sets up your .env file
- replaces the project's composer.json with one that's specific for your project
- cleans up some files that aren't needed
- dumps composer's autoloader
- runs `scripts/project/after-install` which then...
  -

## How asset loading works

**NOTE:** During development, _only your assets_ will be served from `localhost:<ASSET_SERVER_PORT>` and referenced in the base template. You'll still load your site locally under your normal development domain (mysite.test, etc.). This will also cause a brief unstyled flash on page loads due to JS/CSS assets loading from javascript for development. **This flash isn't present after build, on production**.

After running `yarn build`, the easiest way to test your build files locally is to comment the environment variable in your `.env` file, and refresh the page. This will serve your assets from the build directory, rather than webpack's dev server.

For a detailed explanation on how things work, check out the [Vue CLI docs](https://cli.vuejs.org/).


## Babel Compiling

This boilerplate uses babel-preset-env for configuring babel. [You can read more about it here.](https://cli.vuejs.org/config/#babel)



## Thanks

Forked from [chasegiunta/craft-vue-tailwind](https://github.com/chasegiunta/craft-vue-tailwind)
