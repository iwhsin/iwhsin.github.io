# Sass 概念基础

## 1. 概述

- 概要介绍
  ![](/docs/assets/images/sass-概念基础/20220304110932.png ":class=introduce :size=128")
  Sass (英文全称：Syntactically Awesome Stylesheets) 是一个最初由 Hampton Catlin 设计并由 Natalie Weizenbaum 开发的层叠样式表语言。
  Sass 是一个 CSS 预处理器，可以帮助我们减少 CSS 重复的代码，节省开发时间。
  Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。

---

- 使用示例

```sass
// 定义变量与值
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

// 使用变量
body {
background-color: $bgcolor;
color: $textcolor;
font-size: $fontsize;
}

// 嵌套属性
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```

## 2. 使用

### 2.1. @import

### 2.2. @mixin 与 @include

### 2.3. @extend

### 2.4. Sass 函数
