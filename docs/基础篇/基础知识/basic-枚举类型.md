# 枚举类
&emsp;&emsp;Java平台在`Java 5`中引入了一个新的类型`Enum`枚举类型，这是一种类的变种。

- **枚举类有什么用呢？**
    - 我们平时定义一个枚举值一般会使用常量进行定义，而枚举类为我们定义枚举值提供了一种更好的实现。
    - 枚举类本身也是一种类，可以有属性和方法，也符合了我们面向对象的编程。
    - 比起常量定义枚举值，枚举类可以为我们提供更多的关于枚举值的信息。

- 代码示例：
    ``` java
    enum StateEnum implements EnumInterface {

        /** 启用 */
        STATE_ON{
            @Override
            public void abstractMethod() {

                System.out.println("enabled");
            }
        },
        /** 禁用 */
        STATE_OFF {
            @Override
            public void abstractMethod() {

                System.out.println("disabled");
            }
        };

        // 只能有一个私有的或默认访问权限的构造方法
        StateEnum(){}

        @Override
        public void getTea() {

        }

        // 定义一个抽象方法,延迟在子类中实现
        public abstract void abstractMethod();
    }
    ```
- **枚举类的特性（注意点）**
    - 所有的枚举类都默认继承了`java.lang.Enum`类,可以通过`StateEnum.STATE_ON.getClass().getSuperclass()`查看；
    - 枚举类不支持泛型化，不能有类型参数`type parameter`；
    - 可以实现接口；
    - 不能被继承；
    - 可以有抽象方法，如果枚举中的所有值都要有自己的实现，可以在枚举类中选择定义一个抽象方法。
    - 只能有一个私有（或使用默认访问权限）的构造方法。
