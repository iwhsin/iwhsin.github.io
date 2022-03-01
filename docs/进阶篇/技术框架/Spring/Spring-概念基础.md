# Spring 概念基础

- 基本介绍
- 控制反转-IOC
- 依赖注入-DI
- 面向切面编程-AOP

## 概念基础

### Spring 是什么?

&emsp;&emsp;免费开源的 java 企业级应用开发框架，是轻量、松耦合的，旨在降低应用程序开发的复杂度。<br>
&emsp;&emsp;基于 POJO 为基础的编程模型促进良好的编程习惯，具有分层体系结构，允许用户选择组件，同时为其它框架的继承提供了很大的便利，可以很容易地集成其它框架（框架中的框架）。

### Spring 有哪些用处？

&emsp;&emsp;管理应用程序中的 Bean 对象，负责对象的创建和维护对象之间的关系。<br>
&emsp;&emsp;分层架构，允许用户自由选择需要的组件，很方便和其它框架技术集成，同时也很容易进行集成测试。<br>
&emsp;&emsp;免费开源，实现了 IOC 和 AOP，简化了企业级应用开发,减少侵入,降低组件耦合,方便日后维护和升级。

### Spring 的使用带来什么好处（有哪些功能）

- **轻量级**：Spring 框架在代码量和透明度上都很轻便
- **IOC（控制反转）**：通过控制反转实现了对象间松散耦合（好莱坞原则：对象们给出它们的依赖，而不是创建或查找依赖的对象们）。
- **AOP（面向切面）**：通过面向切面编程技术将应用系统业务逻辑和系统服务隔离，以实现高内聚。
- **容器（BeanFactory、ApplicationContext）**：Spring 容器负责 Bean 对象的创建、维护、管理和配置。
- **Web MVC**：对 Web 应用程序开发提供了高度可配置性，同时与其他框架的集成也十分方便。
- **事物管理**：提供了用于事物管理的通用抽象层（提供一个持续的事务管理接口），可以扩展到上至本地事务下至全局事务（JTA）
- **异常处理**：提供方便的 API 把具体技术相关的异常（比如由 JDBC，Hibernate or JDO 抛出的）转化为一致的`非检查异常`，简化了错误处理策略。

## 控制反转(IOC 容器)

### IOC 容器是什么?

&emsp;&emsp;IOC(Inversion Of Control)，直面意思是控制反转，典型的好莱坞原则（你别找我们，我们会找你），在 Spring 中的应用就是将对象（Bean）的创建维护交由容器来管理，在需要的地方通过依赖注入，不需要自己显示的声明对象。<br>
&emsp;&emsp;Spring 使用容器进行对象管理，简单的架构设计为`XML配置文件解析`、`根据配置文件配置信息通过反射实例化对象`。

### IOC 的实现

- **实现机制**<br>
  &emsp;&emsp;IOC 的实现机制主要是工厂模式加反射机制。

- **实现方式**<br>

  - **依赖注入**
    根据 Bean 名称注入
    根据 Bean 类型注入
  - 单个 Bean 对象
  - 集合 Bean 对象
  - 注入容器內建 Bean 对象
  - 注入非 Bean 对象
  - 注入类型

  - 实时注入
  - 延迟注入

  - **依赖查找**

  - 根据 Bean 名称查找
    - 即时查找
    - 延时查找
  - 根据 Bean 类型查找
    - 单个 Bean 对象
    - 集合 Bean 对象
  - 根据 Java 注解查找
    - 单个 Bean 对象
    - 集合 Bean 对象

### IOC 的依赖来源

- 自定义 Bean
- 容器內建 Bean 对象
- 容器內建依赖

### Spring 中 IOC 容器的分类

&emsp;&emsp;在 Spring 框架中主要有`BeanFactory`和`ApplicationContext`两中容器的实现。

- **BeanFactory**：一个包含 Bean 集合的工厂类，会在客户端要求时实例化 Bean。
- **ApplicationContext**：扩展了`BeanFactory`接口，在`BeanFactory`的基础上提供了额外的扩展功能。
- **BeanFactory** VS **ApplicationContext**
  | BeanFactory | ApplicationContext |
  | :------------- | :------------- |
  | 使用懒加载 | 使用即时加载 |
  | 使用语法显示提供资源对象 | 自己创建和管理资源对象 |
  | 不支持国际化 | 支持国际化 |
  | 不支持基于依赖的注解 | 支持基于依赖的注解 |

### 使用 IOC 带来的好处

- IOC 的优点

  - 减少应用程序中代码量
  - 集成了测试，简化开发过程中的测试，使得程序易于测试
  - 降低系统开发过程中的耦合度，以最小的影响和最少的侵入促进松耦合
  - 支持即时实例化和延迟加载服务

- IOC 优势
  - 典型的 IoC 管理，依赖查找和依赖注入
  - AOP 抽象
  - 事务抽象
  - 事件机制
  - SPI 扩展
  - 强大的第三方整合
  - 易测试性
  - 更好的面向对象

## 依赖注入

