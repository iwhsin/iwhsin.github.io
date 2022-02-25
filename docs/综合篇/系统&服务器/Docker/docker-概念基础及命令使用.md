# Docker 概念基础

## 概念基础

## 常用命令

### 镜像拉取[docker pull]

> 从镜像仓库中拉取或者更新指定镜像.

- 语法

  ```bash
  docker pull [OPTIONS] NAME[:TAG|@DIGEST]
  ```

  - OPTIONS 说明
    ```bash
    -a :拉取所有 tagged 镜像
    --disable-content-trust :忽略镜像的校验,默认开启
    ```

- 示例
  ```bash
  docker pull redis
  ```

### 启动容器[docker run]

> 创建一个新的容器并运行一个命令.

- 语法

  ```bash
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  ```

  - OPTIONS 说明
    ```bash
    -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
    -d: 后台运行容器，并返回容器ID；
    -i: 以交互模式运行容器，通常与 -t 同时使用；
    -p: 端口映射，格式为：主机(宿主)端口:容器端口
    -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
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
    ```

- 示例

  ```bash
  # 使用docker镜像nginx:latest以后台模式启动一个容器,并将容器命名为mynginx
  docker run --name mynginx -d nginx:latest
  # 使用镜像nginx:latest以后台模式启动一个容器,并将容器的80端口映射到主机随机端口
  docker run -P -d nginx:latest
  # 使用镜像 nginx:latest，以后台模式启动一个容器,将容器的 80 端口映射到主机的 80 端口,主机的目录 /data 映射到容器的 /data
  docker run -p 80:80 -v /data:/data -d nginx:latest
  # 使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令
  docker run --name nginx1 -P -it nginx:latest /bin/bash
  ```

### 容器列表查询[docker ps]

> 列出容器.

- 语法

  ```bash
  docker ps [OPTIONS]
  ```

  - OPTIONS 参数说明
    ```bash
    -a :显示所有的容器，包括未运行的。
    -f :根据条件过滤显示的内容。
    --format :指定返回值的模板文件。
    -l :显示最近创建的容器。
    -n :列出最近创建的n个容器。
    --no-trunc :不截断输出。
    -q :静默模式，只显示容器编号。
    -s :显示总的文件大小。
    ```

- 示例

  ```bash
  docker ps -a
  ```

### 容器启停[docker start/stop/restart]

> 启动/停止/重启指定容器

- 语法

  ```bash
  docker start [OPTIONS] CONTAINER [CONTAINER...]
  docker stop [OPTIONS] CONTAINER [CONTAINER...]
  docker restart [OPTIONS] CONTAINER [CONTAINER...]
  ```

  - OPTIONS 参数说明

    ```bash
    -a: 启动并连接到容器中
    -i: 即使没有附加也保持STDIN 打开
    ```

### 连接到容器[docker attach]

> 连接到正在运行的容器.

- 语法

  ```bash
  docker attach [OPTIONS] CONTAINER
  ```

  - OPTIONS 参数说明

    ```bash

    ```

    - 注意
      - attach 连接到容器后退出终端会导致容器进程退出

- 示例

  ```bash

  ```

### 连接容器并执行命令[docker exec]

> 连接到正在运行中的容器,并执行指定命令.

- 语法

  ```bash
  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
  ```

  - OPTIONS 参数说明

    ```bash
    -d :分离模式: 在后台运行
    -i :即使没有附加也保持STDIN 打开
    -t :分配一个伪终端
    ```

- 示例

  ```bash
  docker exec -it myredis /bin/sh
  ```
