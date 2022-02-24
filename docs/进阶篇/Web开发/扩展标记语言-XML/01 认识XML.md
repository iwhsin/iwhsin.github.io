# 简单了解
XML，可扩展的标识语言（eXtensible Markup Language），其先驱是SGML和HTML
## 作用
- XML 被设计用来传输和存储数据
- 丰富文件（Rich Documents）-自定文件描述并使其更丰富；
- 属于文件为主的XML技术应用；
	- 标记是用来定义一块数据应该如何呈现；
	- 解释数据（Metadata）-描述其它文件或在线信息；
- 属于数据为主的XML技术应用；
	- 标记是用来说明一块资料的意义；
	- 组态档案（Configuration Files）-描述软件的组态参数
- XML 把数据从 HTML 分离
- XML 简化数据共享,XML 数据以纯文本格式进行存储，因此提供了一种独立于软件和硬件的数据存储方法。这让创建不同应用程序可以共享的数据变得更加容易
- XML 简化数据传输,可以通过各种不兼容的应用程序来读取数据，以 XML 交换数据降低了这种复杂性
- XML 简化平台变更,XML 数据以文本格式存储。这使得 XML 在不损失数据的情况下，更容易扩展或升级到新的操作系统、新的应用程序或新的浏览器
- XML 使您的数据更有用,不同的应用程序都能够访问您的数据，不仅仅在 HTML 页中，也可以从 XML 数据源中进行访问
- XML 用于创建新的互联网语言,很多新的互联网语言是通过 XML 创建的。
	这里有一些实例：
	- XHTML
	- 用于描述可用的 Web 服务 的 WSDL
	- 作为手持设备的标记语言的 WAP 和 WML
	- 用于新闻 feed 的 RSS 语言
	- 描述资本和本体的 RDF 和 OWL
	- 用于描述针针对 Web 的多媒体 的 SMIL

## 什么是XML
- XML 指可扩展标记语言（EXtensible Markup Language）。
- XML 是一种很像HTML的标记语言。
- XML 的设计宗旨是传输数据，而不是显示数据。
- XML 标签没有被预定义。您需要自行定义标签。
- XML 被设计为具有自我描述性。
- XML 是 W3C 的推荐标准
- XML 可以在不中断应用程序的情况下进行扩展
## XML对比HTML
- XML是对 HTML的补充,HTML用于格式化并显示数据,而XML是独立于软件和硬件的信息传输工具
- XML 被设计用来传输和存储数据,其焦点是数据的内容。
- HTML 被设计用来显示数据，其焦点是数据的外观。
- XML 允许创作者定义自己的标签和自己的文档结构

# XML 树结构
- XML 文档形成了一种树结构，它从"根部"开始，然后扩展到"枝叶"
```
<!-- XML 声明。它定义 XML 的版本（1.0）和所使用的编码（ISO-8859-1 = Latin-1/西欧字符集） -->
<!-- 声明不是 XML 文档本身的一部分，它没有关闭标签 -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- 如果您把字符 "<" 放在 XML 元素中，会发生错误，这是因为解析器会把它当作新元素的开始。&lt;代替 -->
```
	&lt;	<	less than
	&gt;	>	greater than
	&amp;	&	ampersand
	&apos;	'	apostrophe
	&quot;	"	quotation mark
	XML 以 LF 存储换行
```
<!-- bookstore根元素 -->
<bookstore>
<!-- XML 属性值必须加引号 -->
	<book category="COOKING">
		<!-- 自定义的子元素标签,XML 标签对大小写敏感。标签 <Letter> 与标签 <letter> 是不同的-->
		<title lang="en">Everyday Italian</title>
		<author>Giada De Laurentiis</author>
		<year>2005</year>
		<price>30.00</price>
	</book>
	<book category="CHILDREN">
		<title lang="en">Harry Potter</title>
		<author>J K. Rowling</author>
		<year>2005</year>
		<price>29.99</price>
	</book>
	<book category="WEB">
		<title lang="en">Learning XML</title>
		<author>Erik T. Ray</author>
		<year>2003</year>
		<price>39.95</price>
	</book>
</bookstore>
```
- XML 文档必须包含根元素。该元素是所有其他元素的父元素
- 所有的元素都可以有子元素
- 参见/JavaStudy/01 基础知识/XML/XML树结构.gif和/JavaStudy/01 基础知识/XML/xml.xml
## XML元素
- XML 元素指的是从（且包括）开始标签直到（且包括）结束标签的部分,包含:
	- 元素可以包含：
	- 其他元素
	- 文本
	- 属性
	- 或混合以上所有
- 元素命名
	- 名称可以包含字母、数字以及其他的字符,只能以非xml,XML等字母开头
## XML属性
- XML元素具有属性，类似 HTML。属性（Attribute）提供有关元素的额外信息	
- 属性值必须被引号包围，不过单引号和双引号均可使用
- XML中尽量使用元素替代属性
	- 属性不能包含多个值（元素可以）
	- 属性不能包含树结构（元素可以）
	- 属性不容易扩展（为未来的变化）
## XML DTD
- 拥有正确语法的 XML 被称为"形式良好"的 XML。通过 DTD 验证的XML是"合法"的 XML
- DTD 的目的是定义 XML 文档的结构。它使用一系列合法的元素来定义文档结构
- 形式良好"的 XML 文档拥有正确的语法。
	- XML 文档必须有一个根元素
	- XML元素都必须有一个关闭标签
	- XML 标签对大小写敏感
	- XML 元素必须被正确的嵌套
	- XML 属性值必须加引号
```
<!-- DOCTYPE 声明是对外部 DTD 文件的引用 -->
<!DOCTYPE note SYSTEM "Note.dtd">
```
- W3C 支持一种基于 XML 的 DTD 代替者，它名为 XML Schema
```
<xs:element name="note">
	<xs:complexType>
		<xs:sequence>
			<xs:element name="to" type="xs:string"/>
			<xs:element name="from" type="xs:string"/>
			<xs:element name="heading" type="xs:string"/>
			<xs:element name="body" type="xs:string"/>
		</xs:sequence>
	</xs:complexType>
</xs:element>
```
- XML 文档中的错误会终止您的 XML 应用程序。
- W3C 的 XML 规范声明：如果 XML 文档存在错误，那么程序就不应当继续处理这个文档。理由是，XML 软件应当轻巧，快速，具有良好的兼容性

## XML的显示
- 在没有任何有关如何显示数据的信息的情况下，大多数的浏览器都会仅仅把 XML 文档显示为源代码
- CSS XSLT 可以修改XML显示样式
- XSLT :可以把 XML文档转换成 HTML格式,是XML的样式语言
- xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;