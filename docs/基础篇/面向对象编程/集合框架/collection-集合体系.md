# 1. 集合体系结构

## 1.1. 概念基础

### 1.1.1. 集合是什么?

&emsp;&emsp;Java 中的集合类是 Java 中数据结构的实现，Java 语言中根据集合持有对象的不同将集合分为`Collection`集合和`Map`映射两类，并提供了对应的两个基本接口。

- **集合（Collection）**：一个独立元素的序列，这些元素都服从一条或多条规则。`List`必须以插入的顺序保存元素，`Set`不能包含重复元素，`Queue`按照*排队规则*来确定对象产生的顺序（通常与它们被插入的顺序相同）。
- **映射（Map）**： 一组成对的“键值对”对象，允许使用键来查找值。`ArrayList`使用数字来查找对象，因此在某种意义上讲，它是将数字和对象关联在一起。`map`允许我们使用一个对象来查找另一个对象，它也被称作*关联数组*（associative array），因为它将对象和其它对象关联在一起；或者称作*字典*（dictionary），因为可以使用一个键对象来查找值对象，就像在字典中使用单词查找定义一样。`Map`是强大的编程工具。

> [!TIP]
> 数据结构（data structure）：数据的组织、管理和存储格式，其使用目的是为了高效地访问和修改数据。

### 1.1.2. 类继承关系

<!-- tabs:start -->
<!-- tab:集合类继承结构图 -->

![Collection集合类继承结构图](/docs/assets/images/basic/collection-class-diagram.png ":size=60%")

<!-- tab:Map集合类继承结构图 -->

![Map集合类继承结构图](/docs/assets/images/basic/map-class-diagram.png ":size=60%")

<!-- tabs:end -->

&emsp;&emsp;上述图片摘选自`On Java8`中的集合章节文章，比较细致悦目，其中黄色为接口，绿色为抽象类，蓝色为具体类。虚线箭头表示实现关系，实线箭头表示继承关系。

### 1.1.3. 基本接口

#### 1.1.3.1. Collection

&emsp;&emsp;`Collection`接口是 Java 中集合类层次的根接口，提供了集合类的一些通用操作方法，此接口不提供直接实现类，而是提供了更具体的子接口实现。

- 接口方法说明：
  | 方法 | 参数 | 返回值 | 描述 |
  | :- | :- | :- | :- |
  | size() | | int | 获取集合对象中的元素个数 |
  | isEmpty() | | boolean | 判断集合对象是否是个空集合对象 |
  | contains(T) | T | boolean | 获取集合对象中的元素个数 |
  | ↑iterator() | |Iterator<T> | 继承自`Iterator`接口，获取集合对象对应的迭代器 |
  | toArray() | | Object[] | 将集合对象转换为对应的对象数组 |
  | toArray(T[]) | T[] | T[] | 将集合对象转换为数组 |
  | add(T) | T | boolean | 将指定的元素对象添加到集合中 |
  | remove(T) | T | boolean | 将指定的元素对象从集合中移除 |
  | containsAll(Collection<?>)        | Collection<?> | boolean | 判断集合对象是否包含指定的集合对象中的全部元素对象 |
  | addAll(Collection<? extends E>) |Collection<? extends E>| boolean | 将指定的集合对象中的全部元素对象添加到当前集合对象中 |
  | removeAll(Collection<?>)          | Collection<?> | boolean | 将指定的集合对象中的全部元素从当前集合对象中移除 |
  | removeIf(Predicate<? super E>) | Predicate<? super E> | boolean | jdk-1.8 新增：将集合对象中满足断言的元素对象移除 |
  | retainAll(Collection<?>)          | Collection<?> | boolean | 将集合对象和给定的集合对象元素取交集（移除集合对象中在给定的集合对象中不存在的元素）<br>与`removeAll`操作相反 |
  | clear() | | void | 将集合对象中的元素全部清除 |
  | spliterator() | | Spliterator<T> | jdk-1.8 新增：用户流处理分割迭代器 |
  | stream() | | Stream<T> | jdk-1.8 新增：将集合对象转换为对应的流对象 |
  | parallelStream() | | Stream<T> | jdk-1.8 新增：将集合对象转换为对应的并行流对象 |
  | forEach(Consumer<? super T>) | Consumer<? super T> |Consumer<? super T>| jdk-1.8 新增：继承自`Iterable`接口，用于集合中的元素迭代进行消费处理 |

#### 1.1.3.2. Map

