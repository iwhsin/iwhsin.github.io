# 交易类系统设计指南

## 概要介绍
> 资金类交易系统由于其本身的特殊性，存在资金安全、交易安全等风险，同时根据业务需要可能叠加相关活动，对性能也提出了较高要求。

## 业务核心逻辑设计
### 交易安全性
> 资金类交易系统的核心功能主要集中在订单处理、交易处理、资金处理，在进行系统处理时必须重点保证资金、交易的安全性以及规避可能造成财产损失的风险性。
* 安全性要求：
    * 前端数据准确性校验：本着前台校验不信任的原则，对于一些重要的数据，后台必须进行各类逻辑、时间、资格、状态、库存等关键的验证。
        * 数据主键类（比如商品编号）：直接信任
        * 数据属性类（比如商品单价）：绝对不能信任前端，必须通过前端传送的商品主键进行数据库查询获取
        * 用户输入类（比如购买数量、用户手机号）：信任并做业务校验，比如购买数量校验校验库存和购买规则。
    * 安全性要求：
        * SQL注入
        * 跨站脚本攻击XSS
        * 认证绕过
        * 越权操作
        * 金额负数修改
        * 数量小数更改
        * 短信轰炸
        * 卡号遍历
        * 未限定的url跳转
        * 重放攻击
        * 并发控制不完善
    * 前台页面重复性提交
    * 前后端交互，敏感信息加密传输
    * 人工调整，增加审核操作，避免误操作
    * 资金扣减，先保证源资金扣减成功，再进行交易处理
        * 账户充值时，先做资金源扣减成功，再进行帐户充值
        * 账户扣减时，先确保账户扣减成功，再进行业务交易
    * 非查询类的关键接口服务（如交易、库存调整、优惠券等）必须考虑幂等-确保重复操作均产生一样的结果。
        * `INSERT`操作，要考虑主键唯一约束，避免重复插入
        * `UPDATE`操作，要考虑交易流水唯一性、状态等，确保重复update也不会造成问题或者影响
    * 库存超卖控制
        * 总库存要通过redis进行控制，仅数据库在并发情况下是无法进行有效控制。其操作时数据库及redis中的库存必须是在服务器中完成扣减，而非查询出库存值后在外部计算完成后再绝对值update进去，并发情况下会出现超卖。
        * 单个客户的购买商品数控制（例如一人只能买一件），不能通过数据库、redis查询出来后再进行比较实现，并发下会出现超卖。建议通过redis客户商品购买锁、redis客户购买数量两种方式实现。

### 账务完整性
> 资产账户可能分为总帐户、分帐户等。
* 账务资金变动时必须遵循如下规则：
    * 总分账户平：总分类账户的发生额与分类账户的发生汇总数必须联动并保持一致；
    * 分帐户与明细帐平：分账户进、出发生明细要与交易流水明细相联动；
    * 总帐户需要有期初、期末、发生额；
### 异常分支完备性
> 账务交易过程中可能发生交易超时、失败等各类异常，设计时需考虑各种异常分支场景，针对每种异常分支场景设计对应的处理措施。
#### 账户充值超时处理机制
&emsp;&emsp;当进行帐户充值交易时，必须先确保资金源扣减成功，才能进行帐户充值交易，例如积分换里程值，必须确保积分扣减成功，才能进行帐户充值。若账户充值超时或其他异常，可采用查证接口进行联机判断，在没有获得明确成功的情况下，不允许重复调用账户充值，需要落差错对账后人工处理。
#### 账户支出超时处理机制
&emsp;&emsp;当进行帐户支出交易时，必须先确保资产账户扣减成功，才能进行业务交易。例如里程值兑换航空里程，必须里程值扣减成功后，才能进行兑换交易。若资产账户扣减超时或其他异常，可采用查证接口进行联机判断，在没有获得明确成功的情况下，则终止后续业务交易，需要落差错对账后人工处理。
#### 对账差错处理机制
&emsp;&emsp;资产账户系统逻辑上需要与小浦支付进行对账，业务处理上可能需要与第三方（例如kaligo、臻客）进行对账，对账存在的差异必须落差错，且不同的业务场景需与业务明确对应的差错处理机制。人工处理机制包括退款、补交易。
#### 循环异常处理机制
&emsp;&emsp;涉及针对客户FOR循环调整资金账户的逻辑，先设置中间状态，处理完成后更新终态，每条交易确保只做一次处理，不允许重复处理。对于终态为中间状态的数据，需人工核查后进行处理。

