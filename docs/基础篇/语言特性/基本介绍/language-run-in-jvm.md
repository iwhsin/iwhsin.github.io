# 1. 运行在 JVM 中的语言
&emsp;&emsp;除了`Java`外，其它语言在`JVM`中的运行方式，主要通过两种方式运行。<br>
- 第一种，提供用于生成类文件的源码编译器（类似于javac），以类似Java代码的方式在JVM中运行（Scala等语言采用的是这种方式）。<br>
- 第二种可以使用Java实现解释器和运行时，然后解释该语言使用的源码格式。JRuby等语言采用的就是这种方式。

## 1.1. Java

## 1.2. Kotlin
&emsp;&emsp;Kotlin是一种在Java虚拟机上运行的静态类型编程语言，它也可以被编译成为JavaScript源代码。Kotlin的设计初衷就是用来生产高性能要求的程序的，所以运行起来和Java也是不相上下。Kotlin可以从 JetBrains InteilliJ Idea IDE这个开发工具以插件形式使用。
```kotlin
fun main(args: Array<String>) {
    println("Hello, world!")
}
```

## 1.3. Groovy
&emsp;&emsp;Apache的Groovy是Java平台上设计的面向对象编程语言。它的语法风格与Java很像，Java程序员能够很快的熟练使用 Groovy，实际上，Groovy编译器是可以接受完全纯粹的Java语法格式的。<br>
&emsp;&emsp;使用Groovy的一个重要特点就是使用类型推断，即能够让编译器能够在程序员没有明确说明的时候推断出变量的类型。Groovy可以使用其他Java语言编写的库。Groovy的语法与Java非常相似，大多数Java代码也匹配Groovy的语法规则，尽管可能语义不同。
```groovy
static void main(String[] args) {
    println('Hello, world!');
}
```

## 1.4. Scala
&emsp;&emsp;Scala是一门多范式的编程语言，设计初衷是要集成面向对象编程和函数式编程的各种特性。<br>
&emsp;&emsp;Scala经常被我们描述为多模式的编程语言，因为它混合了来自很多编程语言的元素的特征。但无论如何它本质上还是一个纯粹的面向对象语言。它相比传统编 程语言最大的优势就是提供了很好并行编程基础框架措施了。Scala代码能很好的被优化成字节码，运行起来和原生Java一样快。
```scala
object HelloWorld {
    def main(args: Array[String]) {
       System.out.println("Hello, world!");
    }
 }
```

## 1.5. Jruby
&emsp;&emsp;JRuby是用来桥接Java与Ruby的，它是使用比Groovy更加简短的语法来编写代码，能够让每行代码执行更多的任务。就和Ruby一样，JRuby不仅仅只提供了高级的语法格式。它同样提供了纯粹的面向对象的实现，闭包等等，而且JRuby跟Ruby自身相比多了很多基于Java类库 可以调用，虽然Ruby也有很多类库，但是在数量以及广泛性上是无法跟Java标准类库相比的。
```ruby
puts 'Hello, world!'
```

## 1.6. Jython
&emsp;&emsp;Jython，是一个用Java语言写的Python解释器。Jython能够用Python语言来高效生成动态编译的Java字节码。
```py
print "Hello, world!"
```

## 1.7. Fantom
&emsp;&emsp;Fantom是一种通用的面向对象编程语言，由Brian和Andy Frank创建，运行在Java Runtime Environment，JavaScript和.NET Common Language Runtime上。其主要设计目标是提供标准库API，以抽象出代码是否最终将在JRE或CLR上运行的问题。
&emsp;&emsp;Fantom是与Groovy以及JRuby差不多的一样面向对 象的编程语言，但是悲剧的是Fantom无法使用Java类库，而是使用它自己扩展的类库。
```fantom
class Hello {
    static Void main() { echo("Hello, world!") }
}
```

## 1.8. Clojure
&emsp;&emsp;Clojure是Lisp编程语言在Java平台上的现代、函数式及动态方言。 与其他Lisp一样，Clojure视代码为数据且拥有一套Lisp宏系统。
&emsp;&emsp;虽然Clojure也能被直接编译成Java字节码，但是无法使用动态语言特性以及直 接调用Java类库。与其他的JVM脚本语言不一样，Clojure并不算是面向对象的。
```clojure
(defn -main [& args]
    (println "Hello, World!"))
```

## 1.9. Rhino
&emsp;&emsp;Rhino是一个完全以Java编写的JavaScript引擎，目前由Mozilla基金会所管理。
&emsp;&emsp;Rhino的特点是为JavaScript加了个壳，然后嵌入到Java中，这样能够让Java程序员直接使用。其中Rhino的JavaAdapters能够让JavaScript通过调用Java的类来实现特定的功能。
```js
print('Hello, world!')
```

## 1.10. Ceylon
&emsp;&emsp;Ceylon是一种面向对象，强烈静态类型的编程语言，强调不变性，由Red Hat创建。 Ceylon程序在Java虚拟机上运行，​​可以编译为JavaScript。 语言设计侧重于源代码可读性，可预测性，可扩展性，模块性和元编程性。
```ceylon
shared void run() {
    print("Hello, world!");
}
```