# 1. 整合 Mybatis 框架

## 1.1. 依赖引入

> 引入 Mybatis 启动组件，以 Oracle 数据库作为参考引入数据库依赖包。

```xml
<!-- mybatis启动组件 -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
<dependency>
    <groupId>com.oracle</groupId>
    <artifactId>ojdbc6</artifactId>
    <version>11.2.0.4</version>
</dependency>
```

### 1.1.1. 常量属性配置

> 一些相关的属性配置可以通过变量注入的形式配置。

```yaml
# 数据源配置
# 数据库驱动配置，默认根据url自动识别匹配数据库驱动
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
# 数据库连接地址
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/test
# 数据库登录用户名
spring.datasource.username=tiger
# 数据库登录密码
spring.datasource.password=scott

# mybatis配置
# 指定本地映射的Mapper.xml路径，默认会查找Dao层同级路径下对应的Mapper.xml。
# 可以在resource路径下创建和Dao层接口同路径，在此路径下编写对应的Mapper.xml可省略此配置。
# resources/com/spring/demo/dao/*Mapper.xml，名称需要和Dao相同
mybatis.mapper-locations=classpath:mapper/*.xml
# 配置数据库映射实体对象，方便在xml中使用别名
mybatis.type-aliases-package=com.spring.demo.model
# 开启下划线转驼峰命名的支持
mybatis.configuration.map-underscore-to-camel-case=true
```

### 1.1.2. 功能使用

> 功能使用过程中的一些配置。

#### 1.1.2.1. 使用`@MapperScan`开启全局扫描

> 在使用过程中,对于 Dao 接口使用`@Mapper`注解声明这是一个 Mapper 处理类，可以通过`@MapperScan`全局扫描指定包声明为 Mapper 接口，这样就不用在每个接口上使用`@Mapper`分别进行注解声明了。

```java
@SpringBootApplication
@MapperScan(basePackages = "com.spring.demo.dao")
public class StartApplication {

    public static void main(String[] args){

        SpringApplication.run(StartApplication.class);
    }
}
```

#### 1.1.2.2. 编写 Dao 层接口

> 参考上述使用了`@MapperScan`全局扫描,可不用配置`@Mapper`注解声明。

```java
@Mapper
public interface DemoDao {
    List<Demo> findAll();
}
```

#### 1.1.2.3. 编写`mapper-locations`中的\*Mapper.xml 文件

> 接口声明完成，在对应的\*Mapper.xml 文件中编写对应的数据库 SQL。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.spring.demo.dao.DemoDao">
    <!-- resultType使用了配置属性配置的别名，可直接指定对应的类名即可 -->
    <select id="findAll" resultType="Demo">
        SELECT * FROM HSSP_GBT_CHECK
    </select>
</mapper>
```
