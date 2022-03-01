# 闭包
> 在`Ruby`或者`Javascript`中，`闭包`是常被提及的一个概念，那到底什么是`闭包`呢？

## 闭包概念
&emsp;&emsp;在`《代码与未来》`中解释到：`闭包`就是把函数以及变量包起来，使得变量的生命周期延长。

* 看下Java 中闭包的使用
    ```java
    /** Closure Tester */
    @Test
    public void testClosure(){
        Integer integer = closureHandle().get();
        System.out.println(integer);
    }

    public static Closure<Integer> closureHandle() {
        Integer localVariable = 123;
        return new Closure<Integer>() {
            @Override
            public Integer get() {
                return localVariable;
            }
        };
    }

    interface Closure<T> {

        T get();
    }
    ```

&emsp;&emsp;看上面的代码是不是和`lambda`很相似，通过上面的代码示例将变量`localVariable`的声明周期延长了。

## Java中闭包的使用
&emsp;&emsp;在 Java 中闭包的使用其实就是利用了内部类的特性，而闭包的使用是线程不安全的，Java 中默认内部类中的变量都是`final`修饰的，Java 中提供了语法糖，内部类中的变量不需要显式声明为`final`，可以查看编译后的`.class`文件，内部类中的变量都是使用了`final`修饰。
