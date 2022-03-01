# 1. 数据类型
## 1.1. 基本数据类型
&emsp;&emsp;Java 中有：`boolean`、`char`、`byte`、`short`、`int`、`long`、`float`、`double`八种基本数据类型，此外还有个占位符类型`void`。

- **布尔类型**<br>
&emsp;&emsp;Java 中使用`boolean`类表示真或假、开或关、是或否，使用`true`和`false`两个保留字表示布尔类型的值。

- **字符类型**<br>
&emsp;&emsp;字符类型`char`表示`Unicode`字符，在 Java 语言中统一使用`Unicode`编码字符集表示字符。<br>
&emsp;&emsp;Java使用一种稍微独特的方式表示字符：在传给javac的输入中，标识符使用`UTF-8`编码（一种变长编码方式），但在内部使用定长编码（16 位）表示字符。<br>

- **整数类型**
    - `byte` ：1字节，8位，取值范围-2^7^ ~ 2^7^-1
    - `short`：2字节，16位，取值范围-2^15^ ~ 2^15^-1
    - `int`  ：4字节，32位，取值范围为-2^31^ ~ 2^31^-1
    - `long` ：8字节，64位，取值范围-2^63^ ~2^63^-1

- **浮点数类型**
    - `float`：4个字节,32位单精度浮点数
    - `double`：64位双精度浮点数

### 1.1.1. 基本数据类型相关问题

1. 为什么金额类型的不能使用`double`？<br>
&emsp;&emsp;java中使用浮点型保存的小数是现实中十进制小数的近似值并不是准确值，所以对于金额类对精度要求比较高的指标不能用浮点型来表示。<br>
&emsp;&emsp;建议使用`BigDecimal`或转换为`long`类型来表示。

2. `byte`的取值范围为什么是`-128`~`127`？
- **引述**<br>
&emsp;&emsp;我们知道在java中`byte`是表示一个字节存储的数值，一个字节表示8位在计算机中二进制表示位`00000000`~`11111111`。 **那么一个字节存储的值的方位是不是`11111111`(127)~`011111111`(127)呢？**<br>
&emsp;&emsp;显然我们知道-127~127范围内的整数值为`255`个，而一个字节是可以存储`256`值的，而且我们也知道一个字节存储的最小值为`-128`。<br>
- **分析**<br>
&emsp;&emsp;分析一下，正数范围内的值为`00000000`（0）~`01111111`（127）这个是没问题的，那么负数范围内的值应该是`10000001`（-1）~`11111111`（-127），还缺少了一个`10000000`（-128）。<br>
&emsp;&emsp;这个`10000000`这个值的存储我们需要了解下计算机中数值的存储以及计算。

    - **计算机中数值的存储**：<br>
    &emsp;&emsp;在计算机中是数值的存储使用二进制数表示的，叫做这个数的机器数，而机器数本身是带符号的，在计算机中用这个数的最高位存放符号，正数为`0`，负数为`1`。<br>
    而计算机中本身是不识别符号，为了简化计算，在计算机中将数值的运算都作加法运算，比如`1-1`在计算机中就是`1+(-1)`<br>
    我们看下如下示例：
        ```
        1的二进制表示为`00000001`，-1的二进制表示位`10000001`，进行加法运算
        00000001(1)
        10000001(-1)
        --------
        10000010(-2)
        ```
        显然计算得到的结果并不是我们期望的值,这究竟是因为什么呢，看到这我们需要了解下我们看到的值和计算机中存储的值之间的关系，也就是`原码`、`反码`、`补码`。

    - `原码`、`反码`、`补码`：
        - 原码：我们真实看到的值，在计算机中是以补码的形式存在的。
        - 反码：正数的反码是它本身，负数的反码是最高位不变，其它位取反。
        - 补码：正数的补码是它本身，负数的补码是它的反码+1，也是它的对应的正数的原码全部取反+1。<br>

        我们再来看下`1+(-1)`在计算机中是**使用补码**进行计算的
            ```
            1的二进制表示为`00000001`，它的补码是它本身`00000001`，-1的二进制表示为`10000001`，它的反码是`11111110`，补码为`11111111`，再进行加法计算
            00000001(1)
            11111111(-1)
            --------
            00000000(0)
            ```
        这样我们可以看到我们得到了我们想要的结果。所以在计算机的世界中值的计算是通过它的补码的形式进行加法计算的。<br>
        再来看下`-128=-127+(-1)`
            ```
            -127的原码是`11111111`，它的反码是`10000000`，它的补码是`10000001`，-1的原码是`10000001`，它的反码是`11111110`，补码为`11111111`，进行加法计算
            10000001(-127)
            11111111(-1)
            --------
            10000000(-128)
            ```

3. Java中的数值溢出现象<br>
&emsp;&emsp;从上面`原码、反码、补码`的介绍我们可以知道在计算机中都是使用补码进行值计算的，计算结果可能并非我们所期望的，但是计算机是不会进行报错的。<br>
&emsp;&emsp;比如java中的`Integer.MAX_VALUE`+ `Integer.MAX_VALUE` =`-2`就发生数值溢出的现象,但是程序并未出现任何异常。

