# 句法结构
## Java 中的语句
![][1]<br>
上图列出了 Java 语言中的一些语句，下面会简单介绍下。

1. **try-with-resource**<br>
&emsp;&emsp;`TWR`是`Java 7`中引入的用于资源关闭处理的`try`语句，使用这种方式能帮助我们自动进行资源关闭处理，减少了我们在处理这些资源产生的问题，提高了开发效率，使我们更专注与公功能的开发<br>。
    - 代码示例：
        ```java
        @Test
        public void testDeserializable() {

            // 将对象流转换为对象
            try(FileInputStream fis = new FileInputStream(new File("D:", "test.java"));
                ObjectInputStream ins = new ObjectInputStream(fis)) {
                SerializableBean deserializableBean = (SerializableBean) ins.readObject();
                log.info("反序列化读取对象流为:" + deserializableBean.toString());
            } catch (ClassNotFoundException | IOException e) {
                log.log(Level.WARNING, "系统异常", e);
            }
        }
        ```
    - 总结：
        - 这种方式对于资源的处理依赖于资源实现了`Closeable`接口；
        - 将我们对于资源的声明放在`try(...)`括号中进行声明，在代码块中只需要专注于功能的实现，对于资源的关闭释放，由程序自动帮助完成；
        - 这种方式不管在try语句块中以何种方式(`return`，`系统总结`等)结束，都会对资源进行释放清理操作；
        - 比自己手动编写`catch`块更少出错，减少一些麻烦的技术问题比如`System.exit(1);`。

2. **Java中的`assert`关键字**<br>
&emsp;&emsp;assert语句用来验证Java代码的设计假想，默认情况下断言未启用，`assert`语句什么作用也没有。
    - 使用：
        - 使用`assert`用来作为一种调试手段，需要手动开启，开启方式如下：
            - 使用`-esa`参数表示为系统开启断言功能。
            - 使用`-ea`为某个类开启断言功能。`java -ea:com.example.sorters.MergeSort com.example.sorters.Test`
            - 使用`-da`可以禁用断言。
        - `assert 断言语句;`或`assert 断言语句 : 错误信息`,断言使用中要注意不能有副作用也就是不能对原有数据程序造成影响。

<!-- 资源链接 -->
[1]: ./../../assets/images/java-statement.png
