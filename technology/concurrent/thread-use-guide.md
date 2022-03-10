# 线程使用

## 1. 一个线程运行时发生异常会怎样？ :id=thread-exception

如果异常没有被捕获该线程将会停止执行。Thread.UncaughtExceptionHandler 是用于处理未捕获异常造成线程突然中断情况的一个内嵌接口。当一个未捕获异常将造成线程中断的时候 JVM 会使用 Thread.getUncaughtExceptionHandler()来查询线程的 UncaughtExceptionHandler 并将线程和异常作为参数传递给 handler 的 uncaughtException()方法进行处理。

## 2. Java 中 notify 和 notifyAll 有什么区别？ :id=notify-different-notifyAll

- notify

?> 需要在同步方法或同步代码块中调用,即:调用前需要获取当前对象锁,通知那些等待对象锁的线程参与竞争获取锁。
多个线程等待,由线程规划器随机挑选出一个 wait 的线程进行唤醒执行 notify()方法后,当前线程不会马上释放锁,需要等 notify 线程方法中的程序执行完 ,即: 退出 synchronized 代码块后

- notifyAll

?> 唤醒所有等待队列中等待同一资源的全部线程从等待中退出,进入可运行状态,优先级高的先执行,也可能随机执行

## 3. ThreadLocal :id=use-threadLocal

- 变量共享 :使每个线程绑定自己的共享变量,类似存放全局变量的盒子 ->线程变量的隔离性
- 第一次 get 返回 null 可以使用继承 ThreadLocal 类重写 initialValue 方法

## 4. InheritableThreadLocal 的使用 :id=use-nheritableThreadLocal

- InheritableThreadLocal 可以在子线程中取得从父线程中继承来的值
- 继承父线程的值同时能进行修改 重写 childValue(Object parentValue)方法

## 5. interrupt 方法遇到 wait()方法

- 线程处于 wait 状态的时候调用 interrupt 方法会抛出 interruptedException
- 执行完同步代码块就会释放对象锁
- 在执行同步代码块的过程中遇到异常线程终止,也会释放锁
- 线程执行过程中调用了 wait()方法也会释放对象锁线程自动进入线程等待队列中等待唤醒

## 6. join 方法的使用

- 等待线程对象销毁

```
 thread.start
 thread.join
 // 后续的代码会等待线程结束后才会执行
 System.out.println("over");
```

- join 方法 threadB.interrupt(); 会报中断异常
- join(long) :等待指定时间

## 7. join(long)对比 sleep(long)

- join(long)内部是使用 wait 实现的,是可以释放锁的,sleep(long)是不释放锁的
- join(long)先抢占锁立马释放

## 8. interrupted 和 isInterruptedd 方法的区别

## 9. wait 和 notify 方法要在同步块中调用？

?> 等待/通知机制本身就需要同步进行阻塞，因此需要和 synchronized 一起使用，由于 synchronized 持有的是对象锁，因此锁本身是对象，因此 wait（）和 notify（）要同样如此普及，也只能放在 Object 里面了。

## 10. 怎么检测一个线程是否拥有锁？

在 java.lang.Thread 中有一个方法叫 holdsLock()，它返回 true 如果当且仅当当前线程拥有某个具体对象的锁。

## 11. FutureTask

?> 在 Java 并发程序中 FutureTask 表示一个可以取消的异步运算。它有启动和取消运算、查询运算是否完成和取回运算结果等方法。只有当运算完成的时候结果才能取回，如果运算尚未完成 get 方法将会阻塞。一个 FutureTask 对象可以对调用了 Callable 和 Runnable 的对象进行包装，由于 FutureTask 也是调用了 Runnable 接口所以它可以提交给 Executor 来执行。

## 12. 多线程最佳实践 :id=thread-practice

### 12.1. 无锁编程扩展 :id=thread-no-lock

?> 锁是性能杀手，所以很多的前辈大师们研究如何可以不用锁，也能实现线程安全。

- 一写一读的无锁队列：内存屏障

?> 一写一读的无锁队列即 Linux 内核的 kfifo 队列，一写一读两个线程，不需要锁，只需要内存屏障。

- 一写多读的无锁队列：volatile 关键字
- 多写多读的无锁队列：CAS
- 无锁栈
- 无锁链表
