# Spring 特性总览

## 核心特性

- **核心特性(Core)**

  - IoC 容器（IoC Container）
  - Spring 事件（Events）
  - 资源管理（Resources）
  - 国际化（i18n）
  - 校验（Validation）
  - 数据绑定（Data Binding）
  - 类型装换（Type Conversion）
  - Spring 表达式（Spring Express Language）
  - 面向切面编程（AOP）

- **数据存储（Data Access）**

  - JDBC
  - 事务抽象（Transactions）
  - DAO 支持（DAO Support）
  - O/R 映射（O/R Mapping）
  - XML 编列（XML Marshalling）

- **Web 技术（Web）**

  - Web Servlet 技术栈
  - Spring MVC
  - WebSocket
  - SockJS
  - Web Reactive 技术栈
  - Spring WebFlux
  - WebClient
  - WebSocket

- **技术整合（Integration）**

  - 远程调用（Remoting）
  - Java 消息服务（JMS）
  - Java 连接架构（ JCA）
  - Java 管理扩展（JMX）
  - Java 邮件客户端（Email）
  - 本地任务（Tasks）
  - 本地调度（Scheduling）
  - 缓存抽象（Caching）
  - Spring 测试（Testing）

- **测试（Testing）**
  - 模拟对象（Mock Objects）
  - TestContext 框架（TestContext Framework）
  - Spring MVC 测试（Spring MVC Test）
  - Web 测试客户端（WebTestClient）

## Spring 版本特性

### Java 版本依赖与支持

| Spring Framework 版本 | Java 标准版 | Java 企业版           |
| :-------------------- | :---------- | :-------------------- |
| 1.x                   | 1.3+        | J2EE 1.3 +            |
| 2.x                   | 1.4.2+      | J2EE 1.3 +            |
| 3.x                   | 5+          | J2EE 1.4 和 Java EE 5 |
| 4.x                   | 6+          | Java EE 6 和 7        |
| 5.x                   | 8+          | Java EE 7             |

### Java 特性应用

#### Java 语言特性应用

- **Java5 语言特性**

| 语法特性               | Spring 支持版本 | 代表实现                   |
| :--------------------- | :-------------- | :------------------------- |
| 注解（Annotation）     | 1.2             | @Transactional             |
| 枚举（Enumeration）    | 1.2 +           | Propagation                |
| for-each 语法          | 3.0 +           | AbstractApplicationContext |
| 自动装箱（AutoBoxing） | 3.0 +           |                            |
| 泛型（Generic）        | 3.0 +           | ApplicationListener        |

- **Java6 语言特性**

| 语法特性       | Spring 支持版本 | 代表实现 |
| :------------- | :-------------- | :------- |
| 接口 @Override | 4.0+            |          |

- **Java7 语言特性**

| 语法特性                   | Spring 支持版本 | 代表实现                    |
| :------------------------- | :-------------- | :-------------------------- |
| Diamond 语法（<>菱形语法） | 5.0+            | DefaultListableBeanFactory  |
| try-with-resources 语法    | 5.0+            | ResourceBundleMessageSource |

- **Java8 语言特性**

| 语法特性    | Spring 支持版本 | 代表实现                      |
| :---------- | :-------------- | :---------------------------- |
| Lambda 语法 | 5.0+            | PropertyEditorRegistrySupport |

#### JDK API 应用

- **< Java 5 API 的应用**
  | API 类型 | Spring 支持版本 | 代表实现 |
  | :------------------------ | :-------------- | :------------------------- |
  | 反射（Reflection） | 1.0+ | MethodMatcher |
  | Java Beans | 1.0+ | CachedIntrospectionResults |
  | 动态代理（Dynamic Proxy） | 1.0+ | JdkDynamicAopProxy |

- **Java 5 API 的应用**
  | API 类型 | Spring 支持版本 | 代表实现 |
  | :--------------------- | :-------------- | :------------------------- |
  | XML 处理（DOM,SAX...） | 1.0+ | XmlBeanDefinitionReader |
  | Java 管理扩展（JMX） | 1.2+ | @ManagedResource |
  | Instrumentation | 2.0+ | InstrumentationSavingAgent |
  | 并发框架（J.U.C） | 3.0+ | ThreadPoolTaskScheduler |
  | 格式化（Formatter） | 3.0+ | DateFormatter |

- **Java 6 API 的应用**
  | API 类型 | Spring 支持版本 | 代表实现 |
  | :---------------------------- | :-------------- | :-------------------------------- |
  | JDBC 4.0（JSR 221） | 1.0+ | JdbcTemplate |
  | Common Annotations（JSR 250） | 2.5+ | CommonAnnotationBeanPostProcessor |
  | JAXB 2.0（JSR 222） | 3.0+ | Jaxb2Marshaller |
  | Scripting in JVM（JSR 223） | 4.2+ | StandardScriptFactory |
  | 可插拔注解处理 API（JSR 269） | 5.0+ | @Indexed |
  | Java Compiler API（JSR 199） | 5.0+ | TestCompiler（单元测试） |

- **Java 7 API 的应用**
  | API 类型 | Spring 支持版本 | 代表实现 |
  | :------------------------ | :-------------- | :---------------------- |
  | Fork/Join 框架（JSR 166） | 3.1+ | ForkJoinPoolFactoryBean |
  | NIO 2（JSR 203） | 4.0+ | PathResource |

