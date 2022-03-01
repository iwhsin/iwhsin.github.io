# META-INF目录

## 基本目录结构
### META-INF/service 目录
&emsp;&emsp;这个目录主要是`SPI`串行外设接口的类声明。<br>
&emsp;&emsp;我们知道在java-1.6和JDBC-4.0以后不再需要专门使用`Class.forName("drivePath")`进行数据库驱动的加载，因为在此后的版本驱动包中都提供了`META-INF/service/java.sql.Driver`文件进行驱动类的自动加载。
&emsp;&emsp;Java 应用程序在启动时依赖jar包会自动查找`META-INF/service`目录下的文件进行相关类的加载初始化操作。
