<div id="sidebar">
<details class='nav-part-1' open>
<summary><b>第一部分：基础篇</b></summary>

</details>

<details class='nav-part-2'  open>
<summary><b>第二部分：进阶篇</b></summary>

- **1. 数据库开发**

- **2. 前端技术**

- **3. 技术框架**

  - **3.1. Spring**
    - [3.1.1. Spring-概念基础](/docs/进阶篇/技术框架/Spring/spring-特性总览.md)
    - [3.1.2. Spring-概念基础](/docs/进阶篇/技术框架/Spring/spring-概念基础.md)

- **4. 技术集成**

- **5. 中间件**
  - **5.1. Redis**
    - [5.1.1. redis-安装配置](/docs/进阶篇/中间件/Redis/redis-安装配置.md)
    - [5.1.2. redis-概念基础](/docs/进阶篇/中间件/Redis/redis-概念基础.md)
    - [5.1.3. redis-命令使用](/docs/进阶篇/中间件/Redis/redis-命令使用.md)
    - [5.1.4. redis-模块系统](/docs/进阶篇/中间件/Redis/redis-模块系统.md)
    - [5.1.5. redis-数据结构详解](/docs/进阶篇/中间件/Redis/redis-数据结构详解.md)
    - [5.1.6. redis-开发编码规范](/docs/进阶篇/中间件/Redis/redis-开发编码规范.md)
    - [5.1.7. redis-实践应用场景](/docs/进阶篇/中间件/Redis/redis-实践应用场景.md)
    - [5.1.8. redis-问题总结](/docs/进阶篇/中间件/Redis/redis-问题总结.md)

</details>

<details class='nav-part-3'  open>
<summary><b>第三部分：高级篇</b></summary>

- **1. 数据结构与算法**
- **2. 设计模式**
- **3. 架构设计**
- **4. 服务治理**
- **5. 语言建模**

- **6. 源码分析**
  - **6.1. Spring**

</details>

<details class='nav-part-4'  open>
<summary><b>第四部分：实践篇</b></summary>

</details>

<details class='nav-part-6'  open>
<summary><b>第五部分：综合篇</b></summary>

- **1. 软件工具**
  - **1.1. 开发工具**
    - **1.1.1. 集成开发工具**
      - **1.1.1.1. IntelliJ IDEA**
        - [1.1.1.1.1. idea-安装激活](docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-安装激活.md)
        - [1.1.1.1.2. idea-常用插件](docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-常用插件.md)
        - [1.1.1.1.3. idea-配置优化](docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-配置优化.md)
        - [1.1.1.1.4. idea-快捷键汇总](docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-快捷键汇总.md)
- **2. 系统&服务器**
  - **2.1. Node JS**
    - [2.1.1. nodeJs 安装配置.md](docs/综合篇/系统&服务器/node-js/nodeJs-安装配置.md)
  - **2.2. Docker**
    - [2.2.1. Docker 概念基础和命令使用](docs/综合篇/系统&服务器/Docker/docker-概念基础及命令使用.md)

</details>

</div>

<!-- 资源链接 -->

<!-- 脚本执行 -->
<script type="text/javascript">
    // details标签联动
    $('details').click(function () {
        $('details[open]').not(this).removeAttr('open');

        if (!this.open) {
            $('.' + this.className).not(this).attr('open', '');
        } else {
            $('.' + this.className).not(this).removeAttr('open', '');
        }
    })
</script>
