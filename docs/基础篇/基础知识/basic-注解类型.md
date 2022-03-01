# 1. 注解

&emsp;&emsp;注解是 JSR-175 中提出的规范请求并在 Java 5 中提供支持。

## 1.1. 注解的介绍

- **注解类型介绍**

  - java 中的注解是在`Java 5`中引入的一种特殊的接口，其作用是注解 Java 程序的某个部分。
  - 注解本身没有没有什么直接的作用，只是为注解的地方额外提供某些信息。
  - 注解不能改变程序的语义，只能提供可选的元信息。

- **自定义注解**

  - 使用`@interface`关键字定义一个类为注解类型；
  - 使用`元注解`（元注解是特殊的注解，用来注解自定义注解类型的注解）；
    - 开发者使用`元注解`指定新的注解类型的使用范围（`@Target`）和保留原则（` @Retention`）；
    - `@Target`元注解：指明自定义的新注解能在 Java 程序中的哪些地方使用，可用的枚举值在`ElementType`中定义，包括`TYPE、FIELD、METHOD、PARAMETER、CONSTRUCTOR、LOCAL_VARIABLE、ANNOTATION_TYPE、PACKAGE、TYPE_PARAMETER和TYPE_USE`；
    - `@Retention`元注解：指明`javac`和`JVM`运行时如何处理自定义的注解类型。可使用的值有三个，在枚举`RetentionPolicy`中定义。
      - `SOURCE`：这个保留原则的注解表明该注解只在源码中有效，编译时会自动抛弃；
      - `CLASS`：这个保留原则的注解表明该注解在编译时会出现在类文件中，但运行时`JVM`无法访问，这个值很少使用，但有时会在`JVM`字节码的离线分析工具中见到；
      - `RUNTIME`：表示用户的代码在运行时（使用反射）能访问这个注解。

- **元注解的使用**<br>
  &emsp;&emsp;上面我们介绍了`@Target`、`@Retention`元注解，此外还有一些元注解。 - `@Documented`元注解：这是个标记注解，表明在生成`javadoc`中会包含注解声明，默认`javadoc`生成 API 不会包含注解类型。
  `` <!-- 看下在注解上使用了`@Documented`元注解，在如下所示生成的API文档会包含注解类型 --> @Report public class Order extends java.lang.Object 订单信息 从以下版本开始: 2020-4-17 `` - `@Inherited`元注解：这个是标记注解，表明使用此元注解的注解类型，在类继承中，如果类本身没有使用此注解，基类中使用了此注解，则会自动继承基类中的此注解。 \* 代码示例：从输出信息可以看到子类继承父类会自动继承父类的使用`@Inherited`元注解的注解类

  ````java
  @Report(fieldName = "Order")
  @NotInheritedReport
  public class Order {

              }

              class InheritedOrder extends Order{
                  private String desc;
              }
                  @Test
              public void showAnnotation() throws NoSuchFieldException {
                  System.out.println(Arrays.toString(InheritedOrder.class.getAnnotations()));
                  System.out.println(Arrays.toString(Order.class.getAnnotations()));
                  // 输出
                  // [@xin.icoder.study.interview.base.javabase.annotation.Report(fieldName=Order)]
                  // [@xin.icoder.study.interview.base.javabase.annotation.Report(fieldName=Order), @xin.icoder.study.interview.base.javabase.annotation.NotInheritedReport()]
              }
              ```

  ````

- **注解接口的特性（和普通接口比较）**
  - 都（隐式）继承`java.lang.annotation.Annotation`接口；
  - 不能泛型化；
  - 不能继承其它接口；
  - 只能定义没有参数的方法；
  - 不能定义会抛出异常的方法；
  - 方法的返回类型有限制；
  - 方法可以有一个默认的返回值。

## 1.2. 注解的使用

- 先看下注解的保留原则，在哪些地方有效

  - `RetentionPolicy.SOURCE`只在源码中生效：
    - 注解类代码示例：
      ```java
      @Target({ElementType.FIELD, ElementType.TYPE})
      @Retention(RetentionPolicy.SOURCE)
      public @interface Report {
          /** 字段中文名称 */
          String fieldName() default "";
      }
      ```
    - 注解类使用代码示例：
    ````java
        @Report
        public class Order {
            /** 订单编号 */
            private String orderCode;
            /** 订单状态 */
            private String orderState;
            /** 客户姓名 */
            @Report(fieldName = "客户姓名")
            private String cusName;
        }
        ```
    - 反编译看下：对应的注解在被编译时都被抛弃了
        ```java
        public class Order {
            private String orderCode;
            private String orderState;
            private String cusName;
            public Order() {
            }
        }
        ```
    ````
  - `RetentionPolicy.CLASS`在编译时会保留，`JVM`运行时不能访问:

    - 看下使用了此保留原则后的反编译代码

      ```java
      @Report
      public class Order {
          private String orderCode;
          private String orderState;
          @Report(
              fieldName = "客户姓名"
          )
          private String cusName;

          public Order() {
          }
      }
      ```

    - 看下在`JVM`运行时的结果
      ```java
      @Test
      public void showAnnotation() throws NoSuchFieldException {
          // 输出结果[]
          System.out.println(Arrays.toString(Order.class.getAnnotations()));
          // 输出结果[]
          System.out.println(Arrays.toString(Order.class.getDeclaredField("cusName").getAnnotations()));
      }
      ```

  - `RetentionPolicy.RUNTIME`：`JVM`运行时能访问这个注解

    - 看下使用此注解后的在`JVM`的运行结果

      ```java
      @Test
      public void showAnnotation() throws NoSuchFieldException {
          System.out.println(Arrays.toString(Order.class.getAnnotations()));// 输出[]
          System.out.println(Arrays.toString(Order.class.getDeclaredField("cusName").getAnnotations()));// 输出[]

          // 输出结果
          // [@xin.icoder.study.interview.base.javabase.annotation.Report(fieldName=)]
          // [@xin.icoder.study.interview.base.javabase.annotation.Report(fieldName=客户姓名)]
      }
      ```

## 1.3. 可插拔注解处理 API

&emsp;&emsp;JSR-269 提出了可插拔注解处理 API(Pluggable Annotation Processing API)，允许对 JSR-175 中注解提供处理，并在 Java 6 中提供了支持。

- **背景**<br>
  &emsp;&emsp;在 Java 5 中提供了注解(JSR-175)的支持，如果想要对注解进行处理，必须要在程序运行期间使用反射进行操作，限制了注解的使用范围，在 JSR-269 提出了注解处理 API 运行在非运行时(编译期间)即可对注解进行增强处理(我们常用的代码注入便基于此实现)。<br>
  &emsp;&emsp;在`javax.lang.annotation`扩展包中提供了此特性的支持，运行处理`Retention`为`SOURCE`的注解，即在编译期间对注解进行处理。
