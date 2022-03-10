## <i class='icon-brand-keybase'>技术专题</i> :id=technical-topic

### <i class='emoji-sparkles details'>并发编程</i> :id=concurrent-programming
<details open>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>

- [概念总览](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>多线程基础</i>
    - [程序、程序、线程](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础?id=program-process-thread  ':class=emoji-sparkles')
    - [线程的几种状态](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [线程优先级](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [守护线程和非守护线程](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [线程使用的几种方式](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [线程终止的几种方式](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>线程间的通讯方式</i>
    - [等待/通知机制](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [LockSupport#park/unpack](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [通过管道进行线程间通信](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [生产者/消费者模式](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [线程阻塞](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>锁相关概念</i>
    - [什么是锁?](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [公平锁与非公平锁](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [乐观锁与悲观锁](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [锁重入问题](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [同步锁 Synchronized](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [轻量级锁 Volatile](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [什么是锁?](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>线程安全问题</i>
    - [什么是线程安全?](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>JMM 线程内存模型</i>
    - [CPU缓存模型](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
        - [CPU 缓存布局](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-abbrobotstudio')
        - [Store Buffer 与Load Buffer](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-abbrobotstudio')
    - [重排序](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
        - [内存重排序](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
        - [编译重排序](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
        - [指令重排序](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [Happen Before语义](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [As If Serial 语义](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [内存屏障](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [内存可见性](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
    - [Volatile  底层实现原理](/docs/基础篇/面向对象编程/并发编程/多线程编程/thread-多线程基础 ':class=emoji-sparkles')
- <i class='emoji-sparkles title'>JUC Java并发工具库</i>
    - <i class='emoji-sparkles title'>原子类库</i>
        -<i class='emoji-sparkles title'>AtomicBoolean</i>
        -<i class='emoji-sparkles title'>AtomicInteger</i>
        -<i class='emoji-sparkles title'>AtomicIntegerArray</i>
        -<i class='emoji-sparkles title'>AtomicIntegerFieldUpdater</i>
        -<i class='emoji-sparkles title'>AtomicLong</i>
        -<i class='emoji-sparkles title'>AtomicLongArray</i>
        -<i class='emoji-sparkles title'>AtomicLongFieldUpdater</i>
        -<i class='emoji-sparkles title'>AtomicReference</i>
        -<i class='emoji-sparkles title'>AtomicReferenceArray</i>
        -<i class='emoji-sparkles title'>AtomicReferenceFieldUpdater</i>
        -<i class='emoji-sparkles title'>AtomicMarkableReference</i>
        -<i class='emoji-sparkles title'>AtomicStampedReference</i>
        -<i class='emoji-sparkles title'>Striped64</i>
        -<i class='emoji-sparkles title'>LongAdder</i>
        -<i class='emoji-sparkles title'>LongAccumulator</i>
        -<i class='emoji-sparkles title'>DoubleAdder</i>
        -<i class='emoji-sparkles title'>DoubleAccumulator</i>
        
    - <i class='emoji-sparkles title'>锁与条件</i>
        -<i class='emoji-sparkles title'>ReentrantLock</i>
        -<i class='emoji-sparkles title'>ReentrantReadWriteLock</i>
        -<i class='emoji-sparkles title'>LockSupport</i>

    - <i class='emoji-sparkles title'>并发工具</i>
        <i class='emoji-sparkles title'>CountDownLatch</i>
        <i class='emoji-sparkles title'>CyclicBarrier</i>
        <i class='emoji-sparkles title'>Semaphore</i>
        
    - <i class='emoji-sparkles title'>并发容器</i>
        - <i class='emoji-sparkles title'>CopyOnWriteArrayList</i>
        - <i class='emoji-sparkles title'>CopyOnWriteArraySet</i>
        - <i class='emoji-sparkles title'>ConcurrentHashMap</i>
        
    - <i class='emoji-sparkles title'>线程池</i>
        - <i class='emoji-sparkles title'>ScheduledExecutorService</i>
        - <i class='emoji-sparkles title'>ScheduledThreadPoolExecutor</i>

</details>


---
### <i class='emoji-sparkles'>中间件</i>

#### <i class='emoji-sparkles details'>缓存中间件</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>

- Redis
</details>

#### <i class='emoji-sparkles details'>消息队列</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>
- RabbitMQ
</details>

#### <i class='emoji-sparkles details'>搜索中间件</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>
- ElasticSearch
</details>
