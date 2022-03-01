# 1. Stream 流处理

## 1.1. Stream 介绍

- 概述：<br>
  &emsp;&emsp;`Stream`是 JDK1.8 中新增的重要 API，它可以帮助开发者操作对集合、数组进行复杂的操作，并且能够自动依赖 Fork/Join 框架来实现自动并行化。<br>
  &emsp;&emsp;`Stream`可以让你以一种声明的方式处理数据，对元素对象进行增、删、改、查、聚合、统计等，用一种类似 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。<br>
- 特点：
  - `无存储`：Stream 不是一种数据结构，它只是某种数据源的一个视图，数据源可以是一个数组，Java 容器或 I/O channel 等。
  - `为函数式编程而生`：对 Stream 的任何修改都不会修改背后的数据源，比如对 Stream 执行过滤操作并不会删除被过滤的元素，而是会产生一个不包含被过滤元素的新 Stream。
  - `惰式执行`:Stream 上的操作并不会立即执行，只有等到用户真正需要结果的时候才会执行。
  - `可消费性` Stream 只能被“消费”一次，一旦遍历过就会失效，就像容器的迭代器那样，想要再次遍历必须重新生成。
- 惰性求值和及早求值
  - 惰性求值<br>
    &emsp;&emsp;返回`Stream`对象，类似建造者模式的链式调用，最后再通过及早求值获取最终结果。
  - 及早求值<br>
    &emsp;&emsp;得到最终的结果而不是`Stream`，这样的操作被称为“及早求值”。

## 1.2. 流对象处理

- 概述：<br>
  ![](../../../../F-资源文件/images/docImage/3.2.4%20Sream流处理/20200629205222931.png)
  &emsp;&emsp;流对象处理一般分为：`流的创建`、`中间操作`、`最终操作`。

### 1.2.1. 流对象创建

- 概述：<br>
  &emsp;&emsp;流对象的创建可以通过集合对象或数组对象直接创建流对象，也可以使用`Stream.of()`进行创建。
- 创建流对象
  - 通过已有集合、数组进行流的创建，JDK 1.8 为集合、数组等提供了便利的创建`Stream`流对象的方法。
    ```java
    // 通过数组对象创建流对象
    Arrays.stream(array)
    Arrays.stream(array, offset, array.length);
    // 通过集合对象创建流对象
    Collection<T>.stream();
    ```
  - 通过`Stream`创建流对象
    ```java
    Stream.of(T object);
    // 和Arrays.stream(array)
    Stream.of(T... object);
    ```

### 1.2.2. 中间操作

- 概述：<br>
  &emsp;&emsp;在`Stream`流对象的处理过程中有很多中间操作，类似建造者模式中的链式调用，每个操作对流进行处理加工，最后仍返回一个`Stream`流对象。
- 常用流中间操作<br>

  | 流操作                            | 目标                                                                                                                                                       | 参数                                               |
  | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
  | Stream<T>.filter-过滤处理         | 通过给定的断言对象对流元素对象进行过滤处理。<br>惰性求值：返回过滤后的流对象                                                                               | `Predicate<T>`                                     |
  | Stream<T>.map-转换处理            | 通过给定的功能接口对象将流元素对象转换为一个新的流对象。<br>惰性求值：返回转换处理                                                                         | `Function<T, R>`                                   |
  | Stream<T>.flatMap-合并处理        | 通过给定的功能接口对象将流元素对象转换为对应的流对象并进行合并处理。<br>惰性求值：返回转换合并后的流对象                                                   | `Function<T, R>`                                   |
  | Stream<T>.reduce-统计处理         | 通过给定的功能接口对象将流元素进行处理统计获取需要的值。<br>及早求值：返回结果对象                                                                         | `BinaryOperator<R>`、`BiFunction<R, ? super T, R>` |
  | Stream<T>.limit/skip-输出结果限制 | limit 处理返回流对象的前 n 个元素组成的一个流对象，skip 处理返回流对象从指定的偏移位置开始的剩余的元素组成的一个流对象<br>惰性求值：返回限制处理后的流对象 | int                                                |
  | Stream<T>.sorted-排序处理         | 通过给定的比较器接口对象将流元素进行排序处理返回排序后的流对象。<br>惰性求值：返回排序后的流对象                                                           | `Comparator<T>`                                    |
  | Stream<T>.distinct-去重处理       | 将流对象中元素进行去重处理后并返回处理后的流对象<br>惰性求值：返回去重后的流对象                                                                           | NUL                                                |

