# Redis 模块系统

## 模块安装

- 启动模块
    ``` bash
    # 配置文件中加载启动
    loadmodule /path/to/module/rejson.so
    # 客户端中加载启动
    module load /path/to/module/rejson.so
    # 服务端启动时加载
    redis-server --loadmodule /path/to/module/rejson.so
    ```
    

## rejson - Json 存储
&emsp;&emsp;rejson是一个用于扩展redis中json类型数据结构的模块,为redis提供了直接操作son的能力