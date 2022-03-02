# Maven Archetype 原型
&emsp;&emsp;在Maven工程可以很方便地通过原型快速创建定制化的项目工程。

## Archetype的使用

- **通过原型创建项目**
``` bash
#mvn org.apache.maven.plugins:maven-archetype-plugin:RELEASE:generate
mvn archetype:generate
-DinteractiveMode=false 
-DgroupId=com.mine.study
-DartifactId=maven-archetype-demo 
-Dversion=1.0-SNAPSHOT 
-DarchetypeGroupId=org.apache.camel.archetypes 
-DarchetypeArtifactId=camel-archetype-component 
-DarchetypeVersion=RELEASE 
```
