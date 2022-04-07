# Spring 专题 :id=spring-framework

## 1. 概念基础

### 1.1. Spring 是什么? :id=spring

- 概述

?> Spring 是个 java **企业级应用的开源开发框架**，是轻量、松耦合的，旨在降低应用程序开发的复杂度。
Spring 框架目标是简化 Java 企业级应用开发，并通过 **POJO 为基础的编程模型** 促进良好的编程习惯。
具有 **分层体系结构**，允许用户选择组件，同时为其它框架的继承提供了很大的便利，可以很容易地集成其它框架（框架中的框架）。

- 作用
  - 管理应用程序中的 Bean 对象，负责对象的创建和维护对象之间的关系。
  - 分层架构，允许用户自由选择需要的组件，很方便和其它框架技术集成，同时也很容易进行集成测试。
  - 免费开源，实现了 IOC 和 AOP，简化了企业级应用开发,减少侵入,降低组件耦合,方便日后维护和升级。

### 1.2. Spring 有哪些特性？ :id=feature-spring

- **轻量模块化：**Spring 是轻量的，基本的版本大约 2MB，允许我们自行选择需要的组件
- **控制反转：**Spring 通过控制反转实现了松散耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们
- **面向切面的编程(AOP)：**Spring 支持面向切面的编程，并且把应用业务逻辑和系统服务分开
- **容器：**Spring 包含并管理应用中对象的生命周期和配置
- **MVC 框架：**Spring 的 WEB 框架是个精心设计的框架，是 Web 框架的一个很好的替代品
- **事务管理：**Spring 提供一个持续的事务管理接口，可以扩展到上至本地事务下至全局事务（JTA）
- **异常处理：**Spring 提供方便的 API 把具体技术相关的异常（比如由 JDBC，Hibernate or JDO 抛出的）转化为一致的 unchecked 异常。

### 1.3. Spring 有哪些组成模块？ :id=module-spring

?> Spring 框架包含组织为约 20 个模块的功能。这些模块分为核心容器、数据访问/集成、Web、AOP（面向切面编程）、监控、消息传递和测试。

![Spring 模块概观图](/assets/images/framework-spring/20220310234534.png ':class=center')

- **核心容器**

  - **spring-beans**：所有应用都要用到，它包含访问配置文件，创建和管理 Bean 以及进行反转共控制和依赖注入操作时所需的类
  - **spring-core**：包含 Spring 框架基本的核心工具类，Spring 其它组件要都要使用到这个包里的 类，是其它组件的基本核心。
  - **spring-context**：为 Spring 核心提供了大量扩展。可以找到使用 Spring ApplicationContext 特性时所需的全部类，JDNI 所需的全部类，UI 方面的用来与模板（Templating）引擎如 Velocity、 FreeMarker、 JasperReports 集成的类， 以及校验 Validation 方面的相关类。 事件驱动、注解驱动、模块驱动等
  - **spring-context-support**：Spring context 的扩展支持，用于 MVC 方面。
  - **spring-expression**：包含 Spring 表达式语言相关的类，应用使用到 SpEL 时需要添加这个 jar 包。

- **数据访问/集成**：提供了与数据库交互的支持

  - JDBC(Java DataBase Connectivity)
  - ORM(Object Relation Mapping)
  - OXM(Object XML Mapper)
  - JMS(Java Messaging Service)
  - Transaction

- **Web 技术**：提供了创建 Web 应用程序的支持。

  - Web
  - Web-Servlet
  - Web-Socket
  - Web-Portlet

- **AOP 面向切面的编程**

?> Spring AOP 处理，如动态代理，AOP 字节码提升，提供了面向切面切面编程的支持。

- **Aspects**：为 Aspect 的集成提供了支持。

- **Instrumentation**：为类检测和类加载实现提供了支持。

- **Test-集成测试**：为使用 Junit 和 TestNG 进行测试提供支持。

- **Messaging**：为 STOMP 提供支持，同时支持注解编程模型，该模型用于从 WebSocket 客户端路由和处理 STOMP 消息。

### 1.4. Spring 中常用注解 :id=spring-annotation

- 模式注解：@Component、@Repository、@Service、@Controller

- 依赖注入：@Resource、@Autowire、

- 配置相关注解

?> @Configuration、@Bean、@ComponentScan、@ComponentScans、@Conditional、@ConfigurationConditional
@Import、@ImportResource、@Lazy、@Primary、@Profile、@PropertySource、@PropertySources、@Scope

