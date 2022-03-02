# Quartz 任务调度框架

&emsp;&emsp;Quartz 是一个特性丰富的开源的异步任务调度开发库，支持简单调度和定时调用，同时支持多任务持久化处理，可以轻松地集成到你的 Java 应用程序中。

## 1. 核心组件

### 1.1. 作业-Job

&emsp;&emsp;`Job`是具体需要执行的作业，是我们具体执行任务的功能实现。

- 代码示例：实现`Job`接口重写`execute(JobExecutionContext context)`方法

  ```java
  public abstract class BaseQuartzJobDetail implements Job {
      @Override
      public void execute(JobExecutionContext context) throws JobExecutionException {
          executeJob(context);
      }
      /**
      * 作业处理方法
      * @param context 上下文
      */
      protected abstract void executeJob(JobExecutionContext context);
  }
  ```

## 2. 触发器-Trigger
### 2.1. 调度程序-Schedule

## 3. 处理机制
### 3.1. misfire（激活失败）处理机制
* 概述：<br>
&emsp;&emsp;在`Quartz`任务调度中，当一个持久的触发器因为调度器被关闭或者线程池中没有可用的线程等而错过了激活时间时，就会发生激活失败(misfire)。<br>
&emsp;&emsp;在`quartz.properties`配置文件中可以通过指定的`org.quartz.jobStore.misfireThreshold`属性指定调度程序设置触发器超时的"临界值"，默认值为`60000`在临界值内调度任务正常执行,超过临界值将触发misfire机制。

* 激活失败处理：
    * `misfireInstruction`：激活失败指令，用于指定触发`misfire`时调度程序的处理方式，默认值为0-`Trigger.MISFIRE_INSTRUCTION_SMART_POLICY`。
    * `SimpleTrigger`处理策略：
        * 激活失败指令：
            * `Trigger.MISFIRE_INSTRUCTION_SMART_POLICY(0)`：默认处理策略-`聪明策略`，根据触发器实例的状态和配置来决定其行为。
                * 当`repeatCount=0`时，处理策略为`Trigger.MISFIRE_INSTRUCTION_FIRE_NOW`；
                * 当`repeatCount=SimpleTrigger.REPEAT_INDEFINITELY(-1)`时，处理策略为`Trigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT`；
                * 当`repeatCount>0`时，处理策略为`Trigger.MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_EXISTING_REPEAT_COUNT`；
            * `Trigger.MISFIRE_INSTRUCTION_IGNORE_MISFIRE_POLICY(-1)`：忽略所有的超时状态，按照触发器的策略执行。
        * 处理策略：
            * `SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW(1)`：立刻执行。对于不会重复执行的任务，这是默认的处理策略。
            * `SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_EXISTING_REPEAT_COUNT(2)`：WITH_EXISTING_COUNT指，根据已设置的repeat count进行执行。也就是说错过的执行机会不作废，保证实际执行次数满足设置。因此本策略的含义是，在下一个激活点执行，并重复到指定的次数。
            * `SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_REMAINING_REPEAT_COUNT(3)`：立即执行，且超时期内错过的执行机会作废。
            * `SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT(4)`：NEXT指以现在为基准，以repeat interval为周期，延时到下一个激活点执行。WITH_REMAINING_COUNT指超时期内错过的执行机会作废。因此该策略的含义是，在下一个激活点执行，且超时期内错过的执行机会作废。
            * `SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_EXISTING_COUNT(5)`：WITH_EXISTING_COUNT指，根据已设置的repeat count进行执行。也就是说错过的执行机会不作废，保证实际执行次数满足设置。因此本策略的含义是，在下一个激活点执行，并重复到指定的次数。
    * `CronTrigger`处理策略：
        * 激活失败指令：
            * `Trigger.MISFIRE_INSTRUCTION_SMART_POLICY(0)`：默认处理策略-`聪明策略`，处理策略为`CronTrigger.MISFIRE_INSTRUCTION_FIRE_ONCE_NOW`；
        * 处理策略：
            * `CronTrigger.MISFIRE_INSTRUCTION_FIRE_ONCE_NOW(1)`：立刻执行一次，然后就按照正常的计划执行。
            * `CronTrigger.MISFIRE_INSTRUCTION_DO_NOTHING(2)`：目前不执行，然后就按照正常的计划执行。这意味着如果下次执行时间超过了end time，实际上就没有执行机会了。