## 1.2. 包装类与自动拆装箱
### 1.2.1. 包装类
&emsp;&emsp;java中有八种基本类型由Java语言定义，程序员不能定义新基本类型。基本类型代表着基本值，但是有时候需要将基本值当成对象使用，比如基本值是不能直接存在集合类中的，因此为了让基本类型具有对象的特征，在java中为每一种基本类型都提供了对应的`包装类`，使得它们具有对象的性质，并且为其添加了属性和方法，丰富了基本类型的操作。

- 包装类和基本类型的对应关系<br>
    |基本类型|包装类|
    |----|----|
    |boolean | Boolean |
    | byte   | Byte |
    | short  | Short |
    | char   | Character |
    | int    | Integer |
    | long   | Long |
    | float  | Float |
    | double | Double |

### 1.2.2. 自动拆装箱
&emsp;&emsp;`自动拆装箱`是 在 `Java 5` 中引入的新功能特性。在对基本数据类型和对应的包装类的使用中，Java 会进行自动拆包、装包的动作为我们完成两者之间的装换。

- 代码示例：
    ``` java
    class PackageClass {
        public static void main(String[] args) {

            // 自动装包将int字面量装包到Integer对象中
            Integer a = 0;

            // 将float类型的字面量自动装包到Float对象中，然后放大转换成Number类型
            Number n = 0.0f;

            // 自动装包将int字面量装包到Integer对象中
            Integer i = 1;
            // 自动拆包将Integer对象中的基本值取出来赋值给j
            int j = i;

            // 自动拆包将Integer对象中的字面量取出递增,再将递增后的字面量自动装包到Integer对象中负值给i
            i++;

            // 先将i自动拆包取出字面值+2,再加计算后的值自动装包给Integer对象
            Integer k = i+2;

            i = null;
            // 上面讲i赋值为null,此处会进行自动拆包,调用Integer对象的获取字面值方法,会抛出NullPointerException异常
            j = i;
        }
    }
    ```
- 看下编译后的源码
    ```java
    class PackageClass{
    public static void main(String[] args){
        Integer a = Integer.valueOf(0);

        Number n = Float.valueOf(0.0F);

        Integer i = Integer.valueOf(1);

        int j = i.intValue();

        Integer localInteger1 = i;
        Integer localInteger2 = i = Integer.valueOf(i.intValue() + 1);

        Integer k = Integer.valueOf(i.intValue() + 2);
        i = null;

        j = i.intValue();
    }
    }
    ```

- **自动拆装箱的应用场景**
    - 示例一：集合类存储，我们知道集合类`Collection<E>`中只能存储对象类型，因此将一个基本值存放到集合中，必须要借助对应的包装类。<br>
        - 代码示例
            ``` java
            /**
            * 集合类存储
            */
            static void saveToList(){
                List<Integer> list = new LinkedList<>();

                for (int i = 0; i < 5; i++) {

                    list.add(i);
                }

                log.info(list.toString());
            }
            ```
        - 看下编译后的源码
            ```java
            static void saveToList() {
                List list = new LinkedList();

                for (int i = 0; i < 5; i++) {
                    list.add(Integer.valueOf(i));
                }

                log.info(list.toString());
            }
            ```

    - 示例二：数值计算和比较
        - 示例代码：
        ```java
        /**
        * 包装类计算
        */
        static void actualate(){

            // 自动装包将
            Integer i = 3;

            // 自动将i进行拆包获得基本值进行计算在进行装包成Integer对象
            Integer j = i +3;

            // 同上先进行拆包计算再进行装包并赋值给i
            i++;
        }
        ```
        - 看下编译后的源码
        ```java
        static void actualate() {
            Integer i = Integer.valueOf(3);

            Integer j = Integer.valueOf(i.intValue() + 3);

            Integer localInteger1 = i;
            Integer localInteger2 = i = Integer.valueOf(i.intValue() + 1);
        }
        ```

    - 示例三：方法参数和返回值
        - 示例代码：
        ```java
        /**
        * 获取包装类的基本值
        * @param integer 包装类
        * @return 基本值
        */
        static int getBaseValue(Integer integer) {

            return integer;
        }

        /**
        * 获取基本值对应的包装类
        * @param i 基本值
        * @return 包装类
        */
        static Integer getBoxObject(int i) {
            return i;
        }
        ```
        - 看下编译后的源码
        ```java
        static int getBaseValue(Integer integer) {
            return integer.intValue();
        }

        static Integer getBoxObject(int i) {
            return Integer.valueOf(i);
        }
        ```