- 其它注解：@DependsOn、@Description、@EnableAspectJAutoProxy、@EnableLoadTimeWeaving、@Role

### 1.5. @Bean VS @Component

### 1.6. @Bean 和 @Component 注解下同一个类型会如何？容器中会创建几个 Bean？

### 1.7. @Resource VS @Autowired VS @Inject

### 1.8. @Required 注解

### 1.9. @Qualifier 注解

### 1.10. Spring 5.0 新特性

## 2. 配置文件

### 2.1. IOC 容器加载的配置信息来源

### 2.2. FileSystemResource 和 ClassPathResource 有何区别？

?> 在 FileSystemResource 中需要给出 spring-config.xml 文件在你项目中的相对路径或者绝对路径。在 ClassPathResource 中 spring 会在 ClassPath 中自动搜寻配置文件，所以要把 ClassPathResource  文件放在 ClassPath 下。
如果将 spring-config.xml 保存在了 src 文件夹下的话，只需给出配置文件的名称即可，因为 src 文件夹是默认。
简而言之，ClassPathResource 在环境变量中读取配置文件，FileSystemResource 在配置文件中读取配置文件。

### 2.3. 配置文件加载解析过程

- prepareRefresh()：刷新前准备
- obtainFreshBeanFactory()：BeanFactory 初始化解析 BeanDefinition 配置元信息
- prepareBeanFactory(beanFactory)：BeanFactory 准备： 内建 Bean
- postProcessBeanFactory(beanFactory)：预留扩展：BeanFactory 前置处理程序
- invokeBeanFactoryPostProcessors(beanFactory)：处理 BeanFactory 前置处理程序
- registerBeanPostProcessors(beanFactory)：注册拦截 Bean 实例化前置处理程序 BeanPostProcessor
- initMessageSource()：初始化上下文消息来源 MessageResource
- initApplicationEventMulticaster()：初始化上下文事件广播监听
- onRefresh()：预留扩展，用于实例化一些其它 Bean 如何 Servlet Reactor
- registerListeners()：注册监听程序 Bean
- finishBeanFactoryInitialization(beanFactory)：从 BeanDefinition 中进行初始化 Bean 满足非抽象类&&非延迟初始&&单例的才会进行立即实例化
- finishRefresh()：事件发布
- clearResourceCaches()：清理资源缓存

### 2.4. 可以不使用配置文件吗？

通过 `AnnotationConfigApplicationContext` 创建基于注解扫描的容器。

## 3. IOC 和 DI

### 3.1. 什么是 IOC（控制反转）？ :id=spring-ioc

?> IOC(Inversion Of Control)，直面意思是控制反转，典型的好莱坞原则（你别找我们，我们会找你）。
在 Spring 中的应用就是将对象（Bean）的创建维护交由容器来管理，在需要的地方通过依赖注入，不需要自己显示的声明对象。
Spring 使用容器进行对象管理，简单的架构设计为`XML配置文件解析`、`根据配置文件配置信息通过反射实例化对象`。

### 3.2. 使用 IOC 有哪些好处？

### 3.3. IOC 的实现方式是什么？

- **实现机制**
  IOC 的实现机制主要是工厂模式加反射机制。

- **实现方式**
  - 依赖注入（Spring 中使用的便是依赖注入的形式）
  - 依赖查找

### 3.4. Spring 中 IOC 容器?

?> Spring IOC 容器是 Spring 框架的核心，Spring 通过配置文件描述 Bean 之间的关系，IOC 容器通过反射功能创建对象，将它们装配在一起，配置它们并管理它们的完整生命周期。
Spring 容器使用依赖注入来管理组成应用程序的组件。容器通过读取提供的配置元数据来接收对象进行实例化，配置和组装的指令。
同时提供了 Bean 实例缓存、生命周期管理、 Bean 实例代理、事件发布、资源装载等高级服务

### 3.5. Spring IOC 容器的配置来源有哪些?

- 基于 XML 文件
- 基于 Java 注解
- 基于 Java API

### 3.6. 什么是 DI（依赖注入）

在依赖注入中，不需要人为的进行对象的创建，只需要描述如何创建他们（通过在配置文件描述对象的创建及对象间的依赖关系），由 IOC 容器负责对象的装配。

