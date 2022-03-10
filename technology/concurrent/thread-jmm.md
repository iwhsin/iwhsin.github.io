# JVM 内存模型 :id=java-memory-mod

?> 为了明确定义在多线程场景下，什么时候可以重排序，什么时候不能重排序，Java引入了JMM（Java Memory Model），也就是Java内存模型。
这个模型就是一套规范，对上，是JVM和开发者之间的协定；对下，是JVM和编译器、CPU之间的协定。
Java内存模型规定和指引Java程序在不同的内存架构、CPU和操作系统间有确定性地行为。

## 1. 内存可见性 :id=memory-visibility

- 缓存布局(Cache Layout)

![CPU缓存布局](/assets/images/thread-jmm/20220309165157.png ':class=center :size=50% :title=CPU缓存布局')

?> 在一个 CPU 4 核下，L1、L2、L3 三级缓存与主内存的布局。每个核上面有 L1、L2 缓存，L3 缓存为所有核共用。
因为存在`CPU 缓存一致性协议`，多个 CPU 之间的缓存不会出现不同步的问题，不会有`内存可见性`问题。
缓存一致性协议对性能有很大损耗，为了解决这个问题，CPU 的设计者们在这个基础上又进行了各种优化。例如，在计算单元和 L1 之间加了 Store Buffer、Load Buffer（还有其他各种 Buffer）。

- 高速缓存(Cache Memory)

?> CPU 在摩尔定律的指导下以每 18 个月翻一番的速度在发展，然而内存和硬盘的发展速度远远不及 CPU。
为了解决 I\O 速度和 CPU 运算速度之间的不匹配问题，CPU 厂商在 CPU 中内置了少量的高速缓存。

- Buffer 缓存体系
  ![](/assets/images/thread-jmm/20220309173246.png ':class=center :size=50% :title=Buffer-Cache')

?> L1、L2、L3 和主内存之间是同步的，有缓存一致性协议的保证，但是 StoreBuffer、Load Buffer 和 L1 之间却是异步的。
也就是说，往内存中写入一个变量，这个变量会保存在 Store Buffer 里面，稍后才异步地写入 L1 中，同时同步写入主内。

- 内核视角下的 CPU 缓存模型
  ![](/assets/images/thread-jmm/20220309173344.png ':class=center :size=50% :title=Kernel-Cpu-Cache')

- JVM 抽象内存模型

![](/assets/images/thread-jmm/20220309213523.png ':class=center :size=50% :title=Jvm-Memory-Model')

## 2. 指令重排序 :id=instruction-reordering

?> Store Buffer 的延迟写入是重排序的一种，称为内存重排序（MemoryOrdering），此外还有编译器和 CPU 指令重排序。

- 编译器重排序

?> 对于没有先后依赖关系的语句，编译器可以重新调整语句的执行顺序。

- CPU 指令重排序

?> 在指令级别，让没有依赖关系的多条指令并行。

- CPU 内存重排序

?> CPU 有自己的缓存，指令的执行顺序和写入主内存的顺序不完全一致。
内存重排序是“内存可见性”问题的根本原因，由于`Store Buffer`和`主内存`并非完全同步的，因此产生`内存可见性`问题。

## 3. as-if-serial 语义 :id=as-if-serial

从编译器和 CPU 的角度来看，希望尽最大可能进行重排序，提升运行效率。

- 单线程程序的重排序规则

?> 站在编译器和 CPU 的角度来说，不管怎么重排序，单线程程序的执行结果不能改变，这就是单线程程序的重排序规则。
换句话说，只要操作之间没有数据依赖性，编译器和 CPU 都可以任意重排序，因为执行结果不会改变，代码看起来就像是完全串行地一行行从头执行到尾，这也就是 as-if-serial 语义。

- 多线程程序的重排序规则

