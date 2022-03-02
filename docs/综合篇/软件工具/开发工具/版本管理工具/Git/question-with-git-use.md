# Git 使用问题汇总

## 1. 文件显示中文乱码问题
> 问题：在使用`git-bash`客户端时输出显示包含`中文名称`的文件时会显示乱码。<br>
> 解决：配置如下配置`git config --global core.quotepath false`。

## 2. 提交账户密码缓存配置
> 问题：推送到远程时需要登录频繁登录账号、密码的操作。
> 解决：配置如下配置`git config --global credential.helper cache`进行缓存账号和密码。

## 3. Git提示文件名太长。
> 问题：`Filename too long`
> 解决： 配置`git config --global core.longpaths true`

## 4. Git换行符号转义问题
> 问题：`warning: LF will be replaced by CRLF in `<br>
> 解决：`git config --global core.autocrlf false`