### 3.7. Spring 中依赖注入的几种方式

- 接口注入
- 静态工厂注入
- 实例工厂注入

### 3.8. 构造器注入 VS Setter 注入

| 构造函数注入               | Setter 注入              |
| :------------------------- | :----------------------- |
| 整体注入,不能部分注入      | 允许部分元素注入         |
| 不会覆盖 Setter 属性       | 会覆盖 Setter 属性       |
| 任意修改会创建一个新的实例 | 任意修改不会创建新的实例 |
| 适用于设置很多属性         | 适用于设置少量属性       |

### 3.9. Spring 可以注入 null 和空字符串吗？

## 4. Spring Context 上下文

### 4.1. BeanFactory 基础设施

?> BeanFactory 是面向 Spring 底层的上下文容器。

- BeanDefinitionRegistry

- BeanFactory

- ListableBeanFactory

- HierarchicalBeanFactory

- ConfigurableBeanFactory

- AutowireCapableBeanFactory

- SingletonBeanRegistry

### 4.2. ApplicationContext 是什么

### 4.3. ApplicationContext 有哪几种具体实现?

- ClassPathXmlApplicationContext：从 classpath 的 XML 配置文件中读取上下文，并生成上下文定义。应用程序上下文从程序环境变量中取得。
- FileSystemXmlApplicationContext ：由文件系统中的 XML 配置文件读取上下文。
- XmlWebApplicationContext：由 Web 应用的 XML 文件读取上下文

### 4.4. BeanFactory VS ApplicationContext

?> BeanFactory 是面向 Spring 底层的上下文容器，而 ApplicationContext 是面向开发者的上下文容器。

- 区别

1. 两者都是作为 Spring 的容器,ApplicationContext 继承自 BeanFactory;
2. ApplicationContext 扩展了`MessageResource`接口,支持国际化;
3. ApplicationContext 扩展了`ApplicationEventPublisher`接口,具有强大的事件机制(Event);
4. ApplicationContext 扩展了`ResourceLoader`((资源加载器)接口),从而可以自己创建和管理资源对象;
5. ApplicationContext 是 Spring 中的内置对象,可以通过注解进行依赖注入
6. BeanFactroy 采用的是延迟加载形式来注入 Bean 的，即只有在使用到某个 Bean 时(调用 getBean())，才对该 Bean 进行加载实例化，这样，我们就不能发现一些存在的 spring 的配置问题。而 ApplicationContext 则相反，它是在容器启动时，一次性创建了所有的 Bean。这样，在容器启动时，我们就可以发现 Spring 中存在的配置错误;

### 4.5. Spring 中 Aware 接口有什么用

### 4.6. 常用的 Aware 接口

### 4.7. Spring 中 @Enable\* 有什么用

### 4.8. Spring 中 @Enable\* 的实现原理

## 5. AOP

### 5.1. 什么是 AOP

?> AOP(Aspect-Oriented Programming), 即 面向切面编程, 它与 OOP( Object-Oriented Programming, 面向对象编程) 相辅相成, 提供了与 OOP 不同的抽象软件结构的视角. 在 OOP 中, 我们以类(class)作为我们的基本单元, 而 AOP 中的基本单元是 Aspect(切面)。

### 5.2. Aop 的应用场景

- Authentication 权限
- Caching 缓存
- Context passing 内容传递
- Error handling 错误处理
- Lazy loading 懒加载
- Debugging 调试
- logging, tracing, profiling and monitoring 记录跟踪 优化 校准
- Performance optimization 性能优化
- Persistence 持久化
- Resource pooling 资源池
- Synchronization 同步
- Transactions 事务

### 5.3. 什么是切面(Aspect)

?> 类是对物体特征的抽象，切面就是对横切关注点的抽象。
Aspect 由 pointcount 和 advice 组成, 它既包含了横切逻辑的定义, 也包括了连接点的定义. Spring AOP 就是负责实施切面的框架, 它将切面所定义的横切逻辑编织到切面所指定的连接点中.
AOP 的工作重心在于如何将增强编织目标对象的连接点上, 这里包含两个工作:
1、如何通过 pointcut 和 advice 定位到特定的 joinpoint 上
2、如何在 advice 中编写切面代码.

### 5.4. 什么是横切关注点

?> 对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点。

### 5.5. 什么是切点(PointCut)

?> 对连接点进行拦截的定义

