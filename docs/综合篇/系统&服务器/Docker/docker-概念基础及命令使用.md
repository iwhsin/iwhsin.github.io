# Docker 概念基础

## 1. 概念基础

## 2. 常用命令

### 2.1. 镜像管理

#### 2.1.1. 镜像搜索

``` bash
Usage:  docker search [OPTIONS] TERM
OPTIONS:
  --limit n 指定返回查询结果的个数最大为n

>
> docker search anapsix/alpine-java
NAME                  DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
anapsix/alpine-java   Oracle Java 8 (and 7) with GLIBC 2.28 over A…   478                  [OK]
```

#### 2.1.2. 镜像下载

``` bash
Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]
OPTIONS:
  -a,--all-tags           拉取所有 tagged 镜像
  --disable-content-trust 忽略镜像的校验,默认开启
  --platform              指定平台
  -q, --quiet             不输出控制台日志

>
> docker pull anapsix/alpine-java:latest
latest: Pulling from anapsix/alpine-java
169185f82c45: Already exists
1e929b64ace7: Pull complete
Digest: sha256:1d24bc352e07b84c073acfff8bf913c213d1cfc73cdf876b181d714870968819
Status: Downloaded newer image for anapsix/alpine-java:latest
docker.io/anapsix/alpine-java:latest
```

#### 2.1.3. 镜像删除

``` bash
Usage:  docker rmi [OPTIONS] IMAGE [IMAGE...]
OPTIONS:
  -f, --force   强制删除指定镜像
  --no-prune    不移除该镜像的过程镜像，默认移除

>
> docker rmi anapsix/alpine-java
Untagged: anapsix/alpine-java:latest
Untagged: anapsix/alpine-java@sha256:1d24bc352e07b84c073acfff8bf913c213d1cfc73cdf876b181d714870968819
Deleted: sha256:c45785c254c572a1dbcb90aa397afa3683d10ecd210e5453cd101e72d74044af
Deleted: sha256:9a11d33865b43fe3be3353f22a1c9cd22911daab3d7845f77f95dbc9083f0527
```

### 2.2. 容器管理

#### 2.2.1. 创建并启动容器[docker run]

``` bash
Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
OPTIONS:
  -p, --publish list        端口映射，格式为：主机(宿主)端口:容器端口
  -P, --publish-all         将暴露的端口随机映射宿主机的某个端口上
  -d, --detach              后台运行容器，并返回容器ID
  -v, --volume list         将指定文件夹挂载到容器的指定位置上 host:container
  -i, --interactive         以交互模式运行容器，通常与 -t 同时使用；
  -t, --tty                 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
  --name="nginx-lb": 为容器指定一个名称；
  --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；
  --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；
  -h "mars": 指定容器的hostname；
  -e username="ritchie": 设置环境变量；
  --env-file=[]: 从指定文件读入环境变量；
  --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；
  -m :设置容器使用内存最大值；
  --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
  --link=[]: 添加链接到另一个容器；
  --expose=[]: 开放一个端口或一组端口；

  >
  # 使用docker镜像nginx:latest以后台模式启动一个容器,并将容器命名为mynginx
  > docker run --name mynginx -d nginx:latest
  # 使用镜像nginx:latest以后台模式启动一个容器,并将容器的80端口映射到主机随机端口
  > docker run -P -d nginx:latest
  # 使用镜像 nginx:latest，以后台模式启动一个容器,将容器的 80 端口映射到主机的 80 端口,主机的目录 /data 映射到容器的 /data
  > docker run -p 80:80 -v /data:/data -d nginx:latest
  # 使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令
  > docker run --name nginx1 -P -it nginx:latest /bin/bash
```

### 2.3. 容器信息查询

- **容器列表查询[docker ps]**

``` bash
Usage:  docker ps [OPTIONS]
OPTIONS
  -a, --all             显示所有的容器，包括未运行的
  -f, --filter filter   根据条件过滤显示的内容
      --format string   指定返回值的模板文件
  -n, --last int        列出最近创建的n个容器
  -l, --latest          显示最近创建的容器
      --no-trunc        不截断输出
  -q, --quiet           静默模式，只显示容器编号
  -s, --size            显示总的文件大小

>
> docker ps -a
```

