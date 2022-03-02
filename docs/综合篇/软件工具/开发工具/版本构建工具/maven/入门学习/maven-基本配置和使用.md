# 基本配置使用

1. Maven 总是会用最近的依赖，也就是说，你在项目中引入的依赖会覆盖传递引入的另一个依赖。

# 常用节点属性字段说明

## `<properties>`标签

### JDK 版本设置

1. `<java.version>`是 Spring Boot 项目开发过程提供的快捷属性,可以直接使用来标明项目开发使用的 JDK 版本。
2. `<maven.compiler.target>`和`<maven.compiler.source>`是 Maven 的标准属性，指

```
<!-- 配置项目JDK编译版本 -->
<!--
<maven.compiler.source>1.8</maven.compiler.source>
<maven.compiler.target>1.8</maven.compiler.target>
 -->
<java.version>1.8</java.version>
```

### 系统编码设置

```
<!-- 配置项目编码集 -->
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
<!--
此属性暂时未发现使用
<maven.compiler.encoding>UTF-8</maven.compiler.encoding>
-->
```

## `<parent>`标签中的`<relativePath>`属性

> Maven 中 jar 依赖会遵从：本地-relativePath-仓库,配置`<relativePath/>`为空,则默认均从仓库中拉取依赖。

## `<dependency>`标签

### 作用范围(`<scope>`)设置

> `<scope>`属性声明依赖资源的作用域,默认是`compile`，此外还有`provide`、`test`、`runtime`、`system`。</br>

1. `compile`： 编译、测试、运行
2. `test`：测试
3. `runtime`：运行、测试
4. `provide`：编译、测试、运行，打包时不依赖，比如`servlet`相关的一些容器中的包。，`此属性在打包为jar的时候会失效`。
5. `system`：依赖本地，配合 systemPath 使用

### 版本(`<version>`)设置

> `<version>`属性是指定使用 jar 包的版本信息<br>
> 在项目开发过程中为了保证某些 jar 包版本都是最新的可以使用`<version>[1.0.0-RELEASE,)</version>`保证使用的是 1.0.0 版本后最新的版本。<br>
> 对于`<parent>`标签中的`<version>`是不支持这种获取最新版本资源的使用方式的。

# 实践开发使用

## 传递依赖及依赖选择

> Maven 在选择依赖时，优先选择当前项目的 pom 文件中配置的版本的某依赖库，当前项目未配置某依赖库，引入的依赖库中有多个版本的某依赖库，此时会有限选择高版本的依赖库。

## `<dependency>`标签中排除传递依赖

> 在项目依赖中可以选择排除掉指定依赖包中传递依赖的子包,方式有两种。

- `<optional>`标签：表示可选择的

  - 在依赖的项目中对子依赖添加`<optional>`-可选择的，这样在被其它项目依赖过程中会排除掉该项依赖

    - 示例：

    ```
    依赖关系：ProjectA->ProjectB->ProjectC
    ProjectC依赖ProjectB会自动依赖ProjectA--这是Maven依赖中传递依赖机制
    可以在项目ProjectB依赖ProjectA的时候使用`<optional>`选项
    <dependency>
            <groupId>groupId</groupId>
            <artifactId>ProjectB</artifactId>
            <optional>true</optional>
    </dependency>
    这样在其它项目(ProjectA)依赖项目ProjectB的时候不会自动进行传递依赖项目ProjectA了

    还有一种方式
    ```

  - `exclusions`标签：排除依赖选择
    - 示例：
    ```
    <dependency>
            <groupId>groupId</groupId>
            <artifactId>ProjectB</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>groupId</artifactId>
                    <groupId>ProjectA</groupId>
                </exclusion>
            </exclusions>
    </dependency>
    ```

## 排除打包时的某些组件

> 某些组件在开发编译时使用，在打包的时不需要打包，因此打包时会排除组件的打包范围，如`lombok`。

- 使用`<scope>provided</scope>`属性：注意在 spring-boot 项目打包成`jar`包时，会失效，需要特殊处理。

```
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.10</version>
    <scope>provided</scope>
</dependency>
```

- spring-boot 打包 jar，排除`<scope>provided</scope>`指定的依赖

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
    <finalName>${artifactId}-${version}</finalName>
</build>
```