?> 对于多线程程序来说，线程之间的数据依赖性太复杂，编译器和 CPU 没有办法完全理解这种依赖性并据此做出最合理的优化。
编译器和 CPU 只能保证每个线程的 as-if-serial 语义。线程之间的数据依赖和相互影响，需要编译器和 CPU 的上层来确定。上层要告知编译器和 CPU 在多线程场景下什么时候可以重排序，什么时候不能重排序。

## 4. happen-before 语义 :id=happen-before

?> Java内存模型对一个线程所做的变动能被其它线程可见提供了保证，它们之间是先行发生关系。这个关系定义了一些规则让程序员在并发编程时思路更清晰。
为了描述这个规范，JMM 引入了 happen-before，使用 happen-before 描述两个操作之间的内存可见性。

- Happen Before 语义: 如果一个线程A在线程B之前执行，则需要保证线程A的执行结果对线程B是可见的也就是`内存可见性`。

- happen-before 规定
  - 单线程： 单线程中的每个操作，happen-before 对应该线程中任意后续操作（也就是as-if-serial语义保证）。
  - volatile 变量： 对volatile变量的写入，happen-before对应后续对这个变量的读取。
  - synchronized 同步锁：对synchronized的解锁，happen-before对应后续对这个锁的加锁。
  - final 变量： 对final变量的写，happen-before于final域对象的读。

> [!NOTE] 对于非 volatile 变量的写入和读取，不在这个承诺之列。通俗来讲，就是 JMM 对编译器和 CPU 来说，volatile 变量不能重排序；非 volatile 变量可以任意重排序。

- happen-before 的传递性

?> 除了上述这些基本的 happen-before 规则，happen-before 还具有传递性，即若 Ahappen-before B，B happen-before C，则 A happen-before C。

- JSR-133 对 volatile 语义的增强

?> 在旧的 JMM 模型中，volatile 变量的写入会和非 volatile 变量的读取或写入重排序。但新的模型不会，这也正体现了 Java 对 happen-before 规则的严格遵守。

## 5. 内存屏障

?> 为了禁止编译器重排序和 CPU 重排序，在编译器和 CPU 层面都有对应的指令，也就是内存屏障（Memory Barrier）。这也正是 JMM 和 happen-before 规则的底层实现原理。

- JDK 中的内存屏障

?> 内存屏障是很底层的概念，对于 Java 开发者来说，一般用 volatile 关键字就足够了。但从 JDK 8 开始，Java 在 Unsafe 类中提供了三个内存屏障函数。

```java
//*-- Note: 保证读和读以及读和写之间没有重排序 --*//
public native void loadFence();
//*-- Note: 确保写和写以及读和写之间没有重排序 --*//
public native void storeFence();
//*-- Note: 确保读和读、读和写、写和写、写和读之间没有重排序 --*//
public native void fullFence();
```

- CPU 内存屏障

 ?> 理论层面，可以把基本的 CPU 内存屏障分成四种。 

- <i class='hidden'></i>
  - LoadLoad：禁止读和读的重排序。 
  - StoreStore：禁止写和写的重排序。 
  - LoadStore：禁止读和写的重排序。 
  - StoreLoad：禁止写和读的重排序。

## 6. volatile`关键字

- **volatile关键字底层操作规则**
  - 在volatile写操作的前面插入一个StoreStore屏障。保证volatile写操作不会和之前的写操作重排序；
  - 在volatile写操作的后面插入一个StoreLoad屏障。保证volatile写操作不会和之后的读操作重排序；
  - 在volatile读操作的后面插入一个LoadLoad屏障+LoadStore屏障。保证volatile读操作不会和之后的读操作、写操作重排序。

?> 具体到 x86 平台上，其实不会有 LoadLoad、LoadStore 和 StoreStore 重排序，只有 StoreLoad 一种重排序（内存屏障），也就是只需要在 volatile 写操作后面加上 StoreLoad 屏障。

- 底层看`volatile`实现原理

![](/assets/images/thread-jmm/20220309230645.png ':class=center :size=50%')
