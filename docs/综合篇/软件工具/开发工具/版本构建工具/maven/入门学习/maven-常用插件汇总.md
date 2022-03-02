# Maven 插件汇总

## 默认的插件列表

&emsp;&emsp;根据`packaging`类型不同会默认依赖不同的插件列表。

- **POM 类型默认插件依赖**
  | 插件名称 | 插件描述 | 备注 |
  | :--- | :---- | :---|
  | maven-clean-plugin | 清理工作目录下生成的文件（target 目录）| clean:clean |
  | maven-compiler-plugin | 编译工程项目到 target 目录 | compiler:compiler |
  | maven-deploy-plugin | 发布工程制品或指定制品文件到远程仓库中 | deploy:deploy |
  | maven-install-plugin | 发布工程制品或指定制品文件到本地仓库 | install:install |
  | maven-site-plugin | 为当前工程项目生成站点、运行、部署 | site:site |

- **JAR/WAR 类型依赖插件**
  | 插件名称 | 插件描述 | 备注 |
  | :--- | :---- | :---|
  | maven-jar-plugin | 将工程编译文件或测试文件打包成 JAR 类型文件，并提供 JAR 文件签名功能（maven-jarsigner-plugin） | jar:jar |
  | maven-resource-plugin | 管理 main/resource 或 test/resource，将对应的文件拷贝到对应的编译输出目录中 | resource:resource |

- **JAR 类型默认依赖插件**
  | 插件名称 | 插件描述 | 备注 |
  | :--- | :---- | :---|
  | maven-surefire-plugin | 主要用于在编译过程中执行集成测试 | surefire:test |

- **WAR 类型默认依赖插件**
  | 插件名称 | 插件描述 | 备注 |
  | :--- | :---- | :---|
  | maven-war-plugin | 将 WEB 应用工程编译文件和依赖打包成 WAR 类型文件，同时也支持将项目 exploded 到指定目录 | surefire:test |

- **EAR 类型默认依赖插件**
  | 插件名称 | 插件描述 | 备注 |
  | :--- | :---- | :---|
  | maven-ear-plugin | | ear:ear |

## 特性插件

### maven-enforcer-plugin

