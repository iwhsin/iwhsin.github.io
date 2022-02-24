# XMLHttpRequest
- XMLHttpRequest 对象用于在后台与服务器交换数据。
	- 在不重新加载页面的情况下更新网页
	- 在页面已加载后从服务器请求数据
	- 在页面已加载后从服务器接收数据
	- 在后台向服务器发送数据
```xml
	xmlhttp=new XMLHttpRequest();
	// 旧版本的IE5和IE6
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
```
```xml
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{
	// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","books.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
```

# XML解析
- 所有现代浏览器都有内建的 XML 解析器,XML解析器把 XML文档转换为 XML DOM 对象 - 可通过 JavaScript 操作的对象。
```xml
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","books.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
```
```xml
txt="<bookstore><book>";
txt=txt+"<title>Everyday Italian</title>";
txt=txt+"<author>Giada De Laurentiis</author>";
txt=txt+"<year>2005</year>";
txt=txt+"</book></bookstore>";

if (window.DOMParser){
	parser=new DOMParser();
	xmlDoc=parser.parseFromString(txt,"text/xml");
}
// Internet Explorer
else {
	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async=false;
	xmlDoc.loadXML(txt); 
}
```
# 跨域访问
出于安全方面的原因，现代的浏览器不允许跨域的访问。
这意味着，网页以及它试图加载的 XML 文件，都必须位于相同的服务器上。
# JavaScript解析XML
- xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
```xml
<html>
<body>
<h1>W3Cschools Internal Note</h1>
<div>
<b>To:</b> <span id="to"></span><br />
<b>From:</b> <span id="from"></span><br />
<b>Message:</b> <span id="message"></span>
</div>

<script>
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","note.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

document.getElementById("to").innerHTML=
xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
document.getElementById("from").innerHTML=
xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
document.getElementById("message").innerHTML=
xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;
</script>

</body>
</html>
```
```
<html>
<body>

<script>
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","cd_catalog.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 

document.write("<table border='1'>");
var x=xmlDoc.getElementsByTagName("CD");
for (i=0;i<x.length;i++)
{ 
document.write("<tr><td>");
document.write(x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue);
document.write("</td><td>");
document.write(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue);
document.write("</td></tr>");
}
document.write("</table>");
</script>

</body>
</html>
```
