# 1. 数据库设计规范

## 1.1. 数据库结构和存储模型

### 1.1.1. 数据库引擎类型

- 对于交易事务类型：
  - ORACLE 数据库采用 OLTP 类型
  - MYSQL 数据库采用 InnoDB 类型
- 对于数据仓库类型
  - ORACLE 数据库采用 OLAP 类型
  - MYSQL 数据库采用 InnoDB 类型

## 1.2. 表空间规范

### 1.2.1. 表空间创建规范

- 原则：不同 schema 和存储类型表空间要独立
- 实施：
  - 不同 schema 采用独立的数据表空间；
  - 数据表、索引、LOB 字段采用独立的表空间；

### 1.2.2. 表空间命名规范

- 原则：ORACLE 表空间命名采用固定方式进行
- 实施：
  - 表空间分为数据表空间、索引表空间、临时表空间，如存放大字段，另外添加一个 LOB 对象表空间；
  - 如数据库应用用户名为 user_spring,则表空间分别为：spring_data，spring_index，spring_temp，spring_lob

### 1.2.3. 表空间使用规范

- 原则：依据表的 DML 频度而使用不同的表空间。
- 实施：在上线前，依据需求分析确定动态表和静态表，将他们做表空间分离；
  - 将很少被 DML（增删改）的静态表，放在一组表空间中；
  - 将更新频繁的动态表放在另一组表空间中；
  - 如果数据表存在 LOB 对象，需 DBA 确认，相应列采用独立的表空间。

### 1.2.4. 索引的表空间使用规范

- 原则：表和索引原则上应该使用不同的表空间存储，并且不同 DML 频度的表的索引，放在不同的表空间中；
- 实施：
  - 将动态表的索引放在一组表空间中，静态表的索引放在另一个表空间中，两组不相交，而且和表所在的表空间也不相交；

## 1.3. 表的设计规范

### 1.3.1. 存储时间

- 原则：流水类型增长较快的表，需要明确保留时间策略和数据清理策略
- 实施：
  - 数据库设计文档中，包含表数据保留时间；
  - 数据库设计文档中，包含表数据清理策略和 job；

### 1.3.2. 数据存储方式

- 原则：实体表的存储方式，明确是否分区
- 实施：
  - 对于 1000 万条记录或者大小超过 2G 的表要建立分区；
  - 数据库设计文档中，如果表为分区表，必须包含分区条件规则；
  - 数据库设计文档中，需要包含表的读写比例。

### 1.3.3. 列宽度

- 原则：在 ORACLE 12C 以下，含有索引列的宽度不超过 32 位
- 实施：如果无单块读，可以忽略，否则存在 histogram 倾斜导致索引失效

### 1.3.4. 列数

- 原则：表的列数不超过 40
- 实施：超过 40 列，要求按照范式分表。

### 1.3.5. 主键

- 原则：所有表需要有主键（分区表可不使用主键）
- 实施：
  - 非业务主键（ID），表的非业务主键采用 number 类型，默认精度为 38 位，采用 sequence 实现；
  - 对于高频发的插入，主键采用前缀+sequence，例如程序的运行进程号+sequence 的方式，防止索引竞争；非业务主键为数据查询、抽取、和优化使用，禁止与业务逻辑相关联；
  - 业务主键，类似身份证，UUID，手机号码等，以 unique 来约束，不做为主键，必须由程序自动生成。

### 1.3.6. 时间戳

- 原则：所有表需要有创建时间（create_time）、修改时间（update_time）、删除时间（delete_time）,针对 delete_time 设计，考虑到数据软删除特性，可根据数据特性不做强制要求。
- 实施：类型为 Date 或者 Timestamp

### 1.3.7. 注释

- 原则：表和字段都要有注释且有真实的意义

### 1.3.8. 行总长度

- 原则：一个表中的所有字段，应当能存储在一个数据块中（BLOCK），也即：表的单行字段总长度<db_block\*(1-pctfree)
- 实施：
  - 如果所有字段的总长度超出了一个数据块，那么需要将该表拆分成两个（甚至多个）表，拆分的依据是字段的频繁使用程度，也就是频繁使用的字段在一个表中，很少被使用的字段放在另一个表中，他们之间使用相同的主键值，用主外键关联；
  - 默认 ORACLE 数据库 block 为 8k，MYSQL 的 data page 为 16K,MSSQL 的 data page 为 16k。

### 1.3.9. LOB 字段

- 原则：LOB 类型要求文件方式存放，数据库存放链接，或者与 DBA 确认
- 实施：
  - 采用 bfile 方式；
  - 采用文件存放，数据库存放文件链接信息；

## 1.4. 表分区的规范

### 1.4.1. RANGE 分区的规范

- 原则：对于 1000 万条记录或者大小超过 2G 的表，分区列数据连续不可分
- 实施：
  - number 和 date 类型采用系统自动分区类型；
  - 非唯一列采用 local 方式；
  - ORACLE 必须采用系统自动分区；
  - 主键、唯一键必须使用全局索引

### 1.4.2. LIST 分区的规范

- 原则：对于 1000 万条记录或者大小超过 2G 的表，分区列属于 LIST 类型
- 实施：
  - 各分区要手工指定；
  - 非唯一列采用 local 索引；

### 1.4.3. HASH 分区的规范

- 原则：对于 1000 万条记录或者大小超过 2G 的表，无分区列可以确定
- 实施：对于 HASH 分区表，大多数情况下依然要求采用本地索引，但是如果分区过细，也可以采用全局索引，因为根据 HASH 分区表的特征（各分区无业务区分，都有数据），该表很少会发生分区维护的工作。

