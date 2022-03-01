# Linux 命令使用

## 1. 系统服务管理

### 1.1. systemctl

- 启动服务：systemctl start httpd.service
- 关闭服务：systemctl stop httpd.service
- 重启服务（不管是否在运行）：systemctl restart httpd.service
- 重新载入配置（不中断服务）：systemctl reload httpd.service
- 查看运行状态：systemctl status httpd.service
- 设置开机启动：systemctl enable httpd.service
- 禁止开机启动：systemctl disable httpd.service
- 查看系统安装的服务：systemctl list-units --type=service

## 2. 文件管理

### 2.1. ls

列出/home 目录下的子目录：ls -l /home
列出当前文件夹下所有文件夹及文件大小：ls -lht

### 2.2. pwd

显示当前工作目录

### 2.3. cd

切换目录： cd /usr/local

### 2.4. date

以指定格式显示日期；date '+date:%x time:%X'

### 2.5. passwd

修改 root 密码：passwd root

### 2.6. su

普通用户切换到超级用户：su -

### 2.7. clear

清除屏幕信息

### 2.8. man

查看 ls 命令的帮助信息：man ls

### 2.9. who

- 查看当前运行级别：who -r
- 显示用的登录详情：who -buT

### 2.10. free

以 MB 显示内存使用状态：free -m

### 2.11. ps

查看系统所有进程：ps -ef
查看运行的 java 进程： ps -ef | grep java

### 2.12. top

查看系统当前活跃进程信息

### 2.13. mkdir

创建目录

### 2.14. more

分页查看  
每 10 行显示一屏查看：more -c -10

### 2.15. cat

查看 config 文件：cat -Ab config

### 2.16. rm

- 删除文件：rm a.txt
- 删除文件夹： rm -rf a/

### 2.17. touch

创建一个文件：touch a.txt

### 2.18. cp

将目录 a 的文件拷贝到目录 b: cp -r /home/a /home/b

### 2.19. mv

移动或覆盖文件：mv a.txt b.txt

## 3. 压缩与解压

### 3.1. tar

- 打包文件夹到单独的文件：tar -cvf /opt/etc.tar /etc
- 压缩文件夹到压缩文件（gzip）：tar -zcvf /opt/etc.tar.gz /etc
- 压缩文件夹到压缩文件（bzip2）：tar -jcvf /opt/etc.tar.bz2 /etc
- 查阅压缩包中内容（gzip）：tar -ztvf /opt/etc.tar.gz /etc
- 解压文件到当前目录（gzip）：tar -zxvf /opt/etc.tar.gz

## 4. 磁盘和网络管理

### 4.1. df

查看磁盘占用情况：df -hT

### 4.2. ifconfig

查看当前网络接口状态

### 4.3. netstat

- 查看路由信息：netstat -rn
- 查看所有有效 TCP 连接：netstat -an
- 查看系统中启动的监听服务：netstat -tulnp
- 查看处于连接状态的系统资源信息：netstat -atunp

### 4.4. wget

从网络上下载软件

## 5. 软件的安装与管理

### 5.1. rpm

- 安装软件包：rpm -ivh nginx-1.12.2-2.el7.x86_64.rpm
- 模糊搜索软件包：rpm -qa | grep nginx
- 精确查找软件包：rpm -qa nginx
- 查询软件包的安装路径：rpm -ql nginx-1.12.2-2.el7.x86_64
- 查看软件包的概要信息：rpm -qi nginx-1.12.2-2.el7.x86_64
- 验证软件包内容和安装文件是否一致：rpm -V nginx-1.12.2-2.el7.x86_64
- 更新软件包：rpm -Uvh nginx-1.12.2-2.el7.x86_64
- 删除软件包：rpm -e nginx-1.12.2-2.el7.x86_64

### 5.2. yum

- 安装软件包： yum install nginx
- 检查可以更新的软件包：yum check-update
- 更新指定的软件包：yum update nginx
- 在资源库中查找软件包信息：yum info nginx\*
- 列出已经安装的所有软件包：yum info installed
- 列出软件包名称：yum list redis\*
- 模糊搜索软件包：yum search redis

## 6. 网络安全

### 6.1. iptables

- 开启防火墙：systemctl start iptables.service
- 关闭防火墙：systemctl stop iptables.service
- 查看防火墙状态：systemctl status iptables.service
- 设置开机启动：systemctl enable iptables.service
- 禁用开机启动：systemctl disable iptables.service
- 查看 filter 表的链信息：iptables -L -n
- 查看 NAT 表的链信息：iptables -t nat -L -n
- 清除防火墙所有规则：iptables -F;iptables -X;iptables -Z;
- 添加过滤规则（开发 80 端口）：iptables -I INPUT -p tcp --dport 80 -j ACCEPT
- 查找规则所做行号：iptables -L INPUT --line-numbers -n
- 根据行号删除过滤规则：iptables -D INPUT 1
