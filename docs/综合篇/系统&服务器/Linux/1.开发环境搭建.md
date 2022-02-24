# 安装CentOS 7.2 64位 Linux操作系统

## 执行yum更新如下安装包
>yum -y install gcc perl lua-devel pcre-devel openssl-devel gd-devel gcc-c++ ncurses-devel libaio autoconf lrzsz

## 更新系统时间
>ntpdate cn.pool.ntp.org

## 创建安装目录、用户

```
mkdir -p /htdocs/software
mkdir -p /data
useradd www
useradd mysql
```

## 上传软件包
>将软件安装包上传到/htdocs/software

## 安装Nginx
### 安装LuaJIT
```
cd /htdocs/software
tar zxf LuaJIT-2.1.0-beta2.tar.gz
cd LuaJIT-2.1.0-beta2
make && make install
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.1
```

### 安装ngx_devel_kit
```
cd /htdocs/software
tar zxf ngx_devel_kit-0.3.0.tar.gz
mv ngx_devel_kit-0.3.0 /usr/local/ngx_devel_kit
```

### 安装lua-nginx-module
```
tar zxf lua-nginx-module-0.10.7.tar.gz
mv lua-nginx-module-0.10.7 /usr/local/lua-nginx-module
```

### 安装ngx_cache_purge
```
tar zxf ngx_cache_purge-2.3.tar.gz
mv ngx_cache_purge-2.3 /usr/local/ngx_cache_purge
```

### 安装Nginx
```
tar zxf nginx-1.10.3.tar.gz
cd nginx-1.10.3
./configure --prefix=/data/nginx --user=www --group=www --with-file-aio --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_v2_module --with-http_image_filter_module --with-http_gzip_static_module --with-pcre --with-ld-opt="-Wl,-rpath,${LUAJIT_LIB}" --add-module=/usr/local/ngx_cache_purge --add-module=/usr/local/ngx_devel_kit --add-module=/usr/local/lua-nginx-module
make && make install
```

### 配置文件设置
```
cd /htdocs/software
tar zxf ngx_lua_waf-0.7.2.tar.gz
mv ngx_lua_waf-0.7.2 /data/nginx/conf/waf
校验Nginx配置文件
/data/nginx/sbin/nginx -t
启动Nginx
/data/nginx/sbin/nginx
平滑重启Nginx（修改配置参数后需要执行来让参数生效）
/data/nginx/sbin/nginx -s reload
```

## 安装MySQL
```
cd /htdocs/software
tar zxf mysql-5.6.34-linux-glibc2.5-x86_64.tar.gz
mv mysql-5.6.34-linux-glibc2.5-x86_64 /data/mysql
chown -R mysql.mysql /data/mysql/
配置文件配置
cp /data/mysql/support-files/my-default.cnf /etc/my.cnf
创建系统数据库的表
cd /data/mysql/
scripts/mysql_install_db --user=mysql --basedir=/data/mysql --datadir=/data/mysql/data/
编辑环境变量
vim /root/.bash_profile 修改 PATH=$PATH:$HOME/bin 为：
PATH=$PATH:$HOME/bin:/data/mysql/bin:/data/mysql/lib
输入如下命令让环境变量生效
source /root/.bash_profile
将mysql的启动服务添加系统服务中
cp support-files/mysql.server /etc/init.d/mysqld
启动mysql
service mysql start
开机自动启动设置
chkconfig --add mysql
chkconfig --list | grep mysql
修改MySQL的root用户的密码以及打开远程连接
mysql -u root -p      （第一次登录直接回车）
mysql> grant all privileges on *.* to root@'%' identified by 'Qianmi123';
mysql> use mysql;
mysql> update user set password = password('Qianmi123') where user = 'root';
mysql> flush privileges;                        (必须要刷新，不然设置无效！)
mysql> exit
重新登录测试
mysql -u root -p
Enter password: Qianmi123
```

## 安装JDK (1.8)和Tomcat(7)
```
安装JDK
cd /htdocs/software
tar zxf jdk-8u112-linux-x64.tar.gz
mv jdk1.8.0_112/ /data/jdk8
配置环境变量
vim /etc/profile
添加以下配置到末尾
export JAVA_HOME=/data/jdk8
export PATH=${JAVA_HOME}/bin:${PATH}
export CLASSPATH=${JAVA_HOME}/lib:${CLASSPATH}
执行命令让环境变量生效
source /etc/profile
检查JDK版本
java -version
安装Tomcat
cd /htdocs/software
tar zxf apache-tomcat-7.0.72.tar.gz
mv apache-tomcat-7.0.72 /data/Tomcat
```

## 安装搜索引擎ElasticSearch
```
cd /htdocs/software
tar zxf elasticsearch-1.7.1.tar.gz
mv elasticsearch-1.7.1/ /data/elasticsearch
启动搜索引擎
/data/elasticsearch/bin/elasticsearch -d
```

## 安装Redis缓存服务
```
cd /htdocs/software
           tar zxf redis-3.2.8.tar.gz
mv redis-3.2.8 /data/redis
           cd /data/redis/
           make && make install
修改配置文件
           vim redis.conf
           daemonize yes
bind 127.0.0.1 或者 内网IP   * 设置外网IP会被攻击
启动Redis服务
redis-server ./redis.conf
```

## 安装ActiveMQ
```
cd /htdocs/software
tar zxf apache-activemq-5.14.5-bin.tar.gz
mv apache-activemq-5.14.5 /data/ActiveMQ
/data/ActiveMQ/bin/activemq start
```

>项目运行需要的环境部署到此完成，下面为服务器维护配置

## 设置定时运行脚本
```
将配置文件夹中Shell传输至服务器 /htdocs 目录中；
修改crontab
crontab -e   (增加以下内容)
00 00 * * * /htdocs/Shell/DeLog/DeLog.sh
00 01 * * * /htdocs/Shell/MysqlBackup/MysqlClean.sh
00 02 * * * /htdocs/Shell/MysqlBackup/MysqlBackup.sh
00 03 * * * /htdocs/Shell/SysCache/SysCache.sh
创建数据库备份文件夹
           chmod -R 755 /htdocs/Shell/
mkdir -p /data/MysqlBackup/
```

## 设置开机启动项
```
vim /etc/rc.d/rc.local   (增加以下内容)
/data/nginx/sbin/nginx
export JAVA_HOME=/data/jdk8
/data/elasticsearch/bin/elasticsearch -d
/data/redis/src/redis-server /data/redis/redis.conf
/data/ActiveMQ/bin/activemq start
```

## 设置防火墙Firewall(CentOS 7.2)
```
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --add-port=3306/tcp --permanent
firewall-cmd --add-port=8000/tcp --permanent
firewall-cmd --add-port=61616/tcp --permanent
firewall-cmd --reload
```

## 项目部署
```
创建项目文件目录
mkdir -p /data/www/kstore/upload/
mkdir -p /htdocs/war/backup/
           将项目war包上传至 /htdocs/war/，将配置文件中WEB-INF上传至 /htdocs/
编辑自动部署脚本
mv /htdocs/Shell/tomcat /etc/init.d/
ln -s /etc/init.d/tomcat /usr/local/bin/tomcat
chkconfig --add tomcat
chkconfig --list | grep tomcat
导入数据库SQL
           利用SQLyog等数据连接软件将数据库sql文件导入至数据库中，数据库名为kstore
启动Tomcat
           service tomcat load  (第一次启动项目)
更新项目
           service tomcat reload  (更新项目，跟项目部署一样，先将war包上传，再执行命令)
访问地址
服务器IP+端口8000
```
