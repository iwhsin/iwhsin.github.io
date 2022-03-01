<div id="sidebar">
<details class='nav-part-1' open>
<summary><b>第一部分：基础篇</b></summary>

- **1. 语言特性**

  - **1.1. 概念基础 🏷️**

    - [1.1.1. Java 语言体系](/docs/基础篇/语言特性/概念基础/java-语言体系.md)
    - [1.1.2. Java 语言运行环境](/docs/基础篇/语言特性/概念基础/java-语言环境.md)
    - [1.1.3. Java 中的技术术语](/docs/基础篇/语言特性/概念基础/java-技术术语.md)

  - **1.2. 面向对象 🏷️**

    - [1.2.1. 面向对象与面向过程](/docs/基础篇/语言特性/面向对象/object-面向对象与面向过程.md)
    - [1.2.2. 面向对象的设计准则](/docs/基础篇/语言特性/面向对象/object-面向对象的设计准则.md)

  - **1.3 基本特性 🏷️**
    - [1.3.1. 平台无关性](/docs/基础篇/语言特性/基本特性/feature-平台无关性.md)
    - [1.3.2. 值传递和引用传递](/docs/基础篇/语言特性/基本特性/feature-值传递和引用传递.md)
    - [1.3.3. 闭包概念](/docs/基础篇/语言特性/基本特性/feature-Java中的闭包概念.md)
    - [1.3.4. CRP-组合复用原则](/docs/基础篇/语言特性/基本特性/feature-CRP-组合复用原则.md)
    - [1.3.5. 重写 VS 重载](/docs/基础篇/语言特性/基本特性/feature-重写Vs重载.md)
    - [1.3.6. Java 为什么设计为单继承？](/docs/基础篇/语言特性/基本特性/feature-Java为什么设计为单继承.md)
    - [1.3.7. Java 中几种引用对象类型(强、弱、软、虚)](/docs/基础篇/语言特性/基本特性/feature-引用对象的几种类型.md)

