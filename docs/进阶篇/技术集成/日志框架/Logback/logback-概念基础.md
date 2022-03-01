# LogBack 概念基础

> Logback 是由 log4j 创始人设计的另一个开源日志组件。

## Logback 核心组件

> 主要有以下几个模块。

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-api</artifactId>
  <version>${slf4j-api.version}</version>
</dependency>
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-core</artifactId>
  <version>${logback.version}</version>
</dependency>
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-access</artifactId>
  <version>${logback.version}</version>
</dependency>
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>${logback.version}</version>
</dependency>
```

- logback-core：提供了 LogBack 的核心功能，是另外两个组件的基础。
- logback-classic：是`log4j`的增强版。本身也完整实现了`SLF4J API`,这样就能很容易的在 Logback 和其他日志组件之间(如 log4j 或 JDK14 Logging)来回切换。
- logback-access：集成 Servlet 环境，提供 HTTP-access 的日志接口，可通过 Http 来访问日志。

## LogBack 配置说明

> `logback.xml`配置文件配置信息参考如下

```xml
<configuration debug="true">
    <!-- 等同于配置debug="true"
    <statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener"/>
    -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <logger name="com.mine.project" level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
    </logger>

    <root level="info">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

### 标签属性说明

#### 根节点-`<configuration>`

> logback 配置文件的根节点。

```
<configuration scan="true" scanPeriod="60 seconds" debug="false">
  ...
</configuration>
```

- `debug`：当此属性设置为 true 时，将打印出 logback 内部日志信息，实时查看 logback 运行状态。默认值为 false。
- `scan`：当此属性设置为 true 时，配置文件如果发生改变，将会被重新加载，默认值为 true。
- `scanPeriod`：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当 scan 为 true 时，此属性生效。默认的时间间隔为 1 分钟。

#### 上下文设置-`<contextName>`
> 设置上下文名称,默认为`default`。

```
<configuration>
    <!-- 上下文名称设置 -->
    <contextName>spring-boot-demo</contextName>
    ...
</configuration>
```

#### 变量设置-`<property>`

> 定义变量存放到 logger 的上下文中，其它地方可以通过“${name}”的方式来使用变量。

```
<configuration>
    <!-- 变量设置 -->
    <property name="contextName" value="spring-boot-demo"/>
    <!-- 上下文名称设置 -->
    <contextName>${contextName}</contextName>
    ...
</configuration>
```

#### 时间戳获取`<timestamp>`

> 此标签可以获取指定格式的时间戳，并赋值给一个自定义变量。

- 标签属性：
  - `key`：对应的变量名称。
  - `datePattern`：对应指定的日期格式。

```
<configuration>
    <!-- 时间戳获取 -->
    <timestamp key="timestamp" datePattern="yyyyMMdd'T'HHmmss"/>
    ...
</configuration>
```

#### 日志输出`<appender>`

> `<appender>`是负责日志输出的组件，指定日志输出的位置、格式等，目的地可以是控制台、文件、远程套接字服务器、数据库、JMS 和远程 UNIX Syslog 守护进程等。

