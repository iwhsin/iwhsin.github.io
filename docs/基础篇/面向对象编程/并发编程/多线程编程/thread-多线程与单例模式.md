# 多线程与单例模式
- **概要介绍**
    - 恶汉模式/立即加载
    - 懒汉模式/延迟加载
    - 静态内部类实现单例模式
    - 静态代码块实现单例模式
    - 枚举类实现单例模式
    - 序列化与反序列化实现单例模式

## 立即加载/饿汉模式
&emsp;&emsp;使用对象的时候已经将对象创建完毕,常见的实例方法就是new实例化

## 延迟加载/懒汉模式
- 是线程不安全的
- 使用同步方法/同步代码块(效率底下)

## 使用DCL双检测机制实现单例
	```
    volatile MyObject myObject;
	if (myObject != null) {
			} else {
				// 模拟在创建对象之前做一些准备性的工作
				Thread.sleep(3000);
				synchronized (MyObject.class) {
					if (myObject == null) {
                        // 指令重排序导致非线程安全使用volatile关键字修饰禁止指令重排
						myObject = new MyObject();
					}
				}
			}
	```

## 使用静态内部类实现单例模式
```
public class MyObject {

	// 内部类方式
	private static class MyObjectHandler {
		private static MyObject myObject = new MyObject();
	}

	private MyObject() {
	}

	public static MyObject getInstance() {
		return MyObjectHandler.myObject;
	}

}

## 序列化与反序列化的单例模式实现
- 参见singleton_7_1
## 静态代码块实现单例模式
- 参见singleton_8
## 使用枚举实现单例模式
- 参见singleton_9
- 根据"职责单一原则" ,枚举类不能暴露,改进参见singleton_10