# <i class='icon-brand-keybase'>技术专题</i> :id=technical-topic

## <i class='icon-brand-java'>Java 基础</i> :id=java-basic

### <i class='icon-brand-tripadvisor'>反射</i>

- [获取 Class 对象的几种方式](、technology/basic/java-basic?id=class-object-get ':class=emoji-sparkles')

## <i class='icon-brand-tripadvisor'>并发编程</i> :id=concurrent-programming

- <i class='emoji-sparkles title'>线程基础</i>

  - [程序、程进程、线程](/technology/concurrent/thread-basic?id=program-process-thread ':class=emoji-sparkles')
  - [守护线程和用户线程](/technology/concurrent/thread-basic?id=daemon-thread ':class=emoji-sparkles')
  - [线程实现的几种方式](/technology/concurrent/thread-basic?id=thread-impl ':class=emoji-sparkles')
  - [线程的几种状态](/technology/concurrent/thread-basic?id=thread-state ':class=emoji-sparkles')
  - [优雅地终止线程的几种方式](/technology/concurrent/thread-basic?id=thread-terminates ':class=emoji-sparkles')
  - ✔️ 线程优先级
  - [线程调度算法](/technology/concurrent/thread-basic?id=thread-scheduling ':class=emoji-sparkles')
  - [线程上下文切换](/technology/concurrent/thread-basic?id=thread-context-swap ':class=emoji-sparkles')
  - [多线程与线程安全问题](/technology/concurrent/thread-basic?id=multi-thread-and-safe ':class=emoji-sparkles')
  - [线程阻塞](/technology/concurrent/thread-basic?id=thread-block ':class=emoji-sparkles')
  - [synchronize 关键字](/technology/concurrent/thread-basic?id=synchronize ':class=emoji-sparkles')
  - [volatile 关键字](/technology/concurrent/thread-basic?id=volatile ':class=emoji-sparkles')
  - [线程阻塞](/technology/concurrent/thread-basic?id=thread-block ':class=emoji-sparkles')
  - 原子性、可见性和有序性

