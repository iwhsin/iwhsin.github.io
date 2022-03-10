# JUC 并发框架

## 1. 原子类库

## 2. 锁与条件

## 3. 并发工具

### 3.1. Semaphore :id=semaphore

?> Semaphore(信号量)是一个线程同步的辅助类，可以维护当前访问自身的线程个数，并提供了同步机制。使用 Semaphore 可以控制同时访问资源的线程个数。
当初始的资源个数为 1 的时候，Semaphore 退化为排他锁。正因为如此，Semaphone 的实现原理和锁十分类似，是基于 AQS，有公平和非公平之分。

### 3.2. CountDownLatch :id=count-down-latch

?> countDownLatch 这个类使一个线程等待其他线程各自执行完毕后再执行。
是通过一个计数器来实现的，计数器的初始值是线程的数量。每当一个线程执行完毕后，计数器的值就-1，当计数器的值为 0 时，表示所有线程都执行完毕，然后在闭锁上等待的线程就可以恢复工作了。

### 3.3. CyclicBarrier :id=cyclic-barrier

?> CyclicBarrier 类可以实现一组线程相互等待，当所有线程都到达某个屏障点后再进行后续的操作。
CyclicBarrier 字面意思是“可重复使用的栅栏”，CyclicBarrier 相比 CountDownLatch 来说，要简单很多，其源码没有什么高深的地方，它是 ReentrantLock 和 Condition 的组合使用。

- <i class='color-rainbow'>CountDownLatch VS CyclicBarrier</i>

  - 线程执行时机不同

  ?> CyclicBarrier 的某个线程运行到某个点上之后，该线程即停止运行，直到所有的线程都到达了这个点，所有线程才重新运行；
  CountDownLatch 则是在某线程运行到某个点上之后，只是给某个计数值-1 而已，该线程继续运行。

  - 唤醒机制不同

  ?> CyclicBarrier 只能唤起一个任务，CountDownLatch 可以唤起多个任务。
  `CountDownLatch`可以在多个线程任务中调用`await()`方法使得对应的线程挂起, 当前 count 计数为 0 时能够同时唤醒这些任务继续执行。
  `CyclicBarrier`只能在声明的时候指定一个`Runnable`实现，在屏障点到达时会在最后一个调用`await()`方法的线程中执行这个对应的实现任务。

  - 复用性

  ?> CyclicBarrier 可重用，CountDownLatch 不可重用，计数值为 0 该 CountDownLatch 就不可再用了。

### 3.4. Exchanger :id=exchanger

?> Exchanger 用于线程之间交换数据。
Exchanger 的核心机制和 Lock 一样，也是 CAS+park/unpark。在实现上面，JDK7 和 JDK8 有一定差异，这里以 JDK7 的实现为例进行分析

### 3.5. Phaser :id=phaser

?> 从 JDK7 开始，新增了一个同步工具类 Phaser，其功能比 CyclicBarrier 和 CountDownLatch 更加强大。

- 用 Phaser 替代 CountDownLatch :id=replace-CountDownLatch-with-phaser

 ?> 在 CountDownLatch 中，主要是 2 个函数：await（）和 countDown（），在 Phaser 中，与之相对应的函数是 awaitAdance（int n）和 arrive（）。

- 用 Phaser 替代 CyclicBarrier

 ?> arriveAndAwaitAdance（）就是 arrive（）与 awaitAdvance（int）的组合，表示“我自己已到达这个同步点，同时要等待所有人都到达这个同步点，然后再一起前行”。

## 4. 并发容器

## 5. 线程池
