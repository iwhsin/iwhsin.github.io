# 杂谈汇
## 控制台样式输出
?> \u001B[Xm 这种格式形式输出会有特殊符号标识,其中X为对应的标识数字.
```java
for (int i = 0; i < 255; i++) {
    System.out.printf("\u001B[%dm测试一下颜色呗\u001B[0m\n", i);
}
```
