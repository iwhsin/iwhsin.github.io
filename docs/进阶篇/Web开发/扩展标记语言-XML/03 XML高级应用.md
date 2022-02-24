# XML命名空间(避免冲突)
```xml
<h:table>
<h:tr>
<h:td>Apples</h:td>
<h:td>Bananas</h:td>
</h:tr>
</h:table>

<f:table>
<f:name>African Coffee Table</f:name>
<f:width>80</f:width>
<f:length>120</f:length>
</f:table>
```
# XML CDATA
XML 文档中的所有文本均会被解析器解析。
只有 CDATA 区段中的文本会被解析器忽略
```xml
<script>
<![CDATA[
function matchwo(a,b){
	if (a < b && a < 0) then
	{
		return 1;
	}else{
		return 0;
	}
}
]]>
</script>
```