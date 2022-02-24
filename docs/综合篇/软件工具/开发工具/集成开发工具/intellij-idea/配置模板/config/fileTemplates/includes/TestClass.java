#set($sp="\u0020")
#set($className = ${NAME.substring(0,${NAME.indexOf("Test")})})
/** 
 *  $className 测试类。
 *
 * @author  $sp${USER}
 * @version #if (${version} && ${version} != "") ${version}
#else 1.0.0 
            #end
 * @since   #if (${version} && ${version} != "") ${version}
#else 1.0.0 
            #end
 */