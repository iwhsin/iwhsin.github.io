# 1. 多线程基础

## 1.1. 概念基础

### 1.1.1. 什么是线程(程序、进程、线程)

- **什么是程序**<br>
  &emsp;&emsp;程序是指令、数据及其组织形式的描述，进程是程序的实体。

- **什么是进程**<br>
  &emsp;&emsp;我们执行的每个应用程序都是一个独立的进程，`进程是操作系统中资源分配和管理的基本单元`。<br>
  &emsp;&emsp;进程是应用程序的实体，表示应用程序的一次执行过程，同时进程也是线程的容器，可以运行多个子任务（线程）。<br>

- **什么是线程**<br>
  &emsp;&emsp;应用程序在同一时刻执行的多个任务，每一个任务都是独立运行的，想这样的子任务我们通常将它成为`线程`。<br>
  &emsp;&emsp;`线程是CPU调度和分派的基本单位`，它和同一个进程中的线程共享进程的内存空间。

- <b style='color:red'>线程 VS 进程</b>
  1. 进程都有独立的代码和数据空间（进程上下文），进程间的切换会有较大的开销，一个进程包含 1--n 个线程。
  2. 同一类线程共享代码和数据空间，每个线程有独立的运行栈和程序计数器(PC)，线程切换开销小。
  3. 线程和进程一样分为五个阶段：创建、就绪、运行、阻塞、终止

> [!NOTE]
> 上述相关介绍简单帮助我们了解下`线程`、`进程`、`程序`三者的概念，下面介绍下线程相关的内容。

### 1.1.2. 线程的几种状态

&emsp;&emsp;了解了线程的概念后，我们继续看下线程的几种状态。<br>
![线程状态及转换关系](/docs/assets/images/basic/thread/thread-state-convert.png)

&emsp;&emsp;在 java 中线程有 6 种状态，一个线程可以在指定的时间处于一种状态(这些状态是虚拟机中的状态和操作系统无关)，具体可查看`Thread.State`类。<br>

| 线程状态      | 描述                                                                | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------ | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEW           | 新创建的线程,尚未启动的线程处于这种状态                             | 使用`new`关键字`new Thread(Runnable)`创建一个线程对象,该线程还未启动,此时线程的状态就处理`NEW`                                                                                                                                                                                                                                                                                                                                                                                 |
| RUNNABLE      | 可运行状态,在 Java 虚拟机上执行的线程处于这种状态                   | 线程被创建后调用`Thread#start()`方法后,此时线程就处于`RUNNABLE`状态,此时线程可能正在运行也可能未运行这取决于系统处理器给线程分配的执行时间                                                                                                                                                                                                                                                                                                                                     |
| BLOCKED       | 被阻塞状态,等待监视器锁的线程处于这种状态                           | 当线程处于请求锁时,此时线程就处于`BLOCKED`状态,一旦线程得到锁,则又恢复到`RUNABLE`状态.<br>&emsp;&emsp;等待阻塞 -- 通过调用线程的 wait()方法，让线程等待某工作的完成<br>&emsp;&emsp;同步阻塞 -- 线程在获取 synchronized 同步锁失败(因为锁被其它线程所占用)，它会进入同步阻塞状态<br>&emsp;&emsp;其他阻塞 -- 通过调用线程的 sleep()或 join()或发出了 I/O 请求时，线程会进入到阻塞状态。当 sleep()状态超时、join()等待线程终止或者超时、或者 I/O 处理完毕时，线程重新转入就绪状态 |
| WAITING       | 等待状态,无限期地等待另一个线程来执行某一特定操作的线程处于这种状态 | 在调用`Object#wait()`、`Thread#join()`、`Lock或Condition`等，线程处于等待通知调度时处于`WAITING`状态                                                                                                                                                                                                                                                                                                                                                                           |
| TIMED_WAITING | 计时等待状态,等待指定的时间后执行动作的线程处于这种状态             | 线程处于等待通知调度或等待超时时处于`TIMED_WAITING`状态                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TERMINATED    | 中断状态,已退出的线程处于这种状态                                   | 线程正常退出而自然死亡或异常中断导致线程死亡，此时线程会处于`TERMINATED`状态                                                                                                                                                                                                                                                                                                                                                                                                   |

### 1.1.3. 线程的基本属性

#### 1.1.3.1. 线程优先级

&emsp;&emsp;Java 中每个线程都有一个优先级,默认继承父线程的优先级,可以使用`Thread#setPriority()`方法设置线程的优先级。

- **线程优先级概念**

  - 线程的优先级具有继承性,比如 A 线程启动 B 线程,B 线程启动 C 线程 ,则 B,C 线程的优先级和 A 线程相同
  - 线程的优先级和代码的执行顺序没有关系,高优先级竞争 CPu 更容易,总是大部分先执行完(并不一定先执行完,因为优先级具有随机性)
  - 优先级具有随机性和不确定性

- **线程优先级范围**<br>
  &emsp;&emsp;Java 中线程的优先级最小为 1(`Thread#MIN_PRIORITY`)，最大优先级为 10(`Thread#MAX_PRIORITY`)。

