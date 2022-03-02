# Spring 整合 Quartz
## 配置
* 配置文件：
    ```xml
    <!-- 任务配置 Spring-4.1.0版本后不再提供JobDetailBean类 -->
    <bean id="myJob" class="org.springframework.scheduling.quartz.JobDetailFactoryBean">

        <property name="jobClass" value="com.spdbccc.ccws.batch.job.MyJob"/>
        <property name="jobDataAsMap">
            <map>
                <entry key="jobService" value-ref="jobServiceImpl"/>
            </map>
        </property>
    </bean>

    <!-- 任务调度触发器（触发规则）Spring-4.1.0版本后不再提供CronTriggerBean类-->
    <bean id="jobTrigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
        <!-- 每隔10秒钟-->
        <property name="cronExpression" value="0/10 * * * * ? *"/>
        <property name="jobDetail" ref="myJob"/>
    </bean>

    <!-- 任务调度器 -->
    <bean id="jobSchedule" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <ref bean="jobTrigger"/>
            </list>
        </property>
    </bean>
    ```
* 任务执行类：
    ```java
    @Component
    public class MyJob extends QuartzJobBean {
    
        JobService jobService;
        /**
         * quartz中不能直接使用@Autowire和@Resource进行注入。
         * 1. 使用Spring容器注入
         * <pre>
         *      this.jobService = SpringContextUtil.getBean(JobService.class);
         * </pre>
         * 2. 任务配置中注入
         * <pre>
         *     <property name="jobDataAsMap">
         *         <map>
         *            <entry key="jobService" value-ref="jobServiceImpl"/>
         *          </map>
         *     </property>
         * </pre>
         * @param jobService 任务服务类
         */
        public void setJobService(JobService jobService) {
            this.jobService = jobService;
        }
    
        @Override
        protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
            System.out.println("任务执行了");
            jobService.printJobDetails();
        }
    }
    ```### Spring整合Quartz
* 配置文件：
    ```xml
    <!-- 任务配置 Spring-4.1.0版本后不再提供JobDetailBean类 -->
    <bean id="myJob" class="org.springframework.scheduling.quartz.JobDetailFactoryBean">

        <property name="jobClass" value="com.spdbccc.ccws.batch.job.MyJob"/>
        <property name="jobDataAsMap">
            <map>
                <entry key="jobService" value-ref="jobServiceImpl"/>
            </map>
        </property>
    </bean>

    <!-- 任务调度触发器（触发规则）Spring-4.1.0版本后不再提供CronTriggerBean类-->
    <bean id="jobTrigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
        <!-- 每隔10秒钟-->
        <property name="cronExpression" value="0/10 * * * * ? *"/>
        <property name="jobDetail" ref="myJob"/>
    </bean>

    <!-- 任务调度器 -->
    <bean id="jobSchedule" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <ref bean="jobTrigger"/>
            </list>
        </property>
    </bean>
    ```
* 任务执行类：
    ```java
    @Component
    public class MyJob extends QuartzJobBean {
    
        JobService jobService;
        /**
         * quartz中不能直接使用@Autowire和@Resource进行注入。
         * 1. 使用Spring容器注入
         * <pre>
         *      this.jobService = SpringContextUtil.getBean(JobService.class);
         * </pre>
         * 2. 任务配置中注入
         * <pre>
         *     <property name="jobDataAsMap">
         *         <map>
         *            <entry key="jobService" value-ref="jobServiceImpl"/>
         *          </map>
         *     </property>
         * </pre>
         * @param jobService 任务服务类
         */
        public void setJobService(JobService jobService) {
            this.jobService = jobService;
        }
    
        @Override
        protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
            System.out.println("任务执行了");
            jobService.printJobDetails();
        }
    }
    ```