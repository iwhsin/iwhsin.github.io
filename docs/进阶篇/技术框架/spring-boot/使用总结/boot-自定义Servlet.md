# 自定义Servlet
## 编程方式注入
``` java
// 1. 自定义`Servlet`类
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
// 2. 注入自定义Servlet
@Configuration
public class ApplicationConfig {

    @Bean
    public ServletRegistrationBean<ViewStatusMessagesServlet> servletRegistrationBean(){
        return new ServletRegistrationBean<>(new MyServlet(), "/status");
    }
}
```

## 注解方式注入
```
// 1.在启动配置类中使用`@ServletComponentScan`注解
@SpringBootApplication
@ServletComponentScan
public class StartApplication {

    public static void main(String[] args){

        SpringApplication.run(StartApplication.class);
    }
}

// 2.在自定义的`Servlet`类中使用`@WebServlet(urlPatterns = "xxxxurl")`
@WebServlet(urlPatterns = "/myServlet")
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```