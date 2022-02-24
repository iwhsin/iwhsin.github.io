# IDEA 配置优化

## 基本配置

&emsp;&emsp;ideaIU-2020 支持中文本地化,下载中文汉化包插件进行汉化即可，根据个人需要选择。

### 快捷键&自动提示

- **自定义快捷键**

| 动作                                                     | 配置路径                                                                                  | 指定快捷键 |
| :------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :--------- |
| 指定新建类快捷键                                         | File \| Settings \| Keymap \| Main menu \| File \| New \| Java Class                      | Ctrl+Alt+1 |
| 指定新建包快捷键<br>(不显示菜单先去打开新建窗口再去配置) | File \| Settings \| Keymap \| Main menu \| File \| New \| Create new directory or package | Ctrl+Alt+2 |
| 在资源文件夹中打开                                       | File \| Settings \| Keymap \| Other \| Show in Explorer                                   | Alt+D      |

- **自定义代码块模板**<br>
  &emsp;&emsp;在`File | Settings | Editor | Live Templates`新增`Templates Group`，再进行自定义配置`Live Templates`。<br>
  &emsp;&emsp;配置后的配置文件路径为`${idea.config.path}/templates/groupName`。<br>

    - **配置示例**
        ```yaml
        # 缩写(Abbreviation)
        //
        # 描述(Description)
        源码阅读注释
        # 模板内容(Template text)
        // Note: $END$ //
        # 作用范围(Application Context)
        JAVA_DECLARATION
        ```

    - **配置文件**(${idea.config.path}/templates/whsin.xml)
        ```xml
        <templateSet group="whsin">
        <template name="mm" value="// Note: $END$ //" description="源码阅读注释" toReformat="false" toShortenFQNames="true">
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        <template name="test" value="/** $DESC$ 测试类 */&#10;@Test&#10;public void test$Method$(){&#10;    $END$&#10;}" description="创建一个测试方法" toReformat="false" toShortenFQNames="true">
            <variable name="DESC" expression="" defaultValue="" alwaysStopAt="true" />
            <variable name="Method" expression="" defaultValue="" alwaysStopAt="true" />
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        <template name="docs" value="/** $DESC$ */" description="单行注释" toReformat="false" toShortenFQNames="true">
            <variable name="DESC" expression="" defaultValue="" alwaysStopAt="true" />
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        <template name="//" value="// Note: $END$ //" description="源码阅读注释" toReformat="false" toShortenFQNames="true">
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        <template name="docss" value="/*--------------------$DESC$--------------------*/" description="单行分割注释" toReformat="false" toShortenFQNames="true">
            <variable name="DESC" expression="" defaultValue="" alwaysStopAt="true" />
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        <template name="fore" value="for ($ELEMENT_TYPE$ $VAR$ : $ITERABLE_TYPE$) {&#10;  $END$&#10;}" description="遍历可迭代对象 | 数组" toReformat="true" toShortenFQNames="true">
            <variable name="ITERABLE_TYPE" expression="iterableVariable()" defaultValue="" alwaysStopAt="true" />
            <variable name="ELEMENT_TYPE" expression="iterableComponentType(ITERABLE_TYPE)" defaultValue="&quot;java.lang.Object&quot;" alwaysStopAt="false" />
            <variable name="VAR" expression="suggestVariableName()" defaultValue="" alwaysStopAt="true" />
            <context>
            <option name="JAVA_STATEMENT" value="true" />
            </context>
        </template>
        <template name="psfs" value="/** $DESC$ */&#10;public static final String $PARAM$ = $VALUE$;" description="声明静态常量字符串" toReformat="false" toShortenFQNames="false">
            <variable name="DESC" expression="" defaultValue="" alwaysStopAt="true" />
            <variable name="PARAM" expression="" defaultValue="" alwaysStopAt="true" />
            <variable name="VALUE" expression="" defaultValue="" alwaysStopAt="true" />
            <context>
            <option name="JAVA_DECLARATION" value="true" />
            </context>
        </template>
        </templateSet>
        ```
        
- **自定义代码风格**
&emsp;&emsp;自定义代码风格,用于格式化,设置路径`File | Settings | Editor | Code Style | Java`,配置文件路径:`${idea.config.path}/codestyles/Default.xml`。


### 文件和代码模板