- **线程选择优先**

  - 当线程调度器有机会选择新线程时，首先选择具有较高优先级的线程。
  - 线程优先级是高度依赖于系统的。当虚拟机依赖于宿主机平台的线程实现机制时，Java 线程的优先级被映射到宿主机平台的优先级上。

- **系统线程机制**
  - Windows 系统有 7 个优先级
  - Linux 系统上，线程优先级被忽略-所有线程具有相同的优先级。

#### 1.1.3.2. 线程组

&emsp;&emsp;线程可以归属于某个线程组,线程组中有线程也可以有线程组,线程组可以批量管理线程/线程组对象,有效地对线程/线程组对象进行组织。<br>

- **线程组的基本用法**
  - 一级关联(没有子孙对象)
  ```
      ThreadGroup group = new ThreadGroup("高洪岩的线程组");
      Thread aThread = new Thread(group, aRunnable);
      aThread.start();
      System.out.println("活动的线程数为：" + group.activeCount());
      System.out.println("线程组的名称为：" + group.getName());
  ```
  - 多级关联(线程组中存在子线程组)
  ```
      ThreadGroup mainGroup = Thread.currentThread().getThreadGroup();
      ThreadGroup group = new ThreadGroup(mainGroup, "A");
      Thread newThread = new Thread(group, runnable);
  ```
  - 线程组自动归属特性
    - ThreadGroup group=new ThreadGroup("新的组");
  - 不指定所属的线程组自动归属当前线程组中
  - 获取根线程组
    - Thread.currentThread().getThreadGroup().getParent().getName()
  - 线程组中加线程组
    - Thread.currentThread().getThreadGroup().activeCount() :获取线程组激活的线程
    - Thread.currentThread().getThreadGroup().activeGroupCount()) :获取线程组中激活的线程组
  - 组内的线程批量停止(参见 groupInnerStop)
    - group.interrupt();
  - 递归与非递归取得组内对象
    - Thread.currentThread().getThreadGroup().enumerate(listGroup1, true)
  - 递归获取 listGroup1 中的线程组
    - Thread.currentThread().getThreadGroup().enumerate(listGroup1, false)
  - 非递归获取 listGroup1 中的一级线程组

> [!WARNING]
> Java 中不建议使用线程组，原因主要有以下两点：<br> > &emsp;&emsp;1.ThreadGroup 中的类似`allowThreadSuspension()`、`resume()`、`suspend()`等许多不推荐使用的方法都已经被弃用；<br> > &emsp;&emsp;2.`activeCount()`、`enumerate()`方法都是非线程安全的；<br>
> 因此，建议使用线程池来进行线程的管理和维护。

### 1.1.4. 线程中的锁是什么？

&emsp;&emsp;在多个线程对同一资源进行访问时，为了保证数据安全，这时候就需要对资源进行访问控制，保证资源的安全访问，而`锁`的作用就是要实现线程对资源的访问控制，保证同一时间只能有一个线程去访问某个资源。<br>

- **锁的本质**<br>
  &emsp;&emsp;从程序的角度看，锁的本质其实就是一个对象，这个对象需要完成一下几个任务。
  - 锁象内部需要有一个标志位(state 变量),记录着当前锁对象是否被某个线程占用;
  - 如果线程占用当前对象锁，记录线程编号 ID，知道具体是哪一个线程占用当前锁;
  - 线程列表,需要记录其它所有阻塞的、等待拿这个锁的线程列表，在当前线程释放锁之后，从列表中取出一个线程进行唤醒。

### 1.1.5. 公平锁和非公平锁

- **公平锁**：表示线程获取锁的顺序是按照线程加锁的顺序来分配的 即: 先来先得 `FIFO` 先入先出顺序。

- **非公平锁** :一种获取锁的抢占机制,是非顺序获得锁的,先来的不一定先获得锁,可能会造成某些线程获取不到锁（线程饥饿）。

### 1.1.6. 乐观锁和悲观锁

- **乐观锁**<br>
&emsp;&emsp;总是假设最好的情况，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号机制和CAS算法实现。乐观锁适用于多读的应用类型，这样可以提高吞吐量，像数据库提供的类似于write_condition机制，其实都是提供的乐观锁。在Java中java.util.concurrent.atomic包下面的原子变量类就是使用了乐观锁的一种实现方式CAS实现的。

- **悲观锁**<br>
&emsp;&emsp;总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会阻塞直到它拿到锁（共享资源每次只给一个线程使用，其它线程阻塞，用完后再把资源转让给其它线程）。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。Java中synchronized和ReentrantLock等独占锁就是悲观锁思想的实现。

## 1.2. 实践应用

### 1.2.1. 线程创建的几种方式

&emsp;&emsp;在 Java 中创建一个线程可以继承`Thread`类或实现`Runnable`接口，此外还可以通过实现`Callable`接口和`FutureTask`创建一个有返回值的线程。

- **1. 继承 Thread 类**

  ```java
  static class ThreadA extends Thread {
      @Override
      public void run(){  // 此方法必须要重写
          System.out.println(Thread.currentThread().getName());
      }
  }
  ```

