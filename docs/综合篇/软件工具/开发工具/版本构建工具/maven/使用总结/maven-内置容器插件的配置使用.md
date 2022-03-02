# Maven 内置容器插件

## Maven Tomcat

- **内置容器插件引入使用**

- **内置Timcat容器**
``` xml
<build>
    <plugins>
        <!-- 配置内置Tomcat容器,这个需要修改<packaging>war</packaging> -->
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat8-maven-plugin</artifactId>
            <version>3.0-r1655215</version>
            <configuration>
                <server>tomcat8</server>
                <port>10000</port>
                <path>/</path>
                <uriEncoding>UTF-8</uriEncoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

- **内置jetty容器**
``` xml
<build>
    <plugins>
        <!-- 配置内置Jetty容器 -->
        <plugin>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-maven-plugin</artifactId>
            <version>9.4.32.v20200930</version>
            <configuration>
                <httpConnector>
                    <port>10000</port>
                </httpConnector>
                <supportedPackagings>jar</supportedPackagings>
                <scanIntervalSeconds>10</scanIntervalSeconds>
                <webApp>
                    <contextPath>/</contextPath>
                </webApp>
            </configuration>
        </plugin>
    </plugins>
</build>
```
