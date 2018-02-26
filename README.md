<h1 align="center">Eval.js</h1>
<div align="center">A desktop app like jsfiddle runs offline</div>
<p align="center">
  <img width="" src="https://github.com/codertx/eval-desktop/raw/master/demo.png">
</p>

#### Todo Features

- [x] CSS preprocessor support: Sass
- [x] Emmet support for HTML
- [ ] Layout change
- [ ] Babel support for JavaScript
- [ ] Common boilerplate support
- [ ] Hotkey support
- [ ] i18n

#### Build Setup

The backend is powered by Bass service provider [LeanCloud](https://leancloud.cn/).
If you want to create your own Eval.js. You should create an LeanCloud app and write the app key to the file `src/renderer/config/index.example.js`. Then you can take following steps.

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build

# lint all JS/Vue component files in `src/`
yarn run lint

```

#### Why introduced to Rxjs?
I made this project for learning purpose. In facts, the data logical behind this app is not so complicated. The reason why I introduced to Rxjs is to learn the new concept of Rxjs.
