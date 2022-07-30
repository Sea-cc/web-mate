# 项目搭建规范

## 一. 代码规范

下述都可在 package.json 文件下配置

```json
"eslintConfig": {
        "root": true,
        "env": {
            "node": true
        },
        "extends": [
            "plugin:vue/essential",
            "eslint:recommended"
        ],
        "parserOptions": {
            "parser": "@babel/eslint-parser"
        },
        "rules": {
            "max-lines": [
                "warn",
                {
                    "max": 400
                }
            ],
            "max-params": [
                "error",
                {
                    "max": 3
                }
            ]
        }
    },
    "eslintIgnore": [
        "/dist",
        "/src/demanded",
        "/node_modules",
        "babel.config.js"
    ],
    "lint-staged": {
        "*.{js,vue}": [
            "prettier --write src",
            "vue-cli-service lint",
            "git add"
        ]
    },
    "prettier": {
        "trailingComma": "es5",
        "tabWidth": 4,
        "semi": true,
        "singleQuote": true,
        "end-of-line": "lf"
    },
    "browserslist": [
        "> 1%",
        "last 3 versions",
        "chrome >= 49",
        "ie >= 9"
    ]
```

### 1.1. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true # 文件存在于项目根目录1下

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)

### 1.2. 使用 prettier 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装 prettier

```shell
npm install prettier -D
```

2.配置.prettierrc 文件：

-   useTabs：使用 tab 缩进还是空格缩进，选择 false；
-   tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
-   printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
-   singleQuote：使用单引号还是双引号，选择 true，使用单引号；
-   trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
-   semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

```json
{
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "none",
    "semi": false
}
```

3.创建.prettierignore 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode 需要安装 prettier 的插件

![image-20210722214543454](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

5.测试 prettier 是否生效

-   测试一：在代码中保存代码；
-   测试二：配置一次性修改的命令；

在 package.json 中配置一个 scripts：(一次性格式化所有需要格式的文件,无需一个个格式化)

```json
    "prettier": "prettier --write ."
```

### 1.3. 使用 ESLint 检测(代码规范)

1.在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

![image-20210722215933360](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2oq26odj30pw05faaq.jpg)

3.**解决 eslint 和 prettier 冲突的问题(prettier 希望使用单引号,eslint 希望使用双引号)**：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）：创建项目时是否选择 ESLint + Prettier

```shell
npm i eslint-plugin-prettier eslint-config-prettier -D
```

解决commit 提交问题(版本问题,需要兼容匹配)`npm install @vue/eslint-config-prettier @vue/eslint-config-typescript -D` 

`@vue/eslint-config-prettier`版本太高(7.0.0)

安装`@vue/eslint-config-prettier": "^6.0.0 `需要兼容`eslint-plugin-prettier": "^3.1.0`



添加 prettier 插件：(`.eslintrc.js`文件下)

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```

📦当上述步骤都完成后,还会出现警告时,建议重启一下编译器

### 1.4. git Husky 和 eslint

虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

-   也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

-   那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

-   husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit(commit之前检测)、commit-msg(commit描述信息是否符合规范)、pre-push(push远程之前)

如何使用 husky 呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 `.husky` 文件夹：

```
npx huksy install
```

![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

**但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen📦**

-   **Commitizen 是一个帮助我们编写规范 commit message 的工具；**

    1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

-   第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

-   第二步选择本次修改的范围（作用域）`更改的范围是什么(例如组件或文件名):(按enter键跳过)`

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

-   第三步选择提交的信息`描述信息：这次提交做的内容`

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

-   第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

-   第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

-   第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

-   我们可以通过 commitlint 来限制提交；

    1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## 二. 第三方库集成

### 2.1. vue.config.js 配置

vue.config.js 有三种配置方式：

-   方式一：直接通过 CLI 提供给我们的选项来配置：
    -   比如 publicPath：配置应用程序部署的子目录（默认是 `/`，相当于部署在 `https://www.my-app.com/`）；
    -   比如 outputDir：修改输出的文件夹；
-   方式二：通过 configureWebpack 修改 webpack 的配置：
    -   可以是一个对象，直接会被合并；
    -   可以是一个函数，会接收一个 config，可以通过 config 来修改配置；
-   方式三：通过 chainWebpack 修改 webpack 的配置：
    -   是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 config 对象，可以对配置进行修改；

```js
const path = require('path')

module.exports = {
    outputDir: './build',
    // configureWebpack: {
    //   resolve: {
    //     alias: {
    //       views: '@/views'
    //     }
    //   }
    // }
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     views: '@/views'
    //   }
    // },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
    }
}
```

### 2.2. vue-router 集成

安装 vue-router 的最新版本：

```shell
npm install vue-router@next
```

创建 router 对象：

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        component: () => import('../views/main/main.vue')
    },
    {
        path: '/login',
        component: () => import('../views/login/login.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router
```

安装 router：

```ts
import router from './router'

createApp(App).use(router).mount('#app')
```

在 App.vue 中配置跳转：

```html
<template>
    <div id="app">
        <router-link to="/login">登录</router-link>
        <router-link to="/main">首页</router-link>
        <router-view></router-view>
    </div>
</template>
```

### 2.3. vuex 集成

安装 vuex：

```shell
npm install vuex@next
```

创建 store 对象：

```ts
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            name: 'coderwhy'
        }
    }
})

