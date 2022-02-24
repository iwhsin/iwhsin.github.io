# Spring 容器创建过程

## Spring 容器创建

&emsp;&emsp;Spring 的上下文容器创建主要分为两步:BeanFactory 创建和 Bean 的实例化。

1. 上下文加载准备
   - initPropertySources() ：初始化属性资源（预留接口）
   - getEnvironment().validateRequiredProperties() 校验必要属性
1. 创建 BeanFactory

   - ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

   init-method：指定某个方法在 Bean 实例化完成，依赖关系设置结束后执行。
   destroy-method：指定某个方法在 Bean 销毁之前被执行。
   InitializingBean 接口：指定在 Bean 实例化完成，依赖关系设置结束后执行（在 init-method 之前执行）。•　 DiposableBean 接口：指定某个方法在 Bean 销毁之前被执行（在 destory-method 之前执行）。•　 ApplicationContextAware 接口：在实例化 Bean 时，为 Bean 注入 ApplicationContext。•　 BeanNameAware 接口：在实例化 Bean 时，为 Bean 注入 beanName。

   执行构造器。（2）执行 BeanNameAware 接口的 setBeanName(String name)方法。（3）执行 ApplicationContextAware 接口的 setApplicationContext(ApplicationContextapplication Context)方法。（4）执行 InitializingBean 接口的 afterPropertiesSet()方法。（5）执行 init-method 指定的方法。（6）执行运行时 Bean 中的业务方法。（7）执行 DisposableBean 接口的 destroy()方法。（8）执行 destroy-method 指定的方法。

   容器级生命周期接口方法有 InstantiationAwareBeanPostProcessor 和 BeanPostProcessor 这两个接口，一般也将其实现类称为后处理器。容器级生命周期接口的实现独立于 Spring IoC 容器中的 Bean，其是以容器扩展的形式注册到 Spring 中的。无论 Spring IoC 管理任何的 Bean，这些后处理器都会发生作用

   | Spring Bean 生命周期          | 相关接口及方法                                                   |
   | :---------------------------- | :--------------------------------------------------------------- |
   | Bean 自身方法                 | Bean 本身业务方法<br>配置文件中的`init-method`和`destroy-method` |
   | Bean 生命周期接口方法         | Bean 本身业务方法<br>配置文件中的`init-method`和`destroy-method` |
   | Bean 容器级别生命周期接口方法 | Bean 本身业务方法<br>配置文件中的`init-method`和`destroy-method` |
   | Bean 工厂级别                 | Bean 本身业务方法<br>配置文件中的`init-method`和`destroy-method` |