- 标签属性：

  - `name`：指定 appender 名称。
  - `class`：指定 appender 的全限定名。

    - `ConsoleAppender`：ch.qos.logback.core.ConsoleAppender
      - 将日志输出到控制台，有以下子节点：
        - `<target>`：指定日志输出的形式，默认 System.out 也可以是 System.err。
        - `<encoder>`：对日志输出进行格式化。

    ```
    <configuration>
      <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- <target>指定日志输出的形式，默认System.out也可以是System.err -->
        <target>System.out</target>
        <encoder>
          <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
      </appender>
    </configuration>
    ```

    - `FileAppender`：ch.qos.logback.core.FileAppender
      - 将日志输出到文件，有以下子节点：
        - `<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。
        - `<append>`：如果是 true，日志被追加到文件结尾，如果是 false，清空现存文件，默认是 true。
        - `<encoder>`：对记录事件进行格式化。
        - `<prudent>`：如果是 true，日志会被安全的写入文件，即使其他的 FileAppender 也在向此文件做写入操作，效率低，默认是 false。

    ```
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logName.log</file>
        <append>true</append>
        <encoder>
          <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
      </appender>
    </configuration>
    ```

    - `RollingFileAppender`：ch.qos.logback.core.rolling.RollingFileAppender

      - 滚动记录文件，将日志输出到指定文件，当符合某个条件时，将日志记录到其他文件。有以下子节点：

        - `<file>`：被写入的文件名，可以是相对目录，也可以是绝对目录，如果上级目录不存在会自动创建，没有默认值。
        - `<append>`：如果是 true，日志被追加到文件结尾，如果是 false，清空现存文件，默认是 true。
        - `<encoder>`：对记录事件进行格式化。
        - `<rollingPolicy>`:当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名。class 有以下几种：
          - `ch.qos.logback.core.rolling.TimeBasedRollingPolicy`：最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责出发滚动。有以下子节点：
            - `<fileNamePattern>`：必要节点，包含文件名及“%d”转换符。
            - `<maxHistory>`：可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。
          ```
          <configuration>
            <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
              <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>logFile.%d{yyyy-MM-dd}.log</fileNamePattern>
                <maxHistory>30</maxHistory>
              </rollingPolicy>
              <encoder>
                <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
              </encoder>
            </appender>
            <root level="DEBUG">
              <appender-ref ref="FILE" />
            </root>
          </configuration>
          ```
          - `ch.qos.logback.core.rolling.FixedWindowRollingPolicy`：根据固定窗口算法重命名文件的滚动策略。有以下子节点：
            - `<minIndex>`：窗口索引最小值。
            - `<maxIndex>`：窗口索引最大值，当用户指定的窗口过大时，会自动将窗口设置为 12。
            - `<fileNamePattern >`:必须包含“%i”
        - `<triggeringPolicy>`: 告知 RollingFileAppender 合适激活滚动。

          - `ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy`：查看当前活动文件的大小，如果超过指定大小会告知 RollingFileAppender 触发当前活动文件滚动。只有一个节点:
            - `<maxFileSize>`：这是活动文件的大小，默认值是 10MB。

          ```
          <configuration>
            <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
              <file>test.log</file>

              <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                <fileNamePattern>tests.%i.log.zip</fileNamePattern>
                <minIndex>1</minIndex>
                <maxIndex>3</maxIndex>
              </rollingPolicy>
              <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                <maxFileSize>5MB</maxFileSize>
              </triggeringPolicy>
              <encoder>
                <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
              </encoder>
            </appender>
          </configuration>
          ```

        - `<prudent>`：当为 true 时，不支持 FixedWindowRollingPolicy。支持 TimeBasedRollingPolicy，但是有两个限制，1 不支持也不允许文件压缩，2 不能设置 file 属性，必须留空。

##### 子节点`<encoder>`

> 此节点标签主要负责两件事，一是将日志信息转换为字节数组；二是将字节流写入到输出流。<br>

- 目前 PatternLayoutEncoder 是唯一有用的且默认的 encoder。

```
<configuration debug="true" scan="true" scanPeriod="30 second">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
</configuration>
```

- 子节点`<pattern>`中的变量属性及规则：
  - `%c{length}`、`%lo{length}`、`%logger{length}`：输出日志的 logger 全限定名，参数 length 表示输出 logger 名的长度，设置为 0 表示只输入 logger 最右边点符号之后的字符串。
  - `%C{length}`、`%class{length}`：输出执行记录请求的调用者的全限定名。参数与上面的一样。尽量避免使用，除非执行速度不造成任何问题。
  - `%contextName`、`%cn`：输出上下文名称。
  - `%d{pattern}`、`%date{pattern}`：输出日志的打印时间，模式语法与 java.text.SimpleDateFormat 兼容，默认`yyyy-MM-dd HH:mm:ss,SSS`。
  - `%F`、`%file`：输出执行记录请求的 java 源文件名。尽量避免使用，除非执行速度不造成任何问题。
  - `%caller{depth}`：输出生成日志的调用者的位置信息，整数选项表示输出信息深度。
  - `%L`、`%line`：输出执行日志请求的行号。尽量避免使用，除非执行速度不造成任何问题。
  - `%m`、`%msg`、`%message`：输出应用程序提供的信息。
  - `%M`、`%method`：输出执行日志请求的方法名。尽量避免使用，除非执行速度不造成任何问题。
  - `%n`：输出平台先关的分行符“\n”或者“\r\n”。
  - `%p`、`%le`、`%level`：输出日志级别。
  - `%r`、`%relative`：输出从程序启动到创建日志记录的时间，单位是毫秒。
  - `%t`、`%thread`：输出产生日志的线程名。
  - `replace(p){r, t}`：p 为日志内容，r 是正则表达式，将 p 中符合 r 的内容替换为 t。可以用来进行日志脱敏
  - 格式修饰符，与转换符共同使用：
    - `%-msg`：左对齐。
    - `%nmsg`：n 是十进制数字表示最小宽度，字符小于最小宽度，则左填充或右填充，默认是左填充（即右对齐），填充符为空格。
    - `%.nmsg`：n 是十进制数字表示最大宽度，如果字符大于最大宽度，则从前面截断，`.`后面加减号“-”在加数字，表示从尾部截断。
- 格式推荐：`%d{yyyy-MM-dd HH:mm:ss.SSS} [%t:%L] %-5p %logger{5}.[%M] - %m%n`，[%M]自行根据需要进行选择。
- spring-boot 应用中可以配置颜色支持：`<pattern>%yellow(%d{yyyy-MM-dd HH:mm:ss.SSS}) %green(%-5p) %highlight([%t]) %magenta(${PID}) %cyan(%logger{20}) - %red([%M,%L]) - %m%n</pattern>`。

#### 日志记录`<loger>`设置

> 用来设置某一个包或者具体的某一个类的日志打印级别、以及指定<appender>。

- 标签属性：
  - `name`：用来指定受此 logger 约束的某一个包或者具体的某一个类。
  - `level`：用来设置打印级别，大小写无关：还有一个特俗值 INHERITED 或者同义词 NULL，代表强制执行上级的级别。如果未设置此属性，那么当前 loger 将会继承上级(<root>)的级别。
  - `additivity`：是否向上级 loger 传递打印信息。默认是 true，会在当前 logger 和上级 logger 均会打印输出重复日志，建议设置为 false。
- 子节点属性
  - `<appender-ref>`：`<loger>`可以包含零个或多个`<appender-ref>`元素，标识这个 appender 将会添加到这个 loger。

```
<logger name="xin.icoder.study.spring.boot.demo" additivity="false" level="debug">
  <appender-ref ref="STDOUT"/>
  <appender-ref ref="LOGFILE"/>