- **Java 8 API 的应用**
  | API 类型 | Spring 支持版本 | 代表实现 |
  | :---------------------------- | :-------------- | :----------------------------------- |
  | Date and Time API（JSR 310） | 4.0+ | DateTimeContext |
  | 可重复 Annotations（JSR 337） | 4.0+ | @PropertySources |
  | Stream API（JSR 335） | 4.2+ | StreamConverter |
  | CompletableFuture（J.U.C） | 4.2+ | CompletableToListenableFutureAdapter |

#### Java EE API 应用

- **JavaEE Web 技术的应用**
  | JSR 规范 | Spring 支持版本 | 代表实现 |
  | :------------------------ | :-------------- | :-------------------------------- |
  | Servlet + JSP(JSR 035） | 1.0+ | DispatcherServlet |
  | JSTL(JSR 052) | 1.0+ | JstlView |
  | JavaServer Faces(JSR 127) | 1.1+ | FacesContextUtils |
  | Portlet(JSR 168) | 2.0-4.2 | DispatcherPortlet |
  | SOAP(JSR 067) | 2.5+ | SoapFaultException |
  | WebServices(JSR 109) | 2.5+ | CommonAnnotationBeanPostProcessor |
  | WebSocket(JSR 356) | 4.0+ | WebSocketHandler |

- **JavaEE 数据存储的应用**
  | JSR 规范 | Spring 支持版本 | 代表实现 |
  | :-------------------------- | :-------------- | :-------------------- |
  | JDO(JSR 12) | 1.0-4.2 | JdoTemplate |
  | JTA(JSR 907) | 1.0+ | JtaTransactionManager |
  | JPA(EJB 3.0 JSR 220 的成员) | 2.0+ | JpaTransactionManager |
  | Java Caching API(JSR 107) | 3.2+ | JCacheCache |
- **JavaEE Bean 技术的应用**
  | JSR 规范 | Spring 支持版本 | 代表实现 |
  | :------------------------------------ | :-------------- | :----------------------------------- |
  | JMS(JSR 914) | 1.1+ | JmsTemplate |
  | EJB 2.0 (JSR 19) | 1.0+ | AbstractStatefulSessionBean |
  | Dependency Injection forJava(JSR 330) | 2.5+ | AutowiredAnnotationBeanPostProcessor |
  | Bean Validation(JSR 303) | 3.0+ | LocalValidatorFactoryBean |

### Spring 版本的主要功能

| Spring Framework 版本 | 特性                                                           |
| :-------------------- | :------------------------------------------------------------- |
| Spring 2.5            | 发布于 2007 年,这是首个支持 JavaConfig 注解的版本              |
| Spring 3.0            | 发布于 2009 年,完全利用了 Java5 中的改进,并为 Java6 提供了支持 |
| Spring 4.0            | 发布于 2013 年。这是第一个完全支持 Java8 的版本                |
| Spring 5.0            |                 |

## Spring 模块化设计

&emsp;&emsp;Spring 从 3.0 开始不再提供一个大的完整包,而是按照模块分为 20 多个组件 jar 包,根据需要选择引入相应的组件。

### 模块组成

![Spring 模块概观图](/docs/assets/images/spring-overview.png "Spring 模块结构图")

#### 核心容器(Core Container)
- **spring-beans**<br>
  &emsp;&emsp;所有应用都要用到，它包含访问配置文件，创建和管理 Bean 以及进行反转共控制和依赖注入操作时所需的类
- **spring-core**<br>
  &emsp;&emsp;包含 Spring 框架基本的核心工具类，Spring 其它组件要都要使用到这个包里的 类，是其它组件的基本核心。
- **spring-context**<br>
  &emsp;&emsp;为 Spring 核心提供了大量扩展。可以找到使用 Spring ApplicationContext 特性时所需的全部类，JDNI 所需的全部类，UI 方面的用来与模板（Templating）引擎如 Velocity、 FreeMarker、 JasperReports 集成的类， 以及校验 Validation 方面的相关类。 - 事件驱动 - 注解驱动 - 模块驱动等
- **spring-context-support**<br>
&emsp;&emsp;Spring context 的扩展支持，用于 MVC 方面。
- **spring-expression**<br>
  &emsp;&emsp;包含 Spring 表达式语言相关的类，应用使用到 SpEL 时需要添加这个 jar 包。

#### AOP 面向切面编程

- **spring-aop**<br>
  &emsp;&emsp;Spring AOP 处理，如动态代理，AOP 字节码提升。

## Spring 编程模型

### 面向对象编程

契约接口：Aware、BeanPostProcessor ...
设计模式：观察者模式、组合模式、模板模式 ...
对象继承：Abstract* 类

### 面向切面编程

动态代理：JdkDynamicAopProxy
字节码提升：ASM、CGLib、AspectJ...

### 面向元编程

注解：模式注解（@Component、@Service、@Respository ...）
配置：Environment 抽象、PropertySources、BeanDefinition ...
泛型：GenericTypeResolver、ResolvableType ...

### 函数驱动

函数接口：ApplicationEventPublisher
Reactive：Spring WebFlux

### 模块驱动

Maven Artifacts
OSGI Bundles
Java 9 Automatic Modules
Spring @Enable\*