### 交易可追溯性
&emsp;&emsp;发生的每笔交易要有记录，交易流水不能缺失。流水必须确保唯一性，具备幂等性，流水一般包括外系统接入流水，内部流水，外系统接出流水等。
&emsp;&emsp;交易内容（明细）记录完整，例如：交易时间，交易类型，交易金额，交易状态，交易来源，交易账户或交易对手等。
&emsp;&emsp;具备交易查证能力，对于系统掉单的情况下，可以查证。

### 账务可监控性
1. 对于总分帐户余额、账户余额与账户明细是否平帐能监控；
2. 对联机交易，交易超时、交易频率、交易量、交易金额异常变动进行监控；
3. 对大额交易进行监控；
4. 批量文件处理，监控批处理完成情况，每个批次号处理的交易笔数、交易总额进行监控；
5. 对于第三方（如kaligo、臻客、兆荣等）进行实际业务交易入账，要求业务确保可监控以及核对。
6. 若存在抢兑名额类功能，名额进行监控，超卖则告警

### 灾难可控制性
&emsp;&emsp;涉及资金类系统若发生重大灾难性故障，尤其可能导致损失的情况，系统设计时需制定相关的控制措施，当问题发生时能够及时快速控制。

### 系统可扩展性
1. 所有服务均为无状态，以便于未来可灵活扩缩容；
2. 节点扩容时需同步评估及调整单源数据库的最大连接数配置；
3. 确保数据库连接具备重连机制，避免当出现数据库问题恢复后，应用系统能自愈；
4. 批处理设计时要具备自动补处理的机制（特殊情况除外），即当错过时间点或者特殊原因导致固定时间点批处理未处理，当条件具备后能补处理。

### 高性能
1. 资金交易类系统可能存在某些业务场景（例如单个商品特价、某个充值叠加活动）对系统性能要求很高，尤其是应对每周的微信推送，系统设计时要考虑如下：
    * 经常推送的活动首页（例如商品详情页、专区页等）尽量避免查询数据库，尽可能全部从缓存中获取数据；
    * 若业务场景涉及名额秒杀，本系统风险高不足以支撑，则可建议业务将资格获取和后续交易松耦合实现，在活动平台实现资格秒杀，在业务系统实现后续交易。
2. 避免频繁或不当使用服务接口轮询、数据库轮询查询等情况，影响系统性能。
3. 批处理评估读取文件或数据库单次数据量，避免一次性读取过多内容导致内存溢出。
4. 读取文件或其他批处理，要通过压测评估处理时效，保证业务能在预定时间内完成处理。
5. 后台管理功能批量导出、查询文件，要考虑性能，控制量的大小，避免由于量太大导致系统崩溃、或者影响数据库性能。
6. 表结构设计时要充分考虑未来的数据量和业务使用场景，对于大表数据要进行分区分表设计，避免制约未来系统处理能力，同时要考虑备份、数据清理策略、全局索引以及局部索引的选取。例如订单表可能存在大量数据，且操作频繁，需合理设计。
7. 涉及类似库存控制等严控数量的场景，对扣减接口要进行模拟并发压测，确保大并发下不会出现库存超卖的情况。
8. 部分高并发处理逻辑，将功能进行拆分，同步改异步。

### 一致性
* 使用缓存机制需充分保证缓存与数据库数据一致性。
    1. 对自有系统数据缓存时，若修改数据库数据，修改时需同步修改对应缓存数据，且充分评估对前端业务及客户体验的影响。
    2. 对外部系统数据缓存时，需考虑缓存时间，并告知业务可能存在的延时影响。或不容许延时的情况下，需考虑外部系统数据变化时的同步机制。

### 健壮性
* 中间件的异常情况，需考虑对应的处理方案
    * 重要业务redis连接不通改为连接数据库，或者连接备用redis
    ```
    若要实现连接主备两套redis，需要在java的config类中同时申明两个redis的bean，可使用spring的@primary注解指定其中一个bean为主redis。操作主redis捕获异常时，切换为操作备redis
    ```
* 系统间相互消息、接口交互，要考虑丢失、重复、超时等情况，采用对账处理

## 检验、监控、应急设计
### 检验
* 压力测试
    * 性能测试
    * 并发超卖测试
* 自动化测试
* 安全测试
### 监控
* 系统监控（跑批）
* 人工核查
### 应急设计
* 系统白名单
* 用户黑名单
* 菜单权限下架
* 服务降级


## 技术推荐
### 读写分离
### 异步机制
### 缓存机制
* 缓存私有化
* 缓存时效性
### 数据库
* 数据库表结构设计
* 大表分库分表、数据清理策略