- **获取容器/镜像的元数据[docker inspect]**

```bash
Usage:  docker inspect [OPTIONS] NAME|ID [NAME|ID...]
Options:
  -f, --format string   使用给定的 Go 模板格式化输出
  -s, --size            如果类型是容器，则显示总文件大小
      --type string     返回指定类型的 JSON

> docker inspect myRedis
# 查看容器Ip地址
> docker inspect --format '{{ .NetworkSettings.IPAddress }}' myRedis
172.17.0.2
```

- 获取容器的日志

```bash
Usage:  docker logs [OPTIONS] CONTAINER
Options:
      --details        显示提供给日志的额外详细信息
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g.
                       2013-01-02T13:23:37Z) or relative (e.g. 42m for 42
                       minutes)
  -n, --tail string    Number of lines to show from the end of the logs
                       (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g.
                       2013-01-02T13:23:37Z) or relative (e.g. 42m for 42
                       minutes)

>
> docker logs myRedis
1:C 01 Mar 2022 08:35:05.734 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 01 Mar 2022 08:35:05.734 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 01 Mar 2022 08:35:05.734 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 01 Mar 2022 08:35:05.734 * monotonic clock: POSIX clock_gettime
1:M 01 Mar 2022 08:35:05.735 * Running mode=standalone, port=6379.
1:M 01 Mar 2022 08:35:05.735 # Server initialized
1:M 01 Mar 2022 08:35:05.735 * Ready to accept connections
```

- 容器资源信息查看

```bash
# 显示容器资源使用统计的实时流
Usage:  docker stats [OPTIONS] [CONTAINER...]
Options:
  -a, --all             显示所有容器（默认显示刚刚运行）
      --format string   使用 Go 模板打印漂亮的图像
      --no-stream       禁用流式统计并仅提取第一个结果
      --no-trunc        不要截断输出
```

### 2.4. 容器启停[docker start/stop/restart]

```bash
# 启动容器
Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]
OPTIONS:
  -a, --attach               启动并连接到控制台,关闭控制台,容器关闭
      --detach-keys string   覆盖用于分离容器的键序列
  -i, --interactive          启动并连接到控制台,关闭控制台,容器关闭

# 停止容器
Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]
OPTIONS:
  -t, --time int   关闭容器进程前延迟等待指定时间,默认10秒

# 重启容器
Usage:  docker restart [OPTIONS] CONTAINER [CONTAINER...]
OPTIONS:
  -t, --time int   关闭容器进程前延迟等待指定时间,默认10秒

>
# 删除全部容器
> docker rm -f $(docker ps -a -q)
```

### 2.5. 容器删除[docker rm]

```bash
Usage:  docker rm [OPTIONS] CONTAINER [CONTAINER...]
OPTIONS:
  -f, --force     强制删除正在运行的容器（使用 SIGKILL）
  -l, --link      删除指定链接
  -v, --volumes   删除与容器关联的匿名卷(挂载)
```

### 2.6. 连接到容器[docker attach]

```bash
Usage:  docker attach [OPTIONS] CONTAINER
Options:
    --detach-keys string   覆盖用于分离容器的键序列
    --no-stdin             不要附加标准输入
    --sig-proxy            代理所有接收到的信号到进程(默认为真)
```

> [!NOTE]
> 连接到容器后退出终端会导致容器进程退出

### 2.7. 连接容器并执行命令[docker exec]

> 连接到正在运行中的容器,并执行指定命令.

```bash
Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Options:
-d, --detach               分离模式: 在后台运行命令
    --detach-keys string   覆盖用于分离的键序列容器
-i, --interactive          即使没有附加也保持STDIN 打开
-t, --tty                  分配一个伪终端
-e, --env list            设置环境变量
    --env-file list        读入环境变量文件
    --privileged           赋予命令扩展权限
-u, --user string          用户名或 UID（格式：<name|uid>[:<group|gid>]）
-w, --workdir string       容器内的工作目录

>
> docker exec -it myredis /bin/sh
```