### 什么是依赖注入

&emsp;&emsp;在依赖注入中，不需要人为的进行对象的创建，只需要描述如何创建他们（通过在配置文件描述对象的创建及对象间的依赖关系），由 IOC 容器负责对象的装配。

### 依赖注入的几种方式

&emsp;&emsp;依赖注入主要有下面三种方式，其中在 Spring 框架中使用的是`构造函数注入`和`Setter注入`两种方式。

- **构造函数注入**

- **Setter 注入**

- **接口注入**

### 构造函数注入 VS Setter 注入

- 区别
  | 构造函数注入 | Setter 注入 |
  | :------------- | :------------- |
  | 整体注入,不能部分注入 | 允许部分元素注入 |
  | 不会覆盖 Setter 属性 | 会覆盖 Setter 属性 |
  | 任意修改会创建一个新的实例 | 任意修改不会创建新的实例 |
  | 适用于设置很多属性 | 适用于设置少量属性 |

## Spring Bean 对象

### 什么是 Spring Bean?

- 是构造用于应用程序的主干对象
- 基于用户提供的配置元信息进行创建
- 由 Spring IOC 容器负责创建、装配、管理

### Spring 容器 Bean 的生命周期

### Spring 的内部 Bean

- AbstractApplicationContext 内建可查找的依赖
  | Bean 名称 | Bean 实例 | 使用场景 |
  | :-------------------------- | :------------------------------- | :---------------------- |
  | environment | Environment 对象 | 外部化配置以及 Profiles |
  | systemProperties | java.util.Properties 对象 | Java 系统属性 |
  | systemEnvironment | java.util.Map 对象 | 操作系统环境变量 |
  | messageSource | MessageSource 对象 | 国际化文案 |
  | lifecycleProcessor | LifecycleProcessor 对象 | Lifecycle Bean 处理器 |
  | applicationEventMulticaster | ApplicationEventMulticaster 对象 | Spring 事件广播器 |

- 注解驱动 Spring 应用上下文内建可查找的依赖（续）
  | Bean 名称 | Bean 实例 | 使用场景 |
  | :------------------------------------------------------------------------------ | :------------------------------------------ | :---------------------------------------------------- |
  | org.springframework.context.annotation.internalConfigurationAnnotationProcessor | ConfigurationClassPostProcessor 对象 | 处理 Spring 配置类 |
  | org.springframework.context.annotation.internalAutowiredAnnotationProcessor | AutowiredAnnotationBeanPostProcessor 对象 | 处理 @Autowired 以及 @Value 注解 |
  | org.springframework.context.annotation.internalCommonAnnotationProcessor | CommonAnnotationBeanPostProcessor 对象 | （条件激活）处理 JSR-250 注解，如 @PostConstruct 等 |
  | org.springframework.context.event.internalEventListenerProcessor | EventListenerMethodProcessor 对象 | 处理标注 @EventListener 的 Spring 事件监听方法 |
  | org.springframework.context.event.internalEventListenerFactory | DefaultEventListenerFactory 对象 | @EventListener 事件监听方法适配为 ApplicationListener |
  | org.springframework.context.annotation.internalPersistenceAnnotationProcessor | PersistenceAnnotationBeanPostProcessor 对象 | （条件激活）处理 JPA 注解场景 |

- 依赖查找常见异常
  | 异常类型 | 触发条件（举例） | 场景举例 |
  | :------------------------------ | :----------------------------------------- | :----------------------------------------------- |
  | NoSuchBeanDefinitionException | 当查找 Bean 不存在于 IoC 容器时 | BeanFactory#getBean <br> ObjectFactory#getObject |
  | NoUniqueBeanDefinitionException | 类型依赖查找时，IoC 容器存在多个 Bean 实例 | BeanFactory#getBean(Class) |
  | BeanInstantiationException | 当 Bean 所对应的类型非具体类时 | BeanFactory#getBean |
  | BeanCreationException | 当 Bean 初始化过程中 Bean | 初始化方法执行异常时 |
  | BeanDefinitionStoreException | 当 BeanDefinition 配置元信息非法时 | XML 配置资源无法打开时 |

### Spring Bean 的装配

### Spring Bean 自动装配的几种方式

- no:没有自动装配,使用显示 Bean 的引用进行装配
  -byName: 根据 Bean 的名称注入 Bean 的对象引用
  -byType: 根据 Bean 的类型注入对象应用
  -autodetect: 先通过构造函数使用 Autowire 装配,如果不行再根据 byType 自动装配

### Spring 中 Bean 对象的作用域范围(Scope)

- **singleton**：默认是使用单例作用域，每个 IOC 容器仅有一个单例
- **protopyte**：原型模式，每次请求都会创建一个新的实例
- **request**：每次`Http`请求都会产生一个新的实例，并且该 Bean 仅在当前 Http 请求中有效
- **session**：每次`Http`请求都会产生一个新的实例，并且该 Bean 仅在当前 Http 请求会话中有效
- **global-session**：portlet web 中有全局 Session 的概念，类似 **session**作用域
