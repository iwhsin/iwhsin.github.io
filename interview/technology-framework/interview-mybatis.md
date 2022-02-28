# 1. Mybatis 专题

## 1.1. 基础

### 1.1.1. 什么是 Mybatis?

&emsp;&emsp;`mybatis`源于早期 Apache 的一个开源项目 iBatis,支持普通 SQL 查询,存储过程和高级映射的优秀的 ORM（对象关系映射）框架。<br>
&emsp;&emsp;可以使用 XML 或注解来配置和映射原生信息，将 POJO 映射成数据库中的记录,避免了几乎几乎所有的 JDBC 代码和参数的手工设置以及结果集的检索。<br>
&emsp;&emsp;内部对 JDBC 进行了封装，开发时只需要关注 SQL 语句本身，不需要花费精力去处理加载驱动、创建连接、创建 statement 等繁杂的过程。<br>
&emsp;&emsp;程序员直接编写原生态 sql，可以严格控制 sql 执行性能，灵活度高。<br>
&emsp;&emsp;通过 xml 文件或注解的方式将要执行的各种 statement 配置起来，并通过 java 对象和 statement 中 sql 的动态参数进行映射生成最终执行的 sql 语句，最后由 mybatis 框架执行 sql 并将结果映射为 java 对象并返回。

### 1.1.2. Mybatis 的优点

1. 基于 SQL 语句编程，相当灵活，不会对应用程序或者数据库的现有设计造成任何影响，SQL 写在 XML 里，解除 sql 与程序代码的耦合，便于统一管理；提供 XML 标签，支持编写动态 SQL 语句，并可重用。
2. 与 JDBC 相比，减少了 50%以上的代码量，消除了 JDBC 大量冗余的代码，不需要手动开关连接；
3. 很好的与各种数据库兼容（因为 MyBatis 使用 JDBC 来连接数据库，所以只要 JDBC 支持的数据库 MyBatis 都支持）。
4. 提供映射标签，支持对象与数据库的 ORM 字段关系映射；提供对象关系映射标签，支持对象关系组件维护。

### 1.1.3. Mybatis 的缺点

1. SQL 语句的编写工作量较大，尤其当字段多、关联表多时，对开发人员编写 SQL 语句的功底有一定要求。
2. SQL 语句依赖于数据库，导致数据库移植性差，不能随意更换数据库。

### 1.1.4. 简单说下 Mybatis 的工作流程

- 工作流程
  - 加载配置
    - 配置形式有两种 XML 配置文件和代码注释
    - MyBatis 将 SQL 的配置信息加载成为一个个的 MappedStatement 对象(包括传入参数映射配置,执行的 SQL 语句,结果映射配置),将其存储在内存中。
  - SQL 解析
    - API 接口层接收到调用请求时,会接受到传入 SQL 的 ID 和传入对象(可以是 map,JavaBean 或者基本数据类型),MyBatis 根据 SQL 的 ID 找到对应的 MappedStatement,然后根据传入参数对象对 MappedStatement 解析,解析后得到最终要执行的 SQL 语句和参数
  - SQL 执行
    - 将最终得到的 SQL 和参数拿到数据库进行执行,得到操作数据库的结果
  - 结果映射
    - 将操作数据库的结果按照映射的配置进行转换,可以转换成 HashMap,JavaBean 或基本数据类型,并将最终结果返回

### 1.1.5. 参数注入#{}和${}的有什么区别?

&emsp;&emsp;#{}是预编译处理，${}是字符串替换。

- Mybatis 在处理#{}时，会将 sql 中的#{}替换为?号，调用 PreparedStatement 的 set 方法来赋值；
- Mybatis 在处理${}时，就是把${}替换成变量的值
- 使用#{}可以有效的防止 SQL 注入，提高系统安全性。

## 1.2. 原理

### 1.2.1. 简单说下 Mapper XML 文件与之对应的 DAO 接口的工作原理以及 Dao 接口中的方法可以重载吗?

