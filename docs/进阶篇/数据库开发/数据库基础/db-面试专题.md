# 数据库基础(面试常见题)
## 数据库基础
1. 数据抽象：物理抽象、概念抽象、视图级抽象,内模式、模式、外模式
2. SQL语言包括数据定义、数据操纵(Data Manipulation),数据控制(Data Control)
数据定义：Create Table,Alter Table,Drop Table, Craete/Drop Index等
数据操纵：Select ,insert,update,delete,
数据控制：grant,revoke
3. SQL常用命令：
CREATE TABLE Student(
ID NUMBER PRIMARY KEY,
NAME VARCHAR2(50) NOT NULL);//建表
CREATE VIEW view_name AS
Select * FROM Table_name;//建视图
Create UNIQUE INDEX index_name ON TableName(col_name);//建[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")
INSERT INTO tablename {column1,column2,…} values(exp1,exp2,…);//插入
INSERT INTO Viewname {column1,column2,…} values(exp1,exp2,…);//插入视图实际影响表
UPDATE tablename SET name=’zang 3’ condition;//更新数据
DELETE FROM Tablename WHERE condition;//删除
GRANT (Select,delete,…) ON (对象) TO USER_NAME [WITH GRANT OPTION];//授权
REVOKE (权限表) ON(对象) FROM USER_NAME [WITH REVOKE OPTION] //撤权
列出工作人员及其领导的名字：
Select E.NAME, S.NAME FROM EMPLOYEE E S 
WHERE E.SUPERName=S.Name
4. 视图：
5. 完整性约束：实体完整性、参照完整性、用户定义完整性
6. 第三范式：
1NF:每个属性是不可分的。 2NF:若关系R是１NF,且每个非主属性都完全函数依赖于R的键。例SLC(SID#, CourceID#, SNAME,Grade),则不是2NF; 3NF:若R是2NF，且它的任何非键属性都不传递依赖于任何候选键。
7. ER(实体/联系)模型
8. [索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")作用
9. 事务：是一系列的[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")操作，是[数据库](http://lib.csdn.net/base/mysql "MySQL知识库")应用的基本逻辑单位。事务性质：原子性、
l 原子性。即不可分割性，事务要么全部被执行，要么就全部不被执行。
l 一致性或可串性。事务的执行使得[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")从一种正确状态转换成另一种正确状态
l 隔离性。在事务正确提交之前，不允许把该事务对数据的任何改变提供给任何其他事务，
l 持久性。事务正确提交后，其结果将永久保存在[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")中，即使在事务提交后有了其他故障，事务的处理结果也会得到保存。
10. 锁：共享锁、互斥锁 
两段锁协议：阶段１：加锁阶段 阶段２：解锁阶段
11. 死锁及处理：事务循环等待数据锁，则会死锁。 
死锁处理：预防死锁协议，死锁恢复机制
12. 存储过程：存储过程就是编译好了的一些sql语句。
1.存储过程因为SQL语句已经预编绎过了，因此运行的速度比较快。
2. 可保证数据的安全性和完整性。通过存储过程可以使没有权限的用户在控制之下间接地存取[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")，从而保证数据的安全。通过存储过程可以使相关的动作在一起发生，从而可以维护数据库的完整性。
3.可以降低网络的通信量。存储过程主要是在[服务器](http://www.baidu.com/s?wd=%B7%FE%CE%F1%C6%F7&tn=cnidc8&bar= "介绍服务器相关技术知识")上运行，减少对客户机的压力。
4：存储过程可以接受参数、输出参数、返回单个或多个结果集以及返回值。可以向程序返回错误原因
5：存储过程可以包含程序流、逻辑以及对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的查询。同时可以实体封装和隐藏了数据逻辑。   
13. 触发器： 当满足触发器条件，则系统自动执行触发器的触发体。
触发时间：有before,after.触发事件：有insert,update,delete三种。触发类型：有行触发、语句触发
14.内联接,外联接区别？
内连接是保证两个表中所有的行都要满足连接条件，而外连接则不然。
在外连接中，某些不满足条件的列也会显示出来，也就是说，只限制其中一个表的行，而不限制另一个表的行。分左连接、右连接、全连接三种

SQL试题2                           

一、
教师号　　星期号　是否有课
　１　　　　２　　　有
　１　　　　３　　　有
　２　　　　１　　　有
　３　　　　２　　　有`
　１　　　　２　　　有
写一条sql语句让你变为这样的表
教师号　星期一　星期二　星期三
　１　　　　　　　２　　　１　
　２　　　１　　　
　３　　　　　　　１
各星期下的数字表示：对应的教师在星期几已经排的课数

二、
书表(books)
book_id,book_name,creatdate,Lastmodifydate,decription
001,三个人的世界,2005-02-02,2005-07-07,NULL
作者表(authors)
A_id,A_name
01,王纷
02,李尚
03,泰和
部门表(depts)
d_id,d_name
001,编辑一部
002,编辑二部
003,编辑三部
书和作者关联表(bookmap)
book_id,A_id
001,01
001,02
001,03
部门和作者关联表(depmap)
d_id,a_id
001,01
002,02
003,03
找出每个部门的所写的总书两,比如,一本书有3个人写,如果三个人在不同的部门,则每个部门的总数量就是1.最后结果如下:
部门,书量
编辑一部,1
编辑二部,1
编辑三部,1

三、
两个表情况
表名：wu_plan 
ID      plan      model       corp_code     plannum     prixis
1       00001     exx22         nokia        2000         0
2       00002     lc001         sony         3000         0

表名：wu_bom
ID     plan       pact          amount    
1      00001      aa1            300
2      00001      aa2            200
3      00002      bb1            500
4      00002      bb2            800
5      00002      bb3            400

查询这两个表中plan唯一，每一个plan中，amount最少的，plannum大于prixis的记录
结果是:
ID      plan      model       corp_code     plannum     prixis     pact   amount
1       00001     exx22         nokia        2000         0       a2       200
2       00002     lc001         sony         3000         0       bb3      400

四、
表1结构如下：
部门 条码 品名 销售额 销售数量 销售日期

表2结构如下
课别 部门

要求：先按部门排序，再按销售额、销售数量排序检索出某个课别每个部门一个时期内的商品销售额的前三名，如查询01课别2007年4月15日到2007年4月22日每个部门一个周内的商品销售额合计的前三名

SQL 面试题目汇总

1．触发器的作用？

  答：触发器是一中特殊的存储过程，主要是通过事件来触发而被执行的。它可以强化约束，来维护数据的完整性和一致性，可以跟踪数据库内的操作从而不允许未经许可的更新和变化。可以联级运算。如，某表上的触发器上包含对另一个表的数据操作，而该操作又会导致该表触发器被触发。

2。什么是存储过程？用什么来调用？

答：存储过程是一个预编译的SQL语句，优点是允许模块化的设计，就是说只需创建一次，以后在该程序中就可以调用多次。如果某次操作需要执行多次SQL，使用存储过程比单纯SQL语句执行要快。可以用一个命令对象来调用存储过程。

3。索引的作用？和它的优点缺点是什么？

答：索引就一种特殊的查询表，数据库的搜索引擎可以利用它加速对数据的检索。它很类似与现实生活中书的目录，不需要查询整本书内容就可以找到想要的数据。索引可以是唯一的，创建索引允许指定单个列或者是多个列。缺点是它减慢了数据录入的速度，同时也增加了数据库的尺寸大小。

3。什么是内存泄漏？

答：一般我们所说的内存泄漏指的是堆内存的泄漏。堆内存是程序从堆中为其分配的，大小任意的，使用完后要显示释放内存。当应用程序用关键字new等创建对象时，就从堆中为它分配一块内存，使用完后程序调用free或者delete释放该内存，否则就说该内存就不能被使用，我们就说该内存被泄漏了。

4。维护数据库的完整性和一致性，你喜欢用触发器还是自写业务逻辑？为什么？

答：我是这样做的，尽可能使用约束，如check,主键，外键，非空字段等来约束，这样做效率最高，也最方便。其次是使用触发器，这种方法可以保证，无论什么业务系统访问数据库都可以保证数据的完整新和一致性。最后考虑的是自写业务逻辑，但这样做麻烦，编程复杂，效率低下。

5。什么是事务？什么是锁？

答：事务就是被绑定在一起作为一个逻辑工作单元的SQL语句分组，如果任何一个语句操作失败那么整个操作就被失败，以后操作就会回滚到操作前状态，或者是上有个节点。为了确保要么执行，要么不执行，就可以使用事务。要将有组语句作为事务考虑，就需要通过ACID[测试](http://lib.csdn.net/base/softwaretest "软件测试知识库")，即原子性，一致性，隔离性和持久性。

  锁：在所以的DBMS中，锁是实现事务的关键，锁可以保证事务的完整性和并发性。与现实生活中锁一样，它可以使某些数据的拥有者，在某段时间内不能使用某些数据或[数据结构](http://lib.csdn.net/base/datastructure "算法与数据结构知识库")。当然锁还分级别的。

6。什么叫视图？游标是什么？

答：视图是一种虚拟的表，具有和物理表相同的功能。可以对视图进行增，改，查，操作，试图通常是有一个表或者多个表的行或列的子集。对视图的修改不影响基本表。它使得我们获取数据更容易，相比多表查询。

  游标：是对查询出来的结果集作为一个单元来有效的处理。游标可以定在该单元中的特定行，从结果集的当前行检索一行或多行。可以对结果集当前行做修改。一般不使用游标，但是需要逐条处理数据的时候，游标显得十分重要。

7。为管理业务培训信息，建立3个表：

     S(S#,SN,SD,SA)S#,SN,SD,SA分别代表学号，学员姓名，所属单位，学员年龄

     C(C#,CN)C#,CN分别代表课程编号，课程名称

      SC(S#,C#,G) S#,C#,G分别代表学号，所选的课程编号，学习成绩

    （1）使用标准SQL嵌套语句查询选修课程名称为’税收基础’的学员学号和姓名?

          答案：select s# ,sn from s where S# in(select S# from c,sc where c.c#=sc.c# and cn=’税收基础’)

      (2) 使用标准SQL嵌套语句查询选修课程编号为’C2’的学员姓名和所属单位?

答：select sn,sd from s,sc where s.s#=sc.s# and sc.c#=’c2’

      (3) 使用标准SQL嵌套语句查询不选修课程编号为’C5’的学员姓名和所属单位?

答：select sn,sd from s where s# not in(select s# from sc where c#=’c5’)

       (4)查询选修了课程的学员人数

答：select 学员人数=count(distinct s#) from sc

       (5) 查询选修课程超过5门的学员学号和所属单位?

答：select sn,sd from s where s# in(select s# from sc group by s# having count(distinct c#)>5)

目前在职场中很难找到非常合格的数据库开发人员。有人说:“SQL开发是一门语言，它很容易学，但是很难掌握。” 

华为[http://sqlserver.365dev.net/sql-1981.html](http://sqlserver.365dev.net/sql-1981.html)

在面试过程中多次碰到两道SQL查询的题目，一是查询A(ID,Name)表中第31至40条记录，ID作为主键可能是不是连续增长的列，完整的查询语句如下：

select t.* from(select a.*,rownum rm from (select * from emp order by sal)a)t where t.rm between 11and 15

另外一道题目的要求是查询表A中存在ID重复三次以上的记录,完整的查询语句如下：
select * from(select count(deptno) as count,deptno from emp group by deptno)T where T.count>3

以上两道题目非常有代表意义，望各位把自己碰到的有代表的查询都贴上来。

在面试应聘的SQL Server数据库开发人员时，我运用了一套标准的基准技术问题。下面这些问题是我觉得能够真正有助于淘汰不合格应聘者的问题。它们按照从易到难的顺序排列。当你问到关于主键和外键的问题时，后面的问题都十分有难度，因为答案可能会更难解释和说明，尤其是在面试的情形下。

你能向我简要叙述一下SQL Server 2000中使用的一些数据库对象吗?

你希望听到的答案包括这样一些对象:表格、视图、用户定义的函数，以及存储过程;如果他们还能够提到像触发器这样的对象就更好了。如果应聘者不能回答这个基本的问题，那么这不是一个好兆头。

NULL是什么意思?

NULL(空)这个值是数据库世界里一个非常难缠的东西，所以有不少应聘者会在这个问题上跌跟头您也不要觉得意外。

NULL这个值表示UNKNOWN(未知):它不表示“”(空字符串)。假设您的SQL Server数据库里有ANSI_NULLS，当然在默认情况下会有，对NULL这个值的任何比较都会生产一个NULL值。您不能把任何值与一个 UNKNOWN值进行比较，并在逻辑上希望获得一个答案。您必须使用IS NULL操作符。

什么是索引?SQL Server 2000里有什么类型的索引?

任何有经验的数据库开发人员都应该能够很轻易地回答这个问题。一些经验不太多的开发人员能够回答这个问题，但是有些地方会说不清楚。

简单地说，索引是一个数据结构，用来快速访问数据库表格或者视图里的数据。在SQL Server里，它们有两种形式:聚集索引和非聚集索引。聚集索引在索引的叶级保存数据。这意味着不论聚集索引里有表格的哪个(或哪些)字段，这些字段都会按顺序被保存在表格。由于存在这种排序，所以每个表格只会有一个聚集索引。非聚集索引在索引的叶级有一个行标识符。这个行标识符是一个指向磁盘上数据的指针。它允许每个表格有多个非聚集索引。

什么是主键?什么是外键?

主键是表格里的(一个或多个)字段，只用来定义表格里的行;主键里的值总是唯一的。外键是一个用来建立两个表格之间关系的约束。这种关系一般都涉及一个表格里的主键字段与另外一个表格(尽管可能是同一个表格)里的一系列相连的字段。那么这些相连的字段就是外键。

什么是触发器?SQL Server 2000有什么不同类型的触发器?

让未来的数据库开发人员知道可用的触发器类型以及如何实现它们是非常有益的。

触发器是一种专用类型的存储过程，它被捆绑到SQL Server 2000的表格或者视图上。在SQL Server 2000里，有INSTEAD-OF和AFTER两种触发器。INSTEAD-OF触发器是替代数据操控语言(Data Manipulation Language，DML)语句对表格执行语句的存储过程。例如，如果我有一个用于TableA的INSTEAD-OF-UPDATE触发器，同时对这个表格执行一个更新语句，那么INSTEAD-OF-UPDATE触发器里的代码会执行，而不是我执行的更新语句则不会执行操作。

AFTER触发器要在DML语句在数据库里使用之后才执行。这些类型的触发器对于监视发生在数据库表格里的数据变化十分好用。

您如何确一个带有名为Fld1字段的TableB表格里只具有Fld1字段里的那些值，而这些值同时在名为TableA的表格的Fld1字段里?

这个与关系相关的问题有两个可能的答案。第一个答案(而且是您希望听到的答案)是使用外键限制。外键限制用来维护引用的完整性。它被用来确保表格里的字段只保存有已经在不同的(或者相同的)表格里的另一个字段里定义了的值。这个字段就是候选键(通常是另外一个表格的主键)。

另外一种答案是触发器。触发器可以被用来保证以另外一种方式实现与限制相同的作用，但是它非常难设置与维护，而且性能一般都很糟糕。由于这个原因，微软建议开发人员使用外键限制而不是触发器来维护引用的完整性。

对一个投入使用的在线事务处理表格有过多索引需要有什么样的性能考虑?

你正在寻找进行与数据操控有关的应聘人员。对一个表格的索引越多，数据库引擎用来更新、插入或者删除数据所需要的时间就越多，因为在数据操控发生的时候索引也必须要维护。

你可以用什么来确保表格里的字段只接受特定范围里的值?

这个问题可以用多种方式来回答，但是只有一个答案是“好”答案。您希望听到的回答是Check限制，它在数据库表格里被定义，用来限制输入该列的值。

触发器也可以被用来限制数据库表格里的字段能够接受的值，但是这种办法要求触发器在表格里被定义，这可能会在某些情况下影响到性能。因此，微软建议使用Check限制而不是其他的方式来限制域的完整性。

如果应聘者能够正确地回答这个问题，那么他的机会就非常大了，因为这表明他们具有使用存储过程的经验。

返回参数总是由存储过程返回，它用来表示存储过程是成功还是失败。返回参数总是INT数据类型。

OUTPUT参数明确要求由开发人员来指定，它可以返回其他类型的数据，例如字符型和数值型的值。(可以用作输出参数的数据类型是有一些限制的。)您可以在一个存储过程里使用多个OUTPUT参数，而您只能够使用一个返回参数。

什么是相关子查询?如何使用这些查询?

经验更加丰富的开发人员将能够准确地描述这种类型的查询。

相关子查询是一种包含子查询的特殊类型的查询。查询里包含的子查询会真正请求外部查询的值，从而形成一个类似于循环的状况。

# <a name="t1" style="text-decoration: none; color: rgb(12, 137, 207); "></a>数据库面试

一:SQL tuning 类
1.       列举几种表连接方式
Answer：等连接（内连接）、非等连接、自连接、外连接（左、右、全）

Or hash join/merge join/nest loop(cluster join)/index join ？？

[Oracle](http://lib.csdn.net/base/oracle "Oracle知识库") 8i，9i 表连接方法。

一般的相等连接： select * from a, b where a.id = b.id; 这个就属于内连接。

对于外连接：

Oracle中可以使用“(+) ”来表示，9i可以使用LEFT/RIGHT/FULL OUTER JOIN

LEFT OUTER JOIN：左外关联

SELECT e.last_name, e.department_id, d.department_name

FROM employees e

LEFT OUTER JOIN departments d

ON (e.department_id = d.department_id);

等价于

SELECT e.last_name, e.department_id, d.department_name

FROM employees e, departments d

WHERE e.department_id=d.department_id(+)

结果为：所有员工及对应部门的记录，包括没有对应部门编号department_id的员工记录。

RIGHT OUTER JOIN：右外关联

SELECT e.last_name, e.department_id, d.department_name

FROM employees e

RIGHT OUTER JOIN departments d

ON (e.department_id = d.department_id);

等价于

SELECT e.last_name, e.department_id, d.department_name

FROM employees e, departments d

WHERE e.department_id(+)=d.department_id

结果为：所有员工及对应部门的记录，包括没有任何员工的部门记录。

FULL OUTER JOIN：全外关联

SELECT e.last_name, e.department_id, d.department_name

FROM employees e

FULL OUTER JOIN departments d

ON (e.department_id = d.department_id);

结果为：所有员工及对应部门的记录，包括没有对应部门编号department_id的员工记录和没有任何员工的部门记录。

ORACLE8i是不直接支持完全外连接的语法，也就是说不能在左右两个表上同时加上(+)，下面是在ORACLE8i可以参考的完全外连接语法

select t1.id,t2.id from table1 t1,table t2 where t1.id=t2.id(+)

union

select t1.id,t2.id from table1 t1,table t2 where t1.id(+)=t2.id

连接类型
定义
图示
例子

内连接
只连接匹配的行

select A.c1,B.c2 from A join B on A.c3 = B.c3;

左外连接
包含左边表的全部行（不管右边的表中是否存在与它们匹配的行）以及右边表中全部匹配的行

select A.c1,B.c2 from A left join B on A.c3 = B.c3;

右外连接
包含右边表的全部行（不管左边的表中是否存在与它们匹配的行）以及左边表中全部匹配的行

select A.c1,B.c2 from A right join B on A.c3 = B.c3;

全外连接
包含左、右两个表的全部行，不管在另一边的表中是否存在与它们匹配的行

select A.c1,B.c2 from A full join B on A.c3 = B.c3;

（theta）连接
使用等值以外的条件来匹配左、右两个表中的行

select A.c1,B.c2 from A join B on A.c3 != B.c3;

交叉连接
生成笛卡尔积——它不使用任何匹配或者选取条件，而是直接将一个数据源中的每个行与另一个数据源的每个行一一匹配

select A.c1,B.c2 from A,B;

2.       不借助第三方工具，怎样查看sql的执行计划
I) 使用Explain Plan,查询PLAN_TABLE;

   EXPLAIN   PLAN

      SET STATEMENT_ID='QUERY1'

      FOR

      SELECT *

      FROM a

      WHERE aa=1;

   SELECT    operation, options, object_name, object_type, ID, parent_id

       FROM plan_table

      WHERE STATEMENT_ID = 'QUERY1'

   ORDER BY ID;

II)SQLPLUS中的SET TRACE 即可看到Execution Plan Statistics

   SET AUTOTRACE ON;

3.       如何使用CBO,CBO与RULE的区别
   IF 初始化参数 OPTIMIZER_MODE = CHOOSE THEN   --(8I DEFAULT)

      IF 做过表分析

         THEN [优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")器 Optimizer=CBO(COST);           /*高效*/

      ELSE

         [优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")器 Optimizer=RBO(RULE);                /*高效*/

      END IF;

   END IF;

   区别：

   RBO根据规则选择最佳执行路径来运行查询。

   CBO根据表统计找到最低成本的访问数据的方法确定执行计划。

   使用CBO需要注意：

   I)   需要经常对表进行ANALYZE命令进行分析统计;

   II) 需要稳定执行计划;

   III)需要使用提示(Hint);

   使用RULE需要注意：

I)   选择最有效率的表名顺序

II) [优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")SQL的写法;

在optimizer_mode=choose时,如果表有统计信息（分区表外）,[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")器将选择CBO,否则选RBO。

RBO遵循简单的分级方法学,使用15种级别要点，当接收到查询，[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")器将评估使用到的要点数目,然后选择最佳级别（最少的数量）的执行路径来运行查询。

CBO尝试找到最低成本的访问数据的方法,为了最大的吞吐量或最快的初始响应时间,计算使用不同的执行计划的成本，并选择成本最低的一个,关于表的数据内容的统计被用于确定执行计划。

4.       如何定位重要(消耗资源多)的SQL
使用CPU多的用户session

SELECT a.SID, spid, status, SUBSTR (a.program, 1, 40) prog, a.terminal,a.SQL_TEXT, osuser, VALUE / 60 / 100 VALUE

FROM v$session a, v$process b, v$sesstat c

WHERE c.statistic# = 12 AND c.SID = a.SID AND a.paddr = b.addr

ORDER BY VALUE DESC;

select sql_text from v$sql

where disk_reads > 1000 or (executions > 0 and buffer_gets/executions > 30000);

5.       如何跟踪某个session的SQL
利用TRACE 跟踪

   ALTER SESSION SET SQLTRACE ON;

   COLUMN SQL format a200;

   SELECT    machine, sql_text SQL

       FROM v$sqltext a, v$session b

      WHERE address = sql_address

        AND machine = '&A'

   ORDER BY hash_value, piece;

exec dbms_system.set_sql_trace_in_session(sid,serial#,&sql_trace);

select sid,serial# from v$session where sid = (select sid from v$mystat where rownum = 1);

exec dbms_system.set_ev(&sid,&serial#,&event_10046,&level_12,'');

6.       SQL调整最关注的是什么
检查系统的I/O问题

sar－d能检查整个系统的iostat（IO statistics）

查看该SQL的response time(db block gets/consistent gets/physical reads/sorts (disk))

7.       说说你对[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")的认识（索引的[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")、对dml影响、对查询影响、为什么提高查询性能）
[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")有B-TREE、BIT、CLUSTER等类型。ORACLE使用了一个复杂的自平衡B-tree[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识");通常来说，在表上建立恰当的索引，查询时会改进查询性能。但在进行插入、删除、修改时，同时会进行索引的修改，在性能上有一定的影响。有索引且查询条件能使用索引时，[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")会先度取索引，根据索引内容和查询条件，查询出ROWID，再根据ROWID取出需要的数据。由于索引内容通常比全表内容要少很多，因此通过先读索引，能减少I/O，提高查询性能。

b-tree index/bitmap index/function index/patitional index(local/global)[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")通常能提高select/update/delete的性能,会降低insert的速度,

8.       使用[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")查询一定能提高查询的性能吗？为什么
通常,通过[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")查询数据比全表扫描要快.但是我们也必须注意到它的代价.

[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")需要[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)来存储,也需要定期维护, 每当有记录在表中增减或索引列被修改时,索引本身也会被修改. 这意味着每条记录的INSERT,DELETE,UPDATE将为此多付出4,5 次的磁盘I/O. 因为索引需要额外的存储空间和处理,那些不必要的索引反而会使查询反应时间变慢.使用索引查询不一定能提高查询性能,索引范围查询(INDEX RANGE SCAN)适用于两种情况:

基于一个范围的检索,一般查询返回结果集小于表中记录数的30%宜采用;

基于非唯一性[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")的检索

[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")就是为了提高查询性能而存在的,如果在查询中索引没有提高性能,只能说是用错了索引,或者讲是场合不同

9.       绑定变量是什么？绑定变量有什么优缺点？
绑定变量是指在SQL语句中使用变量，改变变量的值来改变SQL语句的执行结果。

优点：使用绑定变量，可以减少SQL语句的解析，能减少[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")引擎消耗在SQL语句解析上的资源。提高了编程效率和可靠性。减少访问数据库的次数, 就能实际上减少ORACLE的工作量。

缺点：经常需要使用动态SQL的写法，由于参数的不同，可能SQL的执行效率不同；

绑定变量是相对文本变量来讲的,所谓文本变量是指在SQL直接书写查询条件，

这样的SQL在不同条件下需要反复解析,绑定变量是指使用变量来代替直接书写条件，查询bind value在运行时传递，然后绑定执行。

优点是减少硬解析,降低CPU的争用,节省shared_pool

缺点是不能使用histogram,sql[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")比较困难

10.   如何稳定(固定)执行计划
可以在SQL语句中指定执行计划。使用HINTS;

query_rewrite_enabled = true

star_transformation_enabled = true

optimizer_features_enable = 9.2.0

创建并使用stored outline

11.   和排序相关的内存在8i和9i分别怎样调整，临时表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)的作用是什么
SORT_AREA_SIZE 在进行排序操作时，如果排序的内容太多，内存里不能全部放下，则需要进行外部排序，

此时需要利用临时表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)来存放排序的中间结果。

8i中sort_area_size/sort_area_retained_size决定了排序所需要的内存， 如果排序操作不能在sort_area_size中完成,就会用到temp表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)

9i中如果workarea_size_policy=auto时,

排序在pga内进行,通常pga_aggregate_target的1/20可以用来进行disk sort;

如果workarea_size_policy=manual时,排序需要的内存由sort_area_size决定， 在执行order by/group by/distinct/union/create index/index rebuild/minus等操作时,如果在pga或sort_area_size中不能完成,排序将在临时表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)进行（disk sort）,临时表空间主要作用就是完成系统中的disk sort.

12.   存在表T(a,b,c,d),要根据字段c排序后取第21—30条记录显示，请给出sql
     SELECT    *

         FROM (SELECT ROWNUM AS row_num, tmp_tab.*

                 FROM (SELECT    a, b, c, d

                           FROM T

                       ORDER BY c) tmp_tab

                WHERE ROWNUM <= 30)

        WHERE row_num >= 20

ORDER BY row_num;

create table t(a number(,b number(,c number(,d number();

/

begin

for i in 1 .. 300 loop

insert into t values(mod(i,2),i/2,dbms_random.value(1,300),i/4);

end loop;

end;

/

select * from (select c.*,rownum as rn from (select * from t order by c desc) c) where rn between 21 and 30;

/

select * from (select * from test order by c desc) x where rownum < 30

minus

select * from (select * from test order by c desc) y where rownum < 20 order by 3 desc

相比之 minus性能较差

二：[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")基本概念类
1 Pctused and pctfree 表示什么含义有什么作用
pctused与pctfree控制数据块是否出现在freelist中,   pctfree控制数据块中保留用于update的[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=),当数据块中的free space小于pctfree设置的空间时,该数据块从freelist中去掉,当块由于dml操作free space大于pct_used设置的空间时,该[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")块将被添加在freelist链表中。

2 简单描述tablespace / segment / extent / block之间的关系
tablespace: 一个[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")划分为一个或多个逻辑单位，该逻辑单位成为表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=);每一个表空间可能包含一个或多个 Segment;

Segments: Segment指在tablespace中为特定逻辑存储[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")分配的[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)。每一个段是由一个或多个extent组成。包括数据段、[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")段、回滚段和临时段。

Extents: 一个 extent 由一系列连续的 Oracle blocks组成.ORACLE为通过extent 来给segment分配[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)。

Data Blocks：Oracle [数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")最小的I/O存储单位，一个data block对应一个或多个分配给data file的[操作系统](http://lib.csdn.net/base/operatingsystem "操作系统知识库")块。

table创建时,默认创建了一个data segment,每个data segment含有min extents指定的extents数,每个extent据据表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)的存储参数分配一定数量的blocks

3 描述tablespace和datafile之间的关系
一个表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)可包含一个或多个数据文件。表空间利用增加或扩展数据文件扩大表空间，表空间的大小为组成该表空间的数据文件大小的和。一个datafile只能属于一个表空间;

一个tablespace可以有一个或多个datafile,每个datafile只能在一个tablespace内, table中的数据,通过hash[算法](http://lib.csdn.net/base/datastructure "算法与数据结构知识库")分布在tablespace中的各个datafile中,tablespace是逻辑上的概念,datafile则在物理上储存了[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的种种对象。

4 本地管理表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)和字典管理表空间的特点，ASSM有什么特点
本地管理表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)：（9i默认）空闲块列表存储在表空间的数据文件头。

特点：减少数据字典表的竞争，当分配和收缩[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)时会产生回滚，不需要合并。

字典管理表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)：（8i默认）空闲块列表存储在[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")中的字典表里.

特点：片由数据字典管理，可能造成字典表的争用。存储在表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)的每一个段都会有不同的存储字句，需要合并相邻的块;

本地管理表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)（Locally Managed Tablespace简称LMT）

8i以后出现的一种新的表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)的管理模式，通过位图来管理表空间的空间使用。字典管理表空间（Dictionary-Managed Tablespace简称DMT）

8i以前包括以后都还可以使用的一种表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)管理模式，通过数据字典管理表空间的空间使用。动段空间管理（ASSM），它首次出现在Oracle920里有了ASSM，链接列表freelist被位图所取代，它是一个二进制的数组，

能够迅速有效地管理存储扩展和剩余区块（free block），因此能够改善分段存储本质，ASSM表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)上创建的段还有另外一个称呼叫Bitmap Managed Segments（BMB 段）。

5 回滚段的作用是什么
回滚段用于保存数据修改前的映象，这些信息用于生成读一致性[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")信息、在数据库恢复和Rollback时使用。一个事务只能使用一个回滚段。

事务回滚：当事务修改表中数据的时候，该数据修改前的值（即前影像）会存放在回滚段中，当用户回滚事务（ROLLBACK）时，ORACLE将会利用回滚段中的数据前影像来将修改的数据恢复到原来的值。

事务恢复：当事务正在处理的时候，例程失败，回滚段的信息保存在undo表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)中，ORACLE将在下次打开[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")时利用回滚来恢复未提交的数据。

读一致性：当一个会话正在修改数据时，其他的会话将看不到该会话未提交的修改。 当一个语句正在执行时，该语句将看不到从该语句开始执行后的未提交的修改（语句级读一致性）

当ORACLE执行SELECT语句时，ORACLE依照当前的系统改变号（SYSTEM CHANGE NUMBER-SCN） 来保证任何前于当前SCN的未提交的改变不被该语句处理。可以想象：当一个长时间的查询正在执行时， 若其他会话改变了该查询要查询的某个数据块，ORACLE将利用回滚段的数据前影像来构造一个读一致性视图

6 日志的作用是什么
日志文件（Log File）记录所有对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")数据的修改，主要是保护数据库以防止故障,以及恢复数据时使用。其特点如下：

   a)每一个[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")至少包含两个日志文件组。每个日志文件组至少包含两个日志文件成员。

   b)日志文件组以循环方式进行写操作。

   c)每一个日志文件成员对应一个物理文件。

记录[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")事务,最大限度地保证数据的一致性与安全性  

重做日志文件：含对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")所做的更改记录，这样万一出现故障可以启用数据恢复,一个数据库至少需要两个重做日志文件

归档日志文件：是重做日志文件的脱机副本，这些副本可能对于从介质失败中进行恢复很必要。

7 SGA主要有那些部分，主要作用是什么
系统全局区（SGA）:是ORACLE为实例分配的一组共享缓冲存储区，用于存放[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")数据和控制信息，以实现对数据库数据的管理和操作。

SGA主要包括:

a)共享池(shared pool) ：用来存储最近执行的SQL语句和最近使用的数据字典的数据。

b)数据缓冲区 (database buffer cache)：用来存储最近从数据文件中读写过的数据。

c)重作日志缓冲区（redo log buffer）：用来记录服务或后台进程对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的操作。

另外在SGA中还有两个可选的内存[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")：

d)[java](http://www.baidu.com/s?wd=java&tn=cnidc8&bar=) pool:   用来存储[Java](http://lib.csdn.net/base/javase "Java SE知识库")代码。

e)Large pool: 用来存储不与SQL直接相关的大型内存[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")。备份、恢复使用。

GA：db_cache/shared_pool/large_pool/[java](http://www.baidu.com/s?wd=java&tn=cnidc8&bar=)_pool

db_cache: [数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")缓存（Block Buffer）对于Oracle数据库的运转和性能起着非常关键的作用，它占据Oracle数据库SGA（系统共享内存区）的主要部分。Oracle数据库通过使用LRU算法，将最近访问的数据块存放到缓存中，从而[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")对磁盘数据的访问.

shared_pool: 共享池的大小对于Oracle 性能来说都是很重要的。共享池中保存数据字典高速缓冲和完全解析或编译的的PL/SQL 块和SQL 语句及控制[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")

large_pool: 使用MTS配置时，因为要在SGA中分配UGA来保持用户的会话，就是用Large_pool来保持这个会话内存使用RMAN做备份的时候，要使用Large_pool这个内存[结构](http://www.baidu.com/s?wd=%BD%E1%B9%B9&tn=cnidc8&bar= "介绍网站结构的相关技术,技巧,知识")来做磁盘I/O缓存器

[java](http://www.baidu.com/s?wd=java&tn=cnidc8&bar=)_pool: 为java procedure预备的内存区域,如果没有使用java proc,java_pool不是必须的

8 Oracle系统进程主要有哪些，作用是什么
数据写进程(DBWR)：负责将更改的数据从[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")缓冲区高速缓存写入数据文件

日志写进程(LGWR)：将重做日志缓冲区中的更改写入在线重做日志文件

系统监控   (SMON): 检查[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的一致性如有必要还会在数据库打开时启动数据库的恢复

进程监控   (PMON): 负责在一个Oracle 进程失败时清理资源

检查点进程(CKPT)：负责在每当缓冲区高速缓存中的更改永久地记录在[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")中时,更新控制文件和数据文件中的数据库状态信息。

归档进程   (ARCH)：在每次日志切换时把已满的日志组进行备份或归档

恢复进程   (RECO): 保证分布式事务的一致性,在分布式事务中,要么同时commit,要么同时rollback;

作业调度器(CJQ ):   负责将调度与执行系统中已定义好的job,完成一些预定义的工作.

三：备份恢复类
1 备份如何分类
逻辑备份：exp/imp 指定表的逻辑备份

物理备份：

热备份:alter tablespace begin/end backup;

冷备份:脱机备份(database shutdown)

RMAN备份

full backup/incremental backup(累积/差异)

物理备份

物理备份是最主要的备份方式。用于保证[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")在最小的数据库丢失或没有数据丢失的情况下得到恢复。

冷物理

冷物理备份提供了最简单和最直接的方法保护[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")因物理损坏丢失。建议在以下几种情况中使用。

对一个已经存在大最数据量的[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")，在晚间数据库可以关闭，此时应用冷物理备份。

对需对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")[服务器](http://www.baidu.com/s?wd=%B7%FE%CE%F1%C6%F7&tn=cnidc8&bar= "介绍服务器相关技术知识")进行升级，（如更换硬盘），此时需要备份数据库信息，并在新的硬盘中恢复这些数据信息，建议采用冷物理备份。

热物理

主要是指备份过程在[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")打开并且用户可以使用的情况下进行。需要执行热物理备份的情况有：

由于[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")性质要求不间断工作，因而此时只能采用热物理备份。

由于备份的要求的时间过长，而[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")只能短时间关闭时。

逻辑备份 (EXP/IMP)

逻辑备份用于实现[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")对象的恢复。但不是基于时间点可完全恢复的备份策略。只能作为联机备份和脱机备份的一种补充。

完全逻辑备份

完全逻辑备份是将整个[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")导出到一个数据库的格式文件中，该文件可以在不同的数据库版本、操作系统和硬件平台之间进行移植。

指定表的逻辑备份

通过备份工具，可以将指定的[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")表备份出来，这可以避免完全逻辑备份所带来的时间和财力上的浪费。

2 归档是什么含义 
关于归档日志：Oracle要将填满的在线日志文件组归档时,则要建立归档日志（archived redo log）。其对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")备份和恢复有下列用处：

[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")后备以及在线和归档日志文件，在操作系统和磁盘故障中可保证全部提交的事物可被恢复。

在[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")打开和正常系统使用下，如果归档日志是永久保存，在线后备可以进行和使用。

[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")可运行在两种不同方式下：NOARCHIVELOG方式或ARCHIVELOG 方式

[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")在NOARCHIVELOG方式下使用时，不能进行在线日志的归档,

[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")在ARCHIVELOG方式下运行，可实施在线日志的归档

归档是归档当前的联机redo日志文件。

SVRMGR> alter system archive log current;

[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")只有运行在ARCHIVELOG模式下，并且能够进行自动归档，才可以进行联机备份。有了联机备份才有可能进行完全恢复。

3 如果一个表在2004-08-04 10:30:00 被drop，在有完善的归档和备份的情况下，如何恢复
9i 新增的FLASH BACK 应该可以;

Logminer应该可以找出DML。

有完善的归档和备份，先归档当前数据，然后可以先恢复到删除的时间点之前，把DROP 的表导出来，然后再恢复到最后归档时间；

手工拷贝回所有备份的数据文件

Sql〉startup mount;

sql〉alter database recover automatic until time '2004-08-04:10:30:00';

sql〉alter database open resetlogs;

4 rman是什么，有何特点
RMAN(Recovery Manager)是DBA的一个重要工具，用于备份、还原和恢复oracle[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识"), RMAN 可以用来备份和恢复数据库文件、归档日志、控制文件、系统参数文件,也可以用来执行完全或不完全的数据库恢复。

RMAN有三种不同的用户接口：COMMAND LINE方式、GUI 方式（集成在OEM 中的备份管理器）、API 方式（用于集成到第三方的备份软件中）。

具有如下特点：

1）功能类似物理备份，但比物理备份强大N倍；

2）可以压缩空块；

3）可以在块水平上实现增量；

4）可以把备份的输出打包成备份集，也可以按固定大小分割备份集；

5）备份与恢复的过程可以自动管理；

6）可以使用脚本（存在Recovery catalog 中）

7）可以做坏块监测

5 standby的特点
备用[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")（standby database）：ORACLE推出的一种高可用性(HIGH AVAILABLE)数据库方案，在主节点与备用节点间通过日志同步来保证数据的同步，备用节点作为主节点的备份，可以实现快速切换与灾难性恢复,从920开始，还开始支持物理与逻辑备用[服务器](http://www.baidu.com/s?wd=%B7%FE%CE%F1%C6%F7&tn=cnidc8&bar= "介绍服务器相关技术知识")。

9i中的三种数据保护模式分别是：

1)、MAXIMIZE PROTECTION ：最[大数据](http://lib.csdn.net/base/hadoop "Hadoop知识库")保护与无数据分歧，LGWR将同时传送到备用节点，在主节点事务确认之前，备用节点也必须完全收到日志数据。如果网络不好，引起LGWR不能传送数据，将引起严重的性能问题，导致主节点DOWN机。

2)、MAXIMIZE AVAILABILITY ：无数据丢失模式，允许数据分歧，允许异步传送。

正常情况下运行在最大保护模式，在主节点与备用节点的网络断开或连接不正常时，自动切换到最大性能模式，主节点的操作还是可以继续的。在网络不好的情况下有较大的性能影响。

3)、MAXIMIZE PERFORMANCE：这种模式应当可以说是从8i继承过来的备用[服务器](http://www.baidu.com/s?wd=%B7%FE%CE%F1%C6%F7&tn=cnidc8&bar= "介绍服务器相关技术知识")模式，异步传送，无数据同步检查，可能丢失数据，但是能获得主节点的最大性能。9i在配置DATA GUARD的时候默认就是MAXIMIZE PERFORMANCE

6 对于一个要求恢复时间比较短的系统([数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")50G,每天归档5G)，你如何[设计](http://www.baidu.com/s?wd=%C9%E8%BC%C6&tn=cnidc8&bar= "介绍网站设计的相关技术,技巧,知识")备份策略
[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")比较大逻辑备份没什么必要，每天归档5G，每周三/周六自动归档10G，每月RMAN归档全库。应该有standby。

rman/每月一号 level 0 每周末/周三 level 1 其它每天level 2

四：系统管理类
1.       对于一个存在系统性能的系统，说出你的诊断处理思路
ü          做statspack收集系统相关信息   了解系统大致情况/确定是否存在参数设置不合适的地方/查看top 5 event/查看top sql等

ü          查v$system_event/v$session_event/v$session_wait 从v$system_event开始,确定需要什么资源(db file sequential read)等，深入[研究](http://www.baidu.com/s?wd=%D1%D0%BE%BF&tn=cnidc8&bar= "介绍研究网站发展的相关技术,技巧,知识")v$session_event,确定等待事件涉及的会话，从v$session_wait确定详细的资源争用情况(p1-p3的值:file_id/block_id/blocks等)

ü          通过v$sql/v$sqltext/v$sqlarea表确定disk_reads、(buffer_gets/executions)值较大的SQL

2.       列举几种诊断IO、CPU、性能状况的方法
top   uptime   vmstat   iostat   statspack   sql_trace/tkprof

查v$system_event/v$session_event/v$session_wait

查v$sqlarea(disk_reads或buffer_gets/executions较大的SQL)

或者第三方的监视工具，TOAD就不错。

3.       对statspack有何认识
认识不深。仅限了解。StapSpack是Oracle公司提供的一个收集[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")运行性能指标的软件包。可以做数据库健康检查报告。

StapSpack是Oracle公司提供的一个收集[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")运行性能指标的软件包，该软件包从8i起，在9i、10g都有显著的增强

该软件包的辅助表（存储相关参数与收集的性能指标的表）由最初的25个增长到43个

收集级别参数由原来的3个（0、5、10）增加到5个（0、5、6、7、10）

通过分析收集的性能指标，[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")管理员可以详细地了解数据库目前的运行情况，对数据库实例、等待事件、SQL等进行[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")调整

利用statspack收集的snapshot,可以统计制作[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的各种性能指标的统计趋势图表。

4.       如果系统现在需要在一个很大的表上创建一个[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")，你会考虑那些因素，如何做以尽量减小对应用的影响
可以先表分析一下，然后测试创建[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")前后对应用的性能影响；

需要考虑的是该[索引](http://www.baidu.com/s?wd=%CB%F7%D2%FD&tn=cnidc8&bar= "介绍搜索引擎相关技术知识")列不经常更新，不是有很多重复值的情况时, 在大表中使用索引特别有效. 创建的索引可以跟数据表分不同表[空间](http://www.baidu.com/s?wd=%BF%D5%BC%E4&tn=cnidc8&bar=)存储。

在系统比较空闲时nologging选项（如果有dataguard则不可以使用nologging）

大的sort_ared_size或pga_aggregate_target较大

5.       对raid10 和raid5有何认识
RAID 10(或称RAID 1＋0)与RAID 0＋1不同，它是用硬盘驱动器先组成RAID 1阵列，然后在RAID 1阵列之间再组成RAID 0阵列。

RAID 10模式同RAID 0+1模式一样具有良好的数据传输性能，但却比RAID 0+1具有更高的可靠性。RAID 10阵列的实际容量为M×n/2，磁盘利用率为50％。RAID 10也需要至少4个硬盘驱动器构成，因而价格昂贵。

RAID 10的可靠性同RAID 1一样，但由于RAID 10硬盘驱动器之间有数据分割，因而数据传输性能优良。  

RAID 5与RAID 3很相似，不同之处在于RAID 5的奇偶校验信息也同数据一样被分割保存到所有的硬盘驱动器，而不是写入一个指定的硬盘驱动器，从而消除了单个奇偶校验硬盘驱动器的瓶颈问题。RAID 5磁盘阵列的性能比RAID 3有所提高，但仍然需要至少3块硬盘驱动器。其实际容量为M×(n-1)，磁盘利用率为(n-1)/n 。  

五：综合随意类
1.       你最擅长的是oracle哪部分?
pl/sql及sql[优化](http://www.baidu.com/s?wd=%D3%C5%BB%AF&tn=cnidc8&bar= "介绍优化相关技术,技巧,知识")

2.       喜欢oracle吗？喜欢上论坛吗？或者偏好oracle的哪一部分？
喜欢。PL/SQL比较得心应手。

3.       随意说说你觉得oracle最有意思的部分或者最困难的部分
我对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的备份/恢复和性能调优经验明显不足，自然觉得有些困难。

基于ORACLE的[研究](http://www.baidu.com/s?wd=%D1%D0%BE%BF&tn=cnidc8&bar= "介绍研究网站发展的相关技术,技巧,知识")应该是个宽广的领域，所以我觉得还是有意思的。

4.       为何要选择做DBA呢?
我对[数据库](http://www.baidu.com/s?wd=%CA%FD%BE%DD%BF%E2&tn=cnidc8&bar= "介绍数据库相关技术知识")的备份/恢复和性能调优经验明显不足，主要是缺乏环境和交流。

因此，算不上什么DBA。不过因此我更需要这样的机会。

不过就整个ORACLE 来说，一直从事与它相关的工作，感情还是颇深的。放弃可惜。而且就技术本身而言我觉得自己还是有学习和创新的能力，它的诸如数据仓库，数据挖掘之类的领域也很广。

数据库面试笔试题集

| 

第一套 
一．选择题 
1. 下面叙述正确的是______。 
A、算法的执行效率与数据的存储结构无关 
B、算法的空间复杂度是指算法程序中指令（或语句）的条数 
C、算法的有穷性是指算法必须能在执行有限个步骤之后终止D、以上三种描述都不对 
2. 以下数据结构中不属于线性数据结构的是______。A、队列B、线性表C、二叉树D、栈 
3. 在一棵二叉树上第5层的结点数最多是______。A、8 B、16 C、32 D、15 
4. 下面描述中，符合结构化程序设计风格的是______。 
A、使用顺序、选择和重复（循环）三种基本控制结构表示程序的控制逻辑 
B、模块只有一个入口，可以有多个出口 
C、注重提高程序的执行效率 D、不使用goto语句 
5. 下面概念中，不属于面向对象方法的是______。 
A、对象 B、继承 C、类 D、过程调用 
6. 在结构化方法中，用数据流程图（DFD）作为描述工具的软件开发阶段是______。 
A、可行性分析 B、需求分析 C、详细设计 D、程序编码 
7. 在软件开发中，下面任务不属于设计阶段的是______。 
A、数据结构设计 B、给出系统模块结构 C、定义模块算法 D、定义需求并建立系统模型 
8. 数据库系统的核心是______。 
A、数据模型 B、数据库管理系统 C、软件工具 D、数据库 
9. 下列叙述中正确的是______。 
A、数据库是一个独立的系统，不需要操作系统的支持 
B、数据库设计是指设计数据库管理系统 
C、数据库技术的根本目标是要解决数据共享的问题 
D、数据库系统中，数据的物理结构必须与逻辑结构一致 
10. 下列模式中，能够给出数据库物理存储结构与物理存取方法的是______。 
A、内模式 B、外模式 C、概念模式 D、逻辑模式 
11. Visual FoxPro数据库文件是______。 
A、存放用户数据的文件 B、管理数据库对象的系统文件 
C、存放用户数据和系统的文件 D、前三种说法都对 
12. SQL语句中修改表结构的命令是______。 
A、MODIFY TABLE B、MODIFY STRUCTURE C、ALTER TABLE D、ALTER STRUCTURE 
13. 如果要创建一个数据组分组报表，第一个分组表达式是"部门"，第二个分组表达式是"性别"，第三个分组表达式是"基本工资"，当前索引的索引表达式应当是______。 
A、部门+性别+基本工资 B、部门+性别+STR（基本工资） 
C、STR（基本工资）+性别+部门 D、性别+部门+STR（基本工资） 
14. 把一个项目编译成一个应用程序时，下面的叙述正确的是______。 
A、所有的项目文件将组合为一个单一的应用程序文件 
B、所有项目的包含文件将组合为一个单一的应用程序文件 
C、所有项目排除的文件将组合为一个单一的应用程序文件 
D、由用户选定的项目文件将组合为一个单一的应用程序文件 
15. 数据库DB、数据库系统DBS、数据库管理系统DBMS三者之间的关系是______。 
A、DBS包括DB和DBMS B、DBMS包括DB和DBS 
C、DB包括DBS和DBMS D、DBS就是DB，也就是DBMS 
16. 在"选项"对话框的"文件位置"选项卡中可以设置______。 
A、表单的默认大小 B、默认目录 
C、日期和时间的显示格式 D、程序代码的颜色 
17. 要控制两个表中数据的完整性和一致性可以设置"参照完整性"，要求这两个表______。 
A、是同一个数据库中的两个表 B、不同数据库中的两个表 
C、两个自由表 D、一个是数据库表另一个是自由表 
18. 定位第一条记录上的命令是______。 
A、[Go](http://lib.csdn.net/base/go "Go知识库") TOP B、GO BOTTOM C、GO 6 D、SKIP 
19. 在关系模型中，实现"关系中不允许出现相同的元组"的约束是通过______。 
A、候选键 B、主键 C、外键 D、超键 
20. 设当前数据库有10条记录（记录未进行任何索引），在下列三种情况下，当前记录号为1时；EOF()为真时；BOF()为真时，命令?RECN()的结果分别是______。 
A、1,11,1 B、1,10,1 C、1,11,0 D、1,10,0 
21. 下列表达式中结果不是日期型的是______。 
A、CTOD("2000/10/01") B、{^99/10/01}+365 C、VAL("2000/10/01") D、DATE() 
22. 只有满足联接条件的记录才包含在查询结果中，这种联接为______。 
A、左联接 B、右联接 C、内部联接 D、完全联接 
23. 索引字段值不唯一，应该选择的索引类型为______。 
A、主索引 B、普通索引 C、候选索引 D、唯一索引 
24. 执行SELECT 0选择工作区的结果是______。 
A、选择了0号工作区 B、选择了空闲的最小号工作区 
C、关闭选择的工作区 D、选择已打开的工作区 
25. 从数据库中删除表的命令是______。 
A、DROP TABLE B、ALTER TABLE C、DELETE TABLE D、USE 
26. DELETE FROM S WHERE 年龄>60语句的功能是______。 
A、从S表中彻底删除年龄大于60岁的记录 B、S表中年龄大于60岁的记录被加上删除标记 
C、删除S表 D、删除S表的年龄列 
27. SELECT-SQL语句是______。 
A、选择工作区语句 B、数据查询语句 C、选择标准语句 D、数据修改语句 
28. SQL语言是______语言。A、层次数据库 B、网络数据库 C、关系数据库 D、非数据库 
29. 在SQL中，删除视图用______。 
A、DROP SCHEMA命令 B、CREATE TABLE命令 C、DROP VIEW命令 D、DROP INDEX命令 
30. 以下属于非容器类控件的是______。A、Form B、Label C、page D、[Container](http://lib.csdn.net/base/docker "Docker知识库") 
31. 将查询结果放在数组中应使用______短语。 
A、INTO CURSOR B、TO ARRAY C、INTO TABLE D、INTO ARRAY 
32. 在命令窗口执行SQL命令时，若命令要占用多行，续行符是______。 
A、冒号(:) B、分号(;) C、逗号(,) D、连字符(-) 
33. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对于图书管理数据库，查询0001号借书证的读者姓名和所借图书的书名。 
SQL语句正确的是______。 
SELECT 姓名,书名 FROM 借阅,图书,读者 WHERE; 
借阅.借书证号="0001" AND; 
______ 
______ 
A、图书.总编号=借阅.总编号 AND; 
读者.借书证号=借阅.借书证号 
B、图书.分类号=借阅.分类号 AND; 
读者.借书证号=借阅.借书证号 
C、读者.总编号=借阅.总编号 AND; 
读者.借书证号=借阅.借书证号 
D、图书.总编号=借阅.总编号 AND; 
读者.书名=借阅.书名 
34. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对于图书管理数据库，分别求出各个单位当前借阅图书的读者人次。下面的SQL语句正确的是______。 
SELECT 单位,______ FROM 借阅,读者 WHERE; 
借阅.借书证号=读者.借书证号 ______ 
A、COUNT(借阅.借书证号) GROUP BY 单位 B、SUM(借阅.借书证号) GROUP BY 单位 
C、COUNT(借阅.借书证号) ORDER BY 单位 D、COUNT(借阅.借书证号) HAVING 单位 
35. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对于图书管理数据库，检索借阅了《现代网络技术基础》一书的借书证号。下面SQL语句正确的是______。 
SELECT 借书证号 FROM 借阅 WHERE 总编号=; 
______ 
A、(SELECT 借书证号 FROM 图书 WHERE 书名="现代网络技术基础") 
B、(SELECT 总编号 FROM 图书 WHERE 书名="现代网络技术基础") 
C、(SELECT 借书证号 FROM 借阅 WHERE 书名="现代网络技术基础") 
D、(SELECT 总编号 FROM 借阅 WHERE 书名="现代网络技术基础") 
二、填空题 
36. 算法的复杂度主要包括______复杂度和空间复杂度。 
37. 数据的逻辑结构在计算机存储空间中的存放形式称为数据的______。 
38. 若按功能划分，[软件测试](http://lib.csdn.net/base/softwaretest "软件测试知识库")的方法通常分为白盒测试方法和______测试方法。 
39. 如果一个工人可管理多个设施，而一个设施只被一个工人管理，则实体"工人"与实体"设备"之间存在______联系。 
40. 关系数据库管理系统能实现的专门关系运算包括选择、连接和______。 
41. 命令?LEN("THIS IS MY BOOK")的结果是______。 
42.SQL SELECT语句为了将查询结果存放到临时表中应该使用______短语。 
43. 多栏报表的栏目数可以通过______来设置。 
44. 在打开项目管理器之后再打开"应用程序生成器"，可以通过按ALT+F2键，快捷菜单和"工具"菜单中的______。 
45. 数据库系统的核心是______。 
46. 查询设计器中的"联接"选项卡，可以控制______选择。 
47. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
用SQL的CREATE命令建立借阅表(字段顺序要相同)，请对下面的SQL语句填空： 
______ 
48. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对图书管理数据库，查询由"清华大学出版社"或"电子工业出版社"出版，并且单价不超出20元的书名。请对下面的SQL语句填空： 
SELECT 书名,出版单位,单价 FROM 图书; 
WHERE_______ AND; 
_______ 
49. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对图书管理数据库，求共借出多少种图书。请对下面的SQL语句填空： 
SELECT _______ FROM 借阅 
第一套题答案 
选择题 
1-5 CCBAD 6-10 BDBCA 11-15 DCBAA 16-20 BAABA 21-25 CCBBA 26-30 BBCCB 31-35 DDAAB 
填空题 
36.时间 37.模式或逻辑模式 38.黑盒 39. 一对多 或 1对多 或 一对n 或 1：N 或 1:n 或 1：n 或 1:N 或 一对m 或 1：M 或 1:m 或 1：m 或 1:N 40. 投影 41.15 42. Into cursor 或 Into cursor cursorname 43. 页面设置 或 列数 44. 应用程序生成器 45. 数据库管理系统 或 DBMS 46. 联接类型 或 联接条件 47. CREATE TABLE 借阅 (借书证号 C(4),总编号 C(6),借书日期 D(8)) 或 CREA TABL 借阅 (借书证号 C(4),总编号 C(6),借书日期D(8)) 或 CREATE TABLE 借阅 (借书证号 C(4),总编号 C(6),借书日期 D) 或 CREA TABL 借阅 (借书证号 C(4),总编号 C(6),借书日期 D) 48. 单价<=20 或 (出版单位="清华大学出版社" OR 出版单位="电子工业出版社") 或 (出版单位="电子工业出版社" OR 出版单位="清华大学出版社") 或 (出版单位='清华大学出版社' OR 出版单位='电子工业出版社') 与 (出版单位="清华大学出版社" OR 出版单位="电子工业出版社") 或 (出版单位='清华大学出版社‘) 49. COUNT(DISTINCT 总编号) 或 COUN(DISTINCT 总编号) 或 COUNT(DIST 总编号) 或 COUN(DIST 总编号)

第二套题 
一、 选择题 
1. 以下数据结构中不属于线性数据结构的是______。 
A、队列 B、线性表 C、二叉树 D、栈 
2. 在结构化方法中，用数据流程图（DFD）作为描述工具的软件开发阶段是______。

 |

A、可行性分析 B、需求分析 C、详细设计 D、程序编码 
3. 结构化程序设计主要强调的是______。 
A、程序的规模 B、程序的易读性 C、程序的执行效率 D、程序的可移植性 
4. 在软件生命周期中，能准确地确定软件系统必须做什么和必须具备哪些功能的阶段是______。 
A、概要设计 B、详细设计 C、可行性分析 D、需求分析 
5. 下列关于栈的叙述中正确的是______。A、在栈中只能插入数据 B、在栈中只能删除数据 
C、栈是先进先出的线性表 D、栈是先进后出的线性表 
6. 下面不属于软件设计原则的是______。A、抽象 B、模块化 C、自底向上 D、信息隐蔽 
7. 对长度为N的线性表进行顺序查找，在最坏情况下所需要的比较次数为______。 
A、N+1 B、N C、(N+1)/2 D、N/2 
8. 视图设计一般有3种设计次序，下列不属于视图设计的是______。 
A、自顶向下 B、由外向内 C、由内向外 D、自底向上 
9. 下列有关数据库的描述，正确的是______。A、数据库是一个DBF文件 B、数据库是一个关系 
C、数据库是一个结构化的数据集合 D、数据库是一组文件 
10. 下列说法中，不属于数据模型所描述的内容的是______。 
A、数据结构 B、数据操作 C、数据查询 D、数据约束 
11. 在下面的Visual FoxPro表达式中，运算结果是逻辑真的是______。 
A、EMPTY(.NULL.) B、LIKE('acd','ac?') C、AT('a','123abc') D、EMPTY(SPACE(2)) 
12. 表达式VAL(SUBS("奔腾586",5,1))*Len("visual foxpro")的结果是______。 
A、13.00 B、14.00 C、45.00 D、65.00 
13. 以下关于自由表的叙述，正确的是______。 
A、全部是用以前版本的FOXPRO（FOXBASE）建立的表 
B、可以用Visual FoxPro建立，但是不能把它添加到数据库中 
C、自由表可以添加到数据库中，数据库表也可以从数据库中移出成为自由表 
D、自由表可以添加到数据库中，但数据库表不可从数据库中移出成为自由表 
14. 下面关于数据环境和数据环境中两个表之间的关系的陈述中，______是正确的。 
A、数据环境是对象，关系不是对象 B、数据环境不是对象，关系是对象 
C、数据环境是对象，关系是数据环境中的对象 D、数据环境和关系均不是对象 
15. 在"报表设计器"中，可以使用的控件是______。 
A、标签、域控件和线条 B、标签、域控件和列表框 
C、标签、文本框和列表框 D、布局和数据源 
16.用二维表数据来表示实体及实体之间联系的数据模型称为______。 
A、实体--联系模型 B、层次模型 C、网状模型 D、关系模型 
17. 用来指明复选框的当前选中状态的属性是______。A、Selected B、Caption C、Value D、ControlSource 
18. 使用菜单操作方法打开一个在当前目录下已经存在的查询文件zgjk.qpr后，在命令窗口生成的命令是____。 
A、OPEN QUERY zgjk.qpr B、MODIFY QUERY zgjk.qpr 
C、DO QUERY zgjk.qpr D、CREATE QUERY zgjk.qpr 
19. 可以伴随着表的打开而自动打开的索引是______。 
A、单一索引文件（IDX） B、复合索引文件（CDX）C、结构化复合索引文件 D、非结构化复合索引文件 
20. 在数据库设计器中，建立两个表之间的一对多联系是通过以下索引实现的______。 
A、"一方"表的主索引或候选索引，"多方"表的普通索引 
B、"一方"表的主索引，"多方"表的普通索引或候选索引 
C、"一方"表的普通索引，"多方"表的主索引或候选索引 
D、"一方"表的普通索引，"多方"表的候选索引或普通索引 
21. 下列函数中函数值为字符型的是______。 A、DATE() B、TIME() C、YEAR() D、DATETIME() 
22. 下面对控件的描述正确的是______。 
A、用户可以在组合框中进行多重选择 B、用户可以在列表框中进行多重选择 
C、用户可以在一个选项组中选中多个选项按钮 D、用户对一个表单内的一组复选框只能选中其中一个 
23. 确定列表框内的某个条目是否被选定应使用的属性是______。 
A、Value B、ColumnCount C、ListCount D、Selected 
24. 设有关系R1和R2，经过关系运算得到结果S，则S是______。 
A、一个关系 B、一个表单 C、一个数据库 D、一个数组 
25. DBAS指的是______。A、数据库管理系统B、数据库系统C、数据库应用系统 D、数据库服务系统 
26. 设X="ABC"，Y="ABCD"，则下列表达式中值为.T.的是______。A、X=Y B、X==Y C、X$Y D、AT(X,Y)=0 
27. 在表结构中，逻辑型、日期型、备注型字段的宽度分别固定为______。 
A、3，8，10 B、1，6，4 C、1，8，任意 D、1，8，4 
28. 在标准SQL中，建立视图的命令是______。 
A、CREATE SCHEMA命令 B、CREATE TABLE命令 C、CREATE VIEW命令 D、CREATE INDEX命令 
29. 有关SCAN循环结构，叙述正确的是______。 
A、SCAN循环结构中的LOOP语句，可将程序流程直接指向循环开始语句SCAN，首先判断EOF()函数的真假 
B、在使用SCAN循环结构时，必须打开某一个数据库 
C、SCAN循环结构的循环体中必须写有SKIP语句 
D、SCAN循环结构，如果省略了子句\FOR和WHILE条件子句，则直接退出循环 
30. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对于图书管理数据库，要查询所藏图书中，各个出版社的图书最高单价、平均单价和册数，下面SQL语句正确的是______。 
SELECT 出版单位,______,______,______; 
FROM 图书管理!图书 ______ 出版单位 
A、MIN(单价) AVGAGE(单价) COUNT(*) GROUP BY B、MAX(单价) AVG(单价) COUNT(*) ORDER BY 
C、MAX(单价) AVG(单价) SUM(*) ORDER BY D、MAX(单价) AVG(单价) COUNT(*) GROUP BY 
31. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
对于图书管理数据库，求CIE单位借阅图书的读者的人数。 
下面SQL语句正确的是______。 
SELECT ______ FROM 借阅 WHERE; 
借书证号 _______ 
A、COUNT (DISTINCT 借书证号) 
IN (SELECT 借书证号 FROM 读者 WHERE 单位="CIE") 
B、COUNT (DISTINCT 借书证号) 
IN (SELECT 借书证号 FROM 借阅 WHERE 单位="CIE") 
C、SUM (DISTINCT 借书证号) 
IN (SELECT 借书证号 FROM 读者 WHERE 单位="CIE") 
D、SUM (DISTINCT 借书证号) 
IN (SELECT 借书证号 FOR 借阅 WHERE 单位="CIE") 
32. 查询订购单号（字符型，长度为4）尾字符是"1"的错误命令是______。 
A、SELECT * FROM 订单 WHERE SUBSTR(订购单号,4)＝"1" 
B、SELECT * FROM 订单 WHERE SUBSTR(订购单号,4,1)＝"1" 
C、SELECT * FROM 订单 WHERE "1"$订购单号 
D、SELECT * FROM 订单 WHERE RIGHT(订购单号,1)＝"1" 
33. 在关系模型中，为了实现"关系中不允许出现相同元组"的约束应使用______。 
A、临时关键字 B、主关键字 C、外部关键字 D、索引关键字 
34. 根据"职工"项目文件生成emp_sys.exe应用程序的命令是______。 
A、BUILD EXE emp_sys FROM 职工 B、BUILD APP emp_sys.exe FROM 职工 
C、LIKE EXE emp_sys FROM 职工 D、LIKE APP emp_sys.exe FROM 职工 
35. 当前盘当前目录下有数据库：学院.dbc，其中有"教师"表和"学院"表。 
"教师"表： 

"学院"表： 

有SQL语句： 
SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=; 
ALL (SELECT 工资 FROM 教师 WHERE 系号="02") 
与如上语句等价的SQL语句是______。 
A、SELECT DISTINCT 系号 FROM 教师 WHERE工资>=; 
(SELECT MAX(工资) FROM 教师 WHERE 系号="02") 
B、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=; 
(SELECT MIN(工资) FROM 教师 WHERE 系号="02") 
C、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=; 
ANY(SELECT 工资 FROM 教师 WHERE 系号="02") 
D、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=; 
SOME (SELECT 工资 FROM 教师 WHERE 系号="02") 
二、 填空题 
36. 若按功能划分，软件测试的方法通常分为白盒测试方法和______测试方法。 
37. 数据库系统的三级模式分别为______模式、内部级模式与外部级模式。 
38. 在最坏情况下，冒泡排序的时间复杂度为______。 
39. 在面向对象方法中，信息隐蔽是通过对象的______性来实现的。 
40. 关系模型的数据操纵即是建立在关系上的数据操纵，一般有______、增加、删除和修改四种操作。 
41.要把帮助文件设置为复制到硬盘上的Foxhelp.chm文件，需要在"选项"对话框的______选项卡上设置。 
42. TIME( )的返回值的数据类型是______类型。 
43. 在定义字段有效性规则中，在规则框中输入的表达式中类型是________。 
44. 设计报表通常包括两部分内容：______和布局。 
45. ______是指只有满足联接条件的记录才包含在查询结果中。 
46. 设有图书管理数据库： 
图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2)) 
读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20)) 
借阅(借书证号C(4),总编号C(6),借书日期D(8)) 
检索书价在15元至25元(含15元和25元)之间的图书的书名、作者、书价和分类号，结果按分类号升序排序。 
SELECT 书名,作者,单价,分类号 FROM 图书; 
WHERE______; 
ORDER BY______; 
47. 设有如下关系表R、S和T： 
R(BH,XM,XB,DWH) 
S(SWH,DWM) 
T(BH,XM,XB,DWH) 
实现R∪T的SQL语句是_______。 
48. 设有如下关系表R： 
R(NO,NAME,SEX,AGE,CLASS) 
主关键字是NO 
其中NO为学号，NAME为姓名，SEX为性别，AGE为年龄，CLASS为班号。写出实现下列功能的SQL语句。 
插入"95031"班学号为30，姓名为"郑和"的学生记录；_______。 
49. 设有如下关系表R： 
R(NO,NAME,SEX,AGE,CLASS) 
主关键字是NO 
其中NO为学号(数值型)，NAME为姓名，SEX为性别，AGE为年龄，CLASS为班号。写出实现下列功能的SQL语句。 
删除学号为20的学生记录；______。 
第二套题答案 
1-5 CBBDD 6-10 CBBCC 11-15 DDCCA 16-20 DCBCA 21-25 BBDAC 26-30 CDCBD 31-35 ACBBA 
36.黑盒 37.概念或概念级 38.n(n-1)/2 39.封装 40.查询 41.文件位置 42.字符 或 C 43.逻辑表达式 
44.数据源 45.内部联接 
46. 单价 BETWEEN 15 AND 25 或 单价 BETW 15 AND 25 或 单价 BETWE 15 AND 25 或 单价>=15 and 单价<=25 或 单价>=15 and 单价=<25 或 单价=>15 and 单价<=25 或 单价=>15 and 单价=<25 与 分类号 ASC 或 分类号 
47. SELECT * FROM R UNION SELECT * FROM T 或 SELE * FROM R UNIO SELE * FROM T 或 SELECT * FROM R UNIO SELECT * FROM T 或 SELE * FROM R UNION SELE * FROM T 
48. INSERT INTO R(NO,NAME,CLASS) VALUES(30,"郑和","95031") 或 INSE INTO R(NO,NAME,CLASS) VALUES(30,"郑和","95031") 
49. DELETE FROM R WHERE NO=20 或 DELE FROM R WHERE NO=20 或 DELE FROM R WHER NO=20 或 DELETE FROM R WHER NO=20

数据库面试题集

数据库笔试题及答案I

第一套 

　　一.选择题

　　1. 下面叙述正确的是______。

　　A、算法的执行效率与数据的存储结构无关

　　B、算法的空间复杂度是指算法程序中指令(或语句)的条数

　　C、算法的有穷性是指算法必须能在执行有限个步骤之后终止

　　D、以上三种描述都不对

　　2. 以下数据结构中不属于线性数据结构的是______。A、队列B、线性表C、二叉树D、栈

　　3. 在一棵二叉树上第5层的结点数最多是______。A、8 B、16 C、32 D、15

　　4. 下面描述中，符合结构化程序设计风格的是______。

　　A、使用顺序、选择和重复(循环)三种基本控制结构表示程序的控制逻辑

　　B、模块只有一个入口，可以有多个出口

　　C、注重提高程序的执行效率 D、不使用goto语句

　　5. 下面概念中，不属于面向对象方法的是______。

　　A、对象 B、继承 C、类 D、过程调用

　　6. 在结构化方法中，用数据流程图(DFD)作为描述工具的软件开发阶段是______。

　　A、可行性分析 B、需求分析 C、详细设计 D、程序编码

　　7. 在软件开发中，下面任务不属于设计阶段的是______。

　　A、数据结构设计 B、给出系统模块结构 C、定义模块算法 D、定义需求并建立系统模型

　　8. 数据库系统的核心是______。

　　A、数据模型 B、数据库管理系统 C、软件工具 D、数据库

　　9. 下列叙述中正确的是______。

　　A、数据库是一个独立的系统，不需要操作系统的支持

　　B、数据库设计是指设计数据库管理系统

　　C、数据库技术的根本目标是要解决数据共享的问题

　　D、数据库系统中，数据的物理结构必须与逻辑结构一致

　　10. 下列模式中，能够给出数据库物理存储结构与物理存取方法的是______。

　　A、内模式 B、外模式 C、概念模式 D、逻辑模式

　　11. Visual FoxPro数据库文件是______。

　　A、存放用户数据的文件 B、管理数据库对象的系统文件

　　C、存放用户数据和系统的文件 D、前三种说法都对

　12. SQL语句中修改表结构的命令是______。

　　A、MODIFY TABLE B、MODIFY STRUCTURE C、ALTER TABLE D、ALTER STRUCTURE

　　13. 如果要创建一个数据组分组报表，第一个分组表达式是"部门"，第二个分组表达式是"性别"，第三个分组表达式是"基本工资"，当前索引的索引表达式应当是______。

　　A、部门+性别+基本工资 B、部门+性别+STR(基本工资)

　　C、STR(基本工资)+性别+部门 D、性别+部门+STR(基本工资)

　　14. 把一个项目编译成一个应用程序时，下面的叙述正确的是______。

　　A、所有的项目文件将组合为一个单一的应用程序文件

　　B、所有项目的包含文件将组合为一个单一的应用程序文件

　　C、所有项目排除的文件将组合为一个单一的应用程序文件

　　D、由用户选定的项目文件将组合为一个单一的应用程序文件

　　15. 数据库DB、数据库系统DBS、数据库管理系统DBMS三者之间的关系是______。

　　A、DBS包括DB和DBMS B、DBMS包括DB和DBS

　　C、DB包括DBS和DBMS D、DBS就是DB，也就是DBMS

　　16. 在"选项"对话框的"文件位置"选项卡中可以设置______。

　　A、表单的默认大小 B、默认目录

　　C、日期和时间的显示格式 D、程序代码的颜色

　　17. 要控制两个表中数据的完整性和一致性可以设置"参照完整性"，要求这两个表______。

　　A、是同一个数据库中的两个表 B、不同数据库中的两个表

　　C、两个自由表 D、一个是数据库表另一个是自由表

　　18. 定位第一条记录上的命令是______。

　　A、GO TOP B、GO BOTTOM C、GO 6 D、SKIP

　　19. 在关系模型中，实现"关系中不允许出现相同的元组"的约束是通过______。

　　A、候选键 B、主键 C、外键 D、超键

　　20. 设当前数据库有10条记录(记录未进行任何索引)，在下列三种情况下，当前记录号为1时;EOF()为真时;BOF()为真时，命令?RECN()的结果分别是______。

　　A、1,11,1 B、1,10,1 C、1,11,0 D、1,10,0

　　21. 下列表达式中结果不是日期型的是______。

　　A、CTOD("2000/10/01") B、{^99/10/01}+365 C、VAL("2000/10/01") D、DATE()

　　22. 只有满足联接条件的记录才包含在查询结果中，这种联接为______。

　　A、左联接 B、右联接 C、内部联接 D、完全联接

　23. 索引字段值不唯一，应该选择的索引类型为______。

　　A、主索引 B、普通索引 C、候选索引 D、唯一索引

　　24. 执行SELECT 0选择工作区的结果是______。

　　A、选择了0号工作区 B、选择了空闲的最小号工作区

　　C、关闭选择的工作区 D、选择已打开的工作区

　　25. 从数据库中删除表的命令是______。

　　A、DROP TABLE B、ALTER TABLE C、DELETE TABLE D、USE

　　26. DELETE FROM S WHERE 年龄>60语句的功能是______。

　　A、从S表中彻底删除年龄大于60岁的记录 B、S表中年龄大于60岁的记录被加上删除标记

　　C、删除S表 D、删除S表的年龄列

　　27. SELECT-SQL语句是______。

　　A、选择工作区语句 B、数据查询语句 C、选择标准语句 D、数据修改语句

　　28. SQL语言是______语言。A、层次数据库 B、网络数据库 C、关系数据库 D、非数据库

　　29. 在SQL中，删除视图用______。

　　A、DROP SCHEMA命令 B、CREATE TABLE命令 C、DROP VIEW命令 D、DROP INDEX命令

　　30. 以下属于非容器类控件的是______。A、Form B、Label C、page D、Container

　　31. 将查询结果放在数组中应使用______短语。

　　A、INTO CURSOR B、TO ARRAY C、INTO TABLE D、INTO ARRAY

　　32. 在命令窗口执行SQL命令时，若命令要占用多行，续行符是______。

　　A、冒号(:) B、分号(;) C、逗号(,) D、连字符(-)

　　33. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对于图书管理数据库，查询0001号借书证的读者姓名和所借图书的书名。

　　SQL语句正确的是______。

　　SELECT 姓名,书名 FROM 借阅,图书,读者 WHERE;

　　借阅.借书证号="0001" AND;

　　______

　　______

　　A、图书.总编号=借阅.总编号 AND;

　　读者.借书证号=借阅.借书证号

　　B、图书.分类号=借阅.分类号 AND;

　　读者.借书证号=借阅.借书证号

　　C、读者.总编号=借阅.总编号 AND;

　　读者.借书证号=借阅.借书证号

　　D、图书.总编号=借阅.总编号 AND;

　34. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对于图书管理数据库，分别求出各个单位当前借阅图书的读者人次。下面的SQL语句正确的是______。

　　SELECT 单位,______ FROM 借阅,读者 WHERE;

　　借阅.借书证号=读者.借书证号 ______

　　A、COUNT(借阅.借书证号) GROUP BY 单位 B、SUM(借阅.借书证号) GROUP BY 单位

　　C、COUNT(借阅.借书证号) ORDER BY 单位 D、COUNT(借阅.借书证号) HAVING 单位

　　35. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对于图书管理数据库，检索借阅了《现代网络技术基础》一书的借书证号。下面SQL语句正确的是______。

　　SELECT 借书证号 FROM 借阅 WHERE 总编号=;

　　______

　　A、(SELECT 借书证号 FROM 图书 WHERE 书名="现代网络技术基础")

　　B、(SELECT 总编号 FROM 图书 WHERE 书名="现代网络技术基础")

　　C、(SELECT 借书证号 FROM 借阅 WHERE 书名="现代网络技术基础")

　　D、(SELECT 总编号 FROM 借阅 WHERE 书名="现代网络技术基础")

　　二、填空题

　　36. 算法的复杂度主要包括______复杂度和空间复杂度。

　　37. 数据的逻辑结构在计算机存储空间中的存放形式称为数据的______。

　　38. 若按功能划分，软件测试的方法通常分为白盒测试方法和______测试方法。

　　39. 如果一个工人可管理多个设施，而一个设施只被一个工人管理，则实体"工人"与实体"设备"之间存在______联系。

　　40. 关系数据库管理系统能实现的专门关系运算包括选择、连接和______。

　　41. 命令?LEN("THIS IS MY BOOK")的结果是______。

　　42.SQL SELECT语句为了将查询结果存放到临时表中应该使用______短语。

　　43. 多栏报表的栏目数可以通过______来设置。

44. 在打开项目管理器之后再打开"应用程序生成器"，可以通过按ALT+F2键，快捷菜单和"工具"菜单中的______。

　　45. 数据库系统的核心是______。

　　46. 查询设计器中的"联接"选项卡，可以控制______选择。

　　47. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　用SQL的CREATE命令建立借阅表(字段顺序要相同)，请对下面的SQL语句填空：

　　______

　　48. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对图书管理数据库，查询由"清华大学出版社"或"电子工业出版社"出版，并且单价不超出20元的书名。请对下面的SQL语句填空：

　　SELECT 书名,出版单位,单价 FROM 图书;

　　WHERE_______ AND;

　　_______

　　49. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对图书管理数据库，求共借出多少种图书。请对下面的SQL语句填空：

　　SELECT _______ FROM 借阅

　　第一套题答案

　　选择题

　　1-5 CCBAD 6-10 BDBCA 11-15 DCBAA 16-20 BAABA 21-25 CCBBA 26-30 BBCCB 31-35 DDAAB

　　填空题

　　36.时间 37.模式或逻辑模式 38.黑盒 39. 一对多 或 1对多 或 一对n 或 1：N 或 1:n 或 1：n 或 1:N 或 一对m 或 1：M 或 1:m 或 1：m 或 1:N 40. 投影 41.15 42. Into cursor 或 Into cursor cursorname 43. 页面设置 或 列数 44. 应用程序生成器 45. 数据库管理系统 或 DBMS 46. 联接类型 或 联接条件 47. CREATE TABLE 借阅 (借书证号 C(4),总编号 C(6),借书日期 D(8)) 或 CREA TABL 借阅 (借书证号 C(4),总编号 C(6),借书日期D(8)) 或 CREATE TABLE 借阅 (借书证号 C(4),总编号 C(6),借书日期 D) 或 CREA TABL 借阅 (借书证号 C(4),总编号 C(6),借书日期 D) 48. 单价<=20 或 (出版单位="清华大学出版社" OR 出版单位="电子工业出版社") 或 (出版单位="电子工业出版社" OR 出版单位="清华大学出版社") 或 (出版单位='清华大学出版社' OR 出版单位='电子工业出版社') 与 (出版单位="清华大学出版社" OR 出版单位="电子工业出版社") 或 (出版单位='清华大学出版社‘) 49. COUNT(DISTINCT 总编号) 或 COUN(DISTINCT 总编号) 或 COUNT(DIST 总编号) 或 COUN(DIST 总编号)

第二套题 

　　一、 选择题

　　1. 以下数据结构中不属于线性数据结构的是______。

　　A、队列 B、线性表 C、二叉树 D、栈

　　2. 在结构化方法中，用数据流程图(DFD)作为描述工具的软件开发阶段是______。

　　A、可行性分析 B、需求分析 C、详细设计 D、程序编码

　　3. 结构化程序设计主要强调的是______。

　　A、程序的规模 B、程序的易读性 C、程序的执行效率 D、程序的可移植性

　　4. 在软件生命周期中，能准确地确定软件系统必须做什么和必须具备哪些功能的阶段是______。

　　A、概要设计 B、详细设计 C、可行性分析 D、需求分析

　　5. 下列关于栈的叙述中正确的是______。A、在栈中只能插入数据 B、在栈中只能删除数据

　　C、栈是先进先出的线性表 D、栈是先进后出的线性表

　　6. 下面不属于软件设计原则的是______。A、抽象 B、模块化 C、自底向上 D、信息隐蔽

　　7. 对长度为N的线性表进行顺序查找，在最坏情况下所需要的比较次数为______。

　　A、N+1 B、N C、(N+1)/2 D、N/2

　　8. 视图设计一般有3种设计次序，下列不属于视图设计的是______。

　　A、自顶向下 B、由外向内 C、由内向外 D、自底向上

　　9. 下列有关数据库的描述，正确的是______。A、数据库是一个DBF文件 B、数据库是一个关系

　　C、数据库是一个结构化的数据集合 D、数据库是一组文件

　　10. 下列说法中，不属于数据模型所描述的内容的是______。

　　A、数据结构 B、数据操作 C、数据查询 D、数据约束

　　11. 在下面的Visual FoxPro表达式中，运算结果是逻辑真的是______。

　　A、EMPTY(.NULL.) B、LIKE('acd','ac?') C、AT('a','123abc') D、EMPTY(SPACE(2))

　　12. 表达式VAL(SUBS("奔腾586",5,1))*Len("visual foxpro")的结果是______。

　　A、13.00 B、14.00 C、45.00 D、65.00

　　13. 以下关于自由表的叙述，正确的是______。

　　A、全部是用以前版本的FOXPRO(FOXBASE)建立的表

　　B、可以用Visual FoxPro建立，但是不能把它添加到数据库中

　　C、自由表可以添加到数据库中，数据库表也可以从数据库中移出成为自由表

　　D、自由表可以添加到数据库中，但数据库表不可从数据库中移出成为自由表

14. 下面关于数据环境和数据环境中两个表之间的关系的陈述中，______是正确的。

　　A、数据环境是对象，关系不是对象 B、数据环境不是对象，关系是对象

　　C、数据环境是对象，关系是数据环境中的对象 D、数据环境和关系均不是对象

　　15. 在"报表设计器"中，可以使用的控件是______。

　　A、标签、域控件和线条 B、标签、域控件和列表框

　　C、标签、文本框和列表框 D、布局和数据源

　　16.用二维表数据来表示实体及实体之间联系的数据模型称为______。

　　A、实体--联系模型 B、层次模型 C、网状模型 D、关系模型

　　17. 用来指明复选框的当前选中状态的属性是______。A、Selected B、Caption C、Value D、ControlSource

　　18. 使用菜单操作方法打开一个在当前目录下已经存在的查询文件zgjk.qpr后，在命令窗口生成的命令是____。

　　A、OPEN QUERY zgjk.qpr B、MODIFY QUERY zgjk.qpr

　　C、DO QUERY zgjk.qpr D、CREATE QUERY zgjk.qpr

　　19. 可以伴随着表的打开而自动打开的索引是______。

　　A、单一索引文件(IDX) B、复合索引文件(CDX)C、结构化复合索引文件 D、非结构化复合索引文件

　　20. 在数据库设计器中，建立两个表之间的一对多联系是通过以下索引实现的______。

　　A、"一方"表的主索引或候选索引，"多方"表的普通索引

　　B、"一方"表的主索引，"多方"表的普通索引或候选索引

　　C、"一方"表的普通索引，"多方"表的主索引或候选索引

　　D、"一方"表的普通索引，"多方"表的候选索引或普通索引

　　21. 下列函数中函数值为字符型的是______。 A、DATE() B、TIME() C、YEAR() D、DATETIME()

　　22. 下面对控件的描述正确的是______。

　　A、用户可以在组合框中进行多重选择 B、用户可以在列表框中进行多重选择

　　C、用户可以在一个选项组中选中多个选项按钮 D、用户对一个表单内的一组复选框只能选中其中一个

　　23. 确定列表框内的某个条目是否被选定应使用的属性是______。

　　A、Value B、ColumnCount C、ListCount D、Selected

　　24. 设有关系R1和R2，经过关系运算得到结果S，则S是______。

　　A、一个关系 B、一个表单 C、一个数据库 D、一个数组

　　25. DBAS指的是______。A、数据库管理系统B、数据库系统C、数据库应用系统 D、数据库服务系统

　　26. 设X="ABC"，Y="ABCD"，则下列表达式中值为.T.的是______。A、X=Y B、X==Y C、X$Y D、AT(X,Y)=0

27. 在表结构中，逻辑型、日期型、备注型字段的宽度分别固定为______。

　　A、3，8，10 B、1，6，4 C、1，8，任意 D、1，8，4

　　28. 在标准SQL中，建立视图的命令是______。

　　A、CREATE SCHEMA命令 B、CREATE TABLE命令 C、CREATE VIEW命令 D、CREATE INDEX命令

　　29. 有关SCAN循环结构，叙述正确的是______。

　　A、SCAN循环结构中的LOOP语句，可将程序流程直接指向循环开始语句SCAN，首先判断EOF()函数的真假

　　B、在使用SCAN循环结构时，必须打开某一个数据库

　　C、SCAN循环结构的循环体中必须写有SKIP语句

　　D、SCAN循环结构，如果省略了子句\FOR和WHILE条件子句，则直接退出循环

　　30. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对于图书管理数据库，要查询所藏图书中，各个出版社的图书最高单价、平均单价和册数，下面SQL语句正确的是______。

　　SELECT 出版单位,______,______,______;

　　FROM 图书管理!图书 ______ 出版单位

　　A、MIN(单价) AVGAGE(单价) COUNT(*) GROUP BY B、MAX(单价) AVG(单价) COUNT(*) ORDER BY

　　C、MAX(单价) AVG(单价) SUM(*) ORDER BY D、MAX(单价) AVG(单价) COUNT(*) GROUP BY

　　31. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　对于图书管理数据库，求CIE单位借阅图书的读者的人数。

　　下面SQL语句正确的是______。

　　SELECT ______ FROM 借阅 WHERE;

　　借书证号 _______

　　A、COUNT (DISTINCT 借书证号)

　　IN (SELECT 借书证号 FROM 读者 WHERE 单位="CIE")

　　B、COUNT (DISTINCT 借书证号)

　　IN (SELECT 借书证号 FROM 借阅 WHERE 单位="CIE")

　　C、SUM (DISTINCT 借书证号)

　　IN (SELECT 借书证号 FROM 读者 WHERE 单位="CIE")

　　D、SUM (DISTINCT 借书证号)

　　IN (SELECT 借书证号 FOR 借阅 WHERE 单位="CIE")

　32. 查询订购单号(字符型，长度为4)尾字符是"1"的错误命令是______。

　　A、SELECT * FROM 订单 WHERE SUBSTR(订购单号,4)="1"

　　B、SELECT * FROM 订单 WHERE SUBSTR(订购单号,4,1)="1"

　　C、SELECT * FROM 订单 WHERE "1"$订购单号

　　D、SELECT * FROM 订单 WHERE RIGHT(订购单号,1)="1"

　　33. 在关系模型中，为了实现"关系中不允许出现相同元组"的约束应使用______。

　　A、临时关键字 B、主关键字 C、外部关键字 D、索引关键字

　　34. 根据"职工"项目文件生成emp_sys.exe应用程序的命令是______。

　　A、BUILD EXE emp_sys FROM 职工 B、BUILD APP emp_sys.exe FROM 职工

　　C、LIKE EXE emp_sys FROM 职工 D、LIKE APP emp_sys.exe FROM 职工

　　35. 当前盘当前目录下有数据库：学院.dbc，其中有"教师"表和"学院"表。

　　"教师"表：

　　"学院"表：

　　有SQL语句：

　　SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=;

　　ALL (SELECT 工资 FROM 教师 WHERE 系号="02")

　　与如上语句等价的SQL语句是______。

　　A、SELECT DISTINCT 系号 FROM 教师 WHERE工资>=;

　　(SELECT MAX(工资) FROM 教师 WHERE 系号="02")

　　B、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=;

　　(SELECT MIN(工资) FROM 教师 WHERE 系号="02")

　　C、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=;

　　ANY(SELECT 工资 FROM 教师 WHERE 系号="02")

　　D、SELECT DISTINCT 系号 FROM 教师 WHERE 工资>=;

　　SOME (SELECT 工资 FROM 教师 WHERE 系号="02")

　　二、 填空题

　　36. 若按功能划分，软件测试的方法通常分为白盒测试方法和______测试方法。

　　37. 数据库系统的三级模式分别为______模式、内部级模式与外部级模式。

　　38. 在最坏情况下，冒泡排序的时间复杂度为______。

　39. 在面向对象方法中，信息隐蔽是通过对象的______性来实现的。

　　40. 关系模型的数据操纵即是建立在关系上的数据操纵，一般有______、增加、删除和修改四种操作。

　　41.要把帮助文件设置为复制到硬盘上的Foxhelp.chm文件，需要在"选项"对话框的______选项卡上设置。

　　42. TIME( )的返回值的数据类型是______类型。

　　43. 在定义字段有效性规则中，在规则框中输入的表达式中类型是________。

　　44. 设计报表通常包括两部分内容：______和布局。

　　45. ______是指只有满足联接条件的记录才包含在查询结果中。

　　46. 设有图书管理数据库：

　　图书(总编号C(6),分类号C(8),书名C(16),作者C(6),出版单位C(20),单价N(6,2))

　　读者(借书证号C(4),单位C(8),姓名C(6),性别C(2),职称C(6),地址C(20))

　　借阅(借书证号C(4),总编号C(6),借书日期D(8))

　　检索书价在15元至25元(含15元和25元)之间的图书的书名、作者、书价和分类号，结果按分类号升序排序。

　　SELECT 书名,作者,单价,分类号 FROM 图书;

　　WHERE______;

　　ORDER BY______;

　　47. 设有如下关系表R、S和T：

　　R(BH,XM,XB,DWH)

　　S(SWH,DWM)

　　T(BH,XM,XB,DWH)

　　实现R∪T的SQL语句是_______。

　　48. 设有如下关系表R：

　　R(NO,NAME,SEX,AGE,CLASS)

　　主关键字是NO

　　其中NO为学号，NAME为姓名，SEX为性别，AGE为年龄，CLASS为班号。写出实现下列功能的SQL语句。

　　插入"95031"班学号为30，姓名为"郑和"的学生记录;_______。

　　49. 设有如下关系表R：

　　R(NO,NAME,SEX,AGE,CLASS)

　　主关键字是NO

　　其中NO为学号(数值型)，NAME为姓名，SEX为性别，AGE为年龄，CLASS为班号。写出实现下列功能的SQL语句。

　　删除学号为20的学生记录;______。

　　第二套题答案

　　1-5 CBBDD 6-10 CBBCC 11-15 DDCCA 16-20 DCBCA 21-25 BBDAC 26-30 CDCBD 31-35 ACBBA

　　36.黑盒 37.概念或概念级 38.n(n-1)/2 39.封装 40.查询 41.文件位置 42.字符 或 C 43.逻辑表达式

　　44.数据源 45.内部联接

　　46. 单价 BETWEEN 15 AND 25 或 单价 BETW 15 AND 25 或 单价 BETWE 15 AND 25 或 单价>=15 and 单价<=25 或 单价>=15 and 单价=<25 或 单价=>15 and 单价<=25 或 单价=>15 and 单价=<25 与 分类号 ASC 或 分类号

　　47. SELECT * FROM R UNION SELECT * FROM T 或 SELE * FROM R UNIO SELE * FROM T 或 SELECT * FROM R UNIO SELECT * FROM T 或 SELE * FROM R UNION SELE * FROM T

　　48. INSERT INTO R(NO,NAME,CLASS) VALUES(30,"郑和","95031") 或 INSE INTO R(NO,NAME,CLASS) VALUES(30,"郑和","95031")

　　49. DELETE FROM R WHERE NO=20 或 DELE FROM R WHERE NO=20 或 DELE FROM R WHER NO=20 或 DELETE FROM R WHER NO=20

Oracle 面试题集锦－技术篇

1. 解释冷备份和热备份的不同点以及各自的优点 

　　解答：热备份针对归档模式的数据库，在数据库仍旧处于工作状态时进行备份。而冷备份指在数据库关闭后，进行备份，适用于所有模式的数据库。热备份的优点在于当备份时，数据库仍旧可以被使用并且可以将数据库恢复到任意一个时间点。冷备份的优点在于它的备份和恢复操作相当简单，并且由于冷备份的数据库可以工作在非归档模式下,数据库性能会比归档模式稍好。(因为不必将archive log写入硬盘)

　　2. 你必须利用备份恢复数据库，但是你没有控制文件，该如何解决问题呢?

　　解答：重建控制文件，用带backup control file 子句的recover 命令恢复

　　数据库。

　　3. 如何转换init.ora到spfile?

　　解答：使用create spfile from pfile 命令.

　　4. 解释data block , extent 和 segment的区别(这里建议用英文术语)

　　解答：data block是数据库中最小的逻辑存储单元。当数据库的对象需要更多的物理存储空间时，连续的data block就组成了extent . 一个数据库对象

　　拥有的所有extents被称为该对象的segment.

　　5. 给出两个检查表结构的方法

　　解答：1。DESCRIBE命令

　　2. DBMS_METADATA.GET_DDL 包

　　6. 怎样查看数据库引擎的报错

　　解答：alert log.

　　7. 比较truncate和delete 命令

　　解答：两者都可以用来删除表中所有的记录。区别在于：truncate是DDL操作，它移动HWK，不需要 rollback segment .而Delete是DML操作, 需要rollback segment 且花费较长时间.

　　8. 使用索引的理由

　　解答：快速访问表中的data block

　　9. 给出在STAR SCHEMA中的两种表及它们分别含有的数据

　　解答：Fact tables 和dimension tables. fact table 包含大量的主要的信息而 dimension tables 存放对fact table 某些属性描述的信息

　　10. FACT Table上需要建立何种索引?

　　解答：位图索引 (bitmap index)

　　11. 给出两种相关约束?

　　解答：主键和外键

　　12. 如何在不影响子表的前提下，重建一个母表

　　解答：子表的外键强制实效，重建母表，激活外键

　　13. 解释归档和非归档模式之间的不同和它们各自的优缺点

　　解答：归档模式是指你可以备份所有的数据库 transactions并恢复到任意一个时间点。非归档模式则相反，不能恢复到任意一个时间点。但是非归档模式可以带来数据库性能上的少许提高.

　　14. 如何建立一个备份控制文件?

　　解答：Alter database backup control file to trace.

　　15. 给出数据库正常启动所经历的几种状态 ?

　　解答：

　　STARTUP NOMOUNT – 数据库实例启动

　　STARTUP MOUNT - 数据库装载

　　STARTUP OPEN – 数据库打开

　　16. 哪个column可以用来区别V$视图和GV$视图?

　　解答： INST_ID 指明集群环境中具体的 某个instance 。

　　17. 如何生成explain plan?

　　解答：运行utlxplan.sql. 建立plan 表

　　针对特定SQL语句，使用 explain plan set statement_id = 'tst1' into plan_table

　　运行utlxplp.sql 或 utlxpls.sql察看explain plan

　　18. 如何增加buffer cache的命中率?

　　解答：在数据库较繁忙时，适用buffer cache advisory 工具，查询v$db_cache_advice . 如果有必要更改，可以使用 alter system set db_cache_size 命令

　　19. ORA-01555的应对方法?

　　解答：具体的出错信息是snapshot too old within rollback seg , 通常可以通过

　　增大rollback seg来解决问题。当然也需要察看一下具体造成错误的SQL文本

　　20. 解释$ORACLE_HOME和$ORACLE_BASE的区别?

　　解答：ORACLE_BASE是oracle的根目录，ORACLE_HOME是oracle产品的目录。

　　21. 如何判断数据库的时区?

　　解答：SELECT DBTIMEZONE FROM DUAL;

　　22. 解释GLOBAL_NAMES设为TRUE的用途

　　解答：GLOBAL_NAMES指明联接数据库的方式。如果这个参数设置为TRUE,在建立数据库链接时就必须用相同的名字连结远程数据库

　　23。如何加密PL/SQL程序?

　　解答：WRAP

　　24. 解释FUNCTION,PROCEDURE和PACKAGE区别

　　解答：function 和procedure是PL/SQL代码的集合，通常为了完成一个任务。procedure 不需要返回任何值而function将返回一个值在另一

　　方面，Package是为了完成一个商业功能的一组function和proceudre的集合

　　25. 解释TABLE Function的用途

　　解答：TABLE Function是通过PL/SQL逻辑返回一组纪录，用于普通的表/视图。他们也用于pipeline和ETL过程。

　　26. 举出3种可以收集three advisory statistics

　　解答：Buffer Cache Advice, Segment Level Statistics, Timed Statistics

　　27. Audit trace 存放在哪个oracle目录结构中?

　　解答：unix $ORACLE_HOME/rdbms/audit Windows the event viewer

　　28. 解释materialized views的作用

　　解答：Materialized views 用于减少那些汇总，集合和分组的信息的集合数量。它们通常适合于数据仓库和DSS系统。

　　29. 当用户进程出错，哪个后台进程负责清理它

　　解答： PMON

　　30. 哪个后台进程刷新materialized views?

　　解答：The Job Queue Processes.

　　31. 如何判断哪个session正在连结以及它们等待的资源?

　　解答：V$SESSION / V$SESSION_WAIT

　　32. 描述什么是 redo logs

　　解答：Redo Logs 是用于存放数据库数据改动状况的物理和逻辑结构。可以用来修复数据库.

　　33. 如何进行强制LOG SWITCH?

　　解答：ALTER SYSTEM SWITCH LOGFILE;

　　34. 举出两个判断DDL改动的方法?

　　解答：你可以使用 Logminer 或 Streams

　　35. Coalescing做了什么?

　　解答：Coalescing针对于字典管理的tablespace进行碎片整理，将临近的小extents合并成单个的大extent.

　　36. TEMPORARY tablespace和PERMANENT tablespace 的区别是?

　　解答：A temporary tablespace 用于临时对象例如排序结构而 permanent tablespaces用来存储那些'真实'的对象(例如表，回滚段等)

　　37. 创建数据库时自动建立的tablespace名称?

　　解答：SYSTEM tablespace.

　　38. 创建用户时，需要赋予新用户什么权限才能使它联上数据库。

　　解答：CONNECT

　　39. 如何在tablespace里增加数据文件?

　　解答：ALTER TABLESPACE ADD DATAFILE SIZE

　　40. 如何变动数据文件的大小?

　　解答：ALTER DATABASE DATAFILE RESIZE ;

　　41. 哪个VIEW用来检查数据文件的大小?

　　解答： DBA_DATA_FILES

　　42. 哪个VIEW用来判断tablespace的剩余空间

　　解答：DBA_FREE_SPACE

　　43. 如何判断谁往表里增加了一条纪录?

　　解答：auditing

　　44. 如何重构索引?

　　解答： ALTER INDEX REBUILD;

　　45. 解释什么是Partitioning(分区)以及它的优点。

　　解答：Partition将大表和索引分割成更小，易于管理的分区。

　　46. 你刚刚编译了一个PL/SQL Package但是有错误报道，如何显示出错信息?

　　解答：SHOW ERRORS

　　47. 如何搜集表的各种状态数据?

　　解答： ANALYZE

　　The ANALYZE command.

　　48. 如何启动SESSION级别的TRACE

　　解答: DBMS_SESSION.SET_SQL_TRACE

　　ALTER SESSION SET SQL_TRACE = TRUE;

　　49. IMPORT和SQL*LOADER 这2个工具的不同点

　　解答：这两个ORACLE工具都是用来将数据导入数据库的。

　　区别是：IMPORT工具只能处理由另一个ORACLE工具EXPORT生成

　　的数据。而SQL*LOADER可以导入不同的ASCII格式的数据源

　　50。用于网络连接的2个文件?

　　解答： TNSNAMES.ORA and SQLNET.ORA

数据库面试题目（一）

一:SQL tuning 类
1.       列举几种表连接方式
Answer：等连接（内连接）、非等连接、自连接、外连接（左、右、全）

Or hash join/merge join/nest loop(cluster join)/index join ？？ 

ORACLE 8i，9i 表连接方法。 

一般的相等连接： select * from a, b where a.id = b.id; 这个就属于内连接。 

对于外连接： 

Oracle中可以使用“(+) ”来表示，9i可以使用LEFT/RIGHT/FULL OUTER JOIN 

LEFT OUTER JOIN：左外关联 

SELECT e.last_name, e.department_id, d.department_name 

FROM employees e 

LEFT OUTER JOIN departments d 

ON (e.department_id = d.department_id); 

等价于 

SELECT e.last_name, e.department_id, d.department_name 

FROM employees e, departments d 

WHERE e.department_id=d.department_id(+) 

结果为：所有员工及对应部门的记录，包括没有对应部门编号department_id的员工记录。 

RIGHT OUTER JOIN：右外关联 

SELECT e.last_name, e.department_id, d.department_name 

FROM employees e 

RIGHT OUTER JOIN departments d 

ON (e.department_id = d.department_id); 

等价于 

SELECT e.last_name, e.department_id, d.department_name 

FROM employees e, departments d 

WHERE e.department_id(+)=d.department_id 

结果为：所有员工及对应部门的记录，包括没有任何员工的部门记录。 

FULL OUTER JOIN：全外关联 

SELECT e.last_name, e.department_id, d.department_name 

FROM employees e 

FULL OUTER JOIN departments d 

ON (e.department_id = d.department_id); 

结果为：所有员工及对应部门的记录，包括没有对应部门编号department_id的员工记录和没有任何员工的部门记录。

ORACLE8i是不直接支持完全外连接的语法，也就是说不能在左右两个表上同时加上(+)，下面是在ORACLE8i可以参考的完全外连接语法

select t1.id,t2.id from table1 t1,table t2 where t1.id=t2.id(+) 

union 

select t1.id,t2.id from table1 t1,table t2 where t1.id(+)=t2.id

连接类型
定义
图示
例子

内连接
只连接匹配的行

select A.c1,B.c2 from A join B on A.c3 = B.c3;

左外连接
包含左边表的全部行（不管右边的表中是否存在与它们匹配的行）以及右边表中全部匹配的行

select A.c1,B.c2 from A left join B on A.c3 = B.c3;

右外连接
包含右边表的全部行（不管左边的表中是否存在与它们匹配的行）以及左边表中全部匹配的行

select A.c1,B.c2 from A right join B on A.c3 = B.c3;

全外连接
包含左、右两个表的全部行，不管在另一边的表中是否存在与它们匹配的行

select A.c1,B.c2 from A full join B on A.c3 = B.c3;

（theta）连接
使用等值以外的条件来匹配左、右两个表中的行

select A.c1,B.c2 from A join B on A.c3 != B.c3;

交叉连接
生成笛卡尔积——它不使用任何匹配或者选取条件，而是直接将一个数据源中的每个行与另一个数据源的每个行一一匹配

select A.c1,B.c2 from A,B;

2.       不借助第三方工具，怎样查看sql的执行计划
I) 使用Explain Plan,查询PLAN_TABLE;

   EXPLAIN   PLAN

      SET STATEMENT_ID='QUERY1'

      FOR

      SELECT *

      FROM a

      WHERE aa=1;

   SELECT    operation, options, object_name, object_type, ID, parent_id

       FROM plan_table

      WHERE STATEMENT_ID = 'QUERY1'

   ORDER BY ID;

II)SQLPLUS中的SET TRACE 即可看到Execution Plan Statistics

   SET AUTOTRACE ON;

3.       如何使用CBO,CBO与RULE的区别
   IF 初始化参数 OPTIMIZER_MODE = CHOOSE THEN   --(8I DEFAULT)

      IF 做过表分析

         THEN 优化器 Optimizer=CBO(COST);           /*高效*/

      ELSE

         优化器 Optimizer=RBO(RULE);                /*高效*/

      END IF;

   END IF;

   区别：

   RBO根据规则选择最佳执行路径来运行查询。

   CBO根据表统计找到最低成本的访问数据的方法确定执行计划。

   使用CBO需要注意：

   I)   需要经常对表进行ANALYZE命令进行分析统计;

   II) 需要稳定执行计划;

   III)需要使用提示(Hint);

   使用RULE需要注意：

I)   选择最有效率的表名顺序

II) 优化SQL的写法;

在optimizer_mode=choose时,如果表有统计信息（分区表外）,优化器将选择CBO,否则选RBO。 

RBO遵循简单的分级方法学,使用15种级别要点，当接收到查询，优化器将评估使用到的要点数目,然后选择最佳级别（最少的数量）的执行路径来运行查询。 

CBO尝试找到最低成本的访问数据的方法,为了最大的吞吐量或最快的初始响应时间,计算使用不同的执行计划的成本，并选择成本最低的一个,关于表的数据内容的统计被用于确定执行计划。

4.       如何定位重要(消耗资源多)的SQL
使用CPU多的用户session

SELECT a.SID, spid, status, SUBSTR (a.program, 1, 40) prog, a.terminal,a.SQL_TEXT, osuser, VALUE / 60 / 100 VALUE

FROM v$session a, v$process b, v$sesstat c

WHERE c.statistic# = 12 AND c.SID = a.SID AND a.paddr = b.addr

ORDER BY VALUE DESC;

select sql_text from v$sql 

where disk_reads > 1000 or (executions > 0 and buffer_gets/executions > 30000);

5.       如何跟踪某个session的SQL
利用TRACE 跟踪

   ALTER SESSION SET SQLTRACE ON;

   COLUMN SQL format a200;

   SELECT    machine, sql_text SQL

       FROM v$sqltext a, v$session b

      WHERE address = sql_address

        AND machine = '&A'

   ORDER BY hash_value, piece;

exec dbms_system.set_sql_trace_in_session(sid,serial#,&sql_trace); 

select sid,serial# from v$session where sid = (select sid from v$mystat where rownum = 1); 

exec dbms_system.set_ev(&sid,&serial#,&event_10046,&level_12,'');

6.       SQL调整最关注的是什么
检查系统的I/O问题

sar－d能检查整个系统的iostat（IO statistics）

查看该SQL的response time(db block gets/consistent gets/physical reads/sorts (disk))

7.       说说你对索引的认识（索引的结构、对dml影响、对查询影响、为什么提高查询性能）
索引有B-TREE、BIT、CLUSTER等类型。ORACLE使用了一个复杂的自平衡B-tree结构;通常来说，在表上建立恰当的索引，查询时会改进查询性能。但在进行插入、删除、修改时，同时会进行索引的修改，在性能上有一定的影响。有索引且查询条件能使用索引时，数据库会先度取索引，根据索引内容和查询条件，查询出ROWID，再根据ROWID取出需要的数据。由于索引内容通常比全表内容要少很多，因此通过先读索引，能减少I/O，提高查询性能。

b-tree index/bitmap index/function index/patitional index(local/global)索引通常能提高select/update/delete的性能,会降低insert的速度,

8.       使用索引查询一定能提高查询的性能吗？为什么
通常,通过索引查询数据比全表扫描要快.但是我们也必须注意到它的代价.

索引需要空间来存储,也需要定期维护, 每当有记录在表中增减或索引列被修改时,索引本身也会被修改. 这意味着每条记录的INSERT,DELETE,UPDATE将为此多付出4,5 次的磁盘I/O. 因为索引需要额外的存储空间和处理,那些不必要的索引反而会使查询反应时间变慢.使用索引查询不一定能提高查询性能,索引范围查询(INDEX RANGE SCAN)适用于两种情况:

基于一个范围的检索,一般查询返回结果集小于表中记录数的30%宜采用;

基于非唯一性索引的检索

索引就是为了提高查询性能而存在的,如果在查询中索引没有提高性能,只能说是用错了索引,或者讲是场合不同

9.       绑定变量是什么？绑定变量有什么优缺点？
绑定变量是指在SQL语句中使用变量，改变变量的值来改变SQL语句的执行结果。

优点：使用绑定变量，可以减少SQL语句的解析，能减少数据库引擎消耗在SQL语句解析上的资源。提高了编程效率和可靠性。减少访问数据库的次数, 就能实际上减少ORACLE的工作量。

缺点：经常需要使用动态SQL的写法，由于参数的不同，可能SQL的执行效率不同；

绑定变量是相对文本变量来讲的,所谓文本变量是指在SQL直接书写查询条件，

这样的SQL在不同条件下需要反复解析,绑定变量是指使用变量来代替直接书写条件，查询bind value在运行时传递，然后绑定执行。 

优点是减少硬解析,降低CPU的争用,节省shared_pool 

缺点是不能使用histogram,sql优化比较困难

10.   如何稳定(固定)执行计划
可以在SQL语句中指定执行计划。使用HINTS;

query_rewrite_enabled = true

star_transformation_enabled = true

optimizer_features_enable = 9.2.0

创建并使用stored outline

11.   和排序相关的内存在8i和9i分别怎样调整，临时表空间的作用是什么
SORT_AREA_SIZE 在进行排序操作时，如果排序的内容太多，内存里不能全部放下，则需要进行外部排序，

此时需要利用临时表空间来存放排序的中间结果。

8i中sort_area_size/sort_area_retained_size决定了排序所需要的内存， 如果排序操作不能在sort_area_size中完成,就会用到temp表空间

9i中如果workarea_size_policy=auto时, 

排序在pga内进行,通常pga_aggregate_target的1/20可以用来进行disk sort; 

如果workarea_size_policy=manual时,排序需要的内存由sort_area_size决定， 在执行order by/group by/distinct/union/create index/index rebuild/minus等操作时,如果在pga或sort_area_size中不能完成,排序将在临时表空间进行（disk sort）,临时表空间主要作用就是完成系统中的disk sort.

12.   存在表T(a,b,c,d),要根据字段c排序后取第21—30条记录显示，请给出sql
     SELECT    *

         FROM (SELECT ROWNUM AS row_num, tmp_tab.*

                 FROM (SELECT    a, b, c, d

                           FROM T

                       ORDER BY c) tmp_tab

                WHERE ROWNUM <= 30)

        WHERE row_num >= 20

ORDER BY row_num;

create table t(a number(,b number(,c number(,d number();

/ 

begin 

for i in 1 .. 300 loop 

insert into t values(mod(i,2),i/2,dbms_random.value(1,300),i/4); 

end loop;

end; 

/

select * from (select c.*,rownum as rn from (select * from t order by c desc) c) where rn between 21 and 30;

/

select * from (select * from test order by c desc) x where rownum < 30

minus

select * from (select * from test order by c desc) y where rownum < 20 order by 3 desc 

相比之 minus性能较差

二：数据库基本概念类
1 Pctused and pctfree 表示什么含义有什么作用
pctused与pctfree控制数据块是否出现在freelist中,   pctfree控制数据块中保留用于update的空间,当数据块中的free space小于pctfree设置的空间时,该数据块从freelist中去掉,当块由于dml操作free space大于pct_used设置的空间时,该数据库块将被添加在freelist链表中。

2 简单描述tablespace / segment / extent / block之间的关系
tablespace: 一个数据库划分为一个或多个逻辑单位，该逻辑单位成为表空间;每一个表空间可能包含一个或多个 Segment;

Segments: Segment指在tablespace中为特定逻辑存储结构分配的空间。每一个段是由一个或多个extent组成。包括数据段、索引段、回滚段和临时段。

Extents: 一个 extent 由一系列连续的 Oracle blocks组成.ORACLE为通过extent 来给segment分配空间。

Data Blocks：Oracle 数据库最小的I/O存储单位，一个data block对应一个或多个分配给data file的操作系统块。

table创建时,默认创建了一个data segment,每个data segment含有min extents指定的extents数,每个extent据据表空间的存储参数分配一定数量的blocks

3 描述tablespace和datafile之间的关系
一个表空间可包含一个或多个数据文件。表空间利用增加或扩展数据文件扩大表空间，表空间的大小为组成该表空间的数据文件大小的和。一个datafile只能属于一个表空间;

一个tablespace可以有一个或多个datafile,每个datafile只能在一个tablespace内, table中的数据,通过hash算法分布在tablespace中的各个datafile中,tablespace是逻辑上的概念,datafile则在物理上储存了数据库的种种对象。

4 本地管理表空间和字典管理表空间的特点，ASSM有什么特点
本地管理表空间：（9i默认）空闲块列表存储在表空间的数据文件头。

特点：减少数据字典表的竞争，当分配和收缩空间时会产生回滚，不需要合并。

字典管理表空间：（8i默认）空闲块列表存储在数据库中的字典表里.

特点：片由数据字典管理，可能造成字典表的争用。存储在表空间的每一个段都会有不同的存储字句，需要合并相邻的块;

本地管理表空间（Locally Managed Tablespace简称LMT）

8i以后出现的一种新的表空间的管理模式，通过位图来管理表空间的空间使用。字典管理表空间（Dictionary-Managed Tablespace简称DMT） 

8i以前包括以后都还可以使用的一种表空间管理模式，通过数据字典管理表空间的空间使用。动段空间管理（ASSM），它首次出现在Oracle920里有了ASSM，链接列表freelist被位图所取代，它是一个二进制的数组， 

能够迅速有效地管理存储扩展和剩余区块（free block），因此能够改善分段存储本质，ASSM表空间上创建的段还有另外一个称呼叫Bitmap Managed Segments（BMB 段）。

5 回滚段的作用是什么
回滚段用于保存数据修改前的映象，这些信息用于生成读一致性数据库信息、在数据库恢复和Rollback时使用。一个事务只能使用一个回滚段。

事务回滚：当事务修改表中数据的时候，该数据修改前的值（即前影像）会存放在回滚段中，当用户回滚事务（ROLLBACK）时，ORACLE将会利用回滚段中的数据前影像来将修改的数据恢复到原来的值。 

事务恢复：当事务正在处理的时候，例程失败，回滚段的信息保存在undo表空间中，ORACLE将在下次打开数据库时利用回滚来恢复未提交的数据。

读一致性：当一个会话正在修改数据时，其他的会话将看不到该会话未提交的修改。 当一个语句正在执行时，该语句将看不到从该语句开始执行后的未提交的修改（语句级读一致性） 

当ORACLE执行SELECT语句时，ORACLE依照当前的系统改变号（SYSTEM CHANGE NUMBER-SCN） 来保证任何前于当前SCN的未提交的改变不被该语句处理。可以想象：当一个长时间的查询正在执行时， 若其他会话改变了该查询要查询的某个数据块，ORACLE将利用回滚段的数据前影像来构造一个读一致性视图

6 日志的作用是什么
日志文件（Log File）记录所有对数据库数据的修改，主要是保护数据库以防止故障,以及恢复数据时使用。其特点如下：

   a)每一个数据库至少包含两个日志文件组。每个日志文件组至少包含两个日志文件成员。

   b)日志文件组以循环方式进行写操作。

   c)每一个日志文件成员对应一个物理文件。

记录数据库事务,最大限度地保证数据的一致性与安全性  

重做日志文件：含对数据库所做的更改记录，这样万一出现故障可以启用数据恢复,一个数据库至少需要两个重做日志文件 

归档日志文件：是重做日志文件的脱机副本，这些副本可能对于从介质失败中进行恢复很必要。

7 SGA主要有那些部分，主要作用是什么
系统全局区（SGA）:是ORACLE为实例分配的一组共享缓冲存储区，用于存放数据库数据和控制信息，以实现对数据库数据的管理和操作。

SGA主要包括:

a)共享池(shared pool) ：用来存储最近执行的SQL语句和最近使用的数据字典的数据。

b)数据缓冲区 (database buffer cache)：用来存储最近从数据文件中读写过的数据。

c)重作日志缓冲区（redo log buffer）：用来记录服务或后台进程对数据库的操作。

另外在SGA中还有两个可选的内存结构：

d)Java pool:   用来存储Java代码。

e)Large pool: 用来存储不与SQL直接相关的大型内存结构。备份、恢复使用。

GA：db_cache/shared_pool/large_pool/java_pool 

db_cache: 数据库缓存（Block Buffer）对于Oracle数据库的运转和性能起着非常关键的作用，它占据Oracle数据库SGA（系统共享内存区）的主要部分。Oracle数据库通过使用LRU算法，将最近访问的数据块存放到缓存中，从而优化对磁盘数据的访问.

shared_pool: 共享池的大小对于Oracle 性能来说都是很重要的。共享池中保存数据字典高速缓冲和完全解析或编译的的PL/SQL 块和SQL 语句及控制结构 

large_pool: 使用MTS配置时，因为要在SGA中分配UGA来保持用户的会话，就是用Large_pool来保持这个会话内存使用RMAN做备份的时候，要使用Large_pool这个内存结构来做磁盘I/O缓存器 

java_pool: 为java procedure预备的内存区域,如果没有使用java proc,java_pool不是必须的

8 Oracle系统进程主要有哪些，作用是什么
数据写进程(DBWR)：负责将更改的数据从数据库缓冲区高速缓存写入数据文件

日志写进程(LGWR)：将重做日志缓冲区中的更改写入在线重做日志文件

系统监控   (SMON): 检查数据库的一致性如有必要还会在数据库打开时启动数据库的恢复

进程监控   (PMON): 负责在一个Oracle 进程失败时清理资源

检查点进程(CKPT)：负责在每当缓冲区高速缓存中的更改永久地记录在数据库中时,更新控制文件和数据文件中的数据库状态信息。

归档进程   (ARCH)：在每次日志切换时把已满的日志组进行备份或归档

恢复进程   (RECO): 保证分布式事务的一致性,在分布式事务中,要么同时commit,要么同时rollback;

作业调度器(CJQ ):   负责将调度与执行系统中已定义好的job,完成一些预定义的工作.

三：备份恢复类
1 备份如何分类
逻辑备份：exp/imp 指定表的逻辑备份

物理备份： 

热备份:alter tablespace begin/end backup; 

冷备份:脱机备份(database shutdown)

RMAN备份 

full backup/incremental backup(累积/差异) 

物理备份

物理备份是最主要的备份方式。用于保证数据库在最小的数据库丢失或没有数据丢失的情况下得到恢复。

冷物理

冷物理备份提供了最简单和最直接的方法保护数据库因物理损坏丢失。建议在以下几种情况中使用。

对一个已经存在大最数据量的数据库，在晚间数据库可以关闭，此时应用冷物理备份。

对需对数据库服务器进行升级，（如更换硬盘），此时需要备份数据库信息，并在新的硬盘中恢复这些数据信息，建议采用冷物理备份。

热物理

主要是指备份过程在数据库打开并且用户可以使用的情况下进行。需要执行热物理备份的情况有：

由于数据库性质要求不间断工作，因而此时只能采用热物理备份。

由于备份的要求的时间过长，而数据库只能短时间关闭时。

逻辑备份 (EXP/IMP)

逻辑备份用于实现数据库对象的恢复。但不是基于时间点可完全恢复的备份策略。只能作为联机备份和脱机备份的一种补充。

完全逻辑备份

完全逻辑备份是将整个数据库导出到一个数据库的格式文件中，该文件可以在不同的数据库版本、操作系统和硬件平台之间进行移植。

指定表的逻辑备份

通过备份工具，可以将指定的数据库表备份出来，这可以避免完全逻辑备份所带来的时间和财力上的浪费。

2 归档是什么含义 
关于归档日志：Oracle要将填满的在线日志文件组归档时,则要建立归档日志（archived redo log）。其对数据库备份和恢复有下列用处： 

数据库后备以及在线和归档日志文件，在操作系统和磁盘故障中可保证全部提交的事物可被恢复。 

在数据库打开和正常系统使用下，如果归档日志是永久保存，在线后备可以进行和使用。 

数据库可运行在两种不同方式下：NOARCHIVELOG方式或ARCHIVELOG 方式 

数据库在NOARCHIVELOG方式下使用时，不能进行在线日志的归档, 

数据库在ARCHIVELOG方式下运行，可实施在线日志的归档

归档是归档当前的联机redo日志文件。

SVRMGR> alter system archive log current;

数据库只有运行在ARCHIVELOG模式下，并且能够进行自动归档，才可以进行联机备份。有了联机备份才有可能进行完全恢复。

3 如果一个表在2004-08-04 10:30:00 被drop，在有完善的归档和备份的情况下，如何恢复
9i 新增的FLASH BACK 应该可以;

Logminer应该可以找出DML。

有完善的归档和备份，先归档当前数据，然后可以先恢复到删除的时间点之前，把DROP 的表导出来，然后再恢复到最后归档时间；

手工拷贝回所有备份的数据文件 

Sql〉startup mount; 

sql〉alter database recover automatic until time '2004-08-04:10:30:00'; 

sql〉alter database open resetlogs;

4 rman是什么，有何特点
RMAN(Recovery Manager)是DBA的一个重要工具，用于备份、还原和恢复oracle数据库, RMAN 可以用来备份和恢复数据库文件、归档日志、控制文件、系统参数文件,也可以用来执行完全或不完全的数据库恢复。 

RMAN有三种不同的用户接口：COMMAND LINE方式、GUI 方式（集成在OEM 中的备份管理器）、API 方式（用于集成到第三方的备份软件中）。 

具有如下特点： 

1）功能类似物理备份，但比物理备份强大N倍； 

2）可以压缩空块； 

3）可以在块水平上实现增量； 

4）可以把备份的输出打包成备份集，也可以按固定大小分割备份集； 

5）备份与恢复的过程可以自动管理； 

6）可以使用脚本（存在Recovery catalog 中） 

7）可以做坏块监测

5 standby的特点
备用数据库（standby database）：ORACLE推出的一种高可用性(HIGH AVAILABLE)数据库方案，在主节点与备用节点间通过日志同步来保证数据的同步，备用节点作为主节点的备份，可以实现快速切换与灾难性恢复,从920开始，还开始支持物理与逻辑备用服务器。

9i中的三种数据保护模式分别是：

1)、MAXIMIZE PROTECTION ：最大数据保护与无数据分歧，LGWR将同时传送到备用节点，在主节点事务确认之前，备用节点也必须完全收到日志数据。如果网络不好，引起LGWR不能传送数据，将引起严重的性能问题，导致主节点DOWN机。 

2)、MAXIMIZE AVAILABILITY ：无数据丢失模式，允许数据分歧，允许异步传送。 

正常情况下运行在最大保护模式，在主节点与备用节点的网络断开或连接不正常时，自动切换到最大性能模式，主节点的操作还是可以继续的。在网络不好的情况下有较大的性能影响。 

3)、MAXIMIZE PERFORMANCE：这种模式应当可以说是从8i继承过来的备用服务器模式，异步传送，无数据同步检查，可能丢失数据，但是能获得主节点的最大性能。9i在配置DATA GUARD的时候默认就是MAXIMIZE PERFORMANCE 

6 对于一个要求恢复时间比较短的系统(数据库50G,每天归档5G)，你如何设计备份策略
数据库比较大逻辑备份没什么必要，每天归档5G，每周三/周六自动归档10G，每月RMAN归档全库。应该有standby。

rman/每月一号 level 0 每周末/周三 level 1 其它每天level 2

四：系统管理类
1.       对于一个存在系统性能的系统，说出你的诊断处理思路
ü          做statspack收集系统相关信息   了解系统大致情况/确定是否存在参数设置不合适的地方/查看top 5 event/查看top sql等

ü          查v$system_event/v$session_event/v$session_wait 从v$system_event开始,确定需要什么资源(db file sequential read)等，深入研究v$session_event,确定等待事件涉及的会话，从v$session_wait确定详细的资源争用情况(p1-p3的值:file_id/block_id/blocks等)

ü          通过v$sql/v$sqltext/v$sqlarea表确定disk_reads、(buffer_gets/executions)值较大的SQL

2.       列举几种诊断IO、CPU、性能状况的方法
top   uptime   vmstat   iostat   statspack   sql_trace/tkprof

查v$system_event/v$session_event/v$session_wait

查v$sqlarea(disk_reads或buffer_gets/executions较大的SQL)

或者第三方的监视工具，TOAD就不错。

3.       对statspack有何认识
认识不深。仅限了解。StapSpack是Oracle公司提供的一个收集数据库运行性能指标的软件包。可以做数据库健康检查报告。

StapSpack是Oracle公司提供的一个收集数据库运行性能指标的软件包，该软件包从8i起，在9i、10g都有显著的增强 

该软件包的辅助表（存储相关参数与收集的性能指标的表）由最初的25个增长到43个 

收集级别参数由原来的3个（0、5、10）增加到5个（0、5、6、7、10） 

通过分析收集的性能指标，数据库管理员可以详细地了解数据库目前的运行情况，对数据库实例、等待事件、SQL等进行优化调整 

利用statspack收集的snapshot,可以统计制作数据库的各种性能指标的统计趋势图表。

4.       如果系统现在需要在一个很大的表上创建一个索引，你会考虑那些因素，如何做以尽量减小对应用的影响
可以先表分析一下，然后测试创建索引前后对应用的性能影响；

需要考虑的是该索引列不经常更新，不是有很多重复值的情况时, 在大表中使用索引特别有效. 创建的索引可以跟数据表分不同表空间存储。

在系统比较空闲时nologging选项（如果有dataguard则不可以使用nologging） 

大的sort_ared_size或pga_aggregate_target较大

5.       对raid10 和raid5有何认识
RAID 10(或称RAID 1＋0)与RAID 0＋1不同，它是用硬盘驱动器先组成RAID 1阵列，然后在RAID 1阵列之间再组成RAID 0阵列。 

RAID 10模式同RAID 0+1模式一样具有良好的数据传输性能，但却比RAID 0+1具有更高的可靠性。RAID 10阵列的实际容量为M×n/2，磁盘利用率为50％。RAID 10也需要至少4个硬盘驱动器构成，因而价格昂贵。 

RAID 10的可靠性同RAID 1一样，但由于RAID 10硬盘驱动器之间有数据分割，因而数据传输性能优良。  

RAID 5与RAID 3很相似，不同之处在于RAID 5的奇偶校验信息也同数据一样被分割保存到所有的硬盘驱动器，而不是写入一个指定的硬盘驱动器，从而消除了单个奇偶校验硬盘驱动器的瓶颈问题。RAID 5磁盘阵列的性能比RAID 3有所提高，但仍然需要至少3块硬盘驱动器。其实际容量为M×(n-1)，磁盘利用率为(n-1)/n 。  

五：综合随意类
1.       你最擅长的是oracle哪部分?
pl/sql及sql优化

2.       喜欢oracle吗？喜欢上论坛吗？或者偏好oracle的哪一部分？
喜欢。PL/SQL比较得心应手。

3.       随意说说你觉得oracle最有意思的部分或者最困难的部分
我对数据库的备份/恢复和性能调优经验明显不足，自然觉得有些困难。

基于ORACLE的研究应该是个宽广的领域，所以我觉得还是有意思的。

4.       为何要选择做DBA呢?
我对数据库的备份/恢复和性能调优经验明显不足，主要是缺乏环境和交流。

因此，算不上什么DBA。不过因此我更需要这样的机会。

不过就整个ORACLE 来说，一直从事与它相关的工作，感情还是颇深的。放弃可惜。而且就技术本身而言我觉得自己还是有学习和创新的能力，它的诸如数据仓库，数据挖掘之类的领域也很广。

数据库面试题目（二）

六：Databases Questions & Answers
1.        What are two methods of retrieving SQL?　
2.        What cursor type do you use to retrieve multiple recordsets?
3.        What action do you have to perform before retrieving data from the next result set of a stored procedure?
Move the cursor down one row from its current position. A ResultSet cursor is initially positioned before the first row. Before you can get to the first row, you would need to Move the cursor down by one row ( For ex: in java the first call to next makes the first row the current row; the second call makes the second row the current row, and so on).

4.        What is the basic form of a SQL statement to read data out of a table?
SELECT * FROM table_name;

5.        What structure can you have the database make to speed up table reads?
The question is not correct. "What structure can you have the database make to speed up table reads?" It is not clear what exactly the term "structure" means in this case. Follow the rules of DB tuning we have to:

1) properly use indexes ( different types of indexes)

2) properly locate different DB objects across different tablespaces, files and so on.

3) Create a special space (tablespace) to locate some of the data with special datatypes( for example CLOB, LOB and ...)

6.        What is a "join"?
Joins merge the data of two related tables into a single result set, presenting a denormalized view of the data.

7.        What is a "constraint"?
　　A constraint allows you to apply simple referential integrity checks to a table. There are 5 primary types of constraints that are currently supported by SQL Server:

　　PRIMARY/UNIQUE - enforces uniqueness of a particular table column.

　　DEFAULT - specifies a default value for a column in case an insert operation does not provide one.

　　FOREIGN KEY - validates that every value in a column exists in a column of another table.

　　CHECK - checks that every value stored in a column is in some specified list

　　NOT NULL - is a constraint which does not allow values in the specific column to be null. And also it is the only constraint which is not a table level constraint.

8.        What is a "primary key"?
Primary Key is a type of a constraint enforcing uniqueness and data integrity for each row of a table. All columns participating in a primary key constraint must possess the NOT NULL property.

9.        What is a "functional dependency"? How does it relate to database table design?
What functional dependence in the context of a database means is that: Assume that a table exists in the database called TABLE with a composite primary key (A, B) and other non-key attributes (C, D, E). Functional dependency in general, would mean that any non-key attribute - C D or E being dependent on the primary key (A and B) in our table here.

　　Partial functional dependency, on the other hand, is another corollary of the above, which states that all non-key attributes - C D or E - if dependent on the subset of the primary key (A and B) and not on it as a whole.

　　Example :

　　----------

　　Fully Functional Dependent : C D E --> A B

　　Partial Functional dependency : C --> A, D E --> B

　　Hope that helps!

10.    What is a "trigger"?
A trigger is a database object directly associated with a particular table. It fires whenever a specific statement/type of statement is issued against that table. The types of statements are insert, update, delete and query statements. Basically, trigger is a set of SQL statements that execute in response to a data modification/retrieval event on a table.

Other than table triggers there are also schema and database triggers. These can be made to fire when new objects are created, when a user logs in, when the database shutdown etc. Table level triggers can be classified into row and statement level triggers and those can be further broken down into before and after triggers. Before triggers can modify data.

11.    What is "index covering" of a query?
A nonclustered index that includes (or covers) all columns used in a query is called a covering index. When SQL server can use a nonclustered index to resolve the query, it will prefer to scan the index rather than the table, which typically takes fewer data pages. If your query uses only columns included in the index, then SQL server may scan this index to produce the desired output.

12.    What is a SQL view?
View is a precomplied SQL query which is used to select data from one or more tables. A view is like a table but it doesn't physically take any space. View is a good way to present data in a particular format if you use that query quite often.

View can also be used to restrict users from accessing the tables directly.

A view otherwise known as a virtual table is a mere window over the base tables in the database. This helps us gain a couple of advantages:

1) Inherent security exposing only the data that is needed to be shown to the end user

2) Views are updateable based on certain conditions. For example, updates can only be directed to one underlying table of the view. After modification if the rows or columns don't comply with the conditions that the view was created with, those rows disappear from the view. You could use the CHECK OPTION with the view definition, to make sure that any updates to make the rows invalid will not be permitted to run.

3) Views are not materialized (given a physical structure) in a database. Each time a view is queried the definition stored in the database is run against the base tables to retrieve the data. One exception to this is to create a clustered index on the view to make it persistent in the database. Once you create a clustered index on the view, you can create any number of non-clustered indexes on the view.

13.    存储过程和函数的区别
存储过程是用户定义的一系列sql语句的集合，涉及特定表或其它对象的任务，用户可以调用存储过程，而函数通常是数据库已定义的方法，它接收参数并返回某种类型的值并且不涉及特定用户表。

14.    事务是什么?
事务是作为一个逻辑单元执行的一系列操作，一个逻辑工作单元必须有四个属性，称为 ACID(原子性、一致性、隔离性和持久性)属性，只有这样才能成为一个事务:

原子性：事务必须是原子工作单元;对于其数据修改，要么全都执行，要么全都不执行。

一致性：事务在完成时，必须使所有的数据都保持一致状态。在相关数据库中，所有规则都必须应用于事务的修改，以保持所有数据的完整性。事务结束时，所有的内部数据结构(如 B 树索引或双向链表)都必须是正确的。

隔离性：由并发事务所作的修改必须与任何其它并发事务所作的修改隔离。事务查看数据时数据所处的状态，要么是另一并发事务修改它之前的状态，要么是另一事务修改它之后的状态，事务不会查看中间状态的数据。这称为可串行性，因为它能够重新装载起始数据，并且重播一系列事务，以使数据结束时的状态与原始事务执行的状态相同。

持久性：事务完成之后，它对于系统的影响是永久性的。该修改即使出现系统故障也将一直保持。

15.    游标的作用?如何知道游标已经到了最后?
游标用于定位结果集的行，通过判断全局变量@@FETCH_STATUS可以判断是否到了最后，通常此变量不等于0表示出错或到了最后。

16.    触发器分为事前触发和事后触发，这两种触发有和区别。语句级触发和行级触发有何区别。
事前触发器运行于触发事件发生之前，而事后触发器运行于触发事件发生之后。通常事前触发器可以获取事件之前和新的字段值。

语句级触发器可以在语句执行前或后执行，而行级触发在触发器所影响的每一行触发一次。

17.    SQL Server常用测试题(1)
问题描述:

为管理岗位业务培训信息，建立3个表:

S (S#,SN,SD,SA) S#,SN,SD,SA 分别代表学号、学员姓名、所属单位、学员年龄

C (C#,CN ) C#,CN 分别代表课程编号、课程名称

SC ( S#,C#,G ) S#,C#,G 分别代表学号、所选修的课程编号、学习成绩

1. 使用标准SQL嵌套语句查询选修课程名称为’税收基础’的学员学号和姓名

　　--实现代码:

SELECT SN,SD FROM S

WHERE [S#] IN(SELECT [S#] FROM C,SC WHERE C.[C#]=SC.[C#] AND CN=N'税收基础')

2. 使用标准SQL嵌套语句查询选修课程编号为’C2’的学员姓名和所属单位

　　--实现代码:

SELECT S.SN,S.SD FROM S,SC

WHERE S.[S#]=SC.[S#] AND SC.[C#]='C2'

3. 使用标准SQL嵌套语句查询不选修课程编号为’C5’的学员姓名和所属单位

　　--实现代码:

SELECT SN,SD FROM S

WHERE [S#] NOT IN(SELECT [S#] FROM SC WHERE [C#]='C5')

4. 使用标准SQL嵌套语句查询选修全部课程的学员姓名和所属单位

　　--实现代码:

SELECT SN,SD FROM S 

WHERE [S#] IN( SELECT [S#] FROM SC RIGHT JOIN

　　C ON SC.[C#]=C.[C#] GROUP BY [S#] 

HAVING COUNT(*)=COUNT([S#]))

5. 查询选修了课程的学员人数

　　--实现代码:

　　SELECT 学员人数=COUNT(DISTINCT [S#]) FROM SC

6. 查询选修课程超过5门的学员学号和所属单位

　　--实现代码:

　　SELECT SN,SD FROM S

　　WHERE [S#] IN(

　　SELECT [S#] FROM SC

　　GROUP BY [S#]

　　HAVING COUNT(DISTINCT [C#])>5)

18.    SQL Server常用测试题(2)
问题描述:

已知关系模式:

S (SNO,SNAME) 学生关系。SNO 为学号，SNAME 为姓名

C (CNO,CNAME,CTEACHER) 课程关系。CNO 为课程号，CNAME 为课程名，CTEACHER 为任课教师

SC(SNO,CNO,SCGRADE) 选课关系。SCGRADE 为成绩

1. 找出没有选修过“李明”老师讲授课程的所有学生姓名

--实现代码:

SELECT SNAME FROM S

WHERE NOT EXISTS(

SELECT * FROM SC,C WHERE SC.CNO=C.CNO AND CNAME='李明' AND SC.SNO=S.SNO)

2. 列出有二门以上(含两门)不及格课程的学生姓名及其平均成绩

--实现代码:

SELECT S.SNO,S.SNAME,AVG_SCGRADE=AVG(SC.SCGRADE)

FROM S,SC,(

SELECT SNO FROM SC WHERE SCGRADE<60 GROUP BY SNO

HAVING COUNT(DISTINCT CNO)>=2)A WHERE S.SNO=A.SNO AND SC.SNO=A.SNO

GROUP BY S.SNO,S.SNAME

3. 列出既学过“1”号课程，又学过“2”号课程的所有学生姓名

　　--实现代码:

　　SELECT S.SNO,S.SNAME

　　FROM S,(SELECT SC.SNO FROM SC,C

　　WHERE SC.CNO=C.CNO AND C.CNAME IN('1','2')

　　GROUP BY SNO

　　HAVING COUNT(DISTINCT CNO)=2

　　)SC WHERE S.SNO=SC.SNO

4. 列出“1”号课成绩比“2”号同学该门课成绩高的所有学生的学号

　　--实现代码:

　　SELECT S.SNO,S.SNAME

　　FROM S,(

　　SELECT SC1.SNO

　　FROM SC SC1,C C1,SC SC2,C C2

　　WHERE SC1.CNO=C1.CNO AND C1.NAME='1'

　　AND SC2.CNO=C2.CNO AND C2.NAME='2'

　　AND SC1.SCGRADE>SC2.SCGRADE

　　)SC WHERE S.SNO=SC.SNO

5. 列出“1”号课成绩比“2”号课成绩高的所有学生的学号及其“1”号课和“2”号课的成绩

　　--实现代码:

　　SELECT S.SNO,S.SNAME,SC.[1号课成绩],SC.[2号课成绩]

　　FROM S,(

　　SELECT SC1.SNO,[1号课成绩]=SC1.SCGRADE,[2号课成绩]=SC2.SCGRADE

　　FROM SC SC1,C C1,SC SC2,C C2

　　WHERE SC1.CNO=C1.CNO AND C1.NAME='1'

　　AND SC2.CNO=C2.CNO AND C2.NAME='2'

　　AND SC1.SCGRADE>SC2.SCGRADE

　　)SC WHERE S.SNO=SC.SNO

19.    Question 1：Can you use a batch SQL or store procedure to calculating the Number of Days in a Month
找出当月的天数
select datepart(dd,dateadd(dd,-1,dateadd(mm,1,cast(cast(year(getdate()) as varchar)+'-'+cast(month(getdate()) as varchar)+'-01' as datetime))))

20.    Question2：Can you use a SQL statement to calculating it!
How can I print "10 to 20" for books that sell for between $10 and $20，"unknown" for books whose price is null, and "other" for all other prices?

select bookid,bookname,price=case when price is null then 'unknown' 

when    price between 10 and 20 then '10 to 20' else price end
from books

21.      Question3：Can you use a SQL statement to finding duplicate values!
How can I find authors with the same last name?
You can use the table authors in datatabase pubs. I want to get the result as below:
Output:
au_lname                                   number_dups 
---------------------------------------- ----------- 
Ringer                                     2
(1 row(s) affected) 
Answer 3
select au_lname,number_dups=count(1) from authors group by au_lname
22.    Question4：Can you create a cross-tab report in my SQL Server!
How can I get the report about sale quality for each store and each quarter and the total sale quality for each quarter at year 1993?
You can use the table sales and stores in datatabase pubs. 
Table Sales record all sale detail item for each store. Column store_id is the id of each store, ord_date is the order date of each sale item, and column qty is the sale qulity. Table stores record all store information.
I want to get the result look like as below:
Output:
stor_name                                  Total         Qtr1          Qtr2          Qtr3          Qtr4        
---------------------------------------- ----------- ----------- ----------- ----------- ----------- 
Barnum's                                   50            0             50            0             0
Bookbeat                                   55            25            30            0             0
Doc-U-Mat: Quality Laundry and Books       85            0             85            0             0
Fricative Bookshop                         60            35            0             0             25
Total                                      250           60            165           0             25

Answer 4：用动态SQL实现

23.    Question5: The Fastest Way to Recompile All Stored Procedures
I have a problem with a database running in SQL Server 6.5 (Service Pack 4). We moved the database (object transfer) from one machine to another last night, and an error (specific to a stored procedure) is cropping up. However, I can't tell which procedure is causing it. Permissions are granted in all of our stored procedures; is there a way from the isql utility to force all stored procedures to recompile?
Tips: sp_recompile can recomplie a store procedure each time
Answer 5：在执行存储过程时,使用 with recompile 选项强制编译新的计划；使用sp_recompile系统存储过程强制在下次运行时进行重新编译

24.    Question6: How can I add row numbers to my result set?
In database pubs, have a table titles , now I want the result shown as below,each row have a row number, how can you do that?
Result:
line-no       title_id 
----------- -------- 
1             BU1032
2             BU1111
3             BU2075
4             BU7832
5             MC2222
6             MC3021
7             MC3026
8             PC1035
9             PC8888
10            PC9999
11            PS1372
12            PS2091
13            PS2106
14            PS3333
15            PS7777
16            TC3218
17            TC4203
18            TC7777

Answer 6：
--SQL 2005的写法
select row_number() as line_no ,title_id from titles
--SQL 2000的写法
select line_no identity(int,1,1),title_id into #t from titles
select * from #t
drop table #t

25.    Question 7: Can you tell me what the difference of two SQL statements at performance of execution?

Statement 1:
if NOT EXISTS ( select * from publishers where state = 'NY') 
begin
SELECT 'Sales force needs to penetrate New York market'
end
else
begin
SELECT 'We have publishers in New York'
end
Statement 2:
if EXISTS ( select * from publishers where state = 'NY') 
begin
SELECT 'We have publishers in New York'
end
else
begin
SELECT 'Sales force needs to penetrate New York market'
end
Answer 7：不同点:执行时的事务数,处理时间,从客户端到服务器端传送的数据量大小

26.    Question8: How can I list all California authors regardless of whether they have written a book?
In database pubs, have a table authors and titleauthor , table authors has a column state, and titleauhtor have books each author written. 
CA behalf of california in table authors.
Answer 8：
select * from    authors where state='CA'
27.    Question9: How can I get a list of the stores that have bought both 'bussiness' and 'mod_cook' type books?
In database pubs, use three table stores,sales and titles to implement this requestment. Now I want to get the result as below:
stor_id stor_name                                
------- ---------------------------------------- 
...
7896      Fricative Bookshop
...
...
...
Answer 9：
select distinct a.stor_id, a.stor_name from stores a,sales b,titles c 
where a.stor_id=b.stor_id and b.title_id=c.title_id and c.type='business' and 
exists(select 1 from sales k,titles g where stor_id=b.stor_id 
and k.title_id=g.title_id and g.type='mod_cook')    

28.    Question10: How can I list non-contignous data?
In database pubs, I create a table test using statement as below, and I insert several row as below
create table test
( id int primary key )
go

insert into test values (1 )
insert into test values (2 )
insert into test values (3 )
insert into test values (4 )
insert into test values (5 )
insert into test values (6 )
insert into test values (8 )
insert into test values (9 )
insert into test values (11)
insert into test values (12)
insert into test values (13)
insert into test values (14)
insert into test values (18)
insert into test values (19)
go

Now I want to list the result of the non-contignous row as below,how can I do it?
Missing after Missing before 
------------- -------------- 
6               8
9               11
...

Answer 10：
select id from test t where not exists(select 1 from test where id=t.id+1) 
or not exists(select 1 from test where id=t.id-1)

29.    Question11: How can I list all book with prices greather than the average price of books of the same type?
In database pubs, have a table named titles , its column named price mean the price of the book, and another named type mean the type of books.
Now I want to get the result as below:
type           title                                                                              price                 
------------ -------------------------------------------------------------------------------- --------------------- 
business       The Busy Executive's Database Guide                                                19.9900
...
...
...
...

Answer 11：
select a.type,a.title,a.price from titles a,
(select type,price=avg(price) from titles group by type)b
where a.type=b.type and a.price>b.price

        