export default store
```

安装 store：

```ts
createApp(App).use(router).use(store).mount('#app')
```

在 App.vue 中使用：

```html
<h2>{{ $store.state.name }}</h2>
```

### 2.4. element-plus 集成

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

-   相信很多同学在 Vue2 中都使用过 element-ui，而 element-plus 正是 element-ui 针对于 vue3 开发的一个 UI 组件库；
-   它的使用方式和很多其他的组件库是一样的，所以学会 element-plus，其他类似于 ant-design-vue、NaiveUI、VantUI 都是差不多的；

安装 element-plus

```shell
npm install element-plus
```

#### 2.4.1. 全局引入

一种引入 element-plus 的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册：

```js
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 2.4.2. 局部引入

也就是在开发中用到某个组件对某个组件进行引入：

```vue
<template>
    <div id="app">
        <router-link to="/login">登录</router-link>
        <router-link to="/main">首页</router-link>
        <router-view></router-view>

        <h2>{{ $store.state.name }}</h2>

        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'

export default defineComponent({
    name: 'App',
    components: {
        ElButton
    }
})
</script>

<style lang="less"></style>
```

但是我们会发现是没有对应的样式的，引入样式有两种方式：

-   全局引用样式（像之前做的那样）；
-   局部引用样式（通过 babel 的插件）；

    1.安装 babel 的插件：

```shell
npm install babel-plugin-import -D
```

2.配置 babel.config.js

```js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'element-plus',
                customStyleName: (name) => {
                    return `element-plus/lib/theme-chalk/${name}.css`
                }
            }
        ]
    ],
    presets: ['@vue/cli-plugin-babel/preset']
}
```

但是这里依然有个弊端：

-   这些组件我们在多个页面或者组件中使用的时候，都需要导入并且在 components 中进行注册；
-   所以我们可以将它们在全局注册一次；

```ts
import {
    ElButton,
    ElTable,
    ElAlert,
    ElAside,
    ElAutocomplete,
    ElAvatar,
    ElBacktop,
    ElBadge
} from 'element-plus'

const app = createApp(App)

const components = [
    ElButton,
    ElTable,
    ElAlert,
    ElAside,
    ElAutocomplete,
    ElAvatar,
    ElBacktop,
    ElBadge
]

for (const cpn of components) {
    app.component(cpn.name, cpn)
}
```

### 2.5. axios 集成

安装 axios：

```shell
npm install axios
```

封装 axios：