- **2. 实现 Runnable 接口**

  ```java
  static class ThreadB implements Runnable {
      @Override
      public void run(){
          System.out.println(Thread.currentThread().getName());
      }
  }
  ```

- **3. 实现 Callable 接口**

  ```java
  // FutureTask<String> futureTask = new FutureTask<>(() -> Thread.currentThread().getName());

  static class ThreadC implements Callable<String> {
      @Override
      public String call() throws Exception{
          return Thread.currentThread().getName();
      }
  }
  ```

### 1.2.2. 未捕获异常处理器

&emsp;&emsp;`Thread`类有一个内部接口`UncaughtExceptionHandler`用于处理线程执行过程中的未捕获异常。<br>
&emsp;&emsp;JVM 在线程执行过程中出现未捕获的异常，会找到线程设置的异常处理器，调用`UncaughtExceptionHandler#uncaughtException`方法进行处理。

- **使用方式**

  - 异常处理器：实现`Thread.UncaughtExceptionHandler`接口重写`uncaughtException(Thread, Throwable)`方法；
  - 通过线程的实例方法`Thread#setUncaughtExceptionHandler(UncaughtExceptionHandler)`设置指定线程的`未捕获异常处理器`;
  - 通过线程的类方法`Thread#setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler)`统一设置线程全局的`未捕获异常处理器`。

- **实例参考**

  - 指定线程-异常处理器
    ```java
    MyThread t1 = new MyThread();
    t1.setName("线程t1");
    t1.setUncaughtExceptionHandler(new UncaughtExceptionHandler() {
        @Override
        public void uncaughtException(Thread t, Throwable e) {
            System.out.println("线程:" + t.getName() + " 出现了异常：");
            e.printStackTrace();
        }
    });
    ```
  - 指定线程类-全局异常处理器

    ```java
    MyThread.setDefaultUncaughtExceptionHandler(new UncaughtExceptionHandler() {
        @Override
        public void uncaughtException(Thread t, Throwable e) {
            System.out.println("线程:" + t.getName() + " 出现了异常：");
            e.printStackTrace();

        }
    });
    ```

  - 线程组统一异常处理器：线程组本身实现了`UncaughtExceptionHandler`接口重写了`uncaughtException`方法。
    ```java
    public class MyThreadGroup extends ThreadGroup {
        public MyThreadGroup(String name) {
            super(name);
        }
        @Override
        public void uncaughtException(Thread t, Throwable e) {
            super.uncaughtException(t, e);
            // 用于终止当前线程组中的线程
            this.suspend();
        }
    }
    ```

### 1.2.3. 如何优雅地终止线程

&emsp;&emsp;停止一个线程是让当前正在运行的线程在处理完任务前停止操作。

- **自然终止**：线程执行结束正常退出当前线程。
- **停止标志**：通过实例变量来标志线程是否退出。
- **interrupt()函数与中断异常**
  - 通过调用线程`interrupt()`方法通知线程中断，前提是线程中调用了会抛出`InterruptedException`异常的函数才会生效；
  - `sleep()`、`wait()`、`join()`函数在线程调用了`interrupt()`方法后会抛出`InterruptedException`异常。
- **stop()与 destory()方法**
  - 这两个方法的使用可以使线程中断,但是 Java 中已经废弃的过时方法,不推荐使用,因为他们的调用是迫使线程强制终止,导致持有的资源（文件描述符、网络连接等）占用不能释放。

### 1.2.4. 关键字 synchronized

&emsp;&emsp;`synchronized`能修饰方法或代码块，表示修饰的方法或代码块是同步的，持有指定的对象锁，并且锁是可重入的（当线程获取一个对象锁后，再次请求此对象锁是可以再次获得的）。。

- **持有锁对象**

  - 对于非静态成员函数使用`synchronized`修饰，锁对象为当前实例对象。
  - 对于静态成员函数使用`synchronized`修饰，锁对象是当前实例对象属类的类对象。

- **实现原理**<br>
  &emsp;&emsp;`synchronized`的实现主要是利用 Java 中的对象头的`Mark Word`数据块，在 64 位机器上 `Mark Word`数据块占用 8 个字节，其中维护了锁标志位和线程 ID。<br>

### 1.2.5. 关键字 volatile

&emsp;&emsp;`volatile`关键字修饰的实例变量可保证对象的值总是从公共内存中获取，从而保证了数据在线程间的可见性，但是并不能保证原子性。

- **volatile 关键字的作用**

  - 64 位写入的原子性（Half Write）
  - 内存可见性：保证数据始终从`主内存`中读取；
  - 禁止指令重排序

- **什么是内存可见性？**<br>
  &emsp;&emsp;`内存可见性`问题涉及了 Java 内存模型 和 CPU 缓存架构问题,主要是在 Java 内存模型中, 将内存分为了线程共享的`主内存`和线程私有的`工作内存`。<br>
  &emsp;&emsp;`内存可见性`则是保证了数据始终从`主内存`中获取，保证了多个线程并发访问数据的一致性。

### 1.2.6. Lock