</logger>
```

#### 日志记录根`<root>`

> 也是<loger>元素，但是它是根 loger，只有一个 level 属性，已经被命名为"root"。

- 标签属性：
  - `level`：大小写无关：TRACE、DEBUG、INFO、WARN、ERROR、ALL 和 OFF，不能设置为 INHERITED 或者同义词 NULL，默认是 DEBUG。
- 子节点同`<logger>`节点

## 特性功能使用

### 在出现警告或错误时自动打印状态消息。

- 使用编程的方式

```
public static void main(String[] args) {

  LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
  StatusPrinter.print(lc);
}
```

- 使用配置文件配置的方式
  > `<configuration>`标签中配置`debug="true"`属性。<br>
  > 增加`<statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener"/>`配置。

```
<!-- 方式一 -->
<configuration debug="true">
  ...
</configuration>

<!-- 方式二 -->
<configuration">
  <statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener"/>
  ...
</configuration>
```

### 修改后自动重新加载配置文件

&emsp;&emsp;`<configuration>`标签中配置`scan="true"`属性。<br> 
&emsp;&emsp;配置此属性后，`ReconfigureOnChangeTask`将被安装，此任务在单独的线程中运行，并将检查配置文件是否已更改。<br> 
&emsp;&emsp;由于在编辑配置文件时很容易出错，因此如果配置文件的最新版本出现 XML 语法错误，它将回到以前的配置文件，而不会出现 XML 语法错误

```
<!--
    默认情况下，配置文件每分钟扫描一次更改。可通过`scanPeriod`属性，单位默认为毫秒（millisecond）可设置为秒（second）、分（minute）、时（hour）。
-->
<configuration scan="true" scanPeriod="30 seconds">
  ...
</configuration>
```

### 在错误堆栈信息中显示具体代码数据所在的 jar 包名称

> `<configuration>`标签中配置`packagingData="true"`属性。

- 配置此属性为 true，则在堆栈信息中会显示出错代码具体所在的 jar 包名称中

```
<configuration packagingData="true">
  ...
</configuration>
```

- 也可以通过编程中的方式来指定

```
LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
lc.setPackagingDataEnabled(true);
```

- 堆栈信息输出示例如下：

```
java.lang.Exception: this is error
	at LogbackTest.testLog(LogbackTest.java:29) ~[test-classes/:na]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_144]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_144]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_144]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_144]
	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50) [junit-4.12.jar:4.12]
	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12) [junit-4.12.jar:4.12]
```

### 查看状态消息
