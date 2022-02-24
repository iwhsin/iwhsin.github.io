#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
## 是否是工具类
#if(${utility} && ${utility} == "1")
    #set($isUtil = true)
import lombok.experimental.UtilityClass;
#else
    #set($isUtil = false)
#end
#parse("Class.java")
#if($isUtil)
@UtilityClass
public final class ${NAME} {

}
#else
public class ${NAME} {

}
#end