`maven-enforcer-plugin`是一个可以按照规则对 Maven 环境进行检查的插件.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-enforcer-plugin</artifactId>
            <version>1.4.1</version>
            <executions>
                <execution>
                    <id>enforce-check</id>
                    <!-- 执行时机: 默认validate -->
                    <phase>validate</phase>
                    <goals>
                        <!-- 执行规则检查 -->
                        <goal>enforce</goal>
                        <!-- 目标显示当前平台信息
                            [INFO] Maven Version: 3.6.3
                            [INFO] JDK Version: 1.8.0_241 normalized as: 1.8.0-241
                            [INFO] OS Info: Arch: amd64 Family: dos Name: windows 10 Version: 10.0
                            -->
                        <goal>display-info</goal>
                        <!-- 显示帮助信息-->
    <!--                            <goal>help</goal>-->
                    </goals>
                </execution>
            </executions>
            <configuration>

            <!-- enforce:enforce 参数配置-->
                <!-- 检查失败，则标记为使构建失败 -->
                <fail>true</fail>
                <!-- 快速失败:遇到未通过的规则则构建失败 -->
                <failFast>false</failFast>
                <!-- 禁用规则缓存 -->
                <ignoreCache>false</ignoreCache>
                <!-- 标识是否跳过检查 -->
                <skip>false</skip>

                <!-- 检测的规则列表 -->
                <rules>
                <!-- 标准规则
                    alwaysFail - 总是失败...用于测试插件配置。
                    alwaysPass - 总是通过...用于测试插件配置。
                    banDistributionManagement - 强制项目没有distributionManagement。
                    banDuplicatePomDependencyVersions - 强制项目没有重复声明的依赖项。
                    禁止依赖项- 强制排除的依赖项不包括在内。
                    禁止插件 - 强制特定插件不包含在构建中。
                    禁止存储库 - 强制不包括被禁止的存储库。
                    banTransitiveDependencies - 强制项目没有传递依赖。
                    dependencyConvergence - 确保所有依赖项收敛到相同的版本。
                    evaluateBeanshell - 评估一个 beanshell 脚本。
                    reactorModuleConvergence - 强制多模块构建遵循最佳实践。
                    requireActiveProfile - 强制执行一个或多个活动配置文件。
                    requireEnvironmentVariable - 强制环境变量的存在
                    requireFileChecksum - 强制指定文件具有一定的校验和。
                    requireFilesDontExist - 强制文件列表不存在。
                    requireFilesExist - 强制文件列表确实存在。
                    requireFilesSize - 强制文件列表存在并且在某个大小范围内。
                    requireJavaVendor - 强制执行 JDK 供应商。
                    requireJavaVersion - 强制执行 JDK 版本。
                    requireMavenVersion - 强制执行 Maven 版本。
                    requireNoRepositories - 强制不包括存储库。
                    requireOS - 强制执行 OS/CPU 架构。
                    requirePluginVersions - 强制所有插件都有一个指定的版本。
                    requirePrerequisite - 强制要求已指定先决条件。
                    requireProfileIdsExist - 强制存在在命令行上指定的配置文件。
                    requireProperty - 强制属性的存在和值。
                    requireReleaseDeps - 强制不包含任何快照作为依赖项。
                    requireReleaseVersion - 强制工件不是快照。
                    requireSnapshotVersion - 强制工件不是发行版。
                    requireSameVersions - 强制特定依赖项和/或插件具有相同的版本。
                    requireUpperBoundDeps - 确保每个（传递）依赖项都解析为其指定的版本或更高版本
                -->
                    <!-- 依赖冲突检查 -->
    <!--                        <dependencyConvergence/>-->

                    <!-- JDK 版本校验 -->
                    <requireJavaVersion>
                        <!-- 版本范围
                                1.8.0: 限制为1.8.0及以上版本
                                [1.7.0,1.8.0): 限制版本为1.7.0,不包括1.8.0
                                [1.7.0,): 限制版本为1.7.0及以上的版本
                                (,1.6.0],[1.8.0,): 限制版本小于1.6.0的版本和大于1.8.0的版本
                        -->
                        <version>[${java.version},)</version>
                        <!-- 检测失败时提示信息 -->
                        <message>You are running an older version of Java. This application requires at least JDK ${java.version}.</message>
                    </requireJavaVersion>

                    <!-- Maven 版本检查 -->
                    <requireMavenVersion>
                        <version>3.2.5</version>
                        <message>You are running an older version of Maven. This application requires at least JDK 3.2.5.</message>
                    </requireMavenVersion>

                    <!-- 操作信息校验 -->
                    <requireOS>
                        <!--<family>unix</family>-->
                        <!--<family>dos</family>-->
                        <!--<family>mac</family>-->
                        <family>windows</family>
                    </requireOS>

                <!-- 自定义规则 -->
                    <!-- 循环依赖检查: extra-enforcer-rules提供 -->
                    <banCircularDependencies/>
                </rules>

            <!-- enforce:help 参数配置-->
                <!-- 显示所有目标可配置的属性信息 -->
                <detail>false</detail>
                <!-- 要显示帮助的目标的名称:默认全部 -->
    <!--                    <goal>enforce</goal>-->
                <!-- 每个缩进级别的空格数 -->
                <indentSize>2</indentSize>
                <!-- 显示行的最大长度 -->
                <lineLength>80</lineLength>
            </configuration>

            <!-- 自定义规则 -->
            <dependencies>
                <dependency>
                    <groupId>org.codehaus.mojo</groupId>
                    <artifactId>extra-enforcer-rules</artifactId>
                    <version>1.0-beta-4</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

### dependency-mediator-maven-plugin
`dependency-mediator-maven-plugin`是一个能自动检查依赖冲突的插件.

- 配置
``` xml
<build>
    <plugins>
        <plugin>
            <groupId>com.github.vongosling</groupId>
            <artifactId>dependency-mediator-maven-plugin</artifactId>
            <version>1.0.2</version>
        </plugin>
    </plugins>
</build>
```

- 输出结果
``` log
[WARNING] Founded conflicting dependency component:commons-io:commons-io:jar
Founded conflicting dependency component:commons-io:commons-io:jar

 Resolved version is commons-io:commons-io:jar:2.4:compile
 But found conflicting artifact commons-io:commons-io:2.7
```

### clirr-maven-plugin
`clirr-maven-plugin`是一个用来检查版本的兼容性的插件.

