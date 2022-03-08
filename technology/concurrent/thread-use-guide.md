# 线程使用

## 线程阻塞的几种情况
- 线程调用sleep方法,主动放弃占用的处理器资源
- 线程调用阻塞式IO方法,方法返回前,该线程被阻塞
- 线程试图获取一个同步监视器,该监视器正被其他线程持有
- 线程等待某个唤醒通知
- 线程调用了suspend将该线程挂起,容易导致死锁,尽量避免使用
- run方法运行结束进入

## 线程间的通信

### 等待/通知机制 wait/notify
- wait() :使当前执行代码的线程进入等待,是Object的方法,将当前线程置入"预执行队列中",并在wait()方法所在代码行停止,直到接收到唤醒或中断为止
	- 执行wait()方法后当前线程会释放锁
- notify()方法需要在同步方法或同步代码块中调用,即:调用前需要获取当前对象锁,通知那些等待对象锁的线程参与竞争获取锁,多个线程等待,由线程规划器随机挑选出一个wait的线程进行唤醒
	- 执行notify()方法后,**当前线程不会马上释放锁**,需要等notify线程方法中的程序执行完 ,即: 退出synchronized代码块后
	- 随机唤醒等待队列中等待同一共享资源的一个线程
- wait使线程停止运行,notify使线程继续运行
- notifyAll :唤醒所有等待队列中等待同一资源的全部线程从等待中退出,进入可运行状态,优先级高的先执行,也可能随机执行



## interrupt方法遇到wait()方法
- 线程处于wait状态的时候调用interrupt方法会抛出interruptedException
- 执行完同步代码块就会释放对象锁
- 在执行同步代码块的过程中遇到异常线程终止,也会释放锁
- 线程执行过程中调用了wait()方法也会释放对象锁线程自动进入线程等待队列中等待唤醒

## wait(long) :等待long时间,超时自动唤醒


## 生产者/消费者模式
- 等待/通知模式就是经典的生产者/消费者模式
### 一生产与一消费者 :操作值
### 生产者/消费者 :操作值:假死
- 多个生产者/消费者 可能存在生产者唤醒生产者或消费者唤醒消费者,最后都处于waiting状态
### 多生产与多消费 :操作值
- 使用notifyAll替换notify即可解决出现假死的状态
### 一生产/一消费 :操作栈
- 操作list类似一生产与一消费者 :操作值
### 一生产/多消费 :操作栈 :解决wait条件改变与假死
- if改成while即可避免IndexOutOfBoundsException索引越界异常
- while又会造成死锁状态(改成notifyAll即可)
### 多生产-一消费 :操作栈
### 多生产者-多消费者 :操作栈

## 通过管道进行线程间通信 :字节流
- 管道流(pipeStream) :用于不同线程间的数据传输

## 通过管道进行线程间通信 :字符流
outputstream.connect(inputstream)

## join方法的使用
- 等待线程对象销毁
```		
 thread.start
 thread.join
 // 后续的代码会等待线程结束后才会执行
 System.out.println("over");
```
- join方法threadB.interrupt(); 会报中断异常
- join(long) :等待指定时间
### join(long)对比sleep(long)
- join(long)内部是使用wait实现的,是可以释放锁的,sleep(long)是不释放锁的
- join(long)先抢占锁立马释放

## ThreadLocal
- 变量共享 :使每个线程绑定自己的共享变量,类似存放全局变量的盒子 ->线程变量的隔离性
- 第一次get返回null可以使用继承ThreadLocal类重写initialValue方法


## InheritableThreadLocal的使用
- InheritableThreadLocal可以在子线程中取得从父线程中继承来的值
- 继承父线程的值同时能进行修改 重写 childValue(Object parentValue)方法