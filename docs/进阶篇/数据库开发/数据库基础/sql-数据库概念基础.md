# 1. 数据库基础

## 1.1 数据库 Database

保存有组织的数据的容器（通常是一个文件或一组文件),通过数据库管理系统**DBMS**进行创建和操作
　　**注意:**平时使用的 Mysql Oracle Sqlite 等均属于数据库管理系统**DBMS**

## 1.2 表 table

某种特定类型数据的结构化清单,储在表中的数据是同一种类型的数据或清单

```
表名:
使表名成为唯一的，实际上是数据库名和表名等的组合。
有的数据库还使用数据库拥有者的名字作为唯一名的一部分。也就是说，虽然在相同数据库中不能两次使用相同的表名，但在不同的数据库中完全可以使用相同的表名
```

## 1.3 模式 scheme

关于数据库和表的布局及特性的信息的描述(数据库信息,表的信息以及表之间的关系)

## 1.4 列 column

表中的一个字段。所有表都是由一个或多个列组成的
数据库中每个列都有相应的数据类型。数据类型（ datatype ）定义了列可以存储哪些数据种类

## 1.5 行 row

表中的一个记录

## 1.6 主键 primary Key

表中每一行都应该有一列（或几列）可以唯一标识自己
一列（或一组列），其值能够唯一标识表中每一行
**注：主键具有唯一性且不为空**

```
应该总是定义主键:
虽然并不总是需要主键，但多数数据库设计者都会保证他们创建的每个表具有一个主键，以便于以后的数据操作和管理。
表中的任何列都可以作为主键，只要它满足以下条件：
  1. 任意两行都不具有相同的主键值；
  2. 每一行都必须具有一个主键值（主键列不允许NULL 值）；
  3. 主键列中的值不允许修改或更新；
  4. 主键值不能重用（如果某行从表中删除，它的主键不能赋给以后的新行）
```

## 1.7 外键 foreign key

# 2. SQL

## 2.1 SQL 简介

- SQL(Structured Query Language):结构化查询语言的缩写。
- SQL 是一种专门用来与数据库沟通的语言。
- 提供一种从数据库中读写数据的简单有效的方法

## 2.2 SQL 的优点

- **SQL**不是某个特定数据库供应商专有的语言。几乎所有重要的**DBMS**都支持**SQL**,所以学习此语言使你几乎能与所有数据库打交道。
- **SQL**简单易学。它的语句全都是由有很强描述性的英语单词组成，而且这些单词的数目不多。
- **SQL**虽然看上去很简单，但实际上是一种强有力的语言，灵活使用其语言元素，可以进行非常复杂和高级的数据库操作。

```
SQL的扩展:
许多DBMS厂商通过增加语句或指令，对SQL进行了扩展。这种扩展的目的是提供执行特定操作的额外功能或简化方法。虽然这种扩展很有用，但一般都是针对个别 DBMS 的，很少有两个以上的供应商支持这种扩展。
标准SQL由ANSI标准委员会管理,从而称为ANSI SQL。所有主要的DBMS,即使有自己的扩展，也都支持ANSI SQL.各个实现有自己的名称，如 PL/SQL、Transact-SQL等。
```

# 3. 检索数据

## 3.1 SELECT 语句

**关键字(keyword)**:SQL 组成部分的保留字,不能用作表或列的名字

```
//检索单列,多条SQL语句以分号分割,多数DBMS不需要在单条SQL语句后加分号
//SQL语句不区分大小写,表名,列名和值可能有所不同(区别于体的DBMS)
//介意将SQL语句分成多行进行书写
SELECT name
ROM Products
//检索多列
SELECT name,price,...
FROM Products
//检索所有列,通配符*
//一般不使用通配符,会降低检索和应用程序的性能
SELECT *
FROM Products
```

## 3.2 去除重复检索不同的值 DISTINCT

DISTINCT:作用与所有列,作用于多列只要有一列不同则不去除

```
SELECT DiSTINCT price
FROM Products
```

## 3.3 限制查询结果的显示 TOP

```
//TOP:限制结果只显示TOP指定的数据量
SELECT TOP 5 name
FROM Product
//不同的DBMS使用的方法不同
//Oracle中使用ROWNUM
SELECT name
FROM Product
WHERE ROWNUM<=5;
//MySQL、MariaDB、PostgreSQL或SQLite使用LIMIT
SELECT name
FROM Product
LIMIT 5;
//显示不超过5行的数据,OFFSET指定开始的下标从0开始
SELECT name
FROM Product
LIMIT 5 OFFSET 1;
//DB2使用的FETCH
SELECT name
FROM Products
FETCH FIRST 5 ROWS ONLY;
```

## 3.4 使用注释

'#' '-- '、 '/\* /'

# 4. 排序检索数据