## 1.5. 索引的设计规范

### 1.5.1. 在线创建索引

- 原则：对线上的表添加索引，必须采用 online 的方式进行创建
- 实施：
  - 对线上的表，需要在线添加索引，必须采用 online 添加索引的方式进行，否则会导致堵塞；
  - 例如：

### 1.5.2. 唯一约束索引

- 原则：对于唯一属性的列要求唯一索引
- 实施：删除或禁用唯一性约束通常同时使相关联的唯一索引失效，因而降低了数据库性能。要避免这样问题，可以采取下面的步骤
  - 在唯一性约束的列上创建非唯一性索引（普通索引）；
  - 添加唯一性约束，采用 enable novalidate 兼容老数据；
  - 当删除约束的时，为了不影响 index，需要加上 keep index 参数；

### 1.5.3. 外键列索引的规范

- 原则：外键列索引的规范
- 实施：
  - 尽量避免使用外键，通过业务逻辑解决外键约束问题；
  - 普通表的外键列建立普通索引即可，如果表是分区表，则依据表的情况建立本地索引或者全局索引。

### 1.5.4. 复合索引的规范

- 原则：复合索引只有在该种复合常被和该表相关的大多数 SQL 使用时才建立，并且前导列尽可能使用唯一性高的列。
- 实施：前导列遵循规则
  - 唯一性高
  - 使用频繁

### 1.5.5. 函数索引-建议不用

- 原则：尽量避免使用函数索引，需 DBA 确认
- 实施：由于函数索引在使用时，使用形式必须和创建形式一致，故应该尽量避免使用函数索引;

### 1.5.6. 位图索引的规范-建议不用

- 原则：静态表中的低基数列可以使用位图索引
- 实施：对于常发生 DML 操作的表，不能建立位图索引，请建立普通的索引即可，否则该表的相关操作很容易造成锁等待，使系统性能大受影响；其次，索引列需要低基数，只有几个数值.

### 1.5.7. 反向索引的规范-建议不用

- 原则：索引读取热点严重，业务表单要求列值要用%开始模糊匹配
- 实施：
  - 对于模糊匹配采用创建反向索引；
  - 对于索引读热点，结合使用场景，也可对索引 hash 分区。

### 1.5.8. 分区索引的规范

- 原则：对分区表的索引，非唯一性，必须使用局部索引，针对分区表，不强制使用主键，但如果使用主键，必须使用全局索引
- 实施：一般情况下，HASH 分区表可以采用全局索引，其他分区，包括 RANGE-HASH 也应该采用本地索引，主要是由于 HASH 分区表不常进行分区维护

### 1.5.9. 索引的命名规范

- 实施：
  - 主键索引：PK*表名*列名
  - 唯一索引：UK*表名*列名
  - 普通索引:IDX*表名*列名

## 1.6. Sequence 使用

- 原则：由 sequence 产生的非业务主键字段，类型为 number
- 实施：
  - 一般系统环境，cache 值设置为 100 以上；
  - 高并发环境，cache 值调整为 500 以上；
  - 对于 no cycle 类型的 sequence，maxvalue 必须设置为 28 位；
  - 禁止使用 sequence 做排序取值做业务逻辑
  - 非业务主键（ID），表的非业务主键采用 number 类型，默认精度为 38 位，采用 sequence 实现；对于高频发的插入，主键采用前缀+sequence，例如程序的运行进程号+sequence 的方式，防止索引竞争；非业务主键为数据查询、抽取、和优化使用，禁止与业务逻辑相关联。
  - 业务主键，类似身份证，UUID，手机号码等，以 unique 来约束，不做为主键，必须由程序自动生成。

## 1.7. 数据备份

- 原则：变更发版，需要备份修改的数据
- 实施：
  - update、delete 变更前，需要提供对应的备份语句，备份表在下一次变更版本必须清理；
  - drop 操作，采用先 rename 表的方式进行，下一次变更版本再 drop rename 的表；
  - truncate 操作，需要完全确认备 truncate 的表数据不再使用，可不做备份。

## 1.8. PL/SQL 代码规范

- 原则：遵循结构化设计，可读性强，可维护性强
- 实施：
  - 命名要规范，命名规则应该统一，建议系统/子系统*模块*功能\_类型模式；
  - 对象命名不超过 30 字符；
  - 命令除了”\_”和“$”，不要使用其他特殊字符；
  - 对象类型可以如下类型分类命名前缀
    - pkg\_：package
    - proc\_: store procedure
    - pk\_: primary key
    - fk\_: foreign key
    - uk\_: unique key
    - v\_: view
    - mv\_: material view
    - idx\_: index
    - seq\_: sequence
  - 变量和函数要有必要的注释;
  - SQL 语句中需要写全列名，以保证表维护字段后语句执行不受影响，不使用\*做全匹配
  - DML 操作涉及到超过 1000 行，拆分为多次执行；
  - 完成事务及时 commit，避免锁争用的锁等待；
  - 使用变量绑定，提高代码的执行效率和内存不必要开销
  - 函数中，如果进行了事物处理，必须有异常捕获代码更新操作
  - 避免 in 语法，采用 join 方式实现
  - DDL 代码块和 DML 代码块要放在不同的事务中
  - PL/SQL 使用中间表要使用 temporary 类型，减少 redo 开销
  - 作为查询谓词的列，建议为非 null 型
  - SQL 查询不能‘%’开头，如要使用，需要考虑反向索引可能
