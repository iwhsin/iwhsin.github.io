# 1. Spring Boot 概念总览

## 1.1. 自动配置

&emsp;&emsp;Spring Boot 的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程。

- 示例

  ```
  Spring Boot在项目启动过程中会自动根据Classpath中的依赖完成需要的功能的配置，比如：
      > Spring的JdbcTemplate是不是在Classpath里？如果是，并且有DataSource的Bean，则自动配置一个JdbcTemplate的Bean。
      > Thymeleaf是不是在Classpath里？如果是，则配置Thymeleaf的模板解析器、视图解析器以及模板引擎。
      > Spring Security是不是在Classpath里？如果是，则进行一个非常基本的Web安全设置。
      ...以上种种,此外,Spring Boot的自动配置涵盖安全、集成、持久化、Web开发等诸多方面。
  ```

- Spring Boot 中自动配置的核心包`spring-boot-autoconfigure`<br>
  &emsp;&emsp;利用了 Spring4.0 引入的条件化配置(条件化配置存储在程序中，在满足某些特定条件才会生效)

## 1.2. 自动配置微调

### 1.2.1. 配置属性来源

```xml
<!-- Spring Boot多种属性源，按照优先级顺序如下 -->
1. 命令行参数：java -jar spring-boot-demo-1.0.0-SNAPSHOT.jar --spring.thymeleaf.cache=false
2. java:comp/env里的JNDI属性
3. JVM系统属性
4. 操作系统环境变量
5. 随机生成的带 random.* 前缀的属性 （在设置其他属性时， 可以引用它们， 比如 ${random.long} ）
6. 应用程序以外的application.properties或者appliaction.yml文件
7. 打包在应用程序内的application.properties或者appliaction.yml文件
8. 通过 @PropertySource 标注的属性源
9. 默认属性

<!-- 配置属性application.properties和application.yml文件存放位置和加载顺序 -->
1. file:./config/
2. file:./
3. classpath:config/
4. classpath:
-config
    -①application.properties/application.yml
-②application.properties/application.yml
-应用程序.jar
    |-config
        -③application.properties/application.yml
    |-④application.properties/application.yml
```
