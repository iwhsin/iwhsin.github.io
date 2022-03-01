# 内部类和合成类
## 内部类
&emsp;&emsp;java中的类、接口、枚举类等都是顶层类型，独立于其它类型。此外，类还可以嵌套在其它类型中进行定义，这就是`嵌套类型`（nested type），一般称为`内部类`。

- **内部类的使用**<br>
&emsp;&emsp;内部类主要是为了**对象的封装**，有如下两个目的<br>
    - 如果某个类型需要特别深入地访问另一个类型的内部实现，可以嵌套定义这个类型。作为成员类型的嵌套类型，其访问方式与访问成员变量和方法的方式一样，而且能打破封装的规则。
    - 某个类型可能只在特定的情况下需要使用，而且只在非常小的代码区域使用。这个类型应该密封在一个小范围内，因为它其实是实现细节的一部分，应该封装在一个系统的其他部分无法接触到的地方。
- **内部类的几种实现方式**<br>
    - 静态成员内部类
        - 静态成员类型是定义为其他类型静态成员的类型。
        - 嵌套的接口、枚举和注解始终都是静态成员类型（就算不使用`static`关键字也是）。

    - 非静态成员内部类
        - 非静态成员类不能和任何外层类或包同名。这是一个重要的规则，但不适用于字段和方法。
        - 非静态成员类不能包含任何静态字段、方法或类型，不过可以包含同时使用static和final声明的常量字段。
        - **静态成员是顶层结构，不和任何特定的对象关联，而非静态成员类和外层类的实例关联。**

    - 局部内部类
        - 和成员类一样，局部类和外层实例关联，而且能访问外层类的任何成员，包括私有成员；
        - 除了能访问外层类定义的字段之外，局部类还能访问局部方法的作用域中声明为final的任何局部变量、方法参数和异常参数。

    - 匿名内部类
        - 代码示例：
            ```java NestedClass
            public class NestedClass {
                private String same;
                /-- 注解内部类 -/
                @Target({ElementType.FIELD,ElementType.TYPE_PARAMETER, ElementType.TYPE_USE})
                @Retention(RetentionPolicy.RUNTIME)
                public @interface InnerAnnotation{

                }
                /-- 接口内部类 -/
                public interface InnerInterface{
                    void doSomething();
                }
                /-- 枚举内部类 -/
                public enum InnerEnum{
                    /-- StateEnum -/
                    StateEnum;
                }
                /-- 静态内部类 -/
                public static class StaticInnerClass{
                    private String staticInnerClass;
                }
                /-- 非静态内部类 -/
                public class InnerClass{
                    private String same;
                    public InnerClass() {
                        // 当成员内部类和外部具有同名属性字段,可以显示使用`this`
                        this.same = NestedClass.this.same;
                    }
                }

                /-- 局部内部类 -/
                void LocalInnerClass(String localVar){
                    /- 局部内部类 -/
                    new InnerInterface() {
                        @Override
                        public void doSomething() {
                            // 不能再内部类中引用非final修饰的变量（内部类中引用的变量默认是final修饰的）
                            // localVar = "some text"; // error：Variable 'localVar' is accessed from within inner class, needs to be final or effectively final
                            System.out.println(localVar);
                        }
                    }.doSomething();
                }
            }
            ```
            ```java NestedTest
            class NestedTest{
                @Test
                public void test(){
                    // 注解类默认为`static`
                    @NestedClass.InnerAnnotation
                    String annotationField;
                    // 接口类默认为`static`
                    NestedClass.InnerInterface innerInterface = new NestedClass.InnerInterface(){};
                    // 枚举类默认为`static`
                    NestedClass.InnerEnum innerEnum = NestedClass.InnerEnum.StateEnum;
                    // 静态成员内部类的声明`OutClass.InnerClass param = new OutClass().InnerClass()`
                    NestedClass.StaticInnerClass staticInnerClass = new NestedClass.StaticInnerClass();
                    // 非静态成员内部类的声明`OutClass.InnerClass param = new OutClass().new InnerClass()`
                    NestedClass.InnerClass innerClass = new NestedClass().new InnerClass();
                }
            }
            ```