### 1.2.3. 最终操作

- 概述：<br>
  &emsp;&emsp;通过中间操作将流对象进行处理返回仍是一个流对象，流对象最终是被用来消耗的，转换为我 们所需要的数据结构（集合、简单对象、数组等）。<br>
  &emsp;&emsp;最终操作就是用来进行消耗流对象转换我们所需的数据结构，流对象一旦经过最终操作就表示流对象已经被消耗，不能再进行任何中间操作，否则会抛出`java.lang.IllegalStateException : stream has already been operated upon or closed`。
- 常用流最终操作：

  | 流操作                           | 目标                                                                                           | 参数                 |
  | -------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
  | Stream<T>.forEach-迭代处理       | 对流对象中的元素进行迭代遍历进行某些操作                                                       | `Consumer<T>`        |
  | Stream<T>.count-统计元素个数     | 统计流对象中的元素的个数                                                                       | `NUL`                |
  | Stream<T>.collect-高级流对象处理 | 规约操作，通过给定的操作方法将流对象中元素进行处理(拆分、分组、拼接等)返回处理后的一个汇总结果 | `Collector<T, A, R>` |

## 1.3. 常用的流处理

### 1.3.1. collect-转换处理

- 概述：<br>
  &emsp;&emsp;将流元素对象进行转换处理得到复杂的数据结构，相关转换方法在`Collectors`中。

```java
// 将流对象转换为指定的集合容器类型
Collection<String> collection;
Stream<String> stream = Stream.of("A", "B");
LinkedList<String> linkedList = stream.collect(Collectors.toCollection(LinkedList::new));
// 将流对象转换为指定的List集合
List<String> list = stream.collect(Collectors.toList());
// 将流对象转换为指定的Set集合
Set<String> set = stream.collect(Collectors.toSet());
// 将流对象中的字符串元素进行拼接处理
String collect = stream.collect(Collectors.joining());
// 将流对象中的字符串元素使用指定的分隔符进行拼接处理
String joiningWithDelimiter = stream.collect(Collectors.joining("|"));
// 将流对象中的字符串元素使用指定的分隔符和前后缀进行拼接处理
String joiningWithDelimiterAndPrefix = stream.collect(Collectors.joining("|", "{", "}"));
```

### 1.3.2. filter-过滤处理

- 概述：
  &emsp;&emsp;根据过滤条件对流对象进行过滤处理，属于“惰性求值”，返回的仍是流对象。

```java
Stream<String> stream = Stream.of("A", "B");
List<String> a = stream.filter(str -> str.contains("A")).collect(Collectors.toList());
```

### 1.3.3. map-转换流处理

- 概述：
  &emsp;&emsp;将流对象根据条件进行转换成另一种类型的流，属于“惰性求值”。

```java
Stream<Integer> integerStream = stream.map(String::length);
```

### 1.3.4. flatMap-合并流处理

- 概述：
  &emsp;&emsp;将多个 Stream 流对象进行合并成一个流对象，属于“惰性求值”

```java
Stream<String> stream = Stream.of("A", "B");
Stream<char[]> stream1 = stream.flatMap(str -> Stream.of(str.toCharArray()));
```

### 1.3.5. reduce-统计处理

- 概述：
  &emsp;&emsp;从流对象元素中统计获取需要的值，属于`及早求值`
- 常用方法：

```java
/**
 * 惰性求值，通过累加器对元素对象进行处理后返回元素对象类对象
 * 对于统计获取最大值、最小值、字符串拼接处理、满足特定规则的元素对象等
 * @param accumulator 累加器
 * @return 结果
 */
Optional<T> reduce(BinaryOperator<T> accumulator);


/**
 * 及早求值，通过累加器对元素对象进行操作，可以在操作前追加一个起始标识对象。
 * @param identity 累加器标识对象，累加操作的起始对象
 * @param accumulator 累加器
 * @return 结果
 */
T reduce(T identity, BinaryOperator<T> accumulator);

/**
 *  及早求值，用于统计处理，比如汇总，统计元素对象值总和、平均值等
 * @param identity 累加器标识对象，累加操作的起始对象
 * @param accumulator 累加器
 * @param combiner 元素转换处理器，将元素转换处理
 * @param <U> 结果目标对象类型
 * @return
 */
<U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner);
```

