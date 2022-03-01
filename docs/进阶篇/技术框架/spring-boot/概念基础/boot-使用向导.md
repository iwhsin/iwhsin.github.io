# 1. Spring Boot 使用向导

## 1.1. 启动 Banner 定制

&emsp;&emsp;在项目运行启动时,可以配置项目启动时打印显示的 Banner。<br>
&emsp;&emsp;默认在系统启动会加载`classpath:`路径下对应的 banner.txt、banner.(gif,jpg,png)文件多个图片资源文件会按照(gif,jpg,png)顺序优先找到满足条件的一个图片.

- 示例
  ```css
  ${AnsiColor.BRIGHT_MAGENTA}
  .--.   ,--.,------.,-----.      ,--------. ,-----.  ,-----. ,--.
  |  |   |  ||  .---'|  |) /_     '--.  .--''  .-.  ''  .-.  '|  |
  |  |.'.|  ||  `--, |  .-.  \       |  |   |  | |  ||  | |  ||  |
  |   ,'.   ||  `---.|  '--' /       |  |   '  '-'  ''  '-'  '|  '--.
  '--'   '--'`------'`------'        `--'    `-----'  `-----' `-----'
  ${AnsiColor.CYAN}————————————————————————————————————————————————————————————————————
  ${AnsiColor.GREEN}:: Application Name    ::${AnsiColor.BRIGHT_WHITE}         (${application.name})
  ${AnsiColor.GREEN}:: Application Version ::${AnsiColor.BRIGHT_WHITE}         (${application.version})
  ${AnsiColor.GREEN}:: Spring Boot Version ::${AnsiColor.BRIGHT_WHITE}         (${spring-boot.version})
  ${AnsiColor.BRIGHT_WHITE}
  ```

### 1.1.1. 属性配置

```yml
##定制Banner##
spring.banner.charset=UTF-8
#指定banner.txt路径,默认`classpath:banner.txt`
spring.banner.location=banner.txt
#指定banner图片路径,默认`classpath:banner.gif`
spring.banner.image.location=banner.gif
#指定banner输出方式,默认`console:System.out控制台输出`off,可配置`log:使用系统日志输出方式输出`,`off:禁止banner输出`
spring.main.banner-mode=console
#指定banner图片在ASCII字符串中的高度,默认按照图片实际高度
spring.banner.image.height=
#指定banner图片在ASCII字符串中的宽度,默认按照图片实际宽度
spring.banner.image.width=
#设置图片是否翻转
spring.banner.image.invert=false
# 指定图片画质,默认`4:16位`,可以配置`8:256位`
spring.banner.image.bitdepth=4
#指定渲染图片时使用的像素模式,默认`text:使用字符渲染`,`block:使用unicode块字符渲染`
spring.banner.image.pixelmode=text
#指定图片在字符渲染的左边距,默认`2`
spring.banner.image.margin=2
```

### 1.1.2. 定制`banner.txt`

&emsp;&emsp;`banner.txt`文件中可以编写需要展示的 banner 信息,可以使用一些占位符.<br>

- 占位符:
  - 属性占位符:
    - `${application.version}`: 应用的版本号在 MANIFEST.MF 中声明。例如 Implementation-Version: 1.0.0.SNAPSHOT
    - `${application.formatted-version}`: 格式化的应用版本号
    - `${application.title}`: 应用的版本名称在 MANIFEST.MF 中声明。例如 Implementation-Title: 1.0.0.SNAPSHOT
    - `${spring-boot.version}`:使用的 SpringBoot 版本号
    - `${spring-boot.formatted-version}`:使用的 SpringBoot 格式化版本号
    - `${application.properties.NAME}`: 配置文件中配置的属性也可以使用占位符在这里获取
  - 样式占位符:
    - `.${AnsiBackground.NAME}`: 背景颜色设置
    - `${AnsiColor.BRIGHT_MAGENTA}`: 字符展示颜色设置
    - `${AnsiStyle.UNDERLINE}AnsiStyle`:字体输出样式设置,包括下划线、粗体等

### 1.1.3. 定制 Banner 实现

> 自定义 Banner 的输出实现.

- 实现`Banner`接口,重写`printBanner(Environment environment, Class<?> sourceClass, PrintStream out)`方法.

```java
// 自定义Banner实现
springApplication.setBanner((environment, sourceClass, out) -> {
    // do something
});

