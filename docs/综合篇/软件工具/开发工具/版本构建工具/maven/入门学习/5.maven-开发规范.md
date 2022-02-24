# Maven-开发规范
> 总结Maven开发过程中一些默认的规范.

## POM文件编写各级节点顺序
```
项目结构
-------
1. <modelVersion/>

工程基本信息
-----------
2. <parent/>
3. <groupId/>
4. <artifactId/>
5. <version/>
6. <packaging/>
7. <name/>
8. <description/>
9. <url/>

项目仓库信息
-----------
10.<inceptionYear/>
11.<organization/>
12.<licenses/>
13.<developers/>
14.<contributors/>
15.<mailingLists/>
16.<prerequisites/>

模块管理
-------
17.<modules/>

软件配置管理
-----------
18.<scm/>
19.<issueManagement/>
20.<ciManagement/>
21.<distributionManagement/>

自定义常量属性
-------------
22.<properties/>

依赖管理
-------
23.<dependencyManagement/>
24.<dependencies/>

远程仓库配置
-----------
25.<repositories/>
26.<pluginRepositories/>

项目构建相关
----------
27.<build/>
28.<reporting/>
29.<profiles/>
```