- 使用示例：

```java
// 获取最大值
users.stream().max(Comparator.comparingInt(SysUserInfo::getAge)).ifPresent(System.out::println);
users.stream().reduce(BinaryOperator.maxBy(Comparator.comparingInt(SysUserInfo::getAge))).ifPresent(System.out::println);
users.stream().reduce((a,b)-> a.getAge() > b.getAge() ? a:b).ifPresent(System.out::println);
// 获取最小值
users.stream().min(Comparator.comparingInt(SysUserInfo::getAge)).ifPresent(System.out::println);
users.stream().reduce(BinaryOperator.minBy(Comparator.comparingInt(SysUserInfo::getAge))).ifPresent(System.out::println);
users.stream().reduce((a,b)-> a.getAge() < b.getAge() ? a:b).ifPresent(System.out::println);
// 统计年龄总数
System.out.println(users.stream().reduce(0, (a, b) -> a + b.getAge(), Integer::sum));
// 统计总数目,通常结合过滤处理使用
System.out.println(users.stream().filter(a->a.getAge()>22).count());
```

## 1.4. 流处理-高级集合类

&emsp;&emsp;通过`Stream.collect(Collector collector)`将流对象元素进行处理(拆分、分组、拼接等)。

### 1.4.1. 流对象分块

> 将一个集合对象根据条件拆分成两部分，返回一个`Map<Boolean, Collection<T>>`对象

- 示例：

```
// 分组，根据断言条件将流元素对象进行拆分，属于`及早求值`，默认返回`Map<Boolean, List<T>>`
users.stream().collect(Collectors.partitioningBy(user -> user.getAge() > 22)).forEach((k,v)-> System.out.println(k +":"+v.size()));
// 指定返回分块集合类型为`Set<T>`
users.stream().collect(Collectors.partitioningBy(user -> user.getAge() > 22, Collectors.toSet())).forEach((k,v)-> System.out.println(k +":"+v.size()));
```

### 1.4.2. 流对象分组

> 将一个集合对象根据条件进行进行分组,返回一个`Map<T, List>`对象。

- 示例：

```
// 分组，根据分组条件将流元素对象进行分组拆分，属于及早求值，默认返回Map(classifier, List<T)
users.stream().collect(Collectors.groupingBy(SysUserInfo::getAge)).forEach((k, v)-> System.out.println(k +":"+v));
// 指定返回分组集合类型为`Set<T>`
users.stream().collect(Collectors.groupingBy(SysUserInfo::getAge, Collectors.toSet())).forEach((k, v)-> System.out.println(k +":"+v));
// 指定返回的集合容器为`ConcurrentHashMap`
users.stream().collect(Collectors.groupingBy(SysUserInfo::getAge, ConcurrentHashMap::new, Collectors.toSet())).forEach((k, v)-> System.out.println(k +":"+v));
```

### 1.4.3. 字符串拼接

> 将字符串集合流对象进行根据指定的规则（分隔符、前缀、后缀）进行拼接。

- 示例：

```
// 字符串拼接
System.out.println(users.stream().map(SysUserInfo::getName).collect(Collectors.joining("&", "{", "}")));
```

## 1.5. 集合、数组类流处理

## 1.6. 源码分析

- Stream 流处理的核心类或接口（`java.util.stream`包中）：
  - `BaseStream`： Stream 流处理的基本接口,它是支持顺序和并行聚合操作的元素序列。
  - `Stream`：内部存储了对象元素，支持顺序和并行聚合操作的元素序列
  - `Collector`：流元素的聚合操作，将流对象进行处理(拆分、分组、拼接)等。
  - `Collectors`：一个工具类，是 JDK 预实现 Collector 的工具类，它内部提供了多种 Collector
