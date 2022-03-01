 # 1. 数据库编程
&emsp;&emsp;Java中为数据库操作提供了一套统一的API编程接口-`JDBC`，数据库厂商只需要提供对应的数据库驱动，可以轻松地使用Java进行数据库操作。

![java-jdbc-connect][java-jdbc-connect]

## 1.1. JDBC编程步骤
&emsp;&emsp;`JDBC`是Java 程序中访问数据库的标准`API`，提供了独立于数据库的统一API，用以执行SQL命令。
- 它主要提供了：
    1. 连接数据库
    2. 执行SQL
    3. 获取SQL执行的结果集。

### 1.1.1. 驱动注册
&emsp;&emsp;目前很多数据库厂商提供的驱动会自动注册驱动器类，当然我们也可以手动进行注册。

- **驱动注册**
    - **通过SPI注册数据库驱动**
        ``` bash
        #创建classpath/META-INF/service/java.sql.Driver文件添加如下内容(这里使用的是mysql,可以指定对应的数据库驱动器路径)
        com.mysql.cj.jdbc.Driver
        ```

    - **命令行参数注册数据库驱动**
        ``` bash
        java -Djdbc.drivers=com.mysql.cj.jdbc.Driver
        ```

    - **系统属性(环境变量)注册数据库驱动**
        ``` bash
        jdbc.drivers = com.mysql.cj.jdbc.Driver
        System.setProperty("jdbc.drivers", "com.mysql.cj.jdbc.Driver")
        ```

> [!TIP]
> 在java-1.6和JDBC-4.0以后不再需要专门使用`Class.forName("drivePath")`进行数据库驱动的加载，因为在此后的版本驱动包中都提供了`META-INF/service/java.sql.Driver`文件进行驱动类的自动加载。

- 这里以`MySQL`作为示例看下驱动注册的源码。
    ``` java
    <!-- mySQL-6版本及之后的 com.mysql.cj.jdbc.Driver -->
    <!-- com.mysql.jdbc.Driver -->

    static {
        try {
            // 注册数据库驱动器
            java.sql.DriverManager.registerDriver(new Driver());
        } catch (SQLException E) {
            throw new RuntimeException("Can't register driver!");
        }
    }
    ```

### 获取数据库连接
&emsp;&emsp;数据库驱动加载完成，在操作数据库前首先需要建立数据库连接，这里通过`DriverManager`获取数据库连接。

- **以Mysql为例**
    ``` java
    String url = "jdbc:mysql://localhost:3306/dbName?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8";
    String user = "root";
    String password = "root";
    // 获取数据库连接
    Connection connection = DriverManager.getConnection(url, user, password);
    ```

- 常用的数据库连接`URL`
    - MySQL：`jdbc:mysql://hostname:port/databasename`。
    - Oracle：`jdbc:oracle:thin:@hostname:port:databasename`。
    
### 创建`Statement`
&emsp;&emsp;数据库连接完成，则可以进行数据库操作，java JDBC 中提供了`Statement`用于执行`SQL`并返回执行结果。

- **创建Statement**
    ``` java
    String sql = "select * from tab where id = ?";
    // 创建Statement
    Statement statement = connection.createStatement();
    // 创建预编译的PreparedStatement
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    // 创建存储过程的CallableStatement
    CallableStatement callableStatement = connection.prepareCall(sql);
    ```

### 执行SQL语句
&emsp;&emsp;创建完`Statement`之后可以执行`SQL`。

- **SQL执行**
    ``` java
    // 执行SQL，如果返回的结果集则放在第一个结果集中，否则放在updateCount
    boolean execute = statement.execute(sql);
    // 执行查询SQL并将结果存放在结果集中
    ResultSet resultSet = statement.executeQuery(sql);
    // 执行"insert"、"update"、"delete"、"drop"、"create"等SQL并返回影响的条数
    int i = statement.executeUpdate(sql);
    ```

### 操作结果集
&emsp;&emsp;执行完SQL语句后返回的结果存放在`ResultSet`结果集中，通过操作`ResultSet`取回查询结果。

- **结果集指针操作**
    ``` java
    boolean next = resultSet.next();
    boolean previous = resultSet.previous();
    boolean first = resultSet.first();
    boolean last = resultSet.last();
    resultSet.beforeFirst();
    resultSet.afterLast();
    boolean absolute = resultSet.absolute();
    ```
- **结果集取回结果**：`getXXX()`

### 资源回收
&emsp;&emsp;数据库操作执行结束需要及时释放资源，这些资源包括`ResultSet`、`Statement`、`Connection`等，他们均实现了`AutoCloseable`接口，因此建议使用`try-with-resource`方式进行资源回收。
    

## 相关类介绍

## 管理结果集

## 存储过程

## 事物隔离级别

## 开启事物支持

## 数据库信息分析

## 数据库连接池



<!-- 资源链接 -->

[java-jdbc-connect]:  ../../../assets/images/java-jdbc-connect.png 'JDBC'