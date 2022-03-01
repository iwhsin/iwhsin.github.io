# Docker Compose 工具使用

## 1. 概要介绍

- .env 配置

```env
APP_DIR_HOST=F://app/shopping-service
```

- docker-compose.yml 配置

```yaml
version: "3.3"
services:
  # admin 服务
  shopping-service:
    image: mall/shopping-service
    build: ../admin
    restart: always
    container_name: mall-shopping-service
    hostname: mall-shopping-service
    # 环境变量配置文件
    env_file:
      - .env
    # 磁盘共享配置
    volumes:
      - ${APP_DIR_HOST}:/var/tmp/app
    ports:
      - "8080:8080"
    networks:
      - net-shopping-service

networks:
  net-shopping-service:
    driver: bridge
```

- Dockerfile 配置文件

```bash
# 环境版本
FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER iwhsin@163.com

# JVM调优参数等额外参数
ENV PARAMS ""

ENV TZ=PRC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 指定容器暴露的端口
EXPOSE 8080

# 添加本地 JAR 到容器内
ADD target/shopping-service-1.0.0.jar shopping-service.jar

# 容器启动后执行的命令
ENTRYPOINT ["java", "-jar","shopping-service.jar" , "-Djava.security.egd=file:/dev/./urandom","$PARAMS"]
```
