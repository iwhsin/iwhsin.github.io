# <i class="icon-brand-openstreetmap">站点地图</i> :id=site-map

## <i class='icon-brand-skyliner'>技术小站</i> :id=article

## <i class='icon-brand-keybase'>技术专题</i> :id=technical-topic

### <i class='icon-brand-java'>Java 基础</i> :id=java-basic

### <i class='icon-brand-abbrobotstudio'>Java 虚拟机</i> :id=jvm

### <i class='icon-brand-tripadvisor'>并发编程</i> :id=concurrent-programming

<details open>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>

- <i class='emoji-sparkles title'>线程基础</i>

  - [程序、程序、线程](/technology/concurrent/thread-basic?id=program-process-thread ':class=emoji-sparkles')
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

- <i class='emoji-sparkles title'>多线程最佳实践</i>
  - [无锁编程扩展](/technology/concurrent/thread-basic?id=thread-no-lock ':class=emoji-sparkles')

- <i class='emoji-sparkles title'>线程使用</i>
  - [一个线程运行时发生异常会怎样？](/technology/concurrent/thread-use-guide?id=thread-exception ':class=emoji-sparkles')
  - [notify 和 notifyAll 有什么区别](/technology/concurrent/thread-use-guide?id=notify-different-notifyAll ':class=emoji-sparkles')
  - [ThreadLocal的使用](/technology/concurrent/thread-use-guide?id=use-threadLocal ':class=emoji-sparkles')
  - [InheritableThreadLocal 的使用](/technology/concurrent/thread-use-guide?id=use-inheritableThreadLocal ':class=emoji-sparkles')
  - [interrupt 方法遇到 wait()方法](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [join 方法的使用](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [join(long)对比 sleep(long)](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [interrupted 和 isInterruptedd 方法的区别](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [wait 和 notify 方法要在同步块中调用](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [怎么检测一个线程是否拥有锁](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  - [](/technology/concurrent/thread-use-guide?id= ':class=emoji-sparkles')
  </details>

<script type="text/javascript">
$('h3,h4').click(function(){
    var details = $(this).next()[0];
    console.info(details)
    toggleDetails(details);
})

function isDetails(details){
    return 'DETAILS' == details.nodeName;
}

function toggleDetails(details){
    if(!isDetails(details)) {
    return;
    }
    console.log(details.open)
    details.open = !details.open;
}
</script>
