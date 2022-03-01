# 1. Java 中的反射机制

- 概述<br>
  &emsp;&emsp;Java 中的反射机制（reflection）是指在程序运行时动态获取类对象信息和动态调用类的对象功能。
- 反射的作用
  - 在运行时判断任意一个对象所属的类；
  - 在运行时构造任意一个类的对象；
  - 在运行时判断任意一个类所具有的成员变量和方法；
  - 在运行时调用任意一个对象的方法；
  - 生成动态代理。
- 反射的实现<br>
  &emsp;&emsp;java 中反射的实现依赖`java.lang.Class`类，在 java 中每个`.class`在虚拟机进行类加载的时候都会创建对应的`Class`对象，在运行时，通过`Class`对象获取对应的类的属性和行为信息。

## 1.1. `Class`类

- 概述<br>
  &emsp;&emsp;在 Java 中，每个 class 都有一个相应的 Class 对象。也就是说，当我们编写一个类，编译完成后，在生成的.class 文件中，就会产生一个 Class 对象，用于表示这个类的类型信息。
- 获取类的 Class 对象有如下几种方式：
  - 通过继承自`Object`类的`getClass()`方法进行显示获取：`instance.getClass()`；
  - 通过 JavaType.class 获取：`Integer.class`；
  - 通过`Class`类的静态方法`forName()`：`Class.forName("java.lang.Integer")`。
  - 示例：
  ```java
  // 通过类直接获取
      Class<ClassBean> typeClass = ClassBean.class;
  // 通过实例对象获取
  Class<? extends ClassBean> objClass = ClassBean.getInstance().getClass();
  // 通过类全路径名获取
  Class<?> forNameClass = Class.forName("icoder.common.bean.ClassBean");
  ```
- 常用方法汇总：
  - 类对象信息获取
  - 类对象分析
    ```java
    // 实例化对象
    Object classBean = ClassBean.class.newInstance();
    // 判断指定对象是否是类对象表示的类的实例对象
    ClassBean.class..isInstance(classBeanC)
    // 判断是否和给定的类对象表示相同的类或是其基类
    Enum.class.isAssignableFrom(EnumBean.class)
    ```
