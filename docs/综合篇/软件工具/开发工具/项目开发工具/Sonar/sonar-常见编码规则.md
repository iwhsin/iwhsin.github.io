# Sonar 编码规则

## 常见编码规则

### 不建议使用接口类进行常量定义

&emsp;&emsp;**规则:** S1214-Constants should not be defined in interfaces<br>
&emsp;&emsp;**建议:** 使用枚举类或 final class

### 工具类方法不建议用户 public 构造函数

&emsp;&emsp;**规则:** S1118-Utility classes should not have public constructors<br>
&emsp;&emsp;**建议:** 添加一个私有的构造方法

### 字段顺序问题

&emsp;&emsp;**规则:** ModifiersOrderCheck:Modifiers should be declared in the correct order<br>
&emsp;&emsp;**建议:** Java 语言规范建议修饰字段使用顺序如下:

```
Annotations→public→protected→private→abstract→static→final→transient→volatile→synchronized→native→strictfp
```

### `throws`不建议重复声明

&emsp;&emsp;**规则：**squid:RedundantThrowsDeclarationCheck<br>
&emsp;&emsp;**建议：**runtime exception 运行时异常始终会被抛出，不建议重复声明。

### Java 中不建议使用线程组

- **规则：**java:S3014-"ThreadGroup" should not be used
- **原因**
  1. ThreadGroup 中的类似`allowThreadSuspension()`、`resume()`、`suspend()`等许多不推荐使用的方法都已经被弃用；
  2. `activeCount()`、`enumerate()`方法都是非线程安全的；
- **建议**
  - 使用`Executor`框架来建立线程用于线程的管理、维护。
