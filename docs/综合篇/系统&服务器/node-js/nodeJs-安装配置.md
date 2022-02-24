# Node.js安装配置
&emsp;&emsp;在[Node.js官网](https://nodejs.org/en/download/current/) 下载对应的压缩包文件,解压到指定的安装目录。

## 基本配置

### 修改默认路径和镜像源
&emsp;&emsp;默认情况下在使用`npm install express -g`进行依赖下载安装时，会将依赖下载到`nodeJs`安装目录的的`NODE_PATH/node_modules`下。

- **修改全局依赖路径**
    - 方式一：直接在当前用户工作目录`%USERPROFILE%`下创建`.npmrc`文件，编辑文件修改对应配置。
        ``` yaml
        # 全局依赖下载路径
        prefix=D:\DevProFiles\DevEnvPro\node\node_global
        # 缓存存放路径
        cache=D:\DevProFiles\DevEnvPro\node\node_cache
        # 依赖镜像源配置
        registry=https://registry.npm.taobao.org
        ```
    - 方式二：通过命令方式进行配置
        ``` bash
        # 修改全局依赖下载路径
        npm config set prefix "D:\DevProFiles\DevEnvPro\node\node_global";
        # 修改缓存存放路径
        npm config set cache "D:\DevProFiles\DevEnvPro\node\node_cache";
        # 修改镜像源配置
        npm config set registry "https://registry.npm.taobao.org";
        ```
> [!TIP]
> &emsp;&emsp;上述配置修改后下载的依赖和缓存的就会存放到指定的目录中了。
### 配置全局环境变量



- 修改module的全局环境变量配置
    - 将node根目录和node\global_moudle添加到全局环境变量中