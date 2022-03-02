# IE 浏览器兼容

## IE9 浏览器兼容

- **IE 兼容问题**

  1. ie9 以下浏览器对 html5 新增标签的不识别，并导致 CSS 不起作用的问题。
  2. 不支持 css3 Media Query 的。

- **解决方法**<br>
  &emsp;&emsp;引入如下的 js 解决提供了相关特性的支持
  ` <!--[if lt IE 9]> <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script> <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script> <![endif]--> `

- **IE 特有的注释说明**
  ```
  <!--[if !IE]>  除IE外都可识别   <![endif]-->
  <!--[if IE]>   所有的IE可识别   <![endif]-->
  <!--[if IE 6]>   仅IE6可识别   <![endif]-->
  <!--[if lt IE 6]>   IE6以及IE6以下版本可识别   <![endif]-->
  <!--[if gte IE 6]>   IE6以及IE6以上版本可识别   <![endif]-->
  <!--[if IE 7]>   仅IE7可识别   <![endif]-->
  <!--[if lt IE 7]>   IE7以及IE7以下版本可识别   <![endif]-->
  <!--[if gte IE 7]>   IE7以及IE7以上版本可识别   <![endif]-->
  <!--[if IE 8]>   仅IE8可识别   <![endif]-->
  <!--[if IE 9]>   仅IE9可识别   <![endif]-->
  ```
  | 符号 | 范例                     | 说明                                                                   |
  | :--- | :----------------------- | :--------------------------------------------------------------------- |
  | !    | [if !IE]                 | NOT 运算符。这是摆立即在前面的*功能* ，_操作员_ ，或*子表达式*扭转布。 |
  | lt   | [if lt IE 5.5]           | 小于运算符。如果第一个参数小于第二个参数，则返回 true。                |
  | lte  | [if lte IE 6]            | 小于或等于运算。如果第一个参数是小于或等于第二个参数，则返回 true。    |
  | gt   | [if gt IE 5]             | 大于运算符。如果第一个参数大于第二个参数，则返回 true。                |
  | gte  | [if gte IE 7]            | 大于或等于运算。如果第一个参数是大于或等于第二个参数，则返回 true。    |
  | ( )  | [if !(IE 7)]             | 子表达式运营商。在与布尔运算符用于创建更复杂的表达式。                 |
  | &    | [if (gt IE 5)&(lt IE 7)] | AND 运算符。如果所有的子表达式计算结果为 true，返回 true               |
  | \|   | [if (IE 6)\|(IE 7)]      | OR 运算符。返回 true，如果子表达式计算结果为 true。                    |