### 5.6. 什么是连结点(JoinPoint)

?> 程序运行中的一些时间点, 例如一个方法的执行, 或者是一个异常的处理.在 Spring 中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器。

### 5.7. 什么是通知（Advice）

?> 所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类。
Spring AOP 使用一个 Advice 作为拦截器，在 JoinPoint “周围”维护一系列的拦截器。

### 5.8. 代理对象

?> 代理的目标对象

### 5.9. 什么是织入(weave)

?> 将切面应用到目标对象并导致代理对象创建的过程。

### 5.10. 什么是引入(Intoduction)

?> 在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法或字段。

### 5.11. 有哪些类型的通知（Advice）？

- Before：这些类型的 Advice 在 joinpoint 方法之前执行，并使用@Before 注解标记进行配置。
- After Returning - 这些类型的 Advice 在连接点方法正常执行后执行，并使用@AfterReturning 注解标记进行配置。
- After Throwing - 这些类型的 Advice 仅在 joinpoint 方法通过抛出异常退出并使用 @AfterThrowing 注解标记配置时执行。
- After (finally) - 这些类型的 Advice 在连接点方法之后执行，无论方法退出是正常还是异常返回，并使用 @After 注解标记进行配置。
- Around - 这些类型的 Advice 在连接点之前和之后执行，并使用@Around 注解标记进行配置。

### 5.12. 指出在 spring aop 中 concern 和 cross-cutting concern 的不同之处。

concern 是我们想要在应用程序的特定模块中定义的行为。它可以定义为我们想
要实现的功能。
cross-cutting concern 是一个适用于整个应用的行为，这会影响整个应用程序。
例如，日志记录，安全性和数据传输是应用程序几乎每个模块都需要关注的问题，
因此它们是跨领域的问题。

### 5.13. AOP 有哪些实现方式？

- 静态代理：指使用 AOP 框架提供的命令进行编译，从而在编译阶段就可生成 AOP 代理类，因此也称为编译时增强；

- 编译时编织（特殊编译器实现）：类加载时编织（特殊的类加载器实现）。

- 动态代理：在运行时在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。常用的动态代理有 JDK 动态代理和 CGLib 动态代理。

### 5.14. Aop 中两种动态代理方式

- JDK 动态接口代理
- CGLib 动态代理

### 5.15. Spring AOP VS AspectJ AOP

Spring AOP 基于动态代理方式实现；AspectJ 基于静态代理方式实现。Spring
AOP 仅支持方法级别的 PointCut；提供了完全的 AOP 支持，它还支持属性级
别的 PointCut。

## 6. Bean 对象

### 6.1. Spring 中的 Bean 是什么？

- 是构造用于应用程序的主干对象
- 基于用户提供的配置元信息进行创建
- 由 Spring IOC 容器负责创建、装配、管理

### 6.2. Spring 中的 Bean 的配置方式有哪些？

- 基于 XML 配置文件进行配置
- 基于注解进行配置
  - 在配置文件中使用<context:annotation-config>开始注解驱动
- 基于 JavaConfig(Java API)配置
  - 使用`@Bean`和`@Configuration`来实现

### 6.3. 描述一下 Spring Bean 的生命周期

Spring Bean 的生命周期简单易懂。在一个 bean 实例被初始化时，需要执行一系列的初始化操作以达到可用的状态。同样的，当一个 bean 不在被调用时需要进行相关的析构操作，并从 bean 容器中移除。
Spring bean factory 负责管理在 spring 容器中被创建的 bean 的生命周期。

- 实例化过程
  - 根据配置元信息完成 Bean 的实例化；
  - 通过依赖注入注入相应的属性；
  - 如果 bean 实现 BeanNameAware 接口，则工厂通过传递 bean 的 ID 来调用 setBeanName()
  - BeanClassLoaderAware
  - 如果 bean 实现 BeanFactoryAware 接口，工厂通过传递自身的实例来调用 setBeanFactory()
  - 调用实现 BeanPostProcessor 接口 bean 的 postProcessBeforeInitialization 方法
  - 实现 InitializingBean 接口 bean 的 afterPropertiesSet 方法
  - bean 指定的 init-method 方法。
  - 实现 BeanPostProcessor 接口 bean 的 postProcessAfterInitialization 方法 (@PostConstruct @PreDestory)
  - 如果 bean 实现 DisposableBean 接口，当 spring 容器关闭时，会调用 destory()
  - 如果为 bean 指定了 destroy 方法（ <bean> 的 destroy-method 属性），那么将调用它。

