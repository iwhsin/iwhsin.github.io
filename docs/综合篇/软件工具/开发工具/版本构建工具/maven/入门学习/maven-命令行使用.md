# Maven 常用命令

## 常用命令
### 打包
> mvn clean package -Dmaven.test.skip=true -Puat -s  D:\DevProFiles\DevEnvironment\apache-maven-3.3.3\conf\mySettings.xml 

- 打包指定模块
``` bash
mvn clean package install -pl module-a -am
```


### Tomcat插件启动
> mvn tomcat8:run-war -f pom.xml -Puat -DskipTests

### 查看依赖树
> mvn dependency:tree

### 下载Jar包
> mvn dependency:get -DgroupId=io.spring.javaformat -DartifactId=spring-javaformat-formatter -Dversion=0.0.20 -s D:\DevProFiles\DevEnvironment\apache-maven-3.3.3\conf\mySettings.xml

### 下载源码
> mvn dependency:sources -DgroupId=org.springframework.spring -DartifactId=spring -Dversion=1.0 -s D:\DevProFiles\DevEnvPro\maven\conf\mine-settings.xml

### 下载doc
> mvn dependency:resolve -DgroupId=org.springframework.boot -DartifactId=selenium-parent -Dversion=2.9.0 -s D:\DevProFiles\DevEnvironment\apache-maven-3.3.3\conf\mySettings.xml

### 安装指定jar到本地仓库
> mvn install:install-file -Dfile=jave-1.0.6.jar -DgroupId=com.yintech -DartifactId=jave -Dversion=1.0.6 -Dpackaging=jar

### 统一修改版本号
```
<!-- 设置新的版本号 -->
mvn versions:set -DnewVersion=1.1.1
<!-- 当新版本号设置不正确时可以撤销新版本号的设置 -->
mvn versions:revert
<!-- 确认新版本号无误后提交新版本号的设置 -->
mvn versions:commit
```