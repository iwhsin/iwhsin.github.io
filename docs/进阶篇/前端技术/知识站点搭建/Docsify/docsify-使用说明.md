# docsify

&emsp;&emsp;`docsify`是一个能动态生成文档网站的工具，利用它可以很容易的将我们平时编写的`markdown`文件生成一个动态网站进行在线预览，和`Gitbook`、`Hexo`、`VuePress`等不同的是，它不需要将文档转换生成对应的`.html`文件，仅需要几个配置文件即可动态的将我们的`.md`文件进行在线预览。<br>
&emsp;&emsp;详细的使用说明参考[docsify 官网介绍][docsify官网]，官网也是利用`docsify`生成，可以借鉴源码学习。<br>
&emsp;&emsp;下面记录下个人在初次接触，学习使用的记录，作为参考。

## 1. 快速开始

- **全局安装`docsify`组件**
  ```bash
  npm i docsify-cli -g
  ```
- **初始化工作目录**

  ```bash
  # 创建文档存储库
  mkdir docs && cd docs

  # 初始化文档库
  npx docsify init .
  ```

- **目录树结构**

  ```
  docs
  ├── .nojekyll
  ├── index.html
  └── README.md
  ```

  - `.nojekyll`：用于阻止`GitHub Pages`忽略掉下划线开头的文件，将站点部署到`Github Pages`尤其注意此文件不能少了。
  - `index.html`：站点入口文件，基本的配置都在此文件中进行配置。
  - `README.md`：作为主页内容渲染。

