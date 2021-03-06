# 1. Redis 安装配置

## 1.1. Docker 安装

```bash
# 下载Redis镜像
docker pull redis
# 安装Redis
docker run --name myRedis -d -host:port redis
# 进入Redis控制台
docker exec -it myRedis redis-cli
```

## 1.2. 直接安装

```bash
# mac
brew install redis
# ubuntu
apt-get install redis
# redhat
yum install redis
```

### 1.2.1. Linux 安装

这里以`redis-5.0.9.tar.gz`版本为例。

```sh
# 解压安装包
tar zxf /app/redis-5.0.9.tar.gz
# 安装 Redis服务
cd /app/redis-5.0.9
make && make install
# 修改配置文件
vim redis.conf
## 设置后台启动
daemonize yes
## 绑定访问地址，设置外网IP会被攻击 注释掉
bind 127.0.0.1 或者 内网IP   *
## 关闭保护模式，允许外网连接
protected-mode no
## 启动 Redis 服务
sh redis-server ./redis.conf
# 设置开启启动
vi /etc/rc.local
## 追加开机启动
/usr/local/bin/redis-server /app/redis-5.0.9/redis.conf
# 密码保护
## 客户端连接redis服务
sh redis-cli
## 查看当前密码
config get requirepass
## 设置Redis密码
config set requirepass passwd
## 密码验证
auth password
```

### 1.2.2. Windows 安装

```sh
# 启动服务
redis-server.exe redis.windows.conf
# 添加到windows服务中 开机启动
redis-server.exe --service-install redis.windows.conf
# 卸载服务
redis-server --service-uninstall
# 开启服务
redis-server --service-start
# 停止服务
redis-server --service-stop
```

## 1.3. Redis 集群安装
