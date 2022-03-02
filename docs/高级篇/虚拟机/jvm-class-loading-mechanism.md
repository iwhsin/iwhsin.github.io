# 1. JVM 类加载机制

## 1.1. 类与类加载器
&emsp;&emsp;jvm中，确定一个类的唯一性是依赖于加载这个类的类加载器和这个类本身的。只有加载类的类加载器和类本身两者都一致，jvm才会认为这个类是唯一的。

### 1.1.1. 类加载器的分类
- JVM层面分类
    - 启动类加载器（Bootstrap ClassLoader）,由C++语言实现，属于JVM内部。
    - 其他的类加载器,由java语言编写，属于JVM外部，全部继承于抽象类java.lang.ClassLoader

- Java层面分类
    - 启动类加载器（Bootstrap ClassLoader）;
    - 扩展类加载器（Extension ClassLoader）:负责加载<JAVA_HOME>\lib\ext 目录中的，或者被java.ext.dirs系统变量所指定的路径下的类库。
    - 应用程序加载器（Application ClassLoader）:该加载器是ClassLoader中的getSystemClassLoader()方法的返回值，一般也称为系统类加载器,负责加载用户类路径CLASSPATH所指定的类库。

## 1.2. 双亲(父亲)委派机制
&emsp;&emsp;java中存在3种类型的类加载器：引导类加载器，扩展类加载器和系统类加载器。三者是的关系是：引导类加载器是扩展类加载器的父类，扩展类加载器是系统类加载器的父类。

- **类加载器**
    - **引导类加载器（Bootstrap）**<br>
    &emsp;&emsp;主要负责加载jvm自身所需要的类，该加载器由C++实现，加载的是 <JAVA_HOME>/lib 下的class文件，或 -Xbootclasspath 参数指定的路径下的jar包加载到内存中，注意必由于虚拟机是按照文件名识别加载jar包的，如rt.jar，如果文件名不被虚拟机识别，即使把jar包丢到lib目录下也是没有作用的(出于安全考虑，Bootstrap启动类加载器只加载包名为java、javax、sun等开头的类。

    - **拓展类加载器(Extension)**<br>
    &emsp;&emsp;扩展类加载器是指Sun公司(已被Oracle收购)实现的 sun.misc.Launcher$ExtClassLoader 类，由Java语言实现的，是Launcher的静态内部类，它负责加载 <JAVA_HOME>/lib/ext 目录下或者由系统变量 -Djava.ext.dir 指定位路径中的类库，开发者可以直接使用标准扩展类加载器。

    - **系统类加载器（Application）**<br>
    &emsp;&emsp;也称应用程序加载器是指Sun公司实现的 sun.misc.Launcher$AppClassLoader 。它负责加载系统类路径 java -classpath 或 -D java.class.path 指定路径下的类库，也就是我们经常用到的classpath路径，开发者可以直接使用系统类加载器，一般情况下该类加载是程序中默认的类加载器，通过 ClassLoade.getSystemClassLoader() 方法可以获取到该类加载器

- **双亲委派模型的工作过程**<br>
&emsp;&emsp;如果一个类加载器收到了类加载的请求，他首先不会自己去尝试加载这个类，而是把这个请求委派父类加载器去完成。每一个层次的类加载器都是如此，因此所有的加载请求最终都应该传送到顶层的启动类加载器中，只有当父加载器反馈自己无法完成这个请求（他的搜索范围中没有找到所需的类）时，子加载器才会尝试自己去加载。

- **为什么使用双亲委派机制**<br>
&emsp;&emsp;在Java的日常应用程序开发中，类的加载几乎是由上述3种类加载器相互配合执行的，在必要时，我们还可以自定义类加载器，需要注意的是，Java虚拟机对class文件采用的是按需加载的方式，也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象，而且加载某个类的class文件时，Java虚拟机采用的是双亲委派模式即把请求交由父类处理，它一种任务委派模式。
    - **JVM中如何判断两个对象属于同一个类**
        - 用同名的类完成实例化的；
        - 两个实例各自对应的同名的类的加载器必须是同一个。比如两个相同名字的类，一个是用系统加载器加载的，一个扩展类加载器加载的，两个类生成的对象将被jvm认定为不同类型的对象。
    - **目的**<br>
        &emsp;&emsp;防止重复加载同一个 .class 。通过委托去向上面问一问，加载过了，就不用再加载一遍。保证数据安全。
        &emsp;&emsp;为了系统类的安全，类似“ java.lang.Object”这种核心类，jvm需要保证他们生成的对象都会被认定为同一种类型。即“通过代理模式，对于 Java 核心库的类的加载工作由引导类加载器来统一完成，保证了 Java 应用所使用的都是同一个版本的 Java 核心库的类，是互相兼容的”。<br>
        &emsp;&emsp;保证核心 .class 不能被篡改。通过委托方式，不会去篡改核心 .clas ，即使篡改也不会去加载，即使加载也不会是同一个 .class 对象了。不同的加载器加载同一个 .class 也不是同一个 Class对象。这样保证了 Class 执行安全。

- **类加载器和双亲委派模式的关系**<br>
&emsp;&emsp;首先我们来看看如果不用双亲委派模式，会是什么结果。比如我们自己创建了一个java.lang.Object类，并且放在classpath下，然后启动程序，因为java本身会有个java.lang.Object类，然后会造成java本身的Object类由启动类加载器来加载，而我们自己创建的Object类会由应用程序类加载器类加载，然后根据我们前面提到的【一个类的唯一性由加载这个类的类加载器和这个类本身来确定】，那么现在这种情况，就会造成类的混乱。而使用双亲委派模式的话，会进行限制，这种情况如果我们自己创建了一个java.lang.Object类，则会在运行时发生错误，限制了类混乱的问题。

## 1.3. 扩展延伸
### 1.3.1. 如何自己写一个java.lang.System类？
&emsp;&emsp;为了不让我们写System类，类加载采用委托机制，这样可以保证爸爸们优先，爸爸们能找到的类，儿子就没有机会加载。而System类是Bootstrap加载器加载的，就算自己重写，也总是使用Java系统提供的System，自己写的System类根本没有机会得到加载。<br>
&emsp;&emsp;但是，我们可以自己定义一个类加载器来达到这个目的，为了避免双亲委托机制，这个类加载器也必须是特殊的。由于系统自带的三个类加载器都加载特定目录下的类，如果我们自己的类加载器加载一个特殊的目录，那么系统的加载器就无法加载，也就是最终还是由我们自己的加载器加载。


<!-- 参考资料 -->
[类加载机制-深入理解jvm](https://www.jianshu.com/p/3556a6cca7e5)<br>
[关于Jvm类加载机制，这一篇就够了](https://www.cnblogs.com/zhxiansheng/p/11128589.html)<br>
[JVM--详解类加载机制](https://blog.csdn.net/xiao__jia__jia/article/details/81044621)<br>
[深入理解jvm类加载机制](https://blog.csdn.net/sinat_29774479/article/details/100123235)<br>
[JVM类加载机制和内存模型](https://www.cnblogs.com/ywb-articles/p/11219325.html)<br>
[JVM类加载机制](https://www.jianshu.com/p/74f0501493b3)<br>
[Java类加载机制你理解了吗](https://baijiahao.baidu.com/s?id=1636309817155065432&wfr=spider&for=pc)<br>