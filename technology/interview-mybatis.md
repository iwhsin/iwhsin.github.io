# Mybatis

# 核心流程

## 配置加载解析
- Configuration
    - 加载配置文件 ==> Resources.getResourceAsStream("mybatis-config.xml")
    - XMLConfigBuilder ==> XMLConfigBuilder(InputStream inputStream, String environment, Properties props)
        - parseConfiguration(parser.evalNode("/configuration"))
            - 解析一级标签
                - properties 环境变量属性
                - setting 配置注入
                    - vfsImpl 资源访问器实现
                    - logImpl: 日志输出实现
                - 别名注册
                - 插件注册
                - objectFactory
                - objectWrapperFactory
                - reflectorFactory
                - 加载environment
                    - 数据源
                    - 事物管理
                - databaseId
                - typeHandlers 类型处理器 ==> typeHandlerRegistry.register
                - 解析mappers ==> Configuration#addMapper ==> 生成MapperProxy  ==> MapperBuilder
                    - 解析namespace
                    - 解析cache-ref
                    - 解析cache
                    - 解析parameterMap
                    - 解析resultMap
                    - 解析sql
                    - 解析select|insert|update|delete
                        - StatementBuilder
                            - 解析Include标签
                            - 解析SelectKey
                            - 解析keyGenerator
                            - 生成Sql ==> Sqlsource
                            - 获取sql类型statementType 默认为PREPARED

- SqlSessionFactory ==> new DefaultSqlSessionFactory(Configuration)

## 执行流程
- 获取SqlSession ==> SqlSessionFactory#openSession
    - DefaultSqlSessionFactory#openSessionFromDataSource
        - 事物管理: 创建事物管理构造执行引擎 (ExecutorType ==> 默认SimpleExcutor)
        - 创建执行引擎
    - queryFromDatabase
        - 创建Statement/PrepareStatement/CallbackStatement
        - 执行Sql

## 问题汇总
${} 会存在SQL注入 在解析时会将占位符替换 但是最终默认还是使用PrepareStatement 进行SQL执行

一级缓存默认开启 ==> SqlSession级别缓存
二级缓存需要手动开启 ==> SqlSessionFacory级别缓存 ==> 需要上一个session close后才会存储到二级缓存中