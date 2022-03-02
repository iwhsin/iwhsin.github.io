# VuePress入门学习
> &emsp;&emsp;作为一名前端小菜鸟，学习前端这一块的技术，当然就是对照着官网教程快速模仿一遍啦O(∩.∩)O哈哈~，本系列教程很多内容摘自[官网教程][1]，仅用作个人学习记录。

## 入门指南
&emsp;&emsp;首先我得有一个依赖包管理工具，这里我选择使用的是`Node.js`，官网下载安装完成基本配置操作（可以参考[Node.js安装配置][1]），这里以`npm`作为示例，开始进入我们的正题学习吧。

- **初始化工作库**
    ``` bash
    # 创建工作库
    mkdir javaOwner && cd javaOwner

    # 初始化工作库
    npm init

    # 安装本地vuepress依赖
    npm install vuepress -D
    ```

- **开始工作**
    ``` bash
    # 在工作目录下创建第一篇文档，作为首页加载页面
    echo 'welcome to javaOwner.' > docs/README.md

    # 开始工作，默认会在`8080`端口启动一个支持热加载的服务，可以在浏览器实时预览
    vuepress dev docs # npx vuepress dev .

    # 编译静态页面，编译后相关静态资源文件存放在根目录下的.vuepress文件夹中
    vuepress build docs
    ```

- **编辑自己的执行脚本**
    ``` json
    # 编译工作目录下`package.json`，增加如下配置
    {
        "scripts": {
          "docs:dev": "vuepress dev docs",
          "docs:build": "vuepress build docs"
        }
    }
    ```

- **使用脚本进行开发或编译**
    ``` bash
    # 使用脚本进行开发
    npm run docs:dev

    # 使用脚本编译静态资源文件
    npm run docs:build
    ```

&emsp;&emsp;完成了上面的操作,我们就可以利用`VuePress`来进行工作了，下面学习点`VuePress`的一些定制化操作。

## 基本配置

### 目录结构
&emsp;&emsp;我们使用`vuepress dev docs`指定的目录`docs`就是我们的工作目录，对应的路由映射为`/`，其它访问路径都是相对于`docs`目录的。
- **工作库目录结构**<br>
./：_工作库根目录_<br>
├── docs：_工作目录_<br>
│   ├── .vuepress (**可选的**)：_用于存放全局的配置、组件、静态资源等。_<br>
│   │   ├── `components` (**可选的**)：_该目录中的 Vue 组件将会被自动注册为全局组件。_<br>
│   │   ├── `theme`(**可选的**)：_用于存放本地主题。_<br>
│   │   │   └── Layout.vue：_主题布局_<br>
│   │   ├── `public` (**可选的**)：_静态资源目录。_<br>
│   │   ├── `styles` (**可选的**)：_用于存放样式相关的文件。_<br>
│   │   │   ├── index.styl：_全局样式文件，生成在最终的CSS文件结尾，比默认样式具有更高优先级。_<br>
│   │   │   └── palette.styl：_用于重写默认颜色常量，或者设置新的 stylus 颜色常量。_<br>
│   │   ├── `templates` (**可选的, 谨慎配置**)：_存储 HTML 模板文件。_<br>
│   │   │   ├── dev.html：_用于开发环境的 HTML 模板文件。_<br>
│   │   │   └── ssr.html：_构建时基于 Vue SSR 的 HTML 模板文件。_<br>
│   │   ├── `config.js` (**可选的**)：_配置文件的入口文件，也可以是 `YML` 或 `toml`。_<br>
│   │   └── `enhanceApp.js` (**可选的**)：_客户端应用的增强。_<br>
│   │ <br>
│   ├── basic：_工作目录子目录_<br>
│   │   └── README.md：_默认的子目录访问路径，映射到对应[http://localhost:8080/basic/](http://localhost:8080/basic/)_<br>
│   │<br>
│   └── README.md：_默认的根路径访问页面,映射到对应的[http://localhost:8080/](http://localhost:8080/)_<br>
│<br>
└── package.json<br>

- **默认的页面路由映射**<br>
&emsp;&emsp;默认会将相应的目录名映射到对应目录下的`README.md`文件，看几个示例：
    - `/`：映射到对应工作目录中的`README.md`文件，这里就是`docs/README.md`；
    - `/basic/`：映射到对应的子目录中`README.md`文件，这里就是`docs/basic/README.md`；
    - `/basic/java-basic.html`：映射到对应的子目录中的`java-basic.md`文件，这里是`docs/basic/java-basic.md`

### 基本配置文件
&emsp;&emsp;`VuePress`所有的文件都会存放在工作目录下`.vuepress`子目录中，其中`.vuepress/config.js`是主要的基本配置文件。<br>
&emsp;&emsp;`VuePress`内置了基于`headers`的搜索，会自动为所有的`h1`、`h2`、`h3`标题生成检索索引。

- 配置示例：
    ``` js
    module.exports = {
        // 站点标题
      title: 'javaOwner',
      // 站点描述
      description: 'Just playing around'
    }
    ```

#### 主题配置
&emsp;&emsp;主题负责整个站点的页面布局和交互细节，`VuePress`提供了默认的主题`@vuepress/theme-default`，也可以自行依赖其它主题，比如`npm install @vuepress/theme-vue -g`。<br>
&emsp;&emsp;默认的主题配置提供`导航栏（navbar）`、`侧边栏（sidebar）`和`首页（homepage）`的自定义功能。

#### 应用配置
&emsp;&emsp;`VuePress`同样也支持和`Vue`项目一样的应用配置操作，相关的配置文件为`.vuepress/enhanceApp.js`，在这里可以安装额外的插件、注册全局组件、增加额外的路由映射等操作。

- 配置示例：
    ``` js
    // 使用异步函数也是可以的
    export default ({
      Vue, // VuePress 正在使用的 Vue 构造函数
      options, // 附加到根实例的一些选项
      router, // 当前应用的路由实例
      siteData, // 站点元数据
      isServer // 当前应用配置是处于 服务端渲染 或 客户端
    }) => {
      // ...做一些其他的应用级别的优化
    }
    ```

## Markdown语言扩展

## 多语言支持



<!-- 资源链接 -->
[1]: ./../../../../G.综合篇/4.开发工具/4.4.系统&服务器/4.4.5.Node.js/4.4.5.4.Node.js安装配置.md
[2]: https://www.vuepress.cn/
