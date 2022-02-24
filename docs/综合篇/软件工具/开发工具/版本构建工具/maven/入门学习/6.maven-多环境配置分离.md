# Maven 多环境配置分离
> 通过Maven配置的方式实现多环境配置分离，在配置文件中可通过@property.name@获取激活环境中的配置属性。
* 在`<build>`标签中增加如下配置
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
    <!-- 资源文件路径 -->
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
            <excludes>
                <exclude>config/*.*</exclude>
            </excludes>
        </resource>
    </resources>
    <!-- 过滤规则 -->
    <filters>
        <filter>
            src/main/resources/config/application-${env}.properties
        </filter>
    </filters>
</build>
<!-- 配置profile -->
<profiles>
    <profile>
        <!-- 打包时根据ID定位环境 -->
        <id>dev</id>
        <!-- 指定配置文件路径 -->
        <properties>
            <env>dev</env>
        </properties>
        <activation>
            <!-- 设置为默认环境-->
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <profile>
        <!-- 打包时根据ID定位环境 -->
        <id>test</id>
        <!-- 指定配置文件路径 -->
        <properties>
            <env>test</env>
        </properties>
    </profile>
    <profile>
        <!-- 打包时根据ID定位环境 -->
        <id>prod</id>
        <!-- 指定配置文件路径 -->
        <properties>
            <env>prod</env>
        </properties>
    </profile>
</profiles>
```