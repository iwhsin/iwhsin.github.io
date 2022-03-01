### Java 中的修饰符
![](/docs/assets/images/basic/java-modifier.png)

### `final`修饰符
- 概述：在java中`final`关键字可用来修饰`成员变量`、`局部变量`、`方法`、`类`，表示了不可变性。

- 使用：
    - `final`修饰的类，表示类不可被继承；
    - `final`修饰的方法，表示方法不可被重写；
    - `final`修饰的成员变量，声明后值不可修改，和`static`使用表示类的编译时常量；
    - `final`修饰的局部变量，表示值不可修改的局部变量。

#### `final`修饰的类，它的方法和属性都是默认`final`吗
- 我们知道final修饰的类是不可继承的，那么它的方法和属性是否也是默认`final`修饰呢？
- 先看下代码示例：
    ```java
    public class FinalTest {

        final class FinalClass {
            /** planField */
            private String planField;

            /** finalField */
            private final String finalField = "finalField";
            void planMethod(){
                // do something
            }
            final void finalMethod(){

                // do something
            }
        }

        void reflectInvoke(Class<?>  clazz){
            System.out.println("----------属性修饰----------");
            Arrays.asList(clazz.getDeclaredFields()).forEach(field -> {

                System.out.println("字段名：" + field.getName() +
                    "，字段修饰符：" + Modifier.toString(field.getModifiers()) +
                    ",是否是final修饰：" + Modifier.isFinal(field.getModifiers()));
            });
            System.out.println("----------方法修饰----------");
            Arrays.asList(clazz.getDeclaredMethods()).forEach(method -> {
                System.out.println("方法名：" + method.getName() +
                    "，方法修饰符：" + Modifier.toString(method.getModifiers()) +
                    ",是否是final修饰：" + Modifier.isFinal(method.getModifiers()));
            });
        }

        @Test
        public void testFinal(){

            reflectInvoke(FinalClass.class);

    //        输出结果如下：
    //        ----------属性修饰----------
    //        字段名：planField，字段修饰符：private,是否是final修饰：false
    //        字段名：finalField，字段修饰符：private final,是否是final修饰：true
    //            ----------方法修饰----------
    //        方法名：planMethod，方法修饰符：,是否是final修饰：false
    //        方法名：finalMethod，方法修饰符：final,是否是final修饰：true
        }
    }
    ```
- 从上述代码测试的结果我们可以看出来，`final`修饰的类，它的方法和属性如果未声明`final`，则它们并不是默认`final`修饰的。

#### 为什么内部类中不能使用非`final`修饰的变量
[参见：为什么内部类中不能使用非`final`修饰的变量](/docs/basic/base-java/inner-and-composite-class.md#为什么内部类中不能使用非`final`修饰的变量)
