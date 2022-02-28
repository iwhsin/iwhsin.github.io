# 1. MySQL 问题汇总

## 1.1. 索引长度问题

- 问题现场<br>
  &emsp;&emsp;`Specified key was too long; max key length is 3072 bytes`

- 解决
  ```
  在 5.6.3 之后的版本，字节限制提高到了 3072 bytes
  当字符集为 utf8mb4 时，一个字符对应 4 bytes;
  当字符集为 utf8 时，一个字符对应 3 bytes;
  索引长度为所有索引列的长度总和
  ```

## emoj 字符存储支持配置

- 修改数据库配置文件

  - windows 下的为 my.ini(linux 下的为 my.cnf)
  - windows 下的 my.ini 路径：C:\ProgramData\MySQL\MySQL Server 5.6

  ```conf
  [client]
  default-character-set = utf8mb4

  [mysql]
  default-character-set = utf8mb4

  [mysqld]
  character-set-server = utf8mb4
  coll
  ```

- 修改数据库、表、字段的编码为 utf8m64

  ```sql
  -- 修改数据库
  ALTER DATABASE `database` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  -- 修改表:
  ALTER TABLE `table` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  -- 修改表字段:
  ALTER TABLE `field` CHANGE `content` content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'content';
  ```