**关键字:ORDER BY**子句取一个或多个列的名字进行排序,默认升序 ASC,降序 DESC,**ORDER BY 子句须是 SELECT 语句中最后一条子句**

## 4.1 单列排序

可以是检索的列也可以是非检索的列

## 4.2 多列排序

- 按列名进行排序,列名之间使用,进行分割,前面列排序相同再进行后一列的排序
  SELECT id,price,name
  FROM Products
  ORDER BY price,name;
- 按列位置进行排序
  SELECT id,price,name
  FROM Products
  ORDER BY 2,3;
  两者结果是相同的,可以混合进行使用
  升序 ASC 是默认的,降序是 DESC,多列排序可指定升序和降序
  SELECT id,price,name
  FROM Products
  ORDER BY price DESC,name;

# 5. 过滤数据

## 5.1 WHERE 子句

- WHERE 子句在 ORDER BY 子句前面
- 将值与字符串类型的列进行比较，就需要限定引号。用来与数值列进行比较的值不用引号
- WHERE 子句常用的操作符
  ![](index_files/49956ab0-232c-4fd4-ad04-140cacc33cee.png)

## 5.2 BETWEEN...AND 范围值检查

## 5.3 NULL 空值检查

判定条件是个 WHERE 子句:WHERE price IS NULL

# 6. 高级过滤数据

## 6.1 组合 WHERE 子句

**AND**:用来指示检索满足所有给定条件的行
**OR**:用来表示检索匹配任一给定条件的行

```
在WHERE子句中使用圆括号
任何时候使用具有AND和OR操作符的WHERE子句，都应该使用圆括号明确地分组操作符。不要过分依赖默认求值顺序，即使它确实如你希望的那样。使用圆括号没有什么坏处，它能消除歧义
```

## 6.2 IN

**IN**:

- 指定条件范围，范围中的每个条件都可以进行匹配,IN 取一组由逗号分隔、括在圆括号中的合法值
- 用来指定要匹配值的清单的关键字，功能与 OR 相当

```
优点:
在有很多合法选项时,IN操作符的语法更清楚，更直观。
在与其他AND和OR操作符组合使用IN时,求值顺序更容易管理。
IN操作符一般比一组 OR 操作符执行得更快（在上面这个合法选项很少的例子中，你看不出性能差异）。
IN的最大优点是可以包含其他 SELECT 语句，能够更动态地建立 WHERE 子句。第 11 课会对此进行详细介绍。
```

## 6.3 NOT

**NOT:**
WHERE 子句中用来否定其后条件的关键字

# 7. 通配符过滤

## 7.1 LIKE 操作符

**通配符(wildcard):**用来匹配值的一部分的特殊字符。
**搜索模式(search pattern):**由字面值、通配符或两者组合构成的搜索条件

### 7.1.1 '%' 通配符

'%' 表示任何字符出现任意次数

### 7.1.2 '\_' 通配符

'\_' 表示单个任意字符

### 7.1.3 '[]' 通配符

'[]' 指定一个字符集 匹配指定位置的一个字符

## 7.2 通配符使用注意

**通配符的使用较其他搜索耗费更长的处理时间**
**使用技巧:**

- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
- 在确实需要使用通配符时，也尽量不要把它们用在搜索模式的开始处。把通配符置于开始处，搜索起来是最慢的。
- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。

# 8. 数据处理函数

数据库中的检索可以进行直接的加减乘除

## 8.1 字符串常用处理函数

**去除前后空格:**
**TRIM**去除字符串的前后空格
**LTRIM、RTRIM:**去除字符串的左、右空格
**转换大小写:**
**UPPER**转换字符串中的小写字母为大写
**LOWER**转换字符串中的小写字母为小写
**常用的文本处理函数**
![](index_files/7c6b541f-7fbd-414c-8f65-573834360f53.png)

## 8.2 日期和时间处理函数

具体数据库的处理不用

## 8.3 数值处理函数

![](index_files/438954b8-3b1c-4ceb-bed4-03fa14eb0bd7.png)

# 9. 聚集函数

![](index_files/0df884d1-c1a0-4b90-803a-fc6bcf25cb16.png)

## 9.1 AVG()

AVG:获取当前列的平均值

## 9.2 COUNT()

COUNT:统计行数
COUNT(\*):对表中行的数目进行统计,空值也统计
COUNT(column):统计表中特地给你列的行数,忽略 NULL 值,空值也统计

## 9.3 MAX()

MAX():返回指定列中的最大值,需要指定列名,忽略 NULL 值

## 9.4 MIN()

MIN():返回指定列中的最小值,需要指定列名,忽略 NULL 值

## 9.5 SUM()

SUM():返回指定列中的和,需要指定列名,忽略 NULL 值

## 9.6 使用注意

