# news-explorer-frontend

**Версия**: 2.1

Страница на домене:

**1. http://mestoekbmik.site**
**2. https://mestoekbmik.site**
**3. http://www.mestoekbmik.site**
**4. https://www.mestoekbmik.site**

Страница после сборки:

**1. https://mickrazer.github.io/news-explorer-frontend/**

**2. https://mickrazer.github.io/news-explorer-frontend/secondary**

**Виды сборок в проекте:**
**build**, **dev**, **deploy**.

При сборке dev: 

**1. localhost:8080 - главная страница**

**2. localhost:8080/secondary - вторая страница**

Страница API:

**api.mestoekbmik.site***

## Сборка Build:

Сборка возволяющая собрать весь проект при помощи Wedpack. Во время сборки вебпак заходит в файл и добавляет его код в итоговый код. Затем повторяет ту же операцию для каждого подключенного через @import файла. Так вебпак собирает код всех файлов в один большой — сборку. Данная сборка запускается команндой: -npm run build

## Сборка Dev: 

Так как необходимо работать на локальном сервере, но нельзя его включать в финальную сборку, то нужно создать сборку для разработки. При написании команды: -npm run dev проект запустится на локальном сервере.

## Сборка Deploy:

Deploy — это разм ещение проекта на сервере. После того, как "задеплоите" проект, им смогут пользоваться все — то есть сайт появится в интернете. Данная сборка запускается команндой: -npm run deploy.

Cписок плагинов подключенных к Webpack:

    "@babel/cli": "^7.6.4",
    
    "@babel/core": "^7.6.4",
    
    "@babel/preset-env": "^7.6.3",
    
    "autoprefixer": "^9.6.5",
    
    "babel-loader": "^8.0.6",
    
    "cross-env": "^6.0.3",
    
    "css-loader": "^3.2.0",
    
    "cssnano": "^4.1.10",
    
    "file-loader": "^4.2.0",
    
    "gh-pages": "~2.1.1",
    
    "html-webpack-plugin": "^3.2.0",
    
    "image-webpack-loader": "^6.0.0",
    
    "mini-css-extract-plugin": "^0.8.0",
    
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    
    "postcss-loader": "^3.0.0",
    
    "style-loader": "^1.0.0",
    
    "webpack": "^4.41.2",
    
    "webpack-cli": "^3.3.9",
    
    "webpack-dev-server": "^3.8.2",
    
    "webpack-md5-hash": "0.0.6"


