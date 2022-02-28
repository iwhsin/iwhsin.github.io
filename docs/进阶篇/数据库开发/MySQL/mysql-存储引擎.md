# 1. Mysql 存储引擎

## 1.1. MyISAM 与 InnoDB 区别

- 存储结构
  - MyISAM：每个 MyISAM 在磁盘上存储成三个文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。 .frm 文件存储表定义。数据文件的扩展名为.MYD(MYD)。索引文件的扩展名是.MYI(MYIndex)。
  - InnoDB:所在的表都保存在同一个数据文件中（也可能是多个文件，或者是独立的表空间），InnoDB 表的大小只受限于操作系统文件的大小，一般为 2GB
- 存储空间
  - MyISAM:可被压缩，存储空间较小。支持三种不同的存储格式：静态表（默认，但是注意数据末尾不能有空格，会被去掉）、动态表、压缩表。
  - InnoDB:需要更多的内存和存储，它会在主内存中建立其专用的缓冲池用于高速缓冲数据和索引
- 事物支持
  - MyISAM:强调的是性能，每次查询具有原子性，其执行速度比 Innodb 类型更快，但是不提供事物支持。
  - InnoDB:提供事务支持，外部键等高级数据库功能。具有事务（commit）、回滚（rollback）和崩溃修复能力（crach recovery capabilities）的事务安全（transaction-safe ACID compliant）型表。
- CURD 操作
  - MyISAM: 如果执行大量的 select, MyISAM 是更好的选择。（因为没有支持行级锁），在增删的时候需要锁定整个表格，效率会低一些。相关的是 innoDB 支持行级锁，删除插入的时候只需要锁定该行就行，效率较高。
  - InnoDB:如果你的数据执行大量的 insert 或 update，出于性能方面的考虑，应该使用 InnoDB 表。Delete 从性能上 Innodb 更优，但 delete from table 时，InnoDB 不会重新建立表，而是一行一行的删除，在 innodb 上如果要清空保存有大量数据的表，最好使用 truncate table 这个命令
- 外键
  - MyISAM: 不支持。
  - InoDB:支持
