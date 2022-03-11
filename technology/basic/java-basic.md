# Java 语言基础
## 语言基础
### final关键字的作用?
- 类
- 方法
- 字段
### final 能修饰抽象类/抽象方法吗

### static 关键字的作用?
- 类
- 方法
- 字段
### static 关键字能修饰类吗?
只有内部类
### static 修饰的方法可以被继承吗?
可以
### static 修饰的方法可以被重写吗?
不可以

## 集合框架

### 集合类设计为泛型类的好处

1. 泛型指定了某种集合类是一种容器,明确容器存储的元素的类型，在将非法类型对象存储时，编译器会帮助我们自动检测报错，而不用等到运行时才发现问题；
2. 泛型避免了进行类型强制转换的操作，使得代码更加整洁；
3. 避免了运行时类型检查，提高了程序的运行效率。

### ArrayList的数据结构?

### ArrayList的扩容机制?
- 初始:  10
- 新的列表集合对象的容量扩至1.5倍
### ArrayList容量大小上限?

Integer.MAX_VALUE - 8   Integer.MAX_VALUE

### 线程安全的List集合?
- Vector
- CopyOnWriteArrayList
- Collections.synchronizedList()

### Array和List转换?

### fail-fast和fail-safe
- fail-fast: java.util中的集合 ==> 检测修改==>ConcurrentModificationException异常结束
- fail-safe: juc中的 基于数组内存拷贝 ==>修改不会影响查询过程

### Set的数据结构?

### 线程安全的Set集合?
- ConcurrentHashMap#newKeySet
- Collections#synchronizedSet
- CopyOnWriteArraySet

### HashSet

### LinkedHashSet
- 

### TreeSet/SorteSet

### HashMap 数据结构

### HashMap 在Jdk8中的优化?
引入红黑树 数组+链表+红黑树

### HashMap 为什么引入红黑树
- 提高查询效率

### HashMap为什么选择8作为链表和红黑树转化的临界值?
- 泊松分布 概率统计 超过8个元素的哈希碰撞的概率已经很小了 ==> 避免很容易达标转树

### HashMap为什么不直接用红黑树?
- 元素小于8 链表的查询速度底但是插入和删除的速度相对高
- 红黑树查询效率高,但是在元素进行插入和删除涉及到自旋操作 效率较低

### 说一下HashMap在新增元素的一个逻辑?
- 容量resize ==>rehash
- hash定位 ==> 不存在直接新增一个链表,存在则比较第一个元素是否命中,直接赋值,否则判断是链表还是红黑树,进行元素添加/更新==>涉及到转树

### 说一下HashMap在查找元素的一个逻辑?

### 说一下HashMap在删除元素的一个逻辑?

### HashMap怎么解决Hash碰撞的?
- 高位参与运算
- 负载因子: 空间和时间的合理分配

### HashMap为什么选择0.75作为负载因子?
- 0.75在时间和空间利用率上是个比较折中的比率
- 大于这个值,空间利用率提高但是哈希碰撞的概率也增加了导致在查询时效率变得低下
- 小于这个值哈希碰撞的几率减小了,但是空间利用率大大降低了,导致内存空间的浪费

### HashMap的容量的最大限制
1 << 30 == >Integer.MaxValue

### LinkedHashMap的数据结构?

### LinkedHashMap有哪些用处?
- 按照插入排序
- 按照访问排序
- LRU

### TreeMap的数据结构?
红黑树

### TreeMap的用处?
- 自然排序
- 自定义排序

### ConcurrentHashMap的数据结构?


### 怎么保证一个集合对象不被修改?
- Collections.unmodifiableCollection()
- Collections.unmodifiableList()
- Collections.unmodifiableSet()
- Collections.unmodifiableSortedSet()
- Collections.unmodifiableMap()
- Collections.unmodifiableSortedMap()
