TODO: 插件的具体整理到使用总结-插件使用中

# Maven插件
##  `maven-dependency-plugin`
### 拷贝项目依赖包
> 有时候可能因为项目原因不能使用maven，这时候需要引入某个组件相关依赖，只能手动获取相关jar包再通过手动复制到项目中，这时候就需要借助maven来更方便地实现。

* 这里以引入swagger作为示例，在`pom.xml`中添加如下配置：
```xml
<dependencies>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <version>2.0.0</version>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <version>2.0.3</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>package-with-copy-dependencies</id>
                    <!-- 指定package操作时进行依赖包拷贝 -->
                    <phase>package</phase>
                    <goals>
                        <goal>copy-dependencies</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```
* 执行`mvn package`命令，这时候会将项目依赖拷贝到`target/dependency`文件夹中。

### 拷贝指定依赖包到项目指定目录并重命名
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <executions>
        <execution>
            <id>package-with-copy-dependencies</id>
            <!-- 指定package操作时进行依赖包拷贝 -->
            <phase>package</phase>
            <goals>
                <goal>copy-dependencies</goal>
            </goals>
        </execution>
        <execution>
            <id>package-with-copy</id>
            <phase>package</phase>
            <goals>
                <goal>copy</goal>
            </goals>
            <configuration>
                <artifactItems>
                    <artifactItem>
                        <groupId>io.springfox</groupId>
                        <artifactId>springfox-swagger2</artifactId>
                        <version>2.0.0</version>
                        <overWrite>true</overWrite>
                        <destFileName>spring-it-1.0.0.jar</destFileName>
                        <outputDirectory>${project.build.directory}/lib</outputDirectory>
                    </artifactItem>
                </artifactItems>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## `jarjar-maven-plugin`
### 重命名包路径名
```xml
<plugin>
    <groupId>org.sonatype.plugins</groupId>
    <artifactId>jarjar-maven-plugin</artifactId>
    <version>1.9</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>jarjar</goal>
            </goals>
            <configuration>
                <includes>
<!--                                <include>asm:asm</include>-->
                    <include>cglib:cglib</include>
                </includes>
                <excludes>
                    <exclude>xin.icoder.study.spring:spring-demo</exclude>
                </excludes>
                <rules>
                    <rule>
                        <pattern>org.objectweb.asm.**</pattern>
                        <result>xin.icoder.asm.@1</result>
                    </rule>
                    <rule>
                        <pattern>net.sf.cglib.**</pattern>
                        <result>xin.icoder.cglib.@1</result>
                    </rule>
                </rules>
                <overwrite>false</overwrite>
<!--                            <output>${project.basedir}/icoder-asm-1.4.3.jar</output>-->
                <!--
                    指定源代码路径，默认是`{classes}`===》`${project.build.outputDirectory}`-${project.basedir}/target/classes
                    配置值：
                        `{classes}`===》`${project.build.outputDirectory}`-${project.basedir}/target/classes
                        `{test-classes}`===》`${project.build.outputDirectory}`-${project.basedir}/target/test-classes
                -->
                <input>{classes}</input>

<!--                            <output>${project.name}</output>-->
<!--                            <output>${project.basedir}/icoder-asm-1.4.3.jar</output>-->
                <!-- 备份文件路径 -->
                <workingDirectory>${project.build.directory}/backup</workingDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```