- **为什么内部类中不能使用非`final`修饰的变量**
    - 内部类中引用的局部方法中声明的变量默认是`final`修饰的。（Variable 'localVar' is accessed from within inner class, needs to be final or effectively final）
        - 看下代码示例
            ```java
            void LocalInnerClass1(String localVar){
                /- 局部内部类 -/
                new InnerInterface() {
                    @Override
                    public void doSomething() {
                        // 在java 7中编译时会报错提示：Variable 'localVar' is accessed from within inner class, needs to be declared final
                        // java 8中此处使用不会在编译时报错，因为`javac`编译时会自动将变量声明为`final`
                        System.out.println(localVar);
                    }
                }.doSomething();
            }

            void LocalInnerClass2(final String localVar){
                /- 局部内部类 -/
                new InnerInterface() {
                    @Override
                    public void doSomething() {
                        // 声明`final`后在java 7中能正常编译
                        System.out.println(localVar);
                    }
                }.doSomething();
            }
            ```
        - 看下编译后的源码
            ```java
            // javac编译自动将localVar声明为`final`修饰的变量
            void LocalInnerClass1(final String localVar) {
                (new NestedClass.InnerInterface() {
                    public void doSomething() {
                        System.out.println(localVar);
                    }
                }).doSomething();
            }

            void LocalInnerClass2(final String localVar) {
                (new NestedClass.InnerInterface() {
                    public void doSomething() {
                        System.out.println(localVar);
                    }
                }).doSomething();
            }
            ```
        - 看下内部类编译后的源码：内部类将外部类对象引用和参数在构造函数中传递了进来，。
        ```java
        class NestedClass$1 implements InnerInterface {
            NestedClass$1(NestedClass this$0, Object var2) {
                this.this$0 = this$0;
                this.val$localVar = var2;
            }

            public void doSomething() {
                System.out.println(this.val$localVar);
            }
        }
        ```
        - 再看下为什么要声明为`final`
            - 从上面反编译代码我们看出，**在内部类中传入的局部变量的引用，如果不声明为`final`，在内部类对变量进行了修改，则会出现意想不到的逻辑错误等问题**。

## 合成类
&emsp;&emsp;
#### 合成类
&emsp;&emsp;`合成类`是一类特殊的内部类，看下它是如何产生的呢？

- 代码示例
    ```java
    public class Synthetic{        InnerClass innerClass = new InnerClass();
        /**
         * 私有的内部类
         */
        private static class InnerClass {

            private String innerName;
        }

        @SneakyThrows
        public static void main(String[] args){
            System.out.println(Class.forName("icoder.common.bean.Synthetic").isSynthetic());;
            System.out.println(Class.forName("icoder.common.bean.Synthetic$InnerClass").isSynthetic());;
            System.out.println(Class.forName("icoder.common.bean.Synthetic$1").isSynthetic());

            // out result
                // false
                // false
                // true
        }
    }
    ```
- 分析<br>
&emsp;&emsp;Java 内部类是编译时概念，在编程后内部类会成为独立的类，上述代码声明了一个`private`访问权限的内部类`InnerClass`，`Synthetic`类编译后会产生`Synthetic.class`和`Synthetic$InnerClass.class`。<br>
&emsp;&emsp;我们看下编译后的文件，会发生此外还有一个`Synthetic$1.class`的类文件，这个文件是怎么产生的呢？<br>
&emsp;&emsp;我们分析下代码，在`Synthetic`类中声明了一个`InnerClass innerClass = new InnerClass()`成员变量，而编译后的`Synthetic$InnerClass.class`是`private`不能直接访问的，因此额外生成了一个默认访问权限的`Synthetic$1.class`内部类，这就是 Java 中的合成类。
