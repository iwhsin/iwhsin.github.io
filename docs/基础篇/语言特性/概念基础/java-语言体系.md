# Java语言体系
## 1.1. 语言体系概念图
- Java体系概念图（[Description of Java Conceptual Diagram][2]）
![][1]

## 1.2. Java语言发展简史
![Java语言发展简史][5]
&emsp;&emsp;Java 语言发展至今，截止到1.8版本发布，应用程序编程接口（API）已经从200个类扩展到超过4000个类。现在这些API覆盖了用户界面构建、数据库管理、国际化、安全性以及XML处理等各个不同的领域。

## 1.3. 语言特性
&emsp;&emsp;Java 作为一种高级编程语言，有着很多优秀的特性，比如：`面向对象`、`跨平台`、`分布式`可以参考官网的 [Java 白皮书][3] 和 [Java 语言特性介绍][4]。

- 简单：<br>
&emsp;&emsp;Java 语言对于开发人员是友好的，可以很容易学习上手。

- 面向对象<br>
&emsp;&emsp;Java 语言中，把一切都当为对象（万物皆对象），将事物的特征和行为封装在对象中，对象提供了基本属性和访问接口。

- 分布式<br>
&emsp;&emsp;Java 语言拥有完善的生态体系，集合了很多优化的第三方库和组件，很容易处理像`HTTP`和`FTP`之类的`TCP/IP`协议。

- 健壮性<br>
&emsp;&emsp;Java 语言的设计目标之一在于使得Java编写的程序具有多方面的可靠性。

- 安全性<br>
&emsp;&emsp;Java 语言在设计时就考虑了能够防范各种安全攻击，比如下述的几种安全问题：
    - 运行时堆栈溢出。如蠕虫和病毒常用的攻击手段。
    - 破坏自己的进程空间之外的内存。
    - 未经授权读写文件。<br>
> [!NOTE]
> Java 语言中安全模型的基础是：严格限制字节码所能表述的操作。

- 体系结构中立<br>
&emsp;&emsp;Java 编译器生成一个体系结构中立的目标文件格式（.class），这是一种编译过的代码，只要有Java运行时系统，这些编译后的代码可以在许多处理器上运行。

- 可移植性

- 解释型

- 高性能<br>
&emsp;&emsp;即时编译器，不可重写的方法内联，热点代码

- 多线程

- 动态性

## 1.4. 对比其它语言
&emsp;&emsp;上面介绍了 Java 语言的那么多的特性，终究和其它语言的差异在哪呢？当然还是要进行比较才知道，下面列举了和几种热门技术语言的对比。
1. **Java 和 C 比较**
    - Java面向对象，C面向过程。
    - Java通过类文件实现可移植性，C需要重新编译。
    - Java为运行时提供了全面的监测程序。
    - Java没有指针，也没有指针相等性运算。
    - Java通过垃圾回收提供了自动内存管理功能。
    - Java无法从低层布局内存（没有结构体）。
    - Java没有预处理器。

2. **Java 和 C++比较**
    - Java的对象模型比C++简单。
    - Java默认使用虚分派（virtual dispatch）。
    - Java始终使用值传递（不过Java中的值也能作为对象引用）。
    - Java不完全支持多重继承。
    - Java的泛型没C++的模板强大（不过危害性较小）。
    - Java无法重载运算符。
    - Java采用的指针模型可以消除重写内存和损坏数据的可能性。

3. **Java 和 PHP比较**
    - Java是静态类型语言，PHP是动态类型语言。
    - Java有JIT，PHP 没有（PHP6可能会有）。
    - Java是通用语言，PHP 在网站技术之外很难见到。
    - Java支持多线程，PHP 不支持。

4. **Java 和 JavaScript比较**
    - Java是静态类型语言，JavaScript是动态类型语言。
    - Java使用基于类的对象，JavaScript使用基于原型的对象。
    - Java提供了良好的对象封装，JavaScript 没有提供。
    - Java有命名空间，JavaScript没有。
    - Java支持多线程，JavaScript不支持。

<!-- 资源链接 -->
[1]: /docs/assets/images/basic/java-conceptual-diagram.png
[2]: https://docs.oracle.com/javase/8/docs/index.html
[3]: https://www.oracle.com/java/technologies/language-environment.html
[4]: http://horstmann.com/corejava/java-an-overview/7Gosling.pdf
[5]: /docs/assets/images/basic/java-language-brief-history.png
