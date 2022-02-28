# 1. MySQL 安装配置

## 1.1. 安装配置

- 示例 :MySQL-5.7.20<没有 data 文件夹和.ini 配置文件>

  1. 初始化数据生成 data

  - mysqld --initialize-insecure 生成无密码的 root
  - mysqld --initialize 生成随机密码的 root

  2. 创建并修改 my.ini 配置文件

  ```conf
  [mysql]
  # 设置mysql客户端的字符集
  default-character-set=utf8
  [mysqld]
  # 设置mysql服务器的字符集
  character-set-server=utf8
  # 设置mysql安装路径
  basedir =D:\develope\DB\mysql
  # 设置数据库data存储路径
  datadir =D:\develope\DB\mysql\data
  # 设置服务开启端口
  port = 3306
  # 设置允许的最大连接数
  max_connections=200
  # 创建新表时将使用的默认存储引擎
  default-storage-engine=INNODB
  # sql_mode模式
  # NO_ENGINE_SUBSTITUTION :如果需要的存储引擎被禁用或未编译，那么抛出错误。不设置此值时，用默认的存储引擎替代，并抛出一个异常
  # STRICT_TRANS_TABLES :在该模式下，进行数据的严格校验,如果一个值不能插入到一个事务表中,则中断当前的操作,对非事务表不做限制
  # NO_AUTO_CREATE_USER :禁止GRANT创建密码为空的用户
  sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER
  ```

  3. 安装 mysql 服务

  - mysqld install MySQL
  - net start mysql

  4. 修改用户密码

  - set password for username @localhost = password(newpwd);;

## 1.2. 8.0.11 安装配置

- 创建 my.ini 文件并进行配置

```conf
[mysqld]
# 设置3306端口
port = 3306

# 设置mysql的安装目录
basedir =D:\DevProFiles\DataManager\MySQL

# 设置mysql数据库的数据的存放目录
datadir =D:\DevProFiles\DataManager\MySQL\data

# 设置mysql服务器的字符集
character-set-server=utf8

# 允许最大连接数
# max_connections=200

# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
# max_connect_errors=10

# 创建新表时将使用的默认存储引擎
# default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
# default_authentication_plugin=mysql_native_password


# server_id = .....

# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M

sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

[mysql]
# 设置mysql客户端的字符集
default-character-set=utf8

[client]
# 设置mysql客户端连接服务端时默认使用的端口
# port=3306
# default-character-set=utf8
```

- 打印查看默认 root 密码

```conf
# 在控制打印显示默认的root密码
mysqld --initialize --console
# A temporary password is generated for root@localhost: nM;vh,zId4Jm
#安装 mysql
mysqld --install MySQL_8.0.11
# 修改默认的root密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
```

- 默认 data 文件夹下
  performance_schema mysql sys