- **开始工作**

  - 启动服务
    ```bash
    # 启动服务，默认会在3000端口开启服务
    npx docsify serve .
    ```
  - 开始写作<br>
    &emsp;&emsp;编辑`README.md`，浏览器访问[http://localhost:3000](http://localhost:3000)可以实时看到最新的文件内容。

- **默认路由映射**<br>
  &emsp;&emsp;默认会将相应的目录名映射到对应目录下的`README.md`文件，访问地址以`#`开头。<br>
  &emsp;&emsp;访问路径不区分大小写，文件的相对工作目录的路径就是访问的路径，`.md`后缀可以省略。<br>
  &emsp;&emsp;目录访问地址要注意以`/`结尾，否则会出现`404 - Not found`。 - **路由映射示例**
  ``` text
  http://domain.com/#/ ===> docs/README.md
  http://domain.com/#/README ===> docs/README.md
  http://domain.com/#/README.md ===> docs/README.md

          http://domain.com/#/basic           ===>    `404 - Not found`
          http://domain.com/#/basic/          ===>    docs/basic/README.md
          http://domain.com/#/basic/docsify   ===>    docs/basic/docsify.md
          ```

## 2. 定制化配置

&emsp;&emsp;`docsify`主要在根目录下`index.html`文件进行定制化配置。

- `index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Document</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="description" content="Description" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css" />
    </head>

    <body>
      <!-- 配置站点加载提示信息 -->
      <div id="app">内容加载中...</div>
      <script>
        window.$docsify = {
          loadSidebar: true,
          // 站点名称配置
          name: "技术小站",
          // 会在站点右上角渲染定义的github corner
          repo: "https://github.com/iwhsin/javaOwner",
        };
      </script>
      <script src="//unpkg.com/docsify"></script>
    </body>
  </html>
  ```

* **站点加载提示信息**

  ```html
  <!-- index.html -->

  <!-- 配置站点加载提示信息 -->
  <div id="app">内容加载中...</div>
  ```

### 2.1. 定制侧边导航栏

&emsp;&emsp;侧边导航栏可以帮助我们快速定位文档内容，检索站点资源。<br>
&emsp;&emsp;默认会根据文档中的标题自动生成当前页的侧边导航栏。

- 配置`loadSidebar`选项<br>
  &emsp;&emsp;进行侧边栏配置，首先要在`docsify`配置中配置`loadSidebar: true`。
  ``` html
  <!-- index.html -->

      <script>
        window.$docsify = {
            // 定义侧边栏
          loadSidebar: true
        }
      </script>
      ```

- 创建`_sidebar.md`文件，`docsify`会自动将此文件中的内容加载为全局侧边导航栏，看下如下的配置示例和展示效果。<br>

  - 配置示例

    ```markdown
    # 基础篇

    - **语言特性**
      - **Java 基本介绍**
        - [Java 语言体系](...)
      - **面向对象**
        - [面向对象与面向过程](...)
    - **基本特性**
      - [值传递和引用传递](...)
      - [CRP-组合复用原则](...)
      - [Java 为什么设计为单继承？](...)

    # 进阶篇

    - **前端技术**
      - **VuePress**
        - [VuePress 入门学习](...)
    ```

  - 展示效果<br>
    <img style="width:auto;height:400px;" src="./../../../resource/static/image/senior/docsify-sidebar-customized.png"/>

- **侧边栏配置文件加载顺序说明**<br>
  &emsp;&emsp;配置了侧边栏`loadSidebar`选项，所有的页面侧边导航栏内容会从`_sidebar.md`文件中加载。<br>
  &emsp;&emsp;首先会从当前文件所在目录开始查找`./_sidebar.md`文件，如果没有依次查找上级目录中`./*/_sidebar.md`文件，直到根目录`/docs`，如果都没有则侧边导航栏显示内容为空。<br>
  &emsp;&emsp;如果只有根目录`/docs`下存在`_sidebar.md`文件，则所有文档的侧边导航栏内容都一样，为根目录`/docs/sidebar.md`加载的内容。

!> 如果不想加载指定子文件中的`_sidebar.md`文件，可以通过`alias`选项来进行配置将指定的侧边栏加载文件映射到其它侧边栏文件路径，如下面的`配置示例`所示。

- 配置示例

  ```html
  <!-- index.html -->

  // 配置指定的子目录下的侧边栏文件的路径映射路径 alias: { '/basic/_sidebar.md':
  '/_sidebar.md' }, // 配置所有的子目录下的侧边栏文件的路径映射路径 alias: {
  '/.*/_sidebar.md': '/_sidebar.md' },
  ```

- **文档标题导航配置**<br>
  &emsp;&emsp;默认未配置`loadSidebar`选项，文档的侧边导航从当前文档的标题加载，配置了`loadSidebar`选项，文档中的标题链接默认不展示，可以通过配置`subMaxLevel`选项在侧边栏同时展示文档中的标题链接。

      - 配置示例
          ``` html
          <!-- index.html -->

          <script>
            window.$docsify = {
              // 默认不加载，配置侧边栏加载选项
              loadSidebar: true,
              // 默认不显示，配置侧边栏展示文档指定级别及以上的标题链接
              subMaxLevel: 4
            }
          </script>
          ```
      - 展示示例<br>
      <img style="width:auto;height:400px;" src="./../../../resource/static/image/senior/docsify-sidebar-customized-with-head.png"/>

      - 指定文档忽略标题链接的加载展示
          - 指定文档中的指定标题链接不加载显示<br>
          &emsp;&emsp;在指定的标题后追加`{docsify-ignore}`选项，即可忽略在侧边导航栏展示此标题链接。
          ``` markdown
          ## 此标题不在侧边栏显示 {docsify-ignore}
          ```
          - 指定文档中的全部标题都不加载展示<br>
          &emsp;&emsp;在文档中第一个标题后追加`{docsify-ignore-all}`选项，即可忽略文档中去所有标题链接的加载展示。
          ``` markdown
          # 文档中的第一个表示 {docsify-ignore-all}
          ```

### 2.2. 定制站点导航栏

&emsp;&emsp;站点导航栏可以快速为我们提供站点内容分类，快速定位到相关文档内容，`docsify`默认没有导航栏，可以通过`index.html`中配置`nav`选项或通过配置`loadNavbar`选项来定制站点导航栏。

- `nav`配置站点导航栏

  ```html
  <!-- index.html -->

  <!-- 站点导航栏 ,链接要以`#`开头-->
  <nav>
    <a href="#/"><b>首页</b></a>
    <a href="#/java-study/"><b>Java学习</b></a>
    <a href="#/web-dev/"><b>Web开发</b></a>
    <a href="#/expand/"><b>技术扩展</b></a>
  </nav>
  ```

  - 展示示例<br>
    ![](./../../../resource/static/image/senior/docsify-navbar-customized-with-nav.png)

- 配置`loadNavbar`选项通过指定文件`_navbar.md`加载站点导航栏<br>

  - 配置`loadNavbar`选项

    ```html
    <!-- index.html -->

    <script>
      window.$docsify = {
        //  站点导航栏配置
        loadNavbar: true,
      };
    </script>
    ```

  - 创建`_navbar.md`文件，docsify 会自动将此文件中的内容加载为全局站点导航栏，导航栏支持多级嵌套配置。

    ```markdown
    - [**首页**](/)

    - [**Java 学习**](basic/)

      - [基础知识](basic/study)
      - [面向对象编程](basic/oritend-object)

    - **Web 开发**
      - [服务器开发](web/server-dev)
      - [微服务架构](microservice-dev)
    ```

  - 展示示例<br>
    ![](./../../../resource/static/image/senior/docsify-navbar-customized-with-loadNavbar.png)

  - **站点导航栏配置文件加载顺序说明**<br>
    &emsp;&emsp;配置了站点导航栏`loadNavbar`选项，所有的页面站点导航栏内容会从`_navbar.md`文件中加载。配置文件的加载顺序和`侧边导航栏的加载顺序`类似。<br>
    &emsp;&emsp;首先会从当前文件所在目录开始查找`./_navbar.md`文件，如果没有依次查找上级目录中`./*/_navbar.md`文件，直到根目录`/docs`，如果都没有则侧边导航栏显示内容为空。<br>
    &emsp;&emsp;如果只有根目录`/docs`下存在`_navbar.md`文件，则所有文档的侧边导航栏内容都一样，为根目录`/docs/_navbar.md`加载的内容。

  !> 如果不想加载指定子文件中的`_navbar.md`文件，可以通过`alias`选项来进行配置将指定的侧边栏加载文件映射到其它侧边栏文件路径，如下面的`配置示例`所示。

  - 配置示例

    ```html
    <!-- index.html -->

    // 配置指定的子目录下的侧边栏文件的路径映射路径 alias: {
    '/basic/_navbar.md': '/_navbar.md' }, //
    配置所有的子目录下的侧边栏文件的路径映射路径 alias: { '/.*/_navbar.md':
    '/_navbar.md' },
    ```

!> 如果同时使用`nav`和`loadNavbar`配置了站点导航栏，则`nav`配置只会在首页`index.html`生效。

### 2.3. 封面设置

&emsp;&emsp;`docsify`默认是不展示封面的，可以通过`coverpage`选项和`_coverpage.md`文件配置默认封面展示。

- 配置`coverpage`选项

  ```html
  <!-- index.html -->

  <script>
    window.$docsify = {
      //  站点导航栏配置
      coverpage: true,
    };
  </script>
  ```

- 创建`_coverpage.md`文件，docsify 会自动将此文件中的内容渲染为首页封面，封面内容仅在首页展示。

  ```markdown
  ![logo](/logo.ico)

  # Java Owner - 技术小站

  ## 专注 Web 开发与实践。

  ## **Java 学习、Web 开发、技术进阶、面试专题**<br>

  ![](https://img.shields.io/badge/version-v2.0.0-blue.svg) ![](https://img.shields.io/badge/author-whsin-red.svg) ![](https://img.shields.io/badge/license-MIT-green.svg)

  👁️ 本页总访问次数:<span id="busuanzi_value_site_pv"></span> | 🧑 总访客数: <span id="busuanzi_value_site_uv"></span>

  [GitHub](https://github.com/iwhsin/javaOwner)
  [开始阅读](/README)
  ```

- **封面背景样式设置**
  &emsp;&emsp;`docsify`默认渲染首页封面颜色为随机生成的渐变色，可以通过自定义配置背景颜色和背景图片，要想使配置生效必须放在文档的最后一行。 - `_coverpage.md`配置自定义背景图片
  `markdown <!-- 自定义背景图片 --> ![](background.png) ` - `_coverpage.md`配置自定义背景颜色
  `markdown <!-- 自定义背景颜色 --> ![color](white) `

- **封面设置首页内容渲染**<br>
  &emsp;&emsp;默认情况下，封面会同时渲染展示首页`/README.md`内容，可以通过如下配置`onlyCover: true,`选项来指定封面不渲染首页内容， - 配置示例
  ``` html
  <!-- index.html -->

      <script>
        window.$docsify = {
            //  站点导航栏配置
            coverpage: true,
            // 封面不渲染首页内容
            onlyCover: true
        }
      </script>
      ```

## 3. 配置项一览

&emsp;&emsp;`docsify`内置了很多实用配置，这里以配置文件的方式进行介绍，这里没什么看头就是学习下内置的一些配置选项。

```html
<body>
  <!-- 配置站点加载提示信息 -->
  <div id="app">内容加载中...</div>
  <script>
    window.$docsify = {
      // 站点名称配置
      name: '技术小站',
      // 点击文档标题后跳转的链接地址，默认为根路径，路径以`#`开头
      nameLink: '#/menu',
      // 会在站点右上角渲染定义的github corner
      repo: 'https://github.com/iwhsin/javaOwner',
      // 默认值6，配置最大渲染的标题层级，默认渲染所有标题为目录
      maxLevel: 6,

      // 文档加载的根路径
      // 指定本地工作目录的子目录作为渲染根目录
      basePath: '/new/',
      // 渲染其他域名的文档
      basePath: 'https://github.com/iwhsin/javaOwner/',
      // 渲染其他仓库的目录
      basePath: 'https://github.com/iwhsin/javaOwner/master/',

      // 设置首页文件加载路径,`#/`或`#/README`映射到`/home.md`文件，要想访问根目录下的README.md可以通过'#/./README'
      homepage: 'home.md'

      //  站点导航栏配置，默认渲染`/_navbar.md`内容，默认为`false`
      loadNavbar: true,
      // 站点导航栏配置，指定作为站点导航栏的文件
      loadNavbar: '_navbar1.md',


      // 默认不加载，配置侧边栏加载选项，默认渲染`_sidebar.md`的内容
      loadSidebar: true,
      // 侧边导航栏配置，指定作为侧边导航栏的文件
      loadSidebar: 'sidebar.md',
      // 全局隐藏侧边导航栏渲染
      hideSidebar: true,
      // 自定义侧边栏后默认不会再渲染文档中标题为目，配置此选项将文档中的标题层级以上的标题链接展示侧边导航栏中
      subMaxLevel: 4,

      // 侧边导航栏的站点图标，默认侧边导航栏显示为`name`配置的内容，配置此选项后不再渲染`name`配置的内容为侧边导航栏站点导航链接
      logo: '/logo.ico',

      // 封面设置
      // 默认渲染`/_coverpage.md`文件为封面
      coverpage: true,
      // 渲染指定文件`/siteCover.md`为封面
      coverpage: 'siteCover.md',
      // 主页渲染只展示封面
      onlyCover: true,

      // 切换文档后自动跳转到页面顶部
      auto2top: true,

      // markdown 具体配置可以参考后面的markdown扩展章节
      markdown： {

      },

      // 主题颜色配置
      themeColor: '#3F51B5',

      // 路由映射配置，支持正则
      alias: {
        '/java/javaOne.md': '/basic/java/javaOne.md',
        '/java/javaTwo.md': '/basic/java/javaTwo.md',
        `/.*/menu.md`: '/menu.md'
      },

      // 配置了`loadSidebar: true`选项，再配置此选项会将导航栏内容追加到页面标题，如果页面中有一级标题`# XXX`，则不会再进行追加
      autoHeader: true,

      // 执行文档里的`script`标签里的脚本，在页面加载完成会执行如下的`alert(1)`
      // <script>alert(1);</script>
      // <script>alert(2);</script>
      executeScript: true,

      // 禁用emoji表情解析
      noEmoji: true,

      // 移动端等小屏设备可以合并站点导航栏到侧标导航栏显示
      mergeNavbar: true,

      // 配置`{docsify-updated}`日期显示格式
      formatUpdated: '{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}',
      // 通过自定义配置日期显示格式
      formatUpdated: function(time) {
        return new Date(time).toLocaleString('zh');
      },

      // 外部链接打开方式，默认`_blank`在新窗口打开
      externalLinkTarget: '_self',

      // 右上角链接打开方式，默认`_blank`在新窗口打开
      cornerExternalLinkTarget: '_self',

      // 不渲染文档中配置的指定的链接，文档中的指定名称的链接不进行渲染处理
      noCompileLinks: ['/basic/README.md', '/basic/.*'],

      // 配置请求资源头信息
      requestHeaders: {
          'cache-control': 'max-age=600',
          'author': 'whsin'
      }，

      // 资源文件扩展名后缀
      ext: '.md',

      // 语言列表，访问`#/en/some`先从basic查找,如果找不到则找默认语言的`#/some`
      fallbackLanguages: ['zh', 'en'],

      // 定制404页面
      // 默认查找`#/_404.md`
      notFoundPage: true,
      // 配置指定的404渲染文件路径
      notFoundPage: '404.md',
      // 配置本地化的404页面
      notFoundPage: {
        '/': '404.md',
        '/en': 'en/404.md',
      },

      // 配置导航栏定位文档标题位置距离顶部的预留空间
      topMargin: 10,

    };
  </script>
  <script src="//unpkg.com/docsify"></script>
</body>
```

## 4. 定制主题样式

&emsp;&emsp;官网提供的几个主题样式比较单一，官网提供的主题样式如下。

- **官网默认主题**
  ```html
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css" />
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/buble.css" />
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/dark.css" />
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/pure.css" />
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/dolphin.css" />
  ```
- **其它主题**

  ```html
  <!-- docsify-themeable 定制主题 -->
  <link
    rel="stylesheet"
    href="//unpkg.com/docsify-themeable/dist/css/theme-defaults.css"
  />
  <link
    rel="stylesheet"
    href="//unpkg.com/docsify-themeable/dist/css/theme-simple.css"
  />
  <link
    rel="stylesheet"
    href="//unpkg.com/docsify-themeable/dist/css/theme-simple-dark.css"
  />
  ```

- **自定义主题样式**
  &emsp;&emsp;自定义自己的主题样式，只需要引入自己的`css`样式文件即可。<br>
  `html <!-- 在_style.css样式文件中编辑自己的属性样式即可 --> <link rel="stylesheet" href="_style.css"> `

## 5. 常用插件

### 5.1. 全文搜索插件

&emsp;&emsp;全文搜索插件会根据当前页面上的超链接获取文档内容，在 localStorage 内建立文档索引。默认过期时间为一天，当然我们可以自己指定需要缓存的文件列表或者配置过期时间。

- **插件引入**

  ```html
  <!--全文搜索插件-->
  <script src="//unpkg.com/docsify/lib/plugins/search.min.js"></script>
  ```

- **插件配置**

  ```html
  <script>
    window.$docsify = {
      // 完整配置参数
      search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        paths: [], // or 'auto'
        placeholder: "Type to search",

        // 支持本地化
        placeholder: {
          "/zh-cn/": "搜索",
          "/": "Type to search",
        },

        noData: "No Results!",

        // 支持本地化
        noData: {
          "/zh-cn/": "哎呀，没有找到呀！",
          "/": "No Results",
        },

        // 搜索标题的最大层级, 1 - 6
        depth: 4,
      },
    };
  </script>
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
  <script src="//unpkg.com/docsify/lib/plugins/search.min.js"></script>
  ```

### 5.2. emoji 解析插件

&emsp;&emsp;`docsify`默认是提供`emoji`解析的，能将类似`:100:`解析成:100:。<br>
&emsp;&emsp;自带的`emoji`解析不准确，他会将非`emoji`的字符串类似`:c:`这样的都进行解析，是有问题的，可以引入`emoji`解析插件，能更准确的进行`emoji`字符串解析。

- **插件引入**

  ```html
  <!-- emoji解析插件 -->
  <script src="//unpkg.com/docsify/lib/plugins/emoji.min.js"></script>
  ```

- **emoji 使用示例**<br>
  &emsp;&emsp;`emoji`的语法使用参考[emoji 语法使用][emoji语法使用]，更完整的语言参考[Emoji Cheat Sheet][emoji语法完整列表]。

### 5.3. 脚本执行插件

&emsp;&emsp;`docsify`会默认执行渲染文档中的`<script></script>`内联脚本，但是像通过`src`属性引入的`外联脚本`则需要引入插件。

- **插件引入**
  ```html
  <!-- 外联脚本执行插件 -->
  <script src="//unpkg.com/docsify/lib/plugins/external-script.min.js"></script>
  ```

### 5.4. 图片缩放插件

&emsp;&emsp;引入此插件，可以通过点击图片进行图片缩放，基于[medium-zoom][medium-zoom]。。

- **插件引入**

  ```html
  <!-- 图片缩放插件 -->
  <script src="//unpkg.com/docsify/lib/plugins/zoom-image.min.js"></script>
  ```

- **插件使用**
  &emsp;&emsp;引入此插件自动支持所有图片可以通过点击进行缩放，可以通过`:no-zoom`元素来忽略某张图片支持缩放的功能，如`![](image.png ":no-zoom")`。

### 5.5. 在 Github 上编辑

&emsp;&emsp;引入此插件，在文档渲染时，自动在页面上添加`Edit on github`按钮，点击链接到指定的 Github 资源库目录文件中。

!> 需要注意的是脚本的引入需要在`<script></script>`标签前引入。

- **插件引入**

  ```html
  <!-- 在Github上编辑 -->
  <script src="//unpkg.com/docsify-edit-on-github/index.js"></script>
  ```

- **插件配置**
  ```html
  <script src="//unpkg.com/docsify-edit-on-github/index.js"></script>
  <script>
    window.$docsify = {
      // 在Github上编辑
      plugins: [
        // EditOnGithubPlugin.create(repoDocsPath, editLink, title)
        // repoDocsPath: 资源库文档根目录
        // editLink: 编辑按钮点击跳转链接，默认和repoDocsPath一样
        // title：页面展示的按钮链接名称，默认`Edit on github`
        EditOnGithubPlugin.create(
          "https://github.com/iwhsin/javaOwner/master/docs/",
          null,
          "在Github上编辑"
        ),
      ],
    };
  </script>
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
  ```

### 5.6. 代码块复制插件

&emsp;&emsp;此插件提供了将代码块中的源代码快速复制到剪切板。

- **插件引入**

  ```html
  <!--代码块复制插件-->
  <script src="//unpkg.com/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
  ```

- **插件配置**

  ```html
  <script>
    window.$docsify = {
      // 复制代码到剪切板
      copyCode: {
        buttonText: "点击复制",
        errorText: "错误",
        successText: "复制",
      },

      // 本地化配置
      copyCode: {
        buttonText: {
          "/zh-cn/": "点击复制",
          "/": "Copy to clipboard",
        },
        errorText: {
          "/zh-cn/": "错误",
          "/": "Error",
        },
        successText: {
          "/zh-cn/": "复制",
          "/": "Copied",
        },
      },
    };
  </script>
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
  <script src="//unpkg.com/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
  ```

### 5.7. Gitalk 插件

&emsp;&emsp;引入此插件，支持 github 提供了评论功能，注意顺序，可能放在`/index.html`的`script`前不生效。

- **插件引入**

  ```html
  <!--Gitalk插件-->
  <link rel="stylesheet" href="//unpkg.com/gitalk/dist/gitalk.css" />
  <script src="//unpkg.com/docsify/lib/plugins/gitalk.min.js"></script>
  <script src="//unpkg.com/gitalk/dist/gitalk.min.js"></script>
  ```

- **插件配置**
  ```html
  <script>
    const gitalk = new Gitalk({
      clientID: "Github Application Client ID",
      clientSecret: "Github Application Client Secret",
      // 存放issue评论的仓库名称
      repo: "java-owner-talk",
      // 仓库拥有者账号名
      owner: "ownerAccount",
      // issue评论管理员,指定的人员可以进行issue初始化操作
      admin: ["adminAccount"],
      // 无干扰模式
      distractionFreeMode: true,
    });
  </script>
  ```

### 5.8. 分页插件

&emsp;&emsp;引入分页插件，可以在页脚显示`PREVIOUS`、`NEXT`。

- **插件引入**
  ```html
  <!--分页插件-->
  <script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
  ```
- **插件配置**
  ```html
  <script>
    window.$docsify = {
      // 分页插件
      pagination: {
        previousText: "上一章节",
        nextText: "下一章节",
      },
    };
  </script>
  ```

### 5.9. 字数统计插件

&emsp;&emsp;引入此插件，会在页面右上角显示统计文章字数统计和预计阅读时间。

- **插件引入**

  ```html
  <!--字数统计插件 -->
  <script src="//unpkg.com/docsify-count/dist/countable.min.js"></script>
  ```

- **插件配置**
  ```html
  <script>
    window.$docsify = {
      count: {
        // 是否开启显示
        countable: true,
        // 设置展示位置`top` or `bottom`
        position: "top",
        // 设置与临近`el`元素的间距
        margin: "10px",
        // 设置元素对齐方式，`right` or `top` or `left`
        float: "right",
        // 显示的字体大小
        fontsize: "0.9em",
        // 显示的字体颜色
        color: "rgb(90,90,90)",
        // 语言
        language: "chinese",
        // 本地化配置，优先级高于`language`
        localization: {
          words: "单词",
          minute: "分钟",
        },
        // 是否显示预计阅读时长
        isExpected: true,
      },
    };
  </script>
  ```

### 5.10. TAB 选项卡插件

&emsp;&emsp;引入此插件可以在`markdown`文件中支持`TAB`选项卡的渲染显示。

- **插件引入**

  ```html
  <!--TAB选项卡插件 -->
  <script src="//unpkg.com/docsify-tabs/dist/docsify-tabs.min.js"></script>
  ```

- **插件配置**

  ```html
  <script>
    window.$docsify = {
      tabs: {
        // 相同标签名的TAB选项卡同步匹配
        sync: true, // default

        // TAB选项卡主题样式选择，默认`classic`，支持`classic`、`material`或禁用主题样式（false）
        theme: `classic`,
        // 是否支持`标题标签+粗体title`配置TAB选项卡,默认为true
        tabHeadings: true,
      },
    };
  </script>
  ```

- **插件使用**<br>
  &emsp;&emsp;`<!-- tabs:start -->`开始，以`<!-- tabs:end -->`结束，中间使用`标题标签+粗体title`或`<!-- tab:TabName -->`来表示一个`TAB`选项卡。

      <!-- tabs:start -->
      #### **使用示例1**
      ```
      <!-- tabs:start -->
      #### **使用示例**
      使用示例

      #### **展示效果**
      展示效果
      <!-- tabs:end -->
      ```

      #### **使用示例2**
      ```
      <!-- tabs:start -->

      <!-- tab:TAB1 -->
      TAB1

      <!-- tab:TAB2 -->
      TAB2

      <!-- tabs:end -->
      ```

      #### **展示效果**
      &emsp;&emsp;你当前所看到的就是代码示例的渲染效果。
      <!-- tabs:end -->

## 6. Markdown 扩展配置

### 6.1. 代码语法高亮插件

&emsp;&emsp;`docsify`内置了`PrismJS`代码语法高亮插件，默认支持`markup`、`html`、`xml`、`svg`、`mathml`、`ssml`、`atom`、`rss`、`css`、`clike`、`js`、`javascript`，此外，可以自己引入相关插件支持代码高亮，支持的语言参考[prime-supported-language][prime-supported-language]。

- **插件引入**<br>
  &emsp;&emsp;`prime`[插件库][prime-language-plugin]提供了很多语言对应的插件，可以引入自己需要的代码语法高亮插件。<br>
  `html <!-- markdown 语法高亮插件 --> <script src="//unpkg.com/prismjs/components/prism-markdown.min.js"></script> <!-- bash 语法高亮插件 --> <script src="//unpkg.com/prismjs/components/prism-bash.min.js"></script> <!-- java 语法高亮插件 --> <script src="//unpkg.com/prismjs/components/prism-java.min.js"></script> <!-- javadoc 语法高亮插件 --> <script src="//unpkg.com/prismjs/components/prism-javadoc.min.js"></script> `

### 6.2. 文档样式扩展

&emsp;&emsp;`docsify`对`Markdown`文本进行了语法扩展，提供了一些实用的增强语法。

#### 6.2.1. 内容提示

&emsp;&emsp;帮助显示一些醒目的提示信息。

- **普通提示**

?> 使用`?> 内容`语法，显示效果如你当前看到的一样。

<!-- tabs:start -->
<!-- tab:普通提示 -->

`?> 这是一个普通提示`

<!-- tab:渲染显示 -->

?> 这是一个普通提示

<!-- tabs:end -->

- **强调提示**

!> 使用`!> 内容`语法，显示效果如你当前看到的一样。

<!-- tabs:start -->
<!-- tab:强调提示 -->

`!> 这是一个强调提示`

<!-- tab:渲染显示 -->

!> 这是一个普通提示

<!-- tabs:end -->

### 6.3. 链接设置

&emsp;&emsp;`docsify`支持对链接的使用进行了增强，支持`禁用链接`、`设置target属性`等

- **指定链接 target 属性**<br>
  &emsp;&emsp;`docsify`默认会对站点内链使用`_self`，外链使用`_blank`，可以自定义链接的`target`属性。<br>
  `markdown [链接标题][链接URL ':target=_blank'] [链接标题][链接URL ':target=_self'] `

- **禁用链接**<br>
  &emsp;&emsp;`docsify`可以对文档中的链接只做显示，而不进行编译渲染，[示例链接](/ ":disabled")。<br>
  `markdown [link](/demo ':disabled') `
- **忽略链接编译**
  &emsp;&emsp;`docsify`默认会将链接编译为`<a href="/#/url/">link</a>`,渲染到对应的`/url/README.md`内容。可以通过`:ignore`将链接编译为不带`#`开头的原生链接<br>
  `` // 忽略链接编译，将`<a href="/url/">link</a>`,渲染到对应的`/url/index.html`内容 [link](/url/ ':ignore') ``

- **任务列表**<br>
  &emsp;&emsp;`docsify`提供了任务列表语法的渲染。通过`- [ ]`、`- [x]`可以来进行任务列表显示。

<!-- tabs:start -->
<!-- tab:待办任务 -->

- [ ] `- [ ]`语法标示这是一个待办任务

<!-- tab:已完成任务 -->

- [x] `- [x]`语法标示这是一个已完成

<!-- tab:多级任务 -->

- [ ] `- [ ] 一级任务` - [x] `- [x] 二级任务`
<!-- tabs:end -->

### 6.4. 图片样式设置

&emsp;&emsp;`docsify`对图片链接进行了增强处理，可以指定一些图片的样式。

- **图片缩放处理**<br>

  - **百分比缩放**：下面是依次缩放到`20%`、`15%`、`10%`，语法为`![](logo.ico ':size=20% 这是缩放到20%')`<br>
    ![](logo.ico ":size=20% 这是缩放到20%")
    ![](logo.ico ":size=15% 这是缩放到15%")
    ![](logo.ico ":size=10% 这是缩放到10%")
  - **指定大小**：下面是依次缩放到`100x100`、`50x80`、`50x50`，语法为`![](logo.ico ':size=50x80 这是缩放到20%')`<br>
    ![](logo.ico ":size=100 这是缩放到100x100")
    ![](logo.ico ":size=50x80 这是缩放到50x80")
    ![](logo.ico ":size=50 这是缩放到50x50")

- **设置图片`class`样式**
  &emsp;&emsp;通过属性`':class=imgClass'`设置图片的样式，语法为`![](logo.ico ':class=imgClass 设置图片的class为imgClass')`。<br>
  ![](logo.ico ":class=imgClass 设置图片的class为imgClass")

- **设置图片`id`属性**
  &emsp;&emsp;通过属性`':id=imgId'`设置图片的样式，语法为`![](logo.ico ':id=imgId 设置图片的id为imgId')`。<br>
  ![](logo.ico ":id=imgId 设置图片的id为imgId")

### 6.5. 标题的属性设置 :id=title-id

&emsp;&emsp;通过在标题后追加`:id=title-id`语法设置标题的`id`属性渲染为对应的`data-id`属性值，语法为`### 标题的属性设置 :id=title-id`。

### 6.6. 详情摘要设置

&emsp;&emsp;`<details></details>`标签为内容摘要，点击查看详细内容，若需要在`detail`中渲染 markdown 语法，只需要在中间空出一行即可。

<!-- tabs:start -->

##### 6.6.0.1. **内容摘要**

```
<details>
<summary>详情（点击展开）</summary>
&emsp;&emsp;这是内容详细描述信息。

// 如果要支持markdown 语法渲染只需要中间空一行即可
- 列表
    - 列表
</details>
```

##### 6.6.0.2. **渲染显示**

<details>
<summary>详情（点击展开）</summary>
&emsp;&emsp;这是内容详细描述信息。

// 如果要支持 markdown 语法渲染只需要中间空一行即可

- 列表 - 列表
</details>
<!-- tabs:end -->

### 6.7. 文件内容嵌套

&emsp;&emsp;`docsify`对资源链接做了增强处理可以，通过`':include'`选项可以将指定的文件内容嵌套到当前位置，语法为`[include](included.md ':include')`。<br>
&emsp;&emsp;`docsify`支持`iframe`、`video`、`audio`或者`code block`嵌入类型，默认根据文件扩展名自动识别嵌入类型。<br>

- **扩展名对应的嵌入类型**

  ```text
  .html, .htm             ===> iframe
  .markdown, .md          ===> markdown
  .mp3                    ===> audio
  .mp4, .ogg              ===> video
  other file extension    ===> code
  ```

- **指定嵌入类型**<br>
  &emsp;&emsp;可以通过`:type`选项指定嵌入类型，语法为`[include](included.md ':include :type=code')`

- **嵌入代码文件部分代码块**
  &emsp;&emsp;可以通过`/// [partName]`或`### [partName]`将代码文件要嵌入的代码块包围起来再使用`:fragment`引用部分代码块。

- **示例代码**

  - 代码文件中的代码块

    ```markdown
    /// [part]

    部分代码块

    /// [part]
    ```

  - 嵌入指定的代码行
    ```markdown
    [include](include.md ":include :type=code :fragment=part")
    ```

## 7. 站点部署

&emsp;&emsp;支持部署到`github`、`gitlab`、`gitee`或`VPS`等。

### 7.1. GitHub Pages

&emsp;&emsp;将资源上传到指定的`github`仓库，利用`GitHub Pages`进行部署。

- **部署到 Github Pages**
  1. 进入`github`仓库，点击 settings，找到`Github Pages`标签
  2. 选择要部署的分支和目录，点击保存，即可完成部署。
     ![github-pages-publish][github-pages-publish]

<!-- 资源链接 -->

[docsify官网]: https://docsify.js.org/#/zh-cn/
[emoji语法使用]: ./../6.1.Html/6.1.2.emoji语法汇总.md
[emoji语法完整列表]: https://www.webfx.com/tools/emoji-cheat-sheet/
[medium-zoom]: https://medium-zoom.francoischalifour.com/
[prime-supported-language]: https://prismjs.com/#supported-languages
[prime-language-plugin]: //unpkg.com/prismjs/components/
[github-pages-publish]: ./../../../resource/static/image/senior/github-pages-publish.png