- **2. 基础知识 🏷️**

  - [2.1. Java 数据类型](/docs/基础篇/基础知识/basic-数据类型.md)
  - [2.2. Java 句法结构](/docs/基础篇/基础知识/basic-句法结构.md)
  - [2.3. 内部类和合成类](/docs/基础篇/基础知识/basic-内部类和合成类.md)
  - [2.4. 枚举类型](/docs/基础篇/基础知识/basic-枚举类型.md)
  - [2.5. 注解类型](/docs/基础篇/基础知识/basic-注解类型.md)
  - [2.6. 接口类型](/docs/基础篇/基础知识/basic-接口类型.md)
  - [2.7. 泛型类型和泛型方法](/docs/基础篇/基础知识/basic-泛型类型与泛型方法.md)
  - [2.8. 对象创建的几种方式](/docs/基础篇/基础知识/basic-面向对象基础.md#对象创建的几种方式)
  - [2.9. equals VS ==](/docs/基础篇/基础知识/basic-面向对象基础.md#Equals和==的区别)
  - [2.10. 类变量、成员变量和局部变量](/docs/基础篇/基础知识/basic-面向对象基础.md#类变量、成员变量和局部变量)
  - [2.11. 构造函数](/docs/基础篇/基础知识/basic-面向对象基础.md#构造函数)
  - [2.12. Java 中的修饰符](/docs/基础篇/基础知识/basic-修饰符.md)

- **3. 面向对象编程 🏷️**

  - **3.1. 反射技术** ✏️

    - [3.1.1 Java 反射机制](/docs/基础篇/面向对象编程/反射技术/reflect-反射机制.md)
    - [3.1.1 Java 动态代理](/docs/基础篇/面向对象编程/反射技术/reflect-Jdk动态代理.md)

  - **3.2. 集合框架**
    - [3.2.1. Java 中的集合体系](/docs/基础篇/面向对象编程/集合框架/collection-集合体系.md)
  - **3.3. 并发编程** ✏️

    - **3.3.1. 多线程**
      - [3.3.1.1. 多线程基础](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础.md)
      - [3.3.1.2. 线程安全](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-线程安全问题.md)
      - [3.3.1.3. 线程间的通信](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-线程间的通信.md)
      - [3.3.1.4. Timer 定时器](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-Timer定时器.md)
      - [3.3.1.5. JVM 内存模型](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-jvm-内存模型.md)
      - [3.3.1.6. 无锁编程扩展](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-无锁编程扩展.md)
      - [3.3.1.7. 多线程与单例模式](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程与单例模式.md)
      - [3.3.1.8. 为什么 volatile 关键字不能保证线程安全](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-volatile-非线程安全.md)
    - **3.3.2. JUC 并发库**
      - [3.3.2.1. 原子类库]
      - [3.3.2.2. 锁与条件]
      - [3.3.2.3. 并发工具](/docs/基础篇/面向对象编程/并发编程/JUC并发库/thread-juc-并发工具.md)
      - [3.3.2.4. 并发容器]
      - [3.3.2.5. 线程池]

  - **3.4. 文件处理与 IO 流**

    - [✎ 3.4.1. 输入输出流](/docs/基础篇/面向对象编程/文件处理与IO流/io-输入输出流.md)
    - 3.4.2. 字符流
    - 3.4.3. 过滤流(装饰流)
    - 3.4.4. NIO
    - [3.4.5 Java 中的序列化与反序列化](/docs/基础篇/面向对象编程/文件处理与IO流/io-序列化和反序列化.md)

  - **3.5. 函数式编程** 🏷️

    - [3.5.1. 函数式编程](/docs/基础篇/面向对象编程/函数式编程/functional-函数式编程.md)
    - [3.5.2. Lambda 表达式](/docs/基础篇/面向对象编程/函数式编程/functional-Lambda表达式.md)
    - [3.5.2. Stream 流处理](/docs/基础篇/面向对象编程/函数式编程/functional-Stream流处理.md)

  - **3.6. 异常处理机制** ✏️
  - **3.7. 数据库编程 🏷️**

    - [3.7.1. JDBC 概念基础](/docs/基础篇/面向对象编程/数据库编程/jdbc-概念基础.md)

  - **3.8. 网络编程**

    - **3.8.1 Socket** ✏️

  - **3.9. 单元测试** ✏️

- **4. 基础扩展**

  - **4.1. JDK 新特性**

    - [4.1.1. Java8 新特性](/docs/基础篇/基础扩展/Java新特性/basic-新特性-Java8.md)

  - **4.2. 命令行工具**

  - **4.3 Java 中的安全约束**

  - **4.4. 统一编码方案**

    - [4.4.1. Unicode 编码方式](/docs/基础篇/基础扩展/字符集编码/basic-Unicode编码方式.md)

  - **4.5. 正则表达式**

    - [4.5.1. 正则表达式](/docs/基础篇/基础扩展/正则表达式/regex-正则表达式.md)
    - [4.5.2. regex-内联匹配模式](/docs/基础篇/基础扩展/正则表达式/regex-内联匹配模式.md)

  - **4.6 语言扩展**

    - [4.6.1. java-jar 文件中的 META-INF 目录](/docs/基础篇/基础扩展/语言扩展/basic-jar文件中的META-INF目录.md)
    - [4.6.2. java-控制台输出样式](/docs/基础篇/基础扩展/语言扩展/basic-控制台输出样式.md)

  - **4.7 位运算符的应用**
    - [4.7.1. 位运算的基本使用](/docs/基础篇/基础扩展/位运算/basic-位运算的应用.md)

</details>

<details class='nav-part-2'  open>
<summary><b>第二部分：进阶篇</b></summary>

- **1. 数据库开发**

  - **1.1 数据库基础**

    - [1.1.1. db-数据库基础](/docs/进阶篇/数据库开发/数据库基础/db-数据库基础.md)
    - [1.1.2. db-SQL 基础](/docs/进阶篇/数据库开发/数据库基础/db-SQL基础.md.md)
    - [1.1.3. db-SQL 优化核心思想](/docs/进阶篇/数据库开发/数据库基础/db-SQL优化核心思想.md)
    - [1.1.4. db-数据库优化总结](/docs/进阶篇/数据库开发/数据库基础/db-数据库优化总结.md)
    - [1.1.5. db-问题汇总](/docs/进阶篇/数据库开发/数据库基础/db-问题汇总.md)
    - [1.1.6. db-开发设计规范](/docs/进阶篇/数据库开发/数据库基础/db-开发设计规范.md)
    - [1.1.7. db-面试专题](/docs/进阶篇/数据库开发/数据库基础/db-面试专题.md)

  - **1.2 MySQL**

    - [1.2.1 mysql-安装配置](/docs/进阶篇/数据库开发/MySQL/mysql-安装配置.md)
    - [1.2.2 mysql-命令使用](/docs/进阶篇/数据库开发/MySQL/mysql-命令使用.md.md)
    - [1.2.3 mysql-存储引擎](/docs/进阶篇/数据库开发/MySQL/mysql-存储引擎.md)
    - [1.2.4 mysql-问题汇总](/docs/进阶篇/数据库开发/MySQL/mysql-问题汇总.md)
    - [1.2.5 mysql-面试专题](/docs/进阶篇/数据库开发/MySQL/mysql-面试专题.md)

  - **1.3 Oracle**

- **2. 前端技术**

  - **2.1. 知识站点**
    - **2.1.1. Docsify**
      - [2.1.1.1. docsify-使用说明](/docs/进阶篇/前端技术/知识站点搭建/Docsify/docsify-使用说明.md)
      - [2.1.1.1. docsify-插件使用](/docs/进阶篇/前端技术/知识站点搭建/Docsify/docsify-插件使用.md)

- **3. 技术框架**

  - **3.1. Spring**

    - [3.1.1. Spring-概念基础](/docs/进阶篇/技术框架/Spring/spring-特性总览.md)
    - [3.1.2. Spring-概念基础](/docs/进阶篇/技术框架/Spring/spring-概念基础.md)

- **4. 技术集成**

  - **4.1. 注册中心**
    - **4.1.1. Apollo**
      - [4.1.1.1. apollo-接入说明](/docs/进阶篇/技术集成/微服务组件/配置中心/Apollo/apollo-接入说明.md)
  - **4.2. 内部网关**
  - **4.3. 配置中心**
  - **4.4. 链路跟踪**
  - **4.5. 软件负载均衡**

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
        - [1.1.1.1.1. idea-安装激活](/docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-安装激活.md)
        - [1.1.1.1.2. idea-常用插件](/docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-常用插件.md)
        - [1.1.1.1.3. idea-配置优化](/docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-配置优化.md)
        - [1.1.1.1.4. idea-快捷键汇总](/docs/综合篇/软件工具/开发工具/集成开发工具/intellij-idea/安装配置/idea-快捷键汇总.md)
- **2. 系统&服务器**
  - **2.1. Node JS**
    - [2.1.1. nodeJs-安装配置.md](docs/综合篇/系统&服务器/node-js/nodeJs-安装配置.md)
  - **2.2. Docker**
    - [2.2.1. docker-概念基础和命令使用](/docs/综合篇/系统&服务器/Docker/docker-概念基础及命令使用.md)
    - [2.2.1. docker-Compose 工具使用](/docs/综合篇/系统&服务器/Docker/docker-Compose工具使用.md)
  - **2.3. Linux**
    - [2.1.1. linux-命令使用](/docs/综合篇/系统&服务器/Linux/linux-命令使用.md)
    - [2.1.2. linux-开发环境搭建](/docs/综合篇/系统&服务器/Linux/linux-开发环境搭建.md)

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
