# Maven 复制Jar包和源码到指定目录

## maven-dependency-plugins
``` xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>package-with-copy</id>
                    <phase>process-classes</phase>
                    <goals>
                        <goal>copy</goal>
                    </goals>
                    <configuration>
                        <artifactItems>
                            <artifactItem>
                                <groupId>org.objectweb.asm</groupId>
                                <artifactId>com.springsource.org.objectweb.asm</artifactId>
                                <version>2.2.3</version>
                                <overWrite>true</overWrite>
                                <destFileName>com.springsource.org.objectweb.asm.jar</destFileName>
                                <outputDirectory>${project.build.directory}/jarjar-staging</outputDirectory>
                            </artifactItem>
                            <artifactItem>
                                <groupId>org.objectweb.asm</groupId>
                                <artifactId>com.springsource.org.objectweb.asm</artifactId>
                                <version>2.2.3</version>
                                <classifier>sources</classifier>
                                <type>java-source</type>
                                <overWrite>true</overWrite>
                                <destFileName>com.springsource.org.objectweb.asm-source.jar</destFileName>
                                <outputDirectory>${project.build.directory}/jarjar-staging</outputDirectory>
                            </artifactItem>
                            <artifactItem>
                                <groupId>org.objectweb.asm</groupId>
                                <artifactId>com.springsource.org.objectweb.asm.commons</artifactId>
                                <version>2.2.3</version>
                                <overWrite>true</overWrite>
                                <destFileName>com.springsource.org.objectweb.asm.commons.jar</destFileName>
                                <outputDirectory>${project.build.directory}/jarjar-staging</outputDirectory>
                            </artifactItem>
                            <artifactItem>
                                <groupId>org.objectweb.asm</groupId>
                                <artifactId>com.springsource.org.objectweb.asm.commons</artifactId>
                                <version>2.2.3</version>
                                <classifier>sources</classifier>
                                <type>java-source</type>
                                <overWrite>true</overWrite>
                                <destFileName>com.springsource.org.objectweb.asm.commons-source.jar</destFileName>
                                <outputDirectory>${project.build.directory}/jarjar-staging</outputDirectory>
                            </artifactItem>
                        </artifactItems>
                    </configuration>
                </execution>
            </executions>
        </plugin>
        <plugin>
            <artifactId>maven-antrun-plugin</artifactId>
            <executions>
                <execution>
                    <id>jarjar</id>
                    <phase>process-classes</phase>
                    <goals>
                        <goal>run</goal>
                    </goals>
                    <configuration>
                        <tasks>
                            <taskdef name="jarjar" classname="com.tonicsystems.jarjar.JarJarTask" classpathref="maven.plugin.classpath"/>
                            <jarjar jarfile="${project.build.directory}${file.separator}${project.build.finalName}-jarjar.jar">
                                <zipfileset src="${project.build.directory}/jarjar-staging/com.springsource.org.objectweb.asm.jar"/>
                                <zipfileset src="${project.build.directory}/jarjar-staging/com.springsource.org.objectweb.asm.commons.jar"/>
                                <rule pattern="org.objectweb.asm.**" result="org.springframework.asm.@1"/>
                            </jarjar>
                            <jarjar jarfile="${project.build.directory}${file.separator}${project.build.finalName}-jarjar-source.jar">
                                <zipfileset src="${project.build.directory}/jarjar-staging/com.springsource.org.objectweb.asm-source.jar"/>
                                <zipfileset src="${project.build.directory}/jarjar-staging/com.springsource.org.objectweb.asm.commons-source.jar"/>
                                <rule pattern="org.objectweb.asm.**" result="org.springframework.asm.@1"/>
                            </jarjar>
                            <unjar src="${project.build.directory}${file.separator}${project.build.finalName}-jarjar.jar" dest="${project.build.outputDirectory}">
                                <patternset>
                                    <include name="**/*.class"/>
                                    <exclude name="*"/>
                                </patternset>
                            </unjar>
                            <unjar src="${project.build.directory}${file.separator}${project.build.finalName}-jarjar-source.jar" dest="${project.build.sourceDirectory}">
                                <patternset>
                                    <include name="org/**/*"/>
                                    <!--<include name="**/*.java"/>
                                    <exclude name="*"/>-->
                                </patternset>
                            </unjar>
                        </tasks>
                    </configuration>
                </execution>
            </executions>
            <dependencies>
                <dependency>
                    <groupId>com.googlecode.jarjar</groupId>
                    <artifactId>jarjar</artifactId>
                    <version>1.3</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```