### 6.4. Spring Bean 注入的几种方式

- Setter 注入
- 构造器注入
- 静态工厂注入
- 实例工厂注入

### 6.5. Spring Bean 的几种作用域

- **singleton**：默认是使用单例作用域，每个 IOC 容器仅有一个单例
- **protopyte**：原型模式，每次请求都会创建一个新的实例
- **request**：每次`Http`请求都会产生一个新的实例，并且该 Bean 仅在当前 Http 请求中有效
- **session**：每次`Http`请求都会产生一个新的实例，并且该 Bean 仅在当前 Http 请求会话中有效
- **global-session**：portlet web 中有全局 Session 的概念，类似 **session**作用域

### 6.6. Spring Bean 怎么设置为默认 Bean？

### 6.7. Spring 怎么避免相同类型的 Bean 注入异常？

### 6.8. 什么是 Spring 的内置 Bean

在 Spring 框架中，无论何时 bean 被使用时，当仅被调用了一个属性。一个明智的做法是将这个 bean 声明为内部 bean。内部 bean 可以用 setter 注入“属性”和构造方法注入“构造参数”的方式来实现。

```xml
<bean name="myTestBean" class="xin.icoder.study.spring.MyBean">
    <property name="innerClass">
        <!-- Inner Bean-->
        <bean class="xin.icoder.study.spring.InnerClass">
            <property name="name" value="111" />
        </bean>
    </property>
</bean>
```

### 6.9. 怎么将一个 List 集合注入到 Bean 中

### 6.10. Spring 框架中的单例 Beans 是线程安全的么？

Spring 框架并没有对单例 bean 进行任何多线程的封装处理。关于单例 bean 的线程安全和并发问题需要开发者自行去搞定。但实际上，大部分的 Spring bean 并没有可变的状态(比如 Serview 类和 DAO 类)，所以在某种程度上说 Spring 的单例 bean 是线程安全的。如果你的 bean 有多种状态的话（比如 View Model 对象），就需要自行保证线程安全。
最浅显的解决办法就是将多态 bean 的作用域由“singleton”变更为“prototype”。

### 6.11. 什么是 spring 装配

当 bean 在 Spring 容器中组合在一起时，它被称为装配或 bean 装配。Spring 容器需要知道需要什么 bean 以及容器应该如何使用依赖注入来将 bean 绑定在一起，同时装配 bean。

### 6.12. Spring 中 自动装配有哪些方式？

- no:没有自动装配,使用显示 Bean 的引用进行装配
  -byName: 根据 Bean 的名称注入 Bean 的对象引用
  -byType: 根据 Bean 的类型注入对象应用
  -autodetect: 先通过构造函数使用 Autowire 装配,如果不行再根据 byType 自动装配

### 6.13. Spring 允许循环依赖吗

- 允许

### 6.14. Spring 如何解决循环依赖

?> 通过三级缓存解决循环依赖，但是只对立即实例化的 Bean 支持（非抽象类，非延迟实例化，单例 Bean）。

- 三级缓存

  - 一级缓存：存储完整的 Bean（实例化、依赖注入、初始化）
  - 二级缓存（实例化）
  - 三级缓存（ObjectFactory）

- 示例：A 依赖 B，B 依赖 A
  - A 先从一级缓存中查询，若没有实例则进行实例化并添加到三级缓存中
  - A 依赖注入 B：从一级缓存中查询没有 B，进行实例化并添加到三级缓存中
  - B 依赖注入 A，从三级缓存中查询到实例升级到二级缓存中完成 A 的依赖注入，执行初始化 B 添加到一级缓存中
  - A 依赖注入 B 完成，执行初始化 A 添加到一级缓存中

### 6.15. Spring 中解决循环依赖为何使用三级缓存而不是二级缓存

- 三级缓存存储的是 Bean 构造工厂，如何没有二级缓存在多个依赖注入的环境下可能会创建生成不对的对象。

## 7. Spring 事务管理

### 7.1. Spring 中事务管理类型

- 编程式事务
- 声明式事务

### 7.2. Spring 中选择哪种事务管理类型比较合适

### 7.3. Spring 中如何开启事务

### 7.4. Spring 中事务的默认回滚异常是什么

