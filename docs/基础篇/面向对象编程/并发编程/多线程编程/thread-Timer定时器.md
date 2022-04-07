# 定时任务/计划任务
- JDK库中Time类主要负责计划任务的功能,在指定的时间开始执行某一个任务
- Timer类主要作用是设置计划任务,但封装的类却是TimerTask类
	- 执行计划任务的代码放在TimerTask的子类中,因为TimerTask是一个抽象类
## Timer的方法
- 方法schedule(TimerTask task,Date time)
	- 在指定的日期执行一次任务
	- 若计划时间早于当前时间,则会提前运行,即:在程序启动时运行
	- private static Timer timer = new Timer() :非守护线程,程序不会结束
	- private static Timer timer = new Timer(true) :守护线程,程序运行结束,不会继续执行
	- TimerTask是以队列的方式一个一个顺序执行的,当前一个任务中有延迟或较长时间的处理,后面的可能会存在延迟的发生
- 方法schedule(TimerTask task, Date firstTime, long period)
	- 在指定的开始时间后按指定的时间间隔周期性的循环运行任务,间隔时间单位毫秒
	- TimerTask是以队列的方式一个一个顺序执行的,当前一个任务中有延迟或较长时间的处理,后面的可能会存在延迟的发生
- 方法schedule(TimerTask task, long delay)
	- 以当前的时间为参考时间,延迟指定的毫秒数执行一次TimerTask任务(只执行一次)
- 方法timer.schedule(task, 3000,5000)
	- 以当前时间为参考,延迟指定时间执行一次,再间隔指定毫秒循环执行任务
- cancel() :将任务队列中的任务全部清除
	- 有时候抢不到queue锁,TimeTask类中的任务继续执行
### schedule(task1, dateRef1, 2000) 区分timer.scheduleAtFixedRate(task1, dateRef1, 1000)
- 区别只在于任务没有延迟的情况
	- 没有延迟 :schedule是以上一次任务开始的时间+delay执行下一次任务
	- 没有延迟 :scheduleAtFixedRate是以上一次任务结束的时间+delay执行下一次任务
## TimerTask的方法
- cancel() :将自身从任务队列中清除