- **File | Settings | 编辑器 | File and Code Templates > Files**

  - **Class.java.ft**

    ```java
    #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
    ## 是否是工具类
    #if(${utility} && ${utility} == "1")
        #set($isUtil = true)
    import lombok.experimental.UtilityClass;
    #else
        #set($isUtil = false)
    #end
    #parse("File Header.java")
    #if($isUtil)
    @UtilityClass
    #end
    public class ${NAME} {

    }
    ```

  - **package-info.java.ft**
    ```java
    #parse("PackageInfo.java")
    #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
    ```

- **File | Settings | 编辑器 | File and Code Templates > Includes**
  - **Class**
    ```java
    #set($sp="\u0020")
    /** 
    * ${description}
    *
    * @author  $sp${USER}
    * @version #if (${version} && ${version} != "") ${version}
    #else 1.0.0 
                #end
    * @since   #if (${version} && ${version} != "") ${version}
    #else 1.0.0 
                #end
    */
    ```
  - **PackageInfo**
    ```java
    #set($sp="\u0020")
    /** 
    * ${description}
    *
    * @author  $sp${USER}
    * @version #if (${version} && ${version} != "") ${version}
    #else 1.0.0 
                #end
    * @since   #if (${version} && ${version} != "") ${version}
    #else 1.0.0 
                #end
    */
    ```

## 配置优化
### intellij idea鼠标放上去提示参数
> setting ->gemeral->other->show quick documentation on mouse move
### 一直index的解决方法
> file -> Invalidate Caches / Restart
### idea序列化自动提示生成序列化ID.
```
设置: Setting->Inspections->Serialization issues->Serializable class without 'serialVersionUID'->勾选生效
使用: 在class中,Alt+Enter就会提示自动创建serialVersionUID了.
```
### 屏幕中间竖线提示单行代码长度.
```
设置: File->Settings->Editor->General->Appearance:>Show hard wrap guide(configured in Code Style options)->勾选生效
使用: 单行代码长度设置在Code Style中进行设置,详细看单行代码长度设置.
```
### 单行代码长度和自动换行设置.
```
设置: File->Settings->Editor->Code Style:>General->Hard wrap at (单行代码长度建议120)
设置: File->Settings->Editor->Code Style->java:>Wrapping and Braces->Ensure right margin is not exceeded--勾选格式化时超长自动换行--推荐
设置: File->Settings->Editor->Code Style->java:>Wrapping and Braces->(1.Wrap on typing(yes);2.Binary expressions(Wrap if long))--单行代码溢出自动换行
```
### 显示参数名称提示
```
设置：File | Settings | Editor | General | Appearance->Show parameter name hints(勾选即可显示参数名称提示)
```
### 避免自动使用.*进行包引入操作
* 系统设置：setting->Editor->Code Style->Java>imports->修改变量
    * Class count to use import with * 5->修改为500
    * Names count to use static import with * 3->修改为300
* 说明：
    * 按需类型引入（包引入）并不影响java代码的运行效率，但是会影响java代码的编译效率。
    * 按需类型引入可能会导致命名冲突。
### 全局修改author
> 在idea64.exe.vmoptions中增加`-Duser.name=whsin`

## 问题汇总
### IDEA插件仓库、更新等不能连接网络。
```
设置：File->Settings->Appearance & Behavior->System Settings->Updates-User Secure Connection 
取消该选项的选中。
```
### Tomcat启动控制台乱码
* 问题：IDEA中使用Tomcat启动应用控制台输出中文乱码.
* 解决：
    ```
    <!-- 
        2019.2之后可能会在使用系统用户文件夹中的文件，删除重新启动即可。
        %USERPROFILE%\.IntelliJIdea2018.3\config\idea64.exe.vmoptions
    -->
    修改IDEA安装目录\bin\idea64.exe.vmoptions文件增加`-Dfile.encoding=UTF-8`；
    设置Tomcat启动参数`-Dfile.encoding=UTF-8`。
    ```

## 实践应用
### idea中热部署的使用.
```
设置: File->Settings->Build,Execution,Deployment->Debugger->HotSwap
说明: idea热部署只支持debugger模式
```
### 代码生成
> PostFix Completion 很有用的一个生成代码的快捷方式, setting->Editor->General->PostFix Completion