- **自动拆装箱和缓存**<br>
&emsp;&emsp;在java 5中引入了一个有助于节省内存的、提高性能的功能，在一些包装类中引入了缓存的概念，在一些范围内的数值对应的对象存放在缓存池中，再需要的时候直接从缓存池中获取。<br>

    - 看下Integer的缓存实现：
        - 代码示例：
            ``` java
            @Test
            public void integerCache(){
                // -128~127会从缓存池中获取对象
                Integer cache1_1 = 122;
                Integer cache1_2 = 122;
                Integer cache2_1 = -128;
                Integer cache2_2 = -128;
                System.out.println(cache1_1 == cache1_2);// true
                System.out.println(cache2_1 == cache2_2);// true

                Integer new1_1 = 128;
                Integer new1_2 = 128;
                Integer new2_1 = -129;
                Integer new2_2 = -129;
                System.out.println(new1_1 == new1_2);// false
                System.out.println(new2_1 == new2_2);// false
            }
            ```
        - 看下编译后的源码
            ```java
            @Test
            public void integerCache() {
                Integer cache1_1 = Integer.valueOf(127);
                Integer cache1_2 = Integer.valueOf(127);
                Integer cache2_1 = Integer.valueOf(-128);
                Integer cache2_2 = Integer.valueOf(-128);
                System.out.println(cache1_1 == cache1_2);
                System.out.println(cache2_1 == cache2_2);

                Integer new1_1 = Integer.valueOf(128);
                Integer new1_2 = Integer.valueOf(128);
                Integer new2_1 = Integer.valueOf(-129);
                Integer new2_2 = Integer.valueOf(-129);
                System.out.println(new1_1 == new1_2);
                System.out.println(new2_1 == new2_2);
            }
            ```
        - 代码分析：
            ```
            此前，我们了解了自动拆包、装包的概念，上述代码一样会使用`Integer.ValueOf(int)`进行自动装包操作。
            但是两个不同范围内的值获取的对象和我们所想的并不一样，在`-128~127`范围内获取到的`Integer`对象我们通过`==`进行比较发现返回的结果为`true`说明获取对象是同一块内存地址表示的。
            在此范围之外的数值我们通过比较发现，两次获取的对象在内存中存储并不是同一个对象，产生这个现象的原因是什么呢？不错，正是java 5中新引入的缓存池造成的。
            ```
        - 具体分析：
            - 我们先看下`Integer.ValueOf(int)`的源码
                ```java
                public static Integer valueOf(int i) {
                    // 判断基本值是否在缓存池的存储范围内，默认范围为`-128~127`
                    if (i >= IntegerCache.low && i <= IntegerCache.high){

                        // 在缓存池的存储范围内，直接返回从缓存池中获取的对象
                        return IntegerCache.cache[i + (-IntegerCache.low)];
                    }
                    // 不再缓存池的存储范围内，直接调用Integer的构造方法，创建一个新的Integer对象
                    return new Integer(i);
                }
                ```
            - 再看下`IntegerCache`缓存池的实现：
                ```java
                private static class IntegerCache {
                    // 最小值
                    static final int low = -128;
                    // 最大值，可以通过属性配置指定最大值
                    static final int high;
                    // 对象缓存池
                    static final Integer cache[];

                    static {
                        // 最大值可以通过JVM启动参数`-XX:AutoBoxCacheMax=size`配置指定最大值映射到`java.lang.Integer.IntegerCache.high`，默认是127
                        int h = 127;
                        String integerCacheHighPropValue =
                            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
                        if (integerCacheHighPropValue != null) {
                            try {
                                // 配置了最大值将其转换为`int`值,若配置的非法数值则使用默认的值`127`
                                int i = parseInt(integerCacheHighPropValue);
                                // 如果指定的值小于127则使用默认的最大值`127`
                                i = Math.max(i, 127);
                                // 因为数组最大长度为`Integer.MAX_VALUE`,如果`i`超过存储的最大值`Integer.MAX_VALUE - (-low) -1`
                                // 取默认的最大值`Integer.MAX_VALUE - (-low) -1`
                                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                            } catch( NumberFormatException nfe) {
                                // If the property cannot be parsed into an int, ignore it.
                            }
                        }
                        high = h;

                        // 初始化缓存池数组,大小为`(high - low) + 1`
                        cache = new Integer[(high - low) + 1];
                        int j = low;
                        // 将取值范围内的值存储到缓存池数组中
                        for(int k = 0; k < cache.length; k++)
                            cache[k] = new Integer(j++);

                        // range [-128, 127] must be interned (JLS7 5.1.7)
                        // JLS7 5.1.7：[-128, 127]范围内的值必须要在缓存池中
                        assert IntegerCache.high >= 127;
                    }

                    private IntegerCache() {}
                }
                ```
            - 总结：
                - 包装类`Integer`内置了缓存池的实现，在指定范围内的值可以直接从缓存池中获取，此外的会通过构造函数构造生成；
                - 值范围最小值为指定的`-128`，最大值可以通过JVM的启动参数`-XX:AutoBoxCacheMax=size`进行指定；
                - 类似的`Byte`、`Short`、`Character`、`Long`也都是如此内置了缓存池的实现。
