# Apollo配置中心
&emsp;&emsp;`Apollo`配置中心可以统一对项目和应用进行配置属性管理,并能自动同步配置修改到应用程序。

## 添加依赖包
&emsp;&emsp;对接`Apollo`配置中心首先要先引入`apollo-client`依赖包。

- `pom.xml`添加依赖
    - ctrip客户端依赖
        ``` xml
        <!-- pom.xml -->
        <dependency>
        <groupId>com.ctrip.framework.apollo</groupId>
        <artifactId>apollo-client</artifactId>
        <version>1.6.0</version>
        </dependency>
        ```
    - 浦发应用程序定制的客户端依赖
        ``` xml
        <!-- pom.xml -->
        
        <!-- 对接配置中心 -->
        <dependency>
            <groupId>com.spdbccc.atrt</groupId>
            <artifactId>apollo-client-spdbccc</artifactId>
            <version>2.0.1</version>
        </dependency>
        ```
## 配置中心属性配置
&emsp;&emsp;配置中心的配置分为`应用级别`、`项目级别`、`公共级别`。

- **公共级别**<br>
&emsp;&emsp;此配置是所有项目公用的配置文件。
    ![][apollo-config-common]

- **项目级别**<br>
&emsp;&emsp;此配置是项目下所有应用公用的配置文件。
    ![][apollo-config-project]

- **应用级别**<br>
&emsp;&emsp;此配置是应用专属的配置文件。
    ![][apollo-config-private]

## SpringBoot项目接入
### 属性选项配置
&emsp;&emsp;`Apollo`的使用依赖于`apollo.meta`、`project.id`、`app.id`、`apollo.bootstrap.namespaces`等环境信息配置。

- **配置信息：**
    ``` yml
    <!-- application.properties or classpath:/META-INF/app.properties -->

    ### Meta Server 配置 ###
    #配置中心的URL，建议通过启动参数或环境变量配置`-DApollo.meta=http://config-service-url`
    apollo.meta=http://config-service-url
    # 集群，同一个网络区，可以直接使用default，此项可以不做设置，建议通过启动参数或环境变量配置`-Dapollo.cluster=cluster`
    #apollo.cluster=default
    # 配置中心本地缓存路径，建议通过启动参数或环境变量配置`-Dapollo.cacheDir=/app/tmp/appName/config`,默认路径`/configCenter/data/{appId}/config-cache/{appId}+{cluster}+{namespace}.properties`
    apollo.cacheDir=/app/tmp/appId/config

    ### App Client 配置 ###
    #是用来标识项目身份的唯一id
    project.id=PROJECT_ID
    #是用来标识应用身份的唯一id
    app.id=APP_ID
    #该方式能使日志配置在更早的阶段注入
    apollo.bootstrap.eagerLoad.enabled=true
    #注入默认application namespace的配置示例
    apollo.bootstrap.enabled=true
    #注入非默认application namespace或多个namespace的配置
    apollo.bootstrap.namespaces=application,PROJECT_ID.project-DB,PROJECT_ID.project-XX
    ```
### 配置中心注入
&emsp;&emsp;在启动类上添加`@EnableApolloConfig`注解表明接入`Apollo`配置中心。

- 配置中心注入
    ``` java
    @SpringBootApplication
    @EnableApolloConfig
    public class AppApplication {

        public static void main(String[] args) {
            SpringApplication.run(AppApplication.class, args);
        }
    }
    ```

## 非SpringBoot（SSM）项目接入
### 基本配置
&emsp;&emsp;非`SpringBoot`的Java应用对接`Apollo`配置中心，需要再`classpath:/META-INF/app.properties`文件进行相关配置。

- **基本属性配置**
    ``` yaml
    <!-- classpath:/META-INF/app.properties -->
    
    ### Meta Server 配置 ###
    #配置中心的URL，建议通过启动参数或环境变量配置`-DApollo.meta=http://config-service-url`
    apollo.meta=http://config-service-url

    ### App Client 配置 ###
    #是用来标识项目身份的唯一id
    project.id=PROJECT_ID
    #是用来标识应用身份的唯一id
    app.id=APP_ID

    #该方式能使日志配置在更早的阶段注入
    apollo.bootstrap.eagerLoad.enabled=true
    #注入默认application namespace的配置示例
    apollo.bootstrap.enabled=true
    ```
- **Spring配置文件**
&emsp;&emsp;在`Spring`配置文件中进行`Apollo`相关配置。

- **Apollo配置**
    ``` xml
    <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:apollo="http://www.ctrip.com/schema/apollo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.ctrip.com/schema/apollo http://www.ctrip.com/schema/apollo.xsd">
        
        <apollo:config order="10"/>
        <apollo:config namespaces="HSSP.DB" order="9"/>
    </beans>
    ```

<!-- 资源链接 -->
[apollo-config-common]: /docs/assets/images/apollo/apollo-config-common.png
[apollo-config-project]: /docs/assets/images/apollo/apollo-config-project.png
[apollo-config-private]: /docs/assets/images/apollo/apollo-config-private.png