聚集函数,可以组合一起使用
DISTINCT 不能用于 COUNT(\*)

# 10. 分组函数

## 10.1 GROUP BY

- GROUP BY 子句可以包含任意数目的列，因而可以对分组进行嵌套，更细致地进行数据分组。
- 如果在 GROUP BY 子句中嵌套了分组，数据将在最后指定的分组上进行汇总。换句话说，在建立分组时，指定的所有列都一起计算（所以不能从个别的列取回数据）。
- GROUP BY 子句中列出的每一列都必须是检索列或有效的表达式（但不能是聚集函数）。如果在 SELECT 中使用表达式，则必须在 GROUPBY 子句中指定相同的表达式。不能使用别名。
- 大多数 SQL 实现不允许 GROUP BY 列带有长度可变的数据类型（如文本或备注型字段）。
- 除聚集计算语句外， SELECT 语句中的每一列都必须在 GROUP BY 子句中给出。
- 如果分组列中包含具有 NULL 值的行，则 NULL 将作为一个分组返回。如果列中有多行 NULL 值，它们将分为一组。
- **GROUP BY 子句必须出现在 WHERE 子句之后，ORDER BY 子句之前**可以通过相对位置使用:ORDER BY 2,3

## 10.2 过滤分组

HAVING :分组过滤函数
WHERE 过滤指定的行不是分组

```
使用HAVING和WHERE:
HAVING与WHERE非常类似,如果不指定GROUP BY,则大多数DBMS会同等对待它们。不过,你自己要能区分这一点.使用HAVING时应该结合GROUP BY子句，而WHERE子句用于标准的行级过滤
```

## 10.3 分组和排序

GROUP BY 结合 ORDER BY 使用
![](index_files/4dfa1f40-3096-425a-9919-bf636c10673b.png)

## 10.4 SELECT 子句的顺序

![](index_files/1f55dcfc-fba8-4e0a-95be-c9680c694db5.png)

# 11. 子查询

```
注意:
  子查询总是从内向外处理
  子查询的SELECT语句只能查询单个列
```

# 联结查询

自然联结 内部联结 外部联结(左外联结，右外联结)
**详细理解**

# 12. 数据插入

## 12.1 INSERT

```
//不提供列名则每列均需要提供一个值
INSERT INTO tableName VALUES();
//提供列名则需提供相应的列值
INSERT INTO tableName(col1,col2,col3) VALUES(val1,val2,val3);
```

**省略部分列需注意:**

- 该列定义为允许 NULL 值（无值或空值）
- 在表定义中给出默认值.这表示如果不给出值，将使用默认值

## 12.2 复制表

```
//MYSQL ORACLE可使用
CREATE TABLE itemscopy AS
SELECT *
FROM items;
```

# 13. 数据更新

```
//需注意WHERE条件不能省略 否则更新表中全部数据
//UPDATE子句中可以使用子查询
UPDATE tabName SET colName = 'value' WHERE Condition
```

# 14. 数据删除

```
//需注意WHERE条件不能省略 否则删除表中全部数据
//DELETE子句中可以使用子查询
DELETE FROM tabName  WHERE Condition
//删除表中的全部数据
1. DELETE FROM tabname
2. TRUNCATE tabname //删除表中的全部数据速度更快
```

## 14.1 UPDATE 和 DELETE 使用总结

- 除非确实打算更新和删除每一行，否则绝对不要使用不带 WHERE 子句的 UPDATE 或 DELETE 语句
- 保证每个表都有主键（如果忘记这个内容，请参阅第 12 课），尽可能像 WHERE 子句那样使用它（可以指定各主键、多个值或值的范围）
- 在 UPDATE 或 DELETE 语句使用 WHERE 子句前，应该先用 SELECT 进行测试，保证它过滤的是正确的记录，以防编写的 WHERE 子句不正确。
- 使用强制实施引用完整性的数据库,这样 DBMS 将不允许删除其数据与其他表相关联的行。
- 有的 DBMS 允许数据库管理员施加约束，防止执行不带 WHERE 子句的 UPDATE 或 DELETE 语句.如果所采用的 DBMS 支持这个特性，应该使用它。

# 15.创建和操纵表

## 15.1 CREATE 创建表

```
create table tutorials_tbl(
   tutorial_id INT NOT NULL AUTO_INCREMENT,
   tutorial_title VARCHAR(100) NOT NULL,
   tutorial_author VARCHAR(40) NOT NULL,
   submission_date DATE,
   price INTEGER DEFAULT 1,
   PRIMARY KEY ( tutorial_id )
);
```

## 15.2 ALTER 更新表

```
//添加列
ALTER TABLE tabName ADD colName CHAR(20);
//删除列
ALTER TABLE tabName DROP colName;
```

## 15.3 DROP 删除表

```
DROP TABLE CustCopy;
```