// application.properties中配置会覆盖此处的配置
springApplication.setBannerMode(Banner.Mode.LOG);
```

## 1.2. 定制 SpringApplication 启动类

### 1.2.1. 使用SpringApplication

```java
@SpringBootApplication
public class CustomizedApplication {

    public static void main(String[] args) {

        // 方式一:定制SpringApplication
        SpringApplication springApplication = new SpringApplication(CustomizedApplication.class);
        springApplication.setBannerMode(Banner.Mode.LOG);
        springApplication.run(args);
    }
}
```

### 1.2.2. 使用SpringApplicationBuilder

```java
@SpringBootApplication
public class CustomizedApplication {

    public static void main(String[] args) {

        // 方式二: 使用SpringApplicationBuilder定制SpringApplication
        new SpringApplicationBuilder()
            .sources(CustomizedApplication.class)
            .bannerMode(Banner.Mode.LOG)
            .build(args)
            .run(args);
    }
}
```

## 1.3. 外部化属性配置

### 1.3.1. 随机数配置

```yml
##外部属性配置##
#外部属性配置-生成随机int整数
externalized.configuration.random.int-value=${random.int}
#外部属性配置-生成指定范围内的随机整数,注意`,`分割不能有空格
externalized.configuration.random.range-int-value=${random.int(7,9999)}
#外部属性配置-生成随机数
externalized.configuration.random.long-value=${random.long}
#外部属性配置-生成指定范围内的随机数,注意`,`分割不能有空格
externalized.configuration.random.range-long-value=${random.long(10000,200000)}
#外部属性配置-生成指定范围内的随机字符串
externalized.configuration.random.value=${random.value}
#外部属性配置-生成UUID
externalized.configuration.random.uuid=${random.uuid}
```
### 1.3.2. 命令行属性
> 默认情况下，SpringApplication会将任何命令行选项参数属性(以`--`开头,如--server.port=9000)进行转换并将它们添加到Spring应用程序上下文中。<br>
> 命令行属性总是优先于其他属性源。
* 禁用命令行参数属性添加到应用程序上下文中：
```java
SpringApplication springApplication = new SpringApplication(ExternalConfigurationApplication.class);
// 设置是否将命令行参数属性添加到应用程序上下文中,默认为`true`
springApplication.setAddCommandLineProperties(false);
springApplication.run(args);
log.info("application start success");
```
### 1.3.3. 应用程序配置文件
> SpringApplication从`application.properties`配置文件加载属性并将其添加到Spring的上下文环境中。

- 配置属性文件`application.properties`、`application.yml`存放位置和加载顺序
    ```xml
    <!-- 加载顺序 -->
    1. file:./config/
    2. file:./
    3. classpath:config/
    4. classpath:
    <!-- 路径展示 -->
    -config
        -①application.properties/application.yml
    -②application.properties/application.yml
    -spring-boot-demo-1.0.0.SNAPSHOT.jar
        |-config
            -③application.properties/application.yml
        |-④application.properties/application.yml
    <!-- 说明 -->
    在列表较高位置定义的属性会覆盖在较低位置定义的属性
    ```

- 指定配置文件名称或路径
> `spring.config.name`和`spring.config.location`属性用来确定哪个配置文件被加载,因此它们必须定义为环境属性(命令行参数或环境变量).<br>
```yml
#指定配置文件名称替换默认的`application`,需要在命令行参数或者环境变量中配置,此处不生效
spring.config.name=mine-application
#指定配置文件路径.替换默认的配置文件路径,需要在命令行参数或者环境变量中配置,此处不生效
spring.config.location=classpath:/mine-application.properties.properties
```
* 配置属性说明:
    `spring.config.location`: 
        * 如果未配置,系统会读取默认的配置`classpath:/,classpath:/config/,file:./,file:./config/`,配置位置以相反的顺序搜索;
        * 配置后会忽略系统的默认配置,配置若为目录(`/`结尾)则会查找`spring.config.name`配置的名称,否则会查找指定的文件.

### 1.3.4. 配置属性绑定

- **命名规范**<br>
&emsp;&emsp;配置属性中的变量命令支持如下的松散绑定.
    |属性|备注|
    |---|---|
    java.bean.string-list|破折号`-`分割表示一个变量名称.映射为`stringList`
    java.bean.stringList|标准驼峰式语法。
    java.bean.string_list|下划线表示法，同破折号`-`
    JAVA_BEAN_STRINGLIST|大写格式，使用`系统环境变量`时建议使用。

- **JavaBean属性绑定**<br>
    - 配置属性文件`properties/additional-application.properties`
        ```yml
        java.bean.name=name
        java.bean.age=age
        java.bean.flag=true
        java.bean.string-list=aaa,bbb,ccc
        java.bean.inner-class.name=className
        java.bean.inner-class.level=classLevel
        java.bean.inner-class.level-desc=classLevelDesc
        ```
    - 加载注入配置文件:
        - 在应用启动类上引入新增的配置文件
            ```java
            @SpringBootApplication
            // @ConfigurationPropertiesScan
            @EnableConfigurationProperties({JavaBeanConstructorBinding.class, RandomValue.class, JavaBean.class})
            @PropertySource("classpath:/properties/additional-application.properties")
            public class ApplicationStart {
                SpringApplication.run(ApplicationStart.class, args);
            }
            ```
        - 绑定属性到JavaBean
            ```java
            @ConfigurationProperties("java.bean")
            @Data
            public class JavaBean {
            /** 姓名 */
            private String name;
            /** 年龄 */
            private String age;
            /** flag */
            private boolean flag;
            /** stringList */
            private List<String> stringList;
            private InnerClass innerClass;

            /**
            * 合并绑定将对应的属性绑定到innerClass字段对应的类属性上
            */
            @Data
            public static class InnerClass {
                /** className */
                private String name;
                /** classLevel */
                private String level;
                /** classLevelDesc */
                private String levelDesc;
            }
            }
            ```

- **构造函数绑定**<br>
&emsp;&emsp;通过`@ConstructorBinding`注解来进行构造方法注入<br>
    ```java
    @ConstructorBinding
    @ConfigurationProperties("java.bean.constructor")
    @ToString
    @AllArgsConstructor
    public class JavaBeanConstructorBinding {
    /** 姓名 */
    private String name;
    /** 年龄 */
    private String age;
    /** flag */
    private boolean flag;
    /** stringList */
    private List<String> stringList;
    private JavaBean.InnerClass innerClass;

    @ToString
    @AllArgsConstructor
    public static class InnerClass {
        /** className */
        private String name;
        /** classLevel */
        private String level;
        /** classLevelDesc */
        private String levelDesc;
    }
    }
    ```

- **手动注入JavaBean**
    - 在`JavaBean`上去掉注解`@ConfigurationProperties`注解编程普通的Bean<br>
        ```java
        public class ManualRegistryJavaBean {

            @Bean
            @ConfigurationProperties("java.bean")
            public JavaBean javaBean(){
                return new JavaBean();
            }
        }
        ```

- **@Value注解绑定属性**
    ```java
    @PropertySource("classpath:/properties/extra-property.properties")
    // @Configuration 使用@Import方式配置
    @Data
    public class ExtraPropertiesBinding {

        /** name */
        @Value("${extra.property.name}")
        private String name;

        /** nameDesc */
        @Value("${extra.property.name-desc}")
        private String nameDesc;
    }
    ```

- **属性绑定校验**<br>
&emsp;&emsp;在属性绑定时可以使用Spring的`@Validated`注解对参数进行一些特定规则的校验.
    - 在属性绑定JavaBean上添加`@Validated`注解,在需要校验的字段上添加对应的校验注解.
        ```java
        @Data
        @Validated
        public class JavaBean {
        /** flag */
        @AssertTrue
        private boolean flag;

        @NotNull
        private String validString;
        }
        ```
    - 在参数属性绑定时,校验失败会报错,类似如下:
        ```java
        Description:
        Binding to target org.springframework.boot.context.properties.bind.BindException: Failed to bind properties under 'java.bean' to xin.icoder.study.spring.boot.base.common.external.binding.JavaBean failed:
            Property: java.bean.validString
            Value: null
            Reason: 不能为null
        Action:
        Update your application's configuration
        ```