### 7.5. Spring 中怎么指定回滚的异常

### 7.6. Spring 中怎么指定不回滚的异常

### 7.7. Spring 中事务失效的原因

- 数据库不支持
- 没有被 Spring 管理
- 未配置事务管理
- 方法非 Public
- 自身非事务方法调用事务方法
- 业务操作中异常被吃
- 事务回滚异常不匹配

### 事务传播机制

|         传播机制          |                                               描述                                               |
| :-----------------------: | :----------------------------------------------------------------------------------------------: |
|   PROPAGATION_REQUIRED    |                    当前存在事务，则加入该事务，若不存在事务，则新建一个事务。                    |
|  PAOPAGATION_REQUIRE_NEW  |       始终新建一个事务，新老事务相互独立。外部事务抛出异常回滚不会影响内部事务的正常提交。       |
|    PROPAGATION_NESTED     | 如果当前存在事务，则嵌套在当前事务中执行。如果当前没有事务，则新建一个事务，类似于 REQUIRE_NEW。 |
|   PROPAGATION_SUPPORTS    |                       支持当前事务，若当前不存在事务，以非事务的方式执行。                       |
| PROPAGATION_NOT_SUPPORTED |                      以非事务的方式执行，若当前存在事务，则把当前事务挂起。                      |
|   PROPAGATION_MANDATORY   |                            强制事务执行，若当前不存在事务，则抛出异常                            |
|     PROPAGATION_NEVER     |                        以非事务的方式执行，如果当前存在事务，则抛出异常。                        |

### 7.8. 什么是 ReadOnly（只读）事务管理

### 7.9. ReadOnly（只读）事务应用场景

### 7.10. 什么是 Timeout（超时）事务

### 7.11. 怎么使用 Timeout（超时）事务

## 8. 事件机制

### 8.1. Spring 中的事件监听机制是什么

### 8.2. Spring 框架中有哪些不同类型的事件？

Spring 的 ApplicationContext  提供了支持事件和代码中监听器的功能。我们可以创建 bean 用来监听在 ApplicationContext  中发布的事件。ApplicationEvent 类和在 ApplicationContext 接口中处理的事件，如果一个 bean 实现了 ApplicationListener 接口，当一个 ApplicationEvent  被发布以后，bean 会自动被通知

- Spring 提供了以下 5 中标准的事件： 1.上下文更新事件（ContextRefreshedEvent）：该事件会在 ApplicationContext 被初始化或者更新时发布。也可以在调用 ConfigurableApplicationContext 接口中的 refresh()方法时被触发。 2.上下文开始事件（ContextStartedEvent）：当容器调用 ConfigurableApplicationContext 的 Start()方法开始/重新开始容器时触发该事件。 3.上下文停止事件（ContextStoppedEvent）：当容器调用 ConfigurableApplicationContext 的 Stop()方法停止容器时触发该事件。 4.上下文关闭事件（ContextClosedEvent）：当 ApplicationContext 被关闭时触发该事件。容器被关闭时，其管理的所有单例 Bean 都被销毁。 5.请求处理事件（RequestHandledEvent）：在 Web 应用中，当一个 http 请求（request）结束触发该事件。

## 9. Spring 应用

### 9.1. 怎么开始方法异步执行

### 9.2. 怎么开启定时任务

### 9.3. Spring 为什么不建议使用默认线程池

### 9.4. Spring 框架中都用到了哪些设计模式？

Spring 框架中使用到了大量的设计模式，下面列举了比较有代表性的：
 代理模式—在 AOP 和 remoting 中被用的比较多。
 单例模式—在 spring 配置文件中定义的 bean 默认为单例模式。
 模板方法—用来解决代码重复的问题。
 比如. RestTemplate, JmsTemplate, JpaTemplate。
 前端控制器—Srping 提供了 DispatcherServlet 来对请求进行分发。
 视图帮助(View Helper )—Spring 提供了一系列的 JSP 标签，高效宏来辅助将分散的代码整合在视图里。
 依赖注入—贯穿于 BeanFactory / ApplicationContext 接口的核心理念。
 工厂模式—BeanFactory 用来创建对象的实例。

## 10. 扩展

### 10.1. Spring Native 是什么框架

### 10.2. Spring Native 和 JVM 的区别

### 10.3. Spring Native 的应用场景

### 10.4. Spring Native 优缺点