- <i class='emoji-sparkles title'>线程中的锁</i>

  - [什么是锁?](/technology/concurrent/thread-basic?id=thread-lock ':class=emoji-sparkles')
  - [死锁与活锁](/technology/concurrent/thread-basic?id=deadlock-livelock ':class=emoji-sparkles')
  - [线程饥饿现象](/technology/concurrent/thread-basic?id=thread-hungry ':class=emoji-sparkles')
  - [公平锁与非公平锁](/technology/concurrent/thread-basic?id=lock-fair-unfair ':class=emoji-sparkles')
  - [乐观锁与悲观锁](/technology/concurrent/thread-basic>id=lock-pessimistic-optimistic ':class=emoji-sparkles')
  - [独占锁和共享锁](/technology/concurrent/thread-basic?id=lock-exclusive-shared ':class=emoji-sparkles')
  - [✔️ 锁重入问题](/technology/concurrent/thread-basic ':class=emoji-sparkles')
  - [✔️ 轻量锁、重量锁、偏向锁](/technology/concurrent/thread-basic ':class=emoji-sparkles')
  - [✔️ 锁升级](/technology/concurrent/thread-basic ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>线程通信</i>

  - [线程间数据共享](/technology/concurrent/thread-basic?id=thread-data-share ':class=emoji-sparkles')
  - [等待/通知机制](/technology/concurrent/thread-basic?id=thread-wait-notify ':class=emoji-sparkles')
  - [线程间数据共享](/technology/concurrent/thread-basic?id=thread-data-share ':class=emoji-sparkles')
  - [通过管道进行线程间通信](/technology/concurrent/thread-basic ':class=emoji-sparkles')
  - [生产者/消费者模式](/technology/concurrent/thread-basic ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>线程池</i>

  - [什么是线程池](/technology/concurrent/thread-basic?id=thread-pool ':class=emoji-sparkles')
  - [线程池的几个组成部分](/technology/concurrent/thread-basic?id=thread-pool-component ':class=emoji-sparkles')
  - [线程池的核心配置参数](/technology/concurrent/thread-basic?id=thread-pool-config-parameter ':class=emoji-sparkles')
  - [阻塞队列的几种排队策略](/technology/concurrent/thread-basic?id=blocking-queue-policy ':class=emoji-sparkles')
  - [阻塞队列的选择](/technology/concurrent/thread-basic?id=thread-blocking-queue-choose ':class=emoji-sparkles')
  - [线程池的常用拒绝策略](/technology/concurrent/thread-basic?id=thread-poll-reject-policy ':class=emoji-sparkles')

  - [Jdk 中几种线程池的区别](/technology/concurrent/thread-basic?id=thread-poll-executor-difference ':class=emoji-sparkles')
  - [ThreadPoolExecutor 的执行过程](/technology/concurrent/thread-basic?id=thread-poll-executor ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>JUC 并发框架</i>

  - <i class='emoji-sparkles title'>并发工具</i>
    - [Semaphore 计数信号量](/technology/concurrent/thread-juc-component?id=semaphore ':class=emoji-sparkles')
    - [CountDownLatch](/technology/concurrent/thread-juc-component?id=count-down-latch ':class=emoji-sparkles')
    - [CyclicBarrier](/technology/concurrent/thread-juc-component?id=cyclic-barrier ':class=emoji-sparkles')
    - [Exchanger](/technology/concurrent/thread-juc-component?id=exchanger ':class=emoji-sparkles')
    - [Phaser](/technology/concurrent/thread-juc-component?id=phaser ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>JVM 内存模型</i>

  - [什么是 JMM?](/technology/concurrent/thread-jmm?id=java-memory-mod ':class=emoji-sparkles')
  - [内存可见性](/technology/concurrent/thread-jmm?id=memory-visibility ':class=emoji-sparkles')
  - [指令重排序](/technology/concurrent/thread-jmm?id=instruction-reordering ':class=emoji-sparkles')
  - [As If Serial 语义](/technology/concurrent/thread-jmm?id=as-if-serial ':class=emoji-sparkles')
  - [Happen Before 语义](/technology/concurrent/thread-jmm?id=happen-before ':class=emoji-sparkles')
  - [内存屏障](/technology/concurrent/thread-jmm?id=memory-barrier ':class=emoji-sparkles')
  - [内存可见性](/technology/concurrent/thread-jmm?id=memory-barrier ':class=emoji-sparkles')
  - [Volatile 底层实现](/technology/concurrent/thread-jmm?id=principle-volatile ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>线程使用</i>

  - [一个线程运行时发生异常会怎样？](/technology/concurrent/thread-use-guide?id=thread-exception ':class=emoji-sparkles')
  - [notify 和 notifyAll 有什么区别](/technology/concurrent/thread-use-guide?id=notify-different-notifyAll ':class=emoji-sparkles')
  - [ThreadLocal 的使用](/technology/concurrent/thread-use-guide?id=use-threadLocal ':class=emoji-sparkles')
  - [InheritableThreadLocal 的使用](/technology/concurrent/thread-use-guide?id=use-inheritableThreadLocal ':class=emoji-sparkles')
  - [interrupt 方法遇到 wait()方法](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [join 方法的使用](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [join(long)对比 sleep(long)](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [interrupted 和 isInterruptedd 方法的区别](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [wait 和 notify 方法要在同步块中调用](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [怎么检测一个线程是否拥有锁](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>多线程最佳实践</i>
  - [无锁编程扩展](/technology/concurrent/thread-basic?id=thread-no-lock ':class=emoji-sparkles')

---

## <i class='icon-brand-java'>Java 虚拟机</i> :id=jvm

- <i class='icon-brand-java title'>概念基础</i>

  - [概念总览](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [JDK、JRE、JVM](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [JDK 常用工具](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [虚拟机与字节码规范](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')

- <i class='icon-brand-java title'>类加载子系统</i>

  - [类加载过程](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [双亲委派模型](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [破坏双亲委派模型](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [自定义类加载器](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')

- <i class='icon-brand-java title'>运行时数据区</i>

  - [内存结构](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [内存分配](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [对象创建](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [内存回收](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')

- [垃圾收集](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [垃圾收集算法](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [垃圾收集器](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [对象的引用类型](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [MinorGC🌱 MajorGC🍃 FullGC🍂](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- [虚拟机执行引擎](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [运行时栈帧结构](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [方法调用过程](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [静态分派与动态分派](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [动态类型语言支持](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [解释执行与编译执行](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- [代码编译与优化](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [虚拟机执行引擎](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [虚拟机执行引擎](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- [JMM 内存模型](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [Amdah 定律(阿姆达定律)](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [工作内存与主内存](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [内存交互与交互原则](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [先行发生原则(Happen Before)](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
  - [串行化语义(As If Serial)](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- [问题故障排查问题](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- [性能优化总结](/technology/jvm/java-virtual-machine?id=概念总览 ':class=icon-brand-abbrobotstudio')
- <i class='icon-brand-abbrobotstudio title'>参考资料</i>
  - [常见面试题指南](/technology/jvm/java-virtual-machine?id=interview-question-guide ':class=icon-brand-abbrobotstudio')

## 数据库

## <i class='emoji-web-global'>网络编程</i> :id=network

- [OSI 七层网络模型](/technology/network/tech-network?id=net-osi-model-7 ':class=emoji-web-spider')
- [交换机和路由器的区别](/technology/network/tech-network?id=diff-switches-and-routers ':class=emoji-web-spider')
- [TCP/IP 四层模型](/technology/network/tech-network?id=net-osi-model-4 ':class=emoji-web-spider')

- <i class='emoji-web title'>TCP 原理</i>
  - [传输数据包](/technology/network/tech-network?id=tcp-transfer-data ':class=emoji-web-spider')
  - [TCP 协议段格式](/technology/network/tech-network?id=tcp-protocol-segment ':class=emoji-web-spider')
  - [三次握手过程](/technology/network/tech-network?id=tcp-established-three-time ':class=emoji-web-spider')
  - [二次握手不可以吗](/technology/network/tech-network?id=tcp-established-two-time ':class=emoji-web-spider')
  - [初始序列号(ISN)](/technology/network/tech-network?id=tcp-isn ':class=emoji-web-spider')
  - [全连接/半连接](/technology/network/tech-network?id=tcp-connections ':class=emoji-web-spider')
  - [握手中是否可以携带数据](/technology/network/tech-network?id=tcp-established-with-data ':class=emoji-web-spider')
  - [四次挥手过程](/technology/network/tech-network?id=tcp-close-with-four-time ':class=emoji-web-spider')
  - [为什么断开需要经历四次挥手](/technology/network/tech-network?id=tcp-close-with-four-time ':class=emoji-web-spider')
  - [怎么理解 TIME_WAIT 状态需要经过 2MSL](/technology/network/tech-network?id=tcp-close-with-four-time ':class=emoji-web-spider')
  - [TCP如何保证可靠性](/technology/network/tech-network?id=tcp-reliability ':class=emoji-web-spider')

- <i class='emoji-web-spider title'>网络安全</i>
  - [DDOS攻击与防范](/technology/network/tech-network?id=defend-ddos ':class=emoji-web-spider')

## <i class='icon-brand-zendframework'>技术框架</i> :id=framework

## <i class='icon-brand-cloudbees'>中间件</i> :id=middleware

### <i class='icon-brand-redis'>Redis</i> :id=redis

### RabbitMQ

---

## <i class='icon-brand-codechef'>数据结构与算法</i> :id=data-structure-and-algorithm

### <i class='icon-brand-codechef'>数据结构</i> :id=data-structure


### <i class='icon-brand-codechef'>算法</i> :id=algorithm
- <i class='emoji-thinking-face title'>案例实践</i>
  - [全局唯一ID](/technology/algorithm/algorithm?id=global-unique-id ':class=emoji-thinking-face')

## <i class='icon-brand-archiveofourown'>架构设计</i> :id=architecture

### <i class='icon-brand-angellist'>设计思想</i>
- [OO设计思想](/technology/architecture/architecture-design?id=thinking-in-oo ':class=icon-brand-angellist')


### <i class='icon-brand-archiveofourown'>分布式系统</i>

