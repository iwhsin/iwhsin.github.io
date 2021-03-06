## 自定义监听器

> 在应用启动前(ApplicationContext 创建前)添加监听器.

## 方式一:SpringApplication.addListeners()添加

```java
@SpringBootApplication
@Slf4j
public class ListenerEventApplication {

    public static void main(String[] args) {

        new SpringApplicationBuilder()
            // 设置配置源
            .sources(CustomizedApplication.class)
            // 在应用启动前(ApplicationContext创建前)添加监听器
            .listeners(event -> log.info("whsin add a listener...[{}]", event.getTimestamp()))
            .build(args)
            .run(args);
    }
}
```

## 方式二:手动配置添加监听器

- 实现`ApplicationListener`重写`onApplicationEvent(ApplicationEvent event)`方法

```java
@Slf4j
public class MyListenerConfiguration implements ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        log.info("this is MyListenerConfiguration 通过@Import方式注册,这种方式是在ApplicationContext创建后进行注册...{}", event.getTimestamp());
    }
}

```

- 通过`@Import进行注册`

```
@SpringBootApplication
@Import(MyListenerConfiguration.class)
@Slf4j
public class ListenerEventApplication {

    public static void main(String[] args) {

        new SpringApplicationBuilder()
            // 设置配置源
            .sources(CustomizedApplication.class)
            .build(args)
            .run(args);
    }
}
```

## 方式三:通过配置文件指定监听类全路径

- 实现`ApplicationListener`重写`onApplicationEvent(ApplicationEvent event)`方法

```java
@Slf4j
public class ListenerConfiguration implements ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        log.info("this is ListenerConfiguration 在META-INF/spring.factories中指定...{}", event.getTimestamp());
    }
}
```

- `META-INF/spring.factories`配置文件中指定`org.springframework.context.ApplicationListener`

```yml
org.springframework.context.ApplicationListener=xin.icoder.study.spring.boot.base.common.config.ListenerConfiguration
```
