# mybatis-plus 问题总结

## 主键生成问题
```
/**
 * Mybatis Plus 3.0版本不支持配置化{@code mybatis-plus.global-config.db-config.key-generator}
 * 支持{@code @Bean}注入的形式配置IKeyGenerator
 * @return {@link IKeyGenerator}
 */
@Bean
public IKeyGenerator iKeyGenerator(){
    return new OracleKeyGenerator();
}
```