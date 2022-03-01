# Log4j 配置模板

## Log4j Properties 文件模板

``` yml
# 配置log4j日志输出级别和日志输出类型
#log4j.rootLogger=INFO, console, LOGFILE
log4j.rootLogger=INFO, console
# 配置是否输出log4j的日志
log4j.debug=false
# 输出到控制台stdout
log4j.appender.console=org.apache.log4j.ConsoleAppender
# 配置控制台输出日志级别
log4j.appender.console.Threshold=INFO
log4j.appender.console.Target=System.out
# 日志输出乱码,修改编码格式UTF-8
log4j.appender.console.Encoding=UTF-8
log4j.appender.console.layout=org.apache.log4j.PatternLayout
#log4j.appender.console.layout.ConversionPattern=[%p] %d{yyyy-MM-dd HH:mm:ss:SSS} [%t] [%l]-(%r) %m%n
log4j.appender.console.layout.ConversionPattern=%d{HH:mm:ss,SSS} [%c] - %m%n
# %c-类路径;%p-日志输出级别;%r-消耗时长;%m-输出打印信息;%n-输出回车换行符;%d-输出日志点的时间日期;%l:输出日志发生位置(类路径、线程、行数);%t-线程;
#log4j.appender.console.layout.ConversionPattern=[%p] %d{yyyy-MM-dd HH:mm:ss:SSS}(%r) [%t] [%c.%M] %m%n
# 输出到文件
log4j.appender.LOGFILE=org.apache.log4j.RollingFileAppender
# 配置日志文件输出路径
log4j.appender.LOGFILE.File=/u01/app/oracle/middleware/user_projects/domains/data/log/ssptools.log
# 配置日志文件大小,超出自动备份单位KB/MB
log4j.appender.LOGFILE.MaxFileSize=1000KB
# 配置最多备份日志文件数目,超出根据备份时间自动删除过期的日志文件
log4j.appender.LOGFILE.MaxBackupIndex=1000
# 配置日志文件输出规则
log4j.appender.LOGFILE.layout=org.apache.log4j.PatternLayout
log4j.appender.LOGFILE.layout.ConversionPattern=[%p] %-d{yyyy-MM-dd HH\:mm\:ss} [%l.%M]-(%r) %m%n
# 配置输出日志保存文件编码格式
log4j.appender.LOGFILE.Encoding=UTF-8
```
