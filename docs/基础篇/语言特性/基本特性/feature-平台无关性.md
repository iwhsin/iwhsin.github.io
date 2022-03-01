# 平台无关性
&emsp;&emsp;java语言的一个基本特性是可移植，跨平台，`一次编写，处处运行`。<br>
&emsp;&emsp;java的平台无关性主要依靠`java语言规范`、`class文件`和`JVM虚拟机`。

## Java语言规范
&emsp;&emsp;Java中基本数据类型的值域和行为都是由其自己定义的。

## Class文件
&emsp;&emsp;Java 有着统一的`class`文件，在不同平台编译的`class`文件是一样。

## JVM虚拟机
&emsp;&emsp;Java 虚拟机提供了各个平台的版本，根据统一的`class`文件，JVM经过编译成对应平台的机器码进行解释执行，实现了java的平台无关性。