&emsp;&emsp;在集合的类层次结构中除了`Collection`集合接口外，还有一种键值对形式存储的映射结构，`Map`接口就是其通用的根接口。<br>
&emsp;&emsp;`Map`中存放的映射对象是根据对应的键值来进行查找操作的，因此键值需保证是唯一的。

- 接口方法说明：
  | 方法 | 参数 | 返回值 | 描述 |
  | :- | :- | :- | :- |
  | size() | NUL | int | 返回集合中元素对象的个数 |
  | isEmpty() | NUL | boolean | 判断集合对象中是否为空集合对象 |
  | get(Object) | Object | V | 通过键值查找对应的键值映射对象|
  | put(K, V); | K, V | V | 将键值对映射存放到集合中并返回对应的值对象 |
  | remove(Object) | Object | V | 通过给定的键对象删除集合中对应的键值对映射并返回对应的值对象 |
  | putAll(Map<? extends K, ? extends V>) | Map<? extends K, ? extends V> | void | 将给定的集合对象中的键值对映射添加到当前集合对象中 |
  | clear() | NUL | void | 清空集合对象中的全局键值对映射 |
  | keySet() | NUL | Set<K> | 获取集合中包含的所有键值对的键对象集合 |
  | values() | NUL | Collection<V> | 获取集合中包含的所有键值对的值对象集合 |
  | entrySet() | NUL | Set<Map.Entry<K, V>> | 将集合对象中的键值对对象转换为 Set 集合形式存储 |
  | getOrDefault(Object,V) | Object, V | V | 如果集合中存在指定的键对象返回对应的值对象,否则返回默认的值对象 |
  | forEach(BiConsumer<? super K, ? super V>) | BiConsumer<? super K, ? super V> | void | jdk-1.8 新增: 对集合中的键值对对象根据给定的消费功能进行消费处理 |
  | replaceAll(BiFunction<? super K, ? super V, ? extends V>) | BiFunction<? super K, ? super V, ? extends V> | void | jdk-1.8 新增: 对集合中的键值对对象根据给定的转换功能进行迭代处理,将对应的值对象进行转换处理 |
  | putIfAbsent(K, V) | K, V | V | jdk-1.8 新增: 如果集合中不存该对应的键对象或对应的值对象为`null`,则将键值对映射存放到集合中,并返回存放的值对象,否则返回集合中已存在的键对象映射的值对象 |
  | remove(Object, Object) | Object, Object | boolean | jdk-1.8 新增: 移除集合中和给定的键对象和值对象相同的键值对映射,如果键对象不存在或值对象和对应的映射值对象不相等则返回 false |
  | replace(K, V, V) | K, V, V | boolean | jdk-1.8 新增: 替换集合中和给定的键对象和值对象相同的键值对映射中的值对象,如果键对象不存在或值对象和对应的映射值对象不相等则返回 false |
  | replace(K, V) | K, V | V | jdk-1.8 新增: 替换集合中和给定的键对象相同的键值对映射中的值对象,如果键对象不存在则返回`null`,否则返回给定的要替换的值对象 |
  | computeIfAbsent(K, Function<? super K, ? extends V>) | K, Function<? super K, ? extends V> | V | jdk-1.8 新增: 如果集合中不存在键对象或对应的值对象为`null`且根据提供的转换功能操作返回的值对象不为`null`则替换或添加指定的键值对映射到集合中 |
  | computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)|K,BiFunction<? super K, ? super V, ? extends V>| V | jdk-1.8 新增: 如果集合中存在键对象并且对应的值对象不为`null`且根据提供的转换功能(将键对象和集合中存在的对应的值对象进行转换)操作返回的值对象不为`null`则替换或添加指定的键值对映射到集合中，否则将移除已存在的键值对映射 |
  | compute(K, BiFunction<? super K, ? super V, ? extends V>) |K,BiFunction<? super K, ? super V, ? extends V>| V | jdk-1.8 新增: 如果根据指定的转换操作(将键对象和集合中存在的对应的值对象进行转换)返回的的值对象不为`null`则添加指定的键对象和转换后的值对象映射到集合中,否则移除集合中已存在的键值对映射 |
  | merge(K, V, BiFunction<? super V, ? super V, ? extends V>) |K,V,BiFunction<? super V,? super V,? extends V>| V | jdk-1.8 新增: (键对象不存在或对应的值对象为`null`且给定的值对象不为`null`) 或 (值对象存在不为`null`且转换后的值对象不为 null) : 替换或新增映射对到集合中 |


## 应用实践
### ArrayList
### LinkedList
### Vector
### Stack
### PriorityQueue
&emsp;&emsp;这个类的排序有点问题  非有序的队列