```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Result } from './types'
import { useUserStore } from '/@/store/modules/user'

class HYRequest {
    private instance: AxiosInstance

    private readonly options: AxiosRequestConfig

    constructor(options: AxiosRequestConfig) {
        this.options = options
        this.instance = axios.create(options)

        this.instance.interceptors.request.use(
            (config) => {
                const token = useUserStore().getToken
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (err) => {
                return err
            }
        )

        this.instance.interceptors.response.use(
            (res) => {
                // 拦截响应的数据
                if (res.data.code === 0) {
                    return res.data.data
                }
                return res.data
            },
            (err) => {
                return err
            }
        )
    }

    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance
                .request<any, AxiosResponse<Result<T>>>(config)
                .then((res) => {
                    resolve(res as unknown as Promise<T>)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'GET' })
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'POST' })
    }

    patch<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PATCH' })
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'DELETE' })
    }
}

export default HYRequest
```

### 2.6. VSCode 配置

```json
{
    "workbench.iconTheme": "vscode-great-icons",
    "editor.fontSize": 17,
    "eslint.migration.2_x": "off",
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "files.autoSave": "afterDelay",
    "editor.tabSize": 2,
    "terminal.integrated.fontSize": 16,
    "editor.renderWhitespace": "all",
    "editor.quickSuggestions": {
        "strings": true
    },
    "debug.console.fontSize": 15,
    "window.zoomLevel": 1,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "explorer.confirmDragAndDrop": false,
    "workbench.tree.indent": 16,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "editor.wordWrap": "on",
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    },
    "hediet.vscode-drawio.local-storage": "eyIuZHJhd2lvLWNvbmZpZyI6IntcImxhbmd1YWdlXCI6XCJcIixcImN1c3RvbUZvbnRzXCI6W10sXCJsaWJyYXJpZXNcIjpcImdlbmVyYWw7YmFzaWM7YXJyb3dzMjtmbG93Y2hhcnQ7ZXI7c2l0ZW1hcDt1bWw7YnBtbjt3ZWJpY29uc1wiLFwiY3VzdG9tTGlicmFyaWVzXCI6W1wiTC5zY3JhdGNocGFkXCJdLFwicGx1Z2luc1wiOltdLFwicmVjZW50Q29sb3JzXCI6W1wiRkYwMDAwXCIsXCIwMENDNjZcIixcIm5vbmVcIixcIkNDRTVGRlwiLFwiNTI1MjUyXCIsXCJGRjMzMzNcIixcIjMzMzMzM1wiLFwiMzMwMDAwXCIsXCIwMENDQ0NcIixcIkZGNjZCM1wiLFwiRkZGRkZGMDBcIl0sXCJmb3JtYXRXaWR0aFwiOjI0MCxcImNyZWF0ZVRhcmdldFwiOmZhbHNlLFwicGFnZUZvcm1hdFwiOntcInhcIjowLFwieVwiOjAsXCJ3aWR0aFwiOjExNjksXCJoZWlnaHRcIjoxNjU0fSxcInNlYXJjaFwiOnRydWUsXCJzaG93U3RhcnRTY3JlZW5cIjp0cnVlLFwiZ3JpZENvbG9yXCI6XCIjZDBkMGQwXCIsXCJkYXJrR3JpZENvbG9yXCI6XCIjNmU2ZTZlXCIsXCJhdXRvc2F2ZVwiOnRydWUsXCJyZXNpemVJbWFnZXNcIjpudWxsLFwib3BlbkNvdW50ZXJcIjowLFwidmVyc2lvblwiOjE4LFwidW5pdFwiOjEsXCJpc1J1bGVyT25cIjpmYWxzZSxcInVpXCI6XCJcIn0ifQ==",
    "hediet.vscode-drawio.theme": "Kennedy",
    "editor.fontFamily": "Source Code Pro, 'Courier New', monospace",
    "editor.smoothScrolling": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "workbench.colorTheme": "Atom One Dark",
    "vetur.completion.autoImport": false,
    "security.workspace.trust.untrustedFiles": "open",
    "eslint.lintTask.enable": true,
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

## 三. 接口文档

https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL 的值：

```
http://152.136.185.210:5000
```

设置全局 token 的方法：

```js
const res = pm.response.json()
pm.globals.set('token', res.data.token)
```

接口文档 v2 版本：（有部分更新）

https://documenter.getpostman.com/view/12387168/TzzDKb12
