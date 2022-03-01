# 1. 整合 Druid 数据源

## 1.1. 依赖引入

```xml
<!-- 引入druid-jar需要指定数据源否则会使用默认的HikariCP -->
<!--<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.21</version>
</dependency>-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
</dependency>
```

## 1.2. 属性配置

```yaml
##引入Druid##
# 指定数据源引入druid-spring-boot-starter会自动配置数据源为DruidDataSource
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
#初始化连接数量
spring.datasource.druid.initial-size=10
#最大空闲连接数
spring.datasource.druid.max-active=50
#最小空闲连接数
spring.datasource.druid.min-idle=10
#最大空闲连接数
spring.datasource.druid.max-idle=10
#最大等待超时时间,单位是毫秒
spring.datasource.druid.max-wait=6000
#配置间隔多久才进行一次检测.检测需要关闭的空闲连接,单位是毫秒
spring.datasource.druid.time-between-eviction-runs-millis=60000
#配置一个连接在池中最小生存的时间，单位是毫秒
spring.datasource.druid.min-evictable-idle-time-millis=300000
spring.datasource.druid.validation-query=SELECT 1 FROM DUAL
#连接断开前是否进行校验
spring.datasource.druid.test-on-return=false
#连接池取出连接前进行校验
spring.datasource.druid.test-on-borrow=true
#空闲连接回收校验_validationQuery
spring.datasource.druid.test-while-idle=true
#打开PSCache
spring.datasource.druid.pool-prepared-statements=true
#指定每个连接上PSCache的大小
spring.datasource.druid.max-pool-prepared-statement-per-connection-size=20
#配置监控统计拦截的filters，去掉后监控界面的SQL无法统计，'wall' 用于防火墙
spring.datasource.druid.filters=stat,wall,slf4j
# 通过connectProperties属性来打开mergeSql功能，慢SQL记录
spring.datasource.druid.connection-properties=druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
#合并多个DruidDataSource
#spring.datasource.useGlobalDataSourceStat=true
```

### 1.2.1. 属性详解

#### 1.2.1.1. Druid 自带的 Filter 过滤器

```
"stat" -> "com.alibaba.druid.filter.stat.StatFilter"
"slf4j" -> "com.alibaba.druid.filter.logging.Slf4jLogFilter"
"counter" -> "com.alibaba.druid.filter.stat.StatFilter"
"encoding" -> "com.alibaba.druid.filter.encoding.EncodingConvertFilter"
"log4j2" -> "com.alibaba.druid.filter.logging.Log4j2Filter"
"commonLogging" -> "com.alibaba.druid.filter.logging.CommonsLogFilter"
"default" -> "com.alibaba.druid.filter.stat.StatFilter"
"mergeStat" -> "com.alibaba.druid.filter.stat.MergeStatFilter"
"wall" -> "com.alibaba.druid.wall.WallFilter"
"config" -> "com.alibaba.druid.filter.config.ConfigFilter"
"log4j" -> "com.alibaba.druid.filter.logging.Log4jFilter"
"commonlogging" -> "com.alibaba.druid.filter.logging.CommonsLogFilter"
```

## 1.3. 功能使用

### 1.3.1. 监控

```java
@Configuration
public class DruidConfiguration {

    @Bean
    public ServletRegistrationBean<StatViewServlet> druidStatViewServlet() {

        ServletRegistrationBean<StatViewServlet> statViewServlet = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
        // IP白名单设置,多个以','分割
        statViewServlet.addInitParameter("allow", "127.0.0.1");
        // IP黑名单设置,多个以','分割,同时配置会优先检验黑名单
        statViewServlet.addInitParameter("deny", "192.168.1.113");
        // 授权用户登录账号
        statViewServlet.addInitParameter("loginUsername", "whsin");
        // 授权用户登录密码
        statViewServlet.addInitParameter("loginPassword", "whsin");
        // 是否允许重置数据
        statViewServlet.addInitParameter("resetEnable", "false");
        return statViewServlet;
    }

    @Bean
    public FilterRegistrationBean<WebStatFilter> druidStatFilter() {

        FilterRegistrationBean<WebStatFilter> webStatFilter = new FilterRegistrationBean<>(new WebStatFilter());
        // 过滤规则
        webStatFilter.addUrlPatterns("/*");
        // 忽略的请求
        webStatFilter.addInitParameter("exclusions", "/druid/*, *.js, *.css");
        return webStatFilter;
    }
}
```