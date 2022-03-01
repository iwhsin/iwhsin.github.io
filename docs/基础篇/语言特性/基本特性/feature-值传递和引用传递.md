# 值传递VS引用传递
> 这是一个很容易产生误解的概念，平时我们理解的和实际意义很容易出现偏差，在`Java`语言中到底是值传递还是引用传递呢？

- 看下常见的几种的误解：
    - 误解一：根据传递的内容来区分，传递的是值对象（基本类型）就是值传递，传递的是个引用对象就是引用传递；
    - 误解二：Java 是`引用传递`，这种误解可能会因为java中传递的形参是对象的引用。
    - 误解三：都是`值传递`，这种误解可能认为引用传递本身也是引用地址的值，误认为是值传递。

&emsp;&emsp;上述误解都是因为对`引用传递`和`值传递`的本身概念理解存在偏差导致的，通过深入理解这两者概念才能很容易的清楚造成误解的根本原因。

## 什么是值传递？
&emsp;&emsp;`值传递（pass by value）`是指在调用函数时将实际参数`复制`一份传递到函数中，这样在函数中如果对`参数`进行修改，将不会影响到实际参数。

&emsp;&emsp;值传递传递的是一个对象的副本，对副本的修改不会对对象原本的信息造成影响。


## 什么是引用传递？
&emsp;&emsp;`引用传递（pass by reference）`是指在调用函数时将实际参数的地址`直接`传递到函数中，那么在函数中对`参数`所进行的修改，将影响到实际参数。

&emsp;&emsp;引用传递是传递的对象自身，在被调用的位置对传递的对象修改，也是对对象自身进行修改，会影响到对象本身。

## Java中的值传递
- 概念：通过上面`值传递`和`引用传递`的概念理解，再回头看下Java中的为什么是值传递。

- 代码示例：
    - 代码示例1：
    ```java
        public static void main(String[] args) {
            HashMap<String, String> map = new HashMap<>();
            map.put("key", "value");
            pass(map);
            System.out.println(map);
        }
        public static void pass(Map<String, String> map) {
            map = new HashMap<>(5);
            map.put("key", "whsin");
            System.out.println(map);
        }

    // 输出结果
    //    {key=whsin}
    //    {key=value}
    ```
    - 代码示例2：
    ```java
        public static void main(String[] args) {

            HashMap<String, String> map = new HashMap<>();
            map.put("key", "value");
            pass(map);
            System.out.println(map);
        }

        public static void pass(Map<String, String> map) {

            map.put("key", "whsin");

            System.out.println(map);
        }

    //    {key=whsin}
    //    {key=whsin}
    ```

- 代码分析
    - 假设 Java 语言中参数传递是`引用传递`，示例中的代码将参数`map`传递到`pass()`方法中的应该是`引用对象`的实际地址，在方法中对其参数进行修改，则实际参数`map`也应该发生变化，而实际结果`map`并未变化。
    - Java 中将实际参数传递到方法中，传递的是实参的引用对象的拷贝（和实际参数指向同一块堆内存对象），在被调用的方法中对参数对象本身进行修改并不会原有参数信息。
        - 如`代码示例1`中，对方法中接收的参数对象的值（指向堆中的内存对象）进行修改，原有的实际参数指向的`内存对象`也发生了变化；
        - 如`代码示例2`中，对方法中接收的参数对象本身修改，原有实参并未发生改变，符合`值传递`的概念；

- 总结：<br>
![Java 值传递][1]
    - 如上图所示，Java中对于对象传递，是传递的引用对象是原有引用对象的副本，和原有引用对象指向堆中的同一个实例对象。根据`值传递`和`引用传递`的定义可知，java中的这种传递方式属于`值传递`。
    - 无论是`值传递`还是`引用传递`，其实都是一种求值策略。在求值策略中，还有一种叫做按共享传递(call by sharing)。其实Java中的参数传递严格意义上说应该是按共享传递。
        - 按共享传递，是指在调用函数时，传递给函数的是实参的地址的拷贝（如果实参在栈中，则直接拷贝该值）。在函数内部对参数进行操作时，需要先拷贝的地址寻找到具体的值，再进行操作。
        - 如果该值在栈中，那么因为是直接拷贝的值，所以函数内部对参数进行操作不会对外部变量产生影响。如果原来拷贝的是原值在堆中的地址，那么需要先根据该地址找到堆中对应的位置，再进行操作。
        - 因为传递的是地址的拷贝所以函数内对值的操作对外部变量是可见的。
    - 简单点说，Java中的传递，是值传递，而这个值，实际上是对象的引用，可以参考文章 [so-java-passes-object-by-reference-or-by-value][2]。    


<!-- 资料链接 -->
[1]: /docs/assets/images/basic/java-pass-by-value.png
[2]: https://www.programcreek.com/2011/08/so-java-passes-object-by-reference-or-by-value/
