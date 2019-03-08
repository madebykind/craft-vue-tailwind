# craft-vue-tailwind

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

## Requirements

This template requires the following software / packages to be installed in the host machine

- [Nanobox](https://dashboard.nanobox.io/download) (requiress free account signup)
- PHP 7.3
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [vue-cli](https://cli.vuejs.org/)

Installing on a new machine? Not actually a developer? Install homebrew and then grab all the above apart from Nanobox at once:

```sh
brew install php composer node yarn git-flow

```

## Creating a new project

```
composer create-project madebykind/craft-vue-tailwind <path>
cd <path>
yarn project:configure # customise the project
yarn project:apply-env # apply environment settings
```

## Getting an existing project running

```
git clone <project-git-url> <path>
cd <path>
composer
yarn project:apply-env
```


**NB if installing Nanobox for the first time be sure to follow the post-install instructions for recent versions of macOS**


## Dev workflow...

```
# run each of these in their own terminal pane
yarn serve
yarn test:watch
yarn serve:craft
```


## What's Included


### Dev environment

- `yarn serve`: first-in-class development experience.

  - Webpack + `vue-loader` for single file Vue components
  - State preserving hot-reload
  - Page reloading on file edits (twig, html, etc)
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps
  - Fractal living styleguide with asset sync
  - NB by default this does not start the craft/PHP server, as you will often want this to run in another process, see `serve:craft` for a command for this

- `yarn serve:assets`
  - start the dev server above but without fractal running

- `yarn serve:fractal`
  - start the fractal server

- `yarn serve:craft`
  - start the nanobox container that serves craft

### Linting

- `lint`
  - what you'd expect
- `lint:autofix`
  - Lint and fix automatically where possible
- `lint:config-check`
  - check the eslint config for rules that conflict with prettier

### Tests

- `test:unit`
  - run the unit tests (happens automatically pre-push)
- `test:watch`
  - run the tests on code change
- `test:coverage`
  - calc code coverage stats


### Building for production

- `yarn build`: Production ready build.
  - JavaScript minification with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony)
  - Babel compiling
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano)
  - Static assets compiled with version hashes for efficient long-term caching
  - Removes unused CSS with Purgecss. Includes whitelister to keep third-party libraries untouched.
  - Bundle size analytics
  - Builds the styleguide to static HTML



### Fork It And Make Your Own

You should fork this repo to create your own boilerplate. This scaffold makes no assumptions about pre-processor, babel, or linting configurations.

## Setup

This boilerplate requires Vue CLI 3 be [installed globally on your machine](https://cli.vuejs.org/guide/installation.html).

```bash
# create & install project
composer create-project chasegiunta/craft-vue-tailwind PATH

# run Craft's setup & install
./craft setup

# install the Asset Rev plugin
./craft install/plugin assetrev

# install dependencies
npm install # yarn

# initialize Tailwind's config file (tailwind.js)
./node_modules/.bin/tailwind init

# run dev server (default runs on localhost:8080)
npm run dev # yarn dev (alias for 'yarn serve')

# build for production with minification
npm run build # yarn build
```

Once up and running, the fun part comes in using Vue CLI's GUI to customize your project to suite your needs. Simply run `vue ui` and import your newly created project to get started.

You can also run your `dev` & `build` tasks from the GUI to get valuable build stats & runtime analytics.

**NOTE:** During development, _only your assets_ will be served from `localhost:8080` and referenced in the base template. You'll still load your site locally under your normal development domain (mysite.test, etc.). This will also cause a brief unstyled flash on page loads due to JS/CSS assets loading from javascript for development. **This flash isn't present after build, on production**.

After running `npm run build`, the easiest way to test your build files locally is to comment the environment variable in your `.env` file, and refresh the page. This will serve your assets from the build directory, rather than webpack's dev server.

For a detailed explanation on how things work, check out the [Vue CLI docs](https://cli.vuejs.org/).

## Pre-Processors

This boilerplate has pre-configured CSS extraction for most popular CSS pre-processors including LESS, SASS, Stylus, and PostCSS. To use a pre-processor, all you need to do is install the appropriate webpack loader for it. For example, to use SASS:

```bash
npm install sass-loader node-sass --save-dev
# yarn add sass-loader node-sass --dev
```

Note you also need to install node-sass because sass-loader depends on it as a peer dependency.

Read more about this at https://cli.vuejs.org/guide/css.html#pre-processors

## Automatic Component Registration

Any vue components placed within `src/components` will be registered with Vue automatically. **This requires their filenames to be in PascalCase**, eg. MyVueComponent.vue

## Babel Compiling

This boilerplate uses babel-preset-env for configuring babel. [You can read more about it here.](https://cli.vuejs.org/config/#babel)

## Linting

You can enable linting by adding the `@vue/cli-plugin-eslint` plugin through the GUI `vue ui`.


## Thanks

Forked from [chasegiunta/craft-vue-tailwind](https://github.com/chasegiunta/craft-vue-tailwind)
