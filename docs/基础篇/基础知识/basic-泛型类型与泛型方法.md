# 1. 参数化类型

## 1.1. 泛型类

&emsp;&emsp;泛型是`Java 5`中引入的新特性，集合库是我们经常使用 java 中的核心库之一，在没有泛型之前，这些数据结构完全隐藏了存储其中的数据类型。<br>

&emsp;&emsp;看下`Java 5`之前集合类使用的示例：

```java
@Test
public void testGeneric(){

    List list = new ArrayList();

    list.add(new Address());
    list.add(new Order());
    // 对于我们完全不知道list内存存储的数据类型具体是什么,一不小心就可能会引起程序的奔溃,如下会抛出`ClassCastException`
    Order order = (Order) list.get(0);
}
```

&emsp;&emsp;像上述这样使用的非泛型 List 叫做原始类型，因为 java 平台总是向后兼容的，所以在引入泛型后，这种形式的使用还是保留着的。<br>

- **泛型使用**

  - 通常我们在使用集合库中的这些数据结构，我们真正需要的是一种知道所存储元素的数据类型的容器，在将非法类型对象存储时，编译器会帮助我们自动检测报错，而不用等到运行时才发现问题。为了解决这种问题，在`java 5`中引入了`泛型（Generic）`，指明某种类型是一种容器，帮助我们在使用集合类时明确容器存储的元素的类型（`负载类型-payload type`）；
  - 使用示例：使用`<>`指明容器的负载类型

    - 示例代码

    ```java
    @Test
    public void testGeneric(){

        List<Address> list = new ArrayList<>();

        list.add(new Address());
        // 直接获取元素对象
        Address address = list.get(0);
    }
    ```

    - `<>`指明了容器的负载类型,在获取元素不需要做额外处理,获取的元素就是我们存放的类型对象

- **泛型定义**

  - 像`List`容器就是一个泛型类（Generic Type），先看下如何声明一个泛型类：

    ```java
    /**
     * 定义一个泛型类
     * @param <T> 类型参数
     */
    interface GenericInterface<T> {

        /**
         * 接收一个参类型对象
         * @param t 参数类型对象
         */
        void handleGeneric(T t);

        /**
         * 获取一个参数类型对象
         * @return {@link GenericClass}
         */
        T getGeneric();
    }
    ```

  - 再看下泛型类的使用：

    ```java
    /**
     * 泛型类的具体使用
     */
    static class GenericConcrete implements GenericInterface<String>{

        @Override
        public void handleGeneric(String s) {

        }

        @Override
        public String getGeneric() {
            return null;
        }
    }
    ```

  - 说明：
    - `<T>`这个句法有专门的名称-类型参数（type parameter），因此泛型还有一个名称`参数化类型（parameterized type）`；
    - `T`是一个占位符，代表真实元素的类型；
    - 在具体使用时`<>`中传入具体的类型参数（如上述示例代码 2）。

- 菱形句法

  - 代码示例：

    ```java
    static class GenericClass<T> {
        private T object;

        public T getObject() {
            return object;
        }

        public void setObject(T object) {
            this.object = object;
        }

        public void show(){

            System.out.println(this.object);
        }

        public static void main(String[] args) {
            // 菱形语言
            GenericClass<String> genericClass = new GenericClass<>();
            genericClass.setObject("generic type");
            genericClass.show();
        }
    }
    ```

  - 看下上述的代码示例三中`GenericClass<String> genericClass = new GenericClass<>();`

  - 在 java 中声明一个对象的复杂一直是很多人的诟病，这里的`<>`菱形句法是 java 中的一个语法糖，使用`<>`句法省略了重复的类型值。

- 类型擦除

  - 先看个代码示例

    ```java
        /**
         * 类型擦除
         */
        interface TypeWipeOut{

            void query(Map<String, String> params);

            void query(Map<String, Integer> params);
        }
    ```

  - 在上面代码中我们定义了两个同名方法，使用不同的类型参数的 Map 泛型作为参数，咋一看，这个是方法重写没什么问题，但是在 IDE 中会看到报错信息`both methods have same erasure`；
  - 这个是因为编译时会进行类型擦除，在`javac`编译会自动去除`<>`类型参数也就是使用`原始类型`；
  - 在`javac`和`JVM`中使用的类型系统差异不在此处解释。

