# 序列化
&emsp;&emsp;序列化是将内存中各种对象状态进行持久化存储，并能在需要的时候将对象进行还原。

## Java中序列化有什么作用
* 在什么情况我们需要将对象进行序列化操作呢？
    * 当需要将内存中的对象保存到数据库或者文件中；
    * 当需要在网络中进行对象传输；
    * 但需要通过远程方法调用（RMI）传输对象时；

## Java中对象序列化的使用
* 在java中实现序列化可以通过实现`Serializable`或`Externalizable`接口。

* `Serializable`接口：
    * 接口使用：
        * 未实现此接口的类将无法使其任何状态序列化或反序列化；
        * 可序列化类的所有子类型本身都是可序列化的；
        * 序列化接口没有方法或字段,仅用于标识可序列化的语义
    * `serialVersionUID`序列化版本号：
        * 序列号在反序列化过程中用于验证序列化对象的发送者和接收者是否为该对象加载了与序列化兼容的类，如果接收者加载的该对象的类的serialVersionUID与对应的发送者的类的版本号不同,则反序列化将会导致InvalidClassException；
        * 可序列化类可以通过声明名为"serialVersionUID"的字段(该字段必须static final long类型)显式声明其自己的serialVersionUID.
        * 如果可序列化类未显式声明serialVersionUID,则序列化运行时将基于该类的各个方面计算该类的默认serialVersionUID值,如"Java(TM)对象序列化规范"中所述. 
        * 强烈建议所有可序列化类都显式声明serialVersionUID值,原因是计算默认的serialVersionUID对类的详细信息具有较高的敏感性,根据编译器实现的不同可能千差万别,这样在反序列化过程中可能会导致意外的InvalidClassException.
        * 为保证serialVersionUID值跨不同java编译器实现的一致性,序列化类必须声明一个明确的serialVersionUID值.
        * 强烈建议使用private修饰符显示声明serialVersionUID(如果可能),原因是这种声明仅应用于直接声明类--serialVersionUID字段作为继承成员没有用处.
        * 数组类不能声明一个明确的serialVersionUID,因此它们总是具有默认的计算值,但是数组类没有匹配serialVersionUID值的要求.
    * 方法使用：
        ```java
        在序列化和反序列化过程中需要特殊处理的类必须使用下列准确签名来实现特殊方法.
        在序列化和反序列化过程中需要特殊处理的类必须使用下列准确签名来实现特殊方法.
            private void writeObject(java.io.ObjectOutputStream out) throws IOException;
                writeObject()方法负责写入特定类的对象的状态,以便相应的readObject()方法可以恢复它.通过调用out.defaultWriteObject 以调用保存Object的字段的默认机制;
                该方法本身不需要涉及属于其超类或子类的状态.通过使用writeObject方法或使用DataOutput支持的用于基本数据类型的方法将各个字段写入ObjectOutputStream,状态可以被保存;
            private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException;
                readObject()方法负责从流中读取并恢复类字段.它可以调用in.defaultReadObject来调用默认机制,以恢复对象的非静态和非瞬态字段;
                defaultReadObject方法使用流中的信息来分配流中通过当前对象中相应指定字段保存的对象的字段.这用于处理类演化后需要添加新字段的情形;
                该方法本身不需要涉及属于其超类或子类的状态.通过使用writeObject()方法或使用DataOutput支持的用于基本数据类型的方法将各个字段写入ObjectOutputStream,状态可以被保存.
            private void readObjectNoData() throws ObjectStreamException;
                该方法本身不需要涉及属于其超类或子类的状态.通过使用writeObject()方法或使用DataOutput支持的用于基本数据类型的方法将各个字段写入ObjectOutputStream,状态可以被保存;
                在序列化流已经被篡改时也将发生;因此,不管源流是“敌意的”还是不完整的,readObjectNoData方法都可以用来正确地初始化反序列化的对象.
        将对象写入流时需要指定要使用的替代对象的可序列化类,应使用准确的签名来实现此特殊方法:
            ANY-ACCESS-MODIFIER Object writeReplace() throws ObjectStreamException;
                此writeReplace()方法将由序列化调用,前提是如果此方法存在,而且它可以通过被序列化对象的类中定义的一个方法访问.
                因此,该方法可以拥有私有(private)、受保护的(protected)和包私有(package-private)访问.子类对此方法的访问遵循java访问规则.
        在从流中读取类的一个实例时需要指定替代的类应使用的准确签名来实现此特殊方法:
            ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;
                此readResolve()方法遵循与writeReplace()相同的调用规则和访问规则.
        ```
## 注意点
* 当一个父类实现序列化，子类自动实现序列化，不需要显式实现Serializable接口；
* 当一个对象的实例变量引用其他对象，序列化该对象时也把引用对象进行序列化； 
* 不可序列化类的子类实现序列化接口，父类需要有可访问的无参构造函数。