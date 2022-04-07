# 1. Spring Boot 配置属性

## 1.1. 配置属性来源

```yml
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
```

## 1.2. 应用常用属性

> 应用系统相关属性参数配置.

```yaml
####应用系统配置####
#应用系统名称
spring.application.name=@project.name@
#指定配置文件名称替换默认的`application`,需要在命令行参数或者环境变量中配置,此处不生效
spring.config.name=mine-application
#指定配置文件路径.替换默认的配置文件路径,需要在命令行参数或者环境变量中配置,此处不生效
spring.config.location=classpath:/mine-application.properties.properties
```

## 1.3. 容器相关配置

```yml
####嵌入式应用容器相关配置####
#服务器监听端口
server.port=9001
#服务器应绑定到的网络地址
server.address=192.168.1.113
#应用程序上下文路径(根路径)
server.servlet.context-path=/@project.name@
#tomcat的基本路径,未指定则使用系统默认的临时路径下(temp)
server.tomcat.basedir=@project.basedir@/target/tomcat
#启用tomcat访问日志,默认关闭
server.tomcat.accesslog.enabled=true
#tomcat访问日志存放路径,默认是basedir/logs.可以配置相对路径也可以配置绝对路径
server.tomcat.accesslog.directory=myLogs
#tomcat访问日志文件前缀
server.tomcat.accesslog.prefix=access_@project.name@
#tomcat访问日志文件后缀
server.tomcat.accesslog.suffix=.log
#tomcat访问日志文件日期格式化,默认`.yyyy-MM-dd`,配置为空则不追加
server.tomcat.accesslog.file-date-format=.MM-dd
#tomcat访问日志输出格式
server.tomcat.accesslog.pattern=%h %t "%r" %s %b
#是否开启会话持久,在两次重启之间保留会话数据默认`false`
server.servlet.session.persistent=true
#会话超时。如果未指定持续时间后缀，则将使用秒,默认`30m`:30分钟
server.servlet.session.timeout=30m
#用于存储会话数据的目录
server.servlet.session.store-dir=@project.basedir@/target/tomcat/store
#会话Cookie的域名
server.servlet.session.cookie.domain=www.icoder.xin
#系统错误映射路径
server.error.path=/common/error
```

## 1.4. 日志相关配置

```yml
####日志框架配置####
#日志文件保存路径,可以配置相对路径也可以配置绝对路径,默认日志名为spring.log
logging.file.path=@project.basedir@/target/logs
#日志文件名称,可以配置相对路径也可以配置绝对路径,配置此属性后`logging.file.path`不再生效,此属性未配置则日志路径为`logging.file.path/spring.log`
logging.file.name=@project.basedir@/target/logs/@project.name@.log
#根记录器,用于指定日志输出级别
logging.level.root=debug
#指定日志组输出的日志级别`logging.level.*`
logging.level.sql=debug
#自定义日志配置文件路径
logging.config=
```

## 1.5. 数据库相关配置

```yml
####数据源相关配置####
##数据库基本属性配置##
#数据库驱动-可以不配置SpringBoot可以从URL推导大多数数据库
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#数据库JDBC连接URL
spring.datasource.url=jdbc:mysql://localhost:3306/webtool?characterEncoding=UTF-8&useSSL=false&useUnicode=true&serverTimezone=UTC
#数据库登录用户名
spring.datasource.name=root
#数据库登录密码
spring.datasource.password=root
###数据源连接池相关配置微调###
```

# 2. web 请求相关

```yml
# 单文件大小上限(系统默认1MB)
spring.servlet.multipart.max-file-size=10MB
# 总上传数据大小上限(默认10MB)
spring.servlet.multipart.max-request-size=20MB
```

## 2.1. 开发监控相关

```yml
####开发监控相关配置####
##多环境配置属性##
# 多环境配置profile，默认使用系统的配置文件存放路径
spring.profiles.active=dev
# 表示始终生效的profile配置文件，不受active的约束，加载顺序根据配置的文件的先后顺序，多个文件使用‘，’进行分割
spring.profiles.include=dev,pro
#指定配置文件路径,属于环境属性在命令行参数中设置,此处配置不生效
#spring.config.location=classpath:/config/

##actuator监控##
#指定监控的端点配置为`*`包含全部
management.endpoints.web.exposure.include=*
#开启shutdown支持
management.endpoint.shutdown.enabled=true

##devtool组件配置##
#排除指定目录中的文件变动不触发重启
spring.devtools.restart.exclude=
#关闭自动重启功能,默认为true开启状态
spring.devtools.restart.enabled=true
#修改页面信息自动触发刷新操作,默认为true开启状态
spring.devtools.livereload.enabled=true
#配置触发自动重启的文件
spring.devtools.restart.trigger-file=.trigger
```