- 通配符

  - 先看下代码示例：

    ```java
    /**
     * 通配符使用
     * @param genericClass 实例化泛型
     */
    private void wildcardShow(GenericClass<?> genericClass){

        System.out.println(genericClass.getObject());
    }

    @Test
    public void wildcard(){

        GenericClass<User> userGenericClass = new GenericClass<>();
        User user = User.builder().address("address").age(11).userName("userName").build();
        userGenericClass.setObject(user);

        GenericClass<Phone> phoneGenericClass = new GenericClass<>();
        Phone phone = Phone.builder().color("blue").price(new BigDecimal(5836)).year("2020").build();
        phoneGenericClass.setObject(phone);
        wildcardShow(userGenericClass);
        wildcardShow(phoneGenericClass);
    }
    ```

  - 我们知道泛型在使用时需要用`<>`指定类型参数才能进行类的实例化，但是有时候在编译时我们可能并不能确定会使用哪个具体的类型参数来实例化泛型类。一种最简单的方式就是`使用<?>（Java通配符类型）`。
  - Java 语言规范禁止实例化负载为未知类型的集合类
    ```java
    // 如下，编译器会直接报错`Wildcard type '?' cannot be instantiated directly`
    List<?> unknowns = new ArrayList<?>();
    // 像下面这种形式的声明时毫无意义的
    List<?> unknowns = new ArrayList<>();
    ```
  - 通配符满足了我们的需要，但是有时候可能会限制类型范围，比如具有父子关系，限定类型为指定类型的子类或父类等。

    - 这时候受限通配符正是我们所需要的`<? extends Parent>`、`<? super Child>`
    - 看下代码示例:

      ```java
      /**
      * 受限通配符
      * @param genericClass 实例化泛型
      */
      private void boundWildcardShow(GenericClass<? extends User> genericClass){
          System.out.println(genericClass.getObject());
      }

      @Test
      public void boundWildcard(){

          GenericClass<Male> userGenericClass = new GenericClass<>();
          // Male是User的子类
          Male male = new Male();
          male.setUserName("male");
          userGenericClass.setObject(male);
          boundWildcardShow(userGenericClass);
      }
      ```

    - `<? extends Parent>`：说明泛型中的负载类型都是`Parent`类或其子类，这是一种`类型协变`；
    - 再看下面的代码示例：

      ```java
      /**
      * 受限通配符<? super xxx>
      * @param genericClass 实例化泛型
      */
      private void boundWildcardShow(GenericClass< ? super Male> genericClass){
          System.out.println(genericClass.getObject());
      }

      @Test
      public void boundWildcard(){

          GenericClass<User> userGenericClass = new GenericClass<>();

          Male male = new Male();
          male.setUserName("male");
          userGenericClass.setObject(male);
          boundWildcardShow(userGenericClass);
      }
      ```

    - `<? super Child>`：说明泛型中的负载类型都是`Child`类或其父类，这是一种`类型逆变`；

## 1.2. 泛型方法

- 概述：上述介绍了泛型类，除了泛型类，我们还可以定义泛型方法表明方法不受参数类型的限制，并且方法所在不需要声明为泛型类。

- 代码示例：

  ```java
  /**
   * 泛型方法
   * @param obj1 类型参数实例对象
   * @param obj2 类型参数实例对象
   * @param <T> 类型参数
   */
  private <T> void  genericFunction(T obj1, T obj2){

      // do something
  }
  ```

- 注意点：
  - 泛型方法中不支持通配符和受限符的使用

## 1.3. 编译时类型和运行时类型

&emsp;&emsp;在`javac`编译时类型和`JVM`运行时类型可能是不同的。

- 代码示例：

  ```java
  @Test
  public void testType(){

      List<String> stringList = new ArrayList<>();

      // 输出`class java.util.ArrayList`
      System.out.println(stringList.getClass());
  }
  ```

- 看下上面的代码在编译时`javac`会将 stringList 看做`list-of-String`并且在使用`add`等方法操作时会判断类型是否匹配；
- 看下打印输出信息在`JVM`运行时会将 stringList 看做原始类型`java.util.ArrayList`，在`javac`编译时会进行类型擦除，因此在`JVM`运行时都是`原始类型`。