- 工作流程<br>
  &emsp;&emsp;Dao 接口即 Mapper 接口。接口的全限名，就是映射文件中的 namespace 的值,接口的方法名，就是映射文件中 Mapper 的 Statement 的 id 值；接口方法内的参数，就是传递给 sql 的参数。<br>
  &emsp;&emsp;Mapper 接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为 key 值，可唯一定位一个 MapperStatement。在 Mybatis 中，每一个`<select>`、`<insert>`、`<update>`、`<delete>`标签，都会被解析为一个 MapperStatement 对象。<br>
  &emsp;&emsp;Mapper 接口里的方法，是不能重载的，因为是使用 全限名+方法名 的保存和寻找策略。

- 工作原理<br>
  Mapper 接口的工作原理是 JDK 动态代理，Mybatis 运行时会使用 JDK 动态代理为 Mapper 接口生成代理对象 proxy，代理对象会拦截接口方法，转而执行 MapperStatement 所代表的 sql，然后将 sql 执行结果返回。

### 1.2.2. Mybatis 中的分页是如何实现的?分页插件的原理又是什么?

&emsp;&emsp;`Mybatis`中基于`RowBounds`对象做的分页操作,它是针对 ResultSet 结果集执行的内存分页(逻辑分页)，而非物理分页;<br>

```java
//这个是通过RowBounds来实现查询功能的分页操作
public List<User> getAllRowBounds(int currentPage,int pageSize) throws IOException {
    SqlSession sqlSession = MybatisUtil.getSession();
    /*rowBounds需要的第一个参数就是从数据的哪个下标开始开始查，第二个就是你需要查询的条数*/
    RowBounds rowBounds= new RowBounds((currentPage-1)*pageSize,pageSize);
    List<User> list = sqlSession.selectList("UserMapper.getAllRowBounds",
            null, rowBounds);
    sqlSession.close();
    return list;
}
```

&emsp;&emsp;可以在 sql 内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。<br>

- 分页插件的实现原理<br>
  &emsp;&emsp;分页插件的基本原理是使用 Mybatis 提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的 sql，然后重写 sql，根据 dialect 方言，添加对应的物理分页语句和物理分页参数。

### 1.2.3. Mybatis 是如何将 sql 执行结果封装为目标对象并返回的？
1. 使用<resultMap>标签，逐一定义数据库列名和对象属性名之间的映射关系。
2. 使用 sql 列的别名功能，将列的别名书写为对象属性名。

### 1.2.4. 如何执行批量插入?
``` java
SqlSession sqlSession = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH, false);
try{
    for(){
        sqlSession.insert(statement, subList);
        sqlsession.getmapper(namemapper.class).insertname(name)
    }
sqlsession.commit();
}catach{
    sqlSession.rollback();
}
```

### 1.2.5. 如何获取自动生成的(主)键值?
&emsp;&emsp;insert 方法总是返回一个 int 值 ，这个值代表的是插入的行数;<br>
&emsp;&emsp;如果采用自增长策略，自动生成的键值在 insert 方法执行完后可以被设置到传入的参数对象中。

### 1.2.6. 在 mapper 中如何传递多个参数?

### 1.2.7. 、Mybatis 动态 sql 有什么用？执行原理？有哪些动态 sql？
&emsp;&emsp;Mybatis 动态 sql 可以在 Xml 映射文件内，以标签的形式编写动态 sql，执行原理是根据表达式的值 完成逻辑判断并动态拼接 sql 的功能。

&emsp;&emsp;Mybatis 提供了 9 种动态 sql 标签：trim | where | set | foreach | if | choose| when | otherwise | bind。

### 1.2.8. Xml 映射文件中，除了常见的 select|insert|updae|delete 标签之外，还有哪些标签？
<resultMap>、<parameterMap>、<sql>、<include>、
<selectKey>，加上动态 sql 的 9 个标签，其中<sql>为 sql 片段标签，通过
<include>标签引入 sql 片段，<selectKey>为不支持自增的主键生成策略标
签。