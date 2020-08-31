# [netlify-vue-test](https://robertleroy.github.io/netlify-vue-test/)

- [gh-pages](#vue-cli-plugin-gh-pages)  
- [Netlify](#Netlify)

<br>

# [vue-cli-plugin-gh-pages](https://github.com/JaZo/vue-cli-plugin-gh-pages#readme)

### create repo -- `add, commit, push`
``` js
git init
git add . && git commit -m "initial commit"
git remote add origin https://github.com/<<user>>/<<repo>>.git
git push -u origin master
```
  
### Install add-on
``` js
vue add gh-pages
```

### Usage
``` js
// build to dist //
npm run build

// push to gh-pages branch //
npm run gh-pages
```

### Options
``` js
// create 'vue.config.js' in root folder //

module.exports = {
    pluginOptions: {
        ghPages: {
            message: 'Updates',
        },
    },
};
```
supports all [gh-pages options](https://github.com/tschaub/gh-pages#options)

<br>

# [Netlify](https://app.netlify.com/teams/robertleroy/sites)
## [netlify-vue-ghpages](netlify-vue-ghpages.netlify.app)

In order to receive direct hits  
using history mode on Vue Router,  
create file `_redirects` under `/public`  
with the following content:
``` js
# Netlify settings for single-page application
/*    /index.html   200
```
This will effectively serve the index.html  
instead of giving a 404  
no matter what URL the browser requests.
