# 1. 整合 thymeleaf

## 1.1. 依赖引入

```xml
<!-- spring-boot-starter-thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## 1.2. 属性配置

```
##thymeleaf配置##
#模板的模式，支持HTML、XML、TEXT、JAVASCRIPT等，默认HTML
spring.thymeleaf.mode=HTML5
#模板文件编码,默认UTF-8
spring.thymeleaf.encoding=UTF-8
#响应头信息Content-Type,默认text/html
spring.thymeleaf.servlet.content-type=text/html
#是否启用模板缓存,默认`true`开启
spring.thymeleaf.cache=false
#配置模板路径，默认是templates
spring.thymeleaf.prefix=classpath:/templates/
```

## 1.3. 属性详解

## 1.4. 基本使用
