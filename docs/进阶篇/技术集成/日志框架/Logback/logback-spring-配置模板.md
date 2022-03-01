# LogBack 配置模板

## spring 项目配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="60 seconds" debug="true">

    <!-- 变量设置 -->
    <property name="CONTEXT_NAME" value="oa-manager"/>
    <property name="PROJECT_NAME" value="oa-manager"/>
    <property name="APP_NAME" value="oa-manager"/>
    <!-- 时间格式化规则 -->
    <property name="LOG_DATE_PATTERN" value="yyyy-MM-dd HH:mm:ss.SSS"/>
    <!-- 控制台标准输出日志格式 -->
    <property name="CONSOLE_LOG_PATTERN" value="%red(%d{${LOG_DATE_PATTERN}}) %green(${LOG_LEVEL_PATTERN:-%5p}) %magenta(${PID:-}) --- %blue([%15.15t]) %cyan(%-40.40c{39}) - %yellow([%15.15M,%4L]) : %m%n"/>
    <property name="CONSOLE_LOG_DEFAULT_PATTERN" value="%d{${LOG_DATE_PATTERN:yyyy-MM-dd HH:mm:ss.SSS}} %green(${LOG_LEVEL_PATTERN:-%5p}) %magenta(${PID:-}) --- [%15.15t] %cyan(%-40.40c{39}) : %m%n"/>
    <!-- 文件输出日志格式 -->
    <property name="FILE_LOG_PATTERN" value="%%d{${LOG_DATE_PATTERN}} ${LOG_LEVEL_PATTERN:-%5p} ${PID:-} --- [%15.15t] %-40.40c{39} - [%15.15M,%4L] : %m%n"/>
    <property name="FILE_LOG_DEFAULT_PATTERN" value="%d${LOG_DATE_PATTERN:yyyy-MM-dd HH:mm:ss.SSS}} ${LOG_LEVEL_PATTERN:-%5p}) %magenta(${PID:-} --- [%15.15t] %-40.40c{39} : %m%n"/>
    <!-- 日志文件路径 -->
    <property name="LOG_FILE_PATH" value="/app/${APP_NAME}/logs/${APP_NAME}.log"/>
    <property name="FILE_ROLL_NAME_PATTERN" value="${APP_NAME}-%d{yyyy-MM-dd}_%i.log"/>
    <!-- 获取指定格式的时间戳,赋值给指定的变量属性 -->
    <timestamp key="timestamp" datePattern="yyyy-MM-dd HH:mm:ss.SSS"/>

    <!-- 上下文名称 -->
    <contextName>${CONTEXT_NAME}</contextName>

    <!-- 控制台标准输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 指定日志输出的形式，默认System.out也可以是System.err -->
        <target>System.out</target>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN:CONSOLE_LOG_DEFAULT_PATTERN}</pattern>
        </encoder>
    </appender>

    <!--日志文件输出 -->
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>${LOG_FILE_PATH}</file>
        <append>true</append>
        <encoder>
            <pattern>${FILE_LOG_PATTERN:FILE_LOG_DEFAULT_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 滚动日志文件输出 -->
    <appender name="FILE_ROLL_TIME" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE_PATH}</file>

        <!-- 日志滚动策略：根据日志规则格式来决定日志滚动策略，如下则每天备份一次 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 自动备份的日志记录文件名规则 -->
            <fileNamePattern>app-%d{yyyy-MM-dd}.log.backup</fileNamePattern>
            <!-- 超过最大记录数，将清除历史的记录 -->
            <maxHistory>30</maxHistory>
            <!-- 系统启动时清理历史日志记录 -->
            <cleanHistoryOnStart>true</cleanHistoryOnStart>
        </rollingPolicy>
        <encoder>
            <pattern>${FILE_LOG_PATTERN:FILE_LOG_DEFAULT_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 滚动日志文件输出 -->
    <appender name="FILE_ROLL_FIXED" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE_PATH}</file>

        <!-- 日志滚动策略-->
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <!-- 自动备份的日志记录文件名规则 -->
            <fileNamePattern>app.%i.log.backup</fileNamePattern>
            <!-- 最小索引值 -->
            <minIndex>1</minIndex>
            <!-- 最大索引值 -->
            <maxIndex>10</maxIndex>
        </rollingPolicy>

        <!-- 日志滚动策略触发,注意此策略不能和TimeBasedRollingPolicy一起用,会导致失效,具体可用SizeAndTimeBasedRollingPolicy -->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <!-- 日志文件超过指定的大小（默认10MB），则会触发一次日志滚动策略 -->
            <maxFileSize>5MB</maxFileSize>
        </triggeringPolicy>

        <encoder>
            <pattern>${FILE_LOG_PATTERN:FILE_LOG_DEFAULT_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 滚动日志文件输出 -->
    <appender name="FILE_ROLL_SIZE_AND_TIME" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE_PATH}</file>

        <!-- 日志滚动策略：根据日志规则格式来决定日志滚动策略，如下则每天备份一次,同时会受到日志大小的影响 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 自动备份的日志记录文件名规则 -->
            <fileNamePattern>${FILE_ROLL_NAME_PATTERN}</fileNamePattern>
            <!-- 日志文件超过指定的大小（默认10MB），则会触发一次日志滚动策略 -->
            <maxFileSize>30MB</maxFileSize>
            <!-- 超过最大记录数，将清除历史的记录 -->
            <maxHistory>10</maxHistory>
            <!-- 记录文件的总大小超过此值,会清除历史的记录 -->
            <totalSizeCap>5GB</totalSizeCap>
            <!-- 系统启动时清理历史日志记录 -->
            <cleanHistoryOnStart>true</cleanHistoryOnStart>
        </rollingPolicy>
        <encoder>
            <pattern>${FILE_LOG_PATTERN:FILE_LOG_DEFAULT_PATTERN}</pattern>
        </encoder>

        <!-- 配置滚动日志的过滤器 -->
        <!-- 根据日志输出级别过滤 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 输出级别 -->
            <level>INFO</level>
            <!-- 匹配则记录 -->
            <onMatch>ACCEPT</onMatch>
            <!-- 不匹配则不记录 -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--
        日志记录
            name        ：用来指定受此logger约束的某一个包或者具体的某一个类。
            level       ：用来设置打印级别，大小写无关：还有一个特俗值INHERITED或者同义词NULL，代表强制执行上级的级别。如果未设置此属性，那么当前loger将会继承上级(<root>)的级别。
            additivity  ：是否向上级logger传递打印信息。默认是true，会在当前logger和上级logger均会打印输出重复日志，建议设置为false。
            appender-ref：指示以何种方式输出日志记录,可以指定多个
     -->
    <logger name="com.giao.oa" level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </logger>

    <!-- 根根logger,是所有logger的父级,-->
    <root level="info">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```
