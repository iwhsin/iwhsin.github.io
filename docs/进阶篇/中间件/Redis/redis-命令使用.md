
### 1.2.1. 基本使用

#### 1.2.1.1. 字符串操作

&emsp;&emsp;字符串操作的主要命令形式为：`set key value [EX seconds] [PX milliseconds] [NX|XX]`

#### 1.2.1.2. 服务器相关命令

&emsp;&emsp;`AUTH`、`ECHO`、`PING`、`QUIT`、`SELECT`、`DBSIZE`、info、monitor、config get、flushdb、flushall

- 元素存储
  ```bash
  # 保存一个字符串值
  127.0.0.1:6379> set key value
  OK
  # 保存一个字符串，当指定的键值不存在才进行存储，否则返回`nil`
  127.0.0.1:6379> set key val NX
  OK
  127.0.0.1:6379> set key value NX
  (nil)
  ```

#### 1.2.1.3. 键值操作命令

- **键值基本操作**

  ```bash
  # 删除指定的键值
  ## DEL key [key ...]DEL
  # 序列化指定键对应的值
  127.0.0.1:6379> set A Hello
  OK
  127.0.0.1:6379> dump A
  "\x00\x05Hello\b\x00\x05\xe4\x1bW\x94\x1cu\xbb"
  # 反序列指定的值并存储到对应的键值中,如果指定的键值已存在则报错
  127.0.0.1:6379> restore newA 0 "\x00\x05Hello\b\x00\x05\xe4\x1bW\x94\x1cu\xbb"
  OK
  127.0.0.1:6379> get newA
  "Hello"
  # 判断指定的键值对象是否存在
  EXISTS key [key ...]
  # 设置过期时间
  EXPIRE key seconds
  PEXPIRE key milliseconds
  EXPIREAT key timestamp
  PEXPIREAT key milliseconds-timestamp
  # 查看满足指定规则的键值
  KEYS pattern
  MIGRATE host port key destination-db timeout [COPY] [REPLACE]
  MOVE key db
  PERSIST key
  TTL key
  PTTL key
  TYPE KEY
  RANDOMKEY
  RENAME key newkey
  RENAMENX key newkey
  ```

#### 1.2.1.4. 字符串操作

&emsp;&emsp;字符串操作的主要命令形式为：`set key value [EX seconds] [PX milliseconds] [NX|XX]`

- 元素存储

  ```bash
  # 保存一个字符串值
  127.0.0.1:6379> set key value
  OK
  # 保存一个字符串，当指定的键值不存在才进行存储，否则返回`nil`
  127.0.0.1:6379> set key val NX
  OK
  127.0.0.1:6379> set key value NX
  (nil)

  # 保存一个字符串，当指定的键值存在才进行存储更新，否则返回`nil`
  127.0.0.1:6379> set key value XX
  OK
  127.0.0.1:6379> set key-not-exist value XX
  (nil)
  ```

- 元素查询

  ```bash
  # 从Redis中获取指定键值对应存储的字符串
  127.0.0.1:6379> get key
  # 判断指定的键值是否存在，返回存在的个数
  127.0.0.1:6379> exists A
  (integer) 1
  127.0.0.1:6379> exists A B R
  (integer) 2
  ```

- 设置元素对应的键过期时间

  ```bash
  # 保存一个字符串值并设置超时时间，单位秒
  127.0.0.1:6379> set key value EX 8
  OK

  # 保存一个字符串值并设置超时时间，单位毫秒，注意这个是不能和EX参数一起使用
  127.0.0.1:6379> set key value PX 8000
  OK

  # 设置指定键值的超时时间，单位是秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> expire key 5
  (integer) 1

  # 设置指定键值的超时时间，单位是毫秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> pexpire key 5000
  (integer) 1
  # 保存一个字符串值并设置超时时间，单位毫秒，注意这个是不能和EX参数一起使用
  127.0.0.1:6379> set key value PX 8000
  OK

  # 设置指定键值的超时时间（以指定时间戳作为值），单位是秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> expireAt A 1616044980
  (integer) 1
  # 设置指定键值的超时时间，单位是秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> expire key 5
  (integer) 1

  # 设置指定键值的超时时间（以指定时间戳作为值），单位是毫秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> pexpireAt A 1616044980000
  (integer) 1
  # 设置指定键值的超时时间，单位是毫秒，过期自动删除，如果指定的键值不存在返回`0`
  127.0.0.1:6379> pexpire key 5000
  (integer) 1

  ```

- 查看对应键值是否过期

  ```bash
  # 查看指定键值状态是否过期，返回`-1`表示永不过期，返回`-2`表示过期，返回非负整数表示剩余有效时间
  127.0.0.1:6379> ttl key
  (integer) -1
  # 查看指定键值状态是否过期，未过期返回剩余有效时间单位秒
  127.0.0.1:6379> ttl key
  (integer) 2
  # 查看指定键值状态是否过期，已经过期返回`-2`
  127.0.0.1:6379> ttl key
  (integer) -2
  ```

- 删除指定的键值
  ```bash
  # 删除指定的键值，并返回删除成功的个数
  ## 删除一个不存在的键值，返回`0`
  127.0.0.1:6379> DEL CLL
  (integer) 0
  127.0.0.1:6379> unlink J
  (integer) 0
  ## 删除指定的键值，其中C不存在，A和B存在
  127.0.0.1:6379> DEL C A B
  (integer) 2
  ## 删除指定的键值，其中C不存在，A和B存在
  127.0.0.1:6379> unlink C B A
  (integer) 2
  ```
  > [!NOTE] > `DEL`和`UNLINK`都是可以同步删除指定的键值，区别在于 DEL 会同步删除键值对应存储的元素对象，释放空间，而`UNLINK`会根据元素对象的数据类型和大小判断是否采用异步删除的方式。
  > 对于`字符串类型`,使用都是采用的同步删除元素对象的方式。

#### 1.2.1.5. List 列表操作

&emsp;&emsp;一些涉及到键对象的操作同字符串如：键的删除，超时，重命名等。

- **元素存储**

  ```bash
  # 添加一个list列表到数据库中，如果集合存在则追加元素到列表头部，否则创建一个list列表对象并将元素存储到列表中
  127.0.0.1:6379> LPUSH list a b c
  (integer) 3
  # 当指定的键值存在时，添加元素对象到列表的头部，否则返回`0`
  127.0.0.1:6379> LPUSHX list a b c
  (integer) 7
  127.0.0.1:6379> LPUSHX list1 a
  (integer) 0
  # 将指定元素添加到指定列表的尾部，如果指定的列表不存在则创建一个新的列表对象
  127.0.0.1:6379> LRANGE test 0 15
  1) "a"
  2) "b"
  3) "a"
  127.0.0.1:6379>
  127.0.0.1:6379> RPUSH test j
  (integer) 4
  127.0.0.1:6379> LRANGE test 0 15
  1) "a"
  2) "b"
  3) "a"
  4) "j"
  # 将指定元素添加到指定列表的尾部，如果指定的列表不存在则返回`0`
  127.0.0.1:6379> RPUSHX test1 j
  (integer) 0
  # 像指定的键值对应的list列表中的指定元素`a`的前或者后插入一个新的元素对象`u`
  127.0.0.1:6379> LINSERT list before a u
  (integer) 13

  ```

- **元素查询**

  ```bash
  # 查询指定键值对应的列表集合中的元素的个数
  127.0.0.1:6379> LLEN list
  (integer) 13
  # 查询指定键值对应列表的指定索引位上的元素
  127.0.0.1:6379> LINDEX list 1
  "b"
  # 查询指定键值列表中指定索引范围内的元素对象
  127.0.0.1:6379> LRANGE list 0 5
  1) "c"
  2) "b"
  3) "x"
  4) "u"
  5) "u"
  6) "a"
  # 查询指定键值列表的头元素并从集合列表中删除此元素
  127.0.0.1:6379> LRANGE test 0 5
  1) "a"
  127.0.0.1:6379> LPOP test
  "a"
  127.0.0.1:6379> LRANGE test 0 5
  (empty list or set)
  # 查询指定键值列表的尾元素并从集合列表中删除此元素
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  5) "a"
  6) "a"
  127.0.0.1:6379> RPOP list
  "a"
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  5) "a"

  ```

- **元素修改**

  ```bash
  # 修改指定键值对应的列表中的指定索引位的元素对象
  127.0.0.1:6379> LRANGE list 0 15
  1) "c"
  2) "a"
  3) "c"
  4) "b"
  5) "x"
  6) "u"
  7) "u"
  8) "a"
  9) "a"
  10) "a"
  ## 修改索引为`0`的元素为`g`
  127.0.0.1:6379> LSET list 0 g
  OK
  127.0.0.1:6379> LRANGE list 0 15
  1) "g"
  2) "a"
  3) "c"
  4) "b"
  5) "x"
  6) "u"
  7) "u"
  8) "a"
  9) "a"
  10) "a"

  # 将指定列表中的尾部元素移动到指定列表中的头部`RPOPLPUSH source destination`
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  5) "a"
  127.0.0.1:6379> LRANGE test 0 15
  1) "b"
  2) "a"
  127.0.0.1:6379> RPOPLPUSH list test
  "a"
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  127.0.0.1:6379> LRANGE test 0 15
  1) "a"
  2) "b"
  3) "a"

  ```

- **元素删除**

  ```bash
  # 删除指定键值对应的列表中与指定元素值相同的元素对象`LREM key count value`
  ## 如果count值为`0`则表示删除所有与指定元素相同的元素对象，如果count>0从表头开始删除`count`个元素对象,如果count<0从表尾开始删除`count`个元素对象
  127.0.0.1:6379> LRANGE list 0 15
  1) "c"
  2) "a"
  3) "c"
  4) "b"
  5) "x"
  6) "u"
  7) "u"
  8) "a"
  9) "a"
  10) "a"
  11) "a"
  127.0.0.1:6379> LREM list -1 a
  (integer) 1
  127.0.0.1:6379> LRANGE list 0 15
  1) "c"
  2) "a"
  3) "c"
  4) "b"
  5) "x"
  6) "u"
  7) "u"
  8) "a"
  9) "a"
  10) "a"
  ## 截取指定键值对应的列表的指定范围内的元素（删除指定范围外的其它元素对象）
  127.0.0.1:6379> LRANGE list 0 15
  1) "g"
  2) "a"
  3) "c"
  4) "b"
  5) "x"
  6) "u"
  7) "u"
  8) "a"
  9) "a"
  10) "a"
  127.0.0.1:6379> LTRIM list 3 8
  OK
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  5) "a"
  6) "a"
  ```

- **阻塞命令的使用**

  ```bash
  # 从指定列表中获取头部对象，如果指定列表为空或不存在，则阻塞等待指定的时间（单位秒），当列表中在指定时间内有新的元素则获取新的元素对象。
  ## `BLPOP key [key ...] timeout
  127.0.0.1:6379> LRANGE test 0 15
  (empty list or set)
  127.0.0.1:6379> BLPOP test 10
  1) "test"
  2) "1"
  (7.49s)
  # 从指定列表中获取尾部对象，如果指定列表为空或不存在，则阻塞等待指定的时间（单位秒），当列表中在指定时间内有新的元素则获取新的元素对象
  127.0.0.1:6379> LRANGE test 0 15
  (empty list or set)
  127.0.0.1:6379> BRPOP test 10
  1) "test"
  2) "1"
  (7.49s)

  # 将指定列表中的尾部元素移动到指定列表中的头部，如果指定列表为空，则阻塞等待，当列表中在指定时间内有新的元素则继续进行操作
  127.0.0.1:6379> LRANGE list 0 15
  1) "b"
  2) "x"
  3) "u"
  4) "u"
  127.0.0.1:6379> LRANGE test 0 15
  (empty list or set)
  127.0.0.1:6379> BRPOPLPUSH test list 15
  "newVal"
  (2.49s)
  127.0.0.1:6379> LRANGE test 0 15
  (empty list or set)
  127.0.0.1:6379> LRANGE list 0 15
  1) "newVal"
  2) "b"
  3) "x"
  4) "u"
  5) "u"
  ```

  > [!NOTE] > &emsp;&emsp;Redis 本身是单进程单线程的处理方式，对于链表的阻塞操作的命令操作是否会影响性能？<br> > &emsp;&emsp;显然是不会的，在 Redis 的服务中有两个循环任务：IO 循环和定时事件。其中`IO循环`主要是 Redis 用来完成客户端的连接应答，请求命令处理和处理结果反馈等，`定时事件`主要是 Redis 完成过期键的检测等。<br> > &emsp;&emsp;Redis 的一次连接处理过程主要有：IO 多路复用检测套接字状态，套接字事件分派和请求事件处理。在处理类似`BLPOP`等阻塞命令时会先查找键值对应的链表是否存在，如果存在就正常进行处理，如果不存在，则会将对应的键值添加到内部维护的`blocking_list`数据结构中，同时对应的客户端被阻塞，当下一次有 PUSH 操作进来时先去`blocking_list`查找对应的键值是否存在，如果存在，将键值添加到`ready_keys`链表中，同时将 Value 插入到链表中响应请求客户端。<br> > &emsp;&emsp;在请求客户端进行`PUSH`操作完成并响应结束后,Redis 会遍历`ready_keys`链表,并从`blocking_list`中找到被阻塞的客户端进行进一步响应操作。<br> > &emsp;&emsp;综上可知：Redis 是通过`blocking_list`和`ready_keys`两个链表和时间循环来处理阻塞事件的。

#### 1.2.1.6. 哈希列表

&emsp;&emsp;哈希列表在 Redis 中的存储类似于 Java 中的 HashMap 数据结构，可以很方便的进行对象存储，在进行元素修改时，可以操作对象中的指定属性值，避免了字符串这种形式的全量更新。

- **元素存储**

  ```bash
  # 添加指定的key-value对象到指定的键值对应的哈希列表中，如果哈希列表则创建一个新的哈希列表，返回新增的key-value元素对象的个数
  127.0.0.1:6379> HSET hash name Name age 11
  (integer) 1
  # 添加指定的key-value对象到指定的键值对应的哈希列表中，如果哈希列表中存在此字段属性，则不做处理，如果哈希列表则创建一个新的哈希列表，返回新增的key-value元素对象的个数
  127.0.0.1:6379> hsetnx hash name nxName
  (integer) 0
  127.0.0.1:6379> hget hash name
  "mName"
  ```

- **元素查询**

  ```bash
  # 查询指定哈希列表中的字段属性是否存在
  127.0.0.1:6379> HEXISTS hash name
  (integer) 0
  127.0.0.1:6379> HEXISTS hash age
  (integer) 1
  # 查询指定哈希列表中的字段属性对应的值
  127.0.0.1:6379> HGET hash name
  (nil)
  127.0.0.1:6379> HGET hash age
  "12"
  # 查询指定哈希列中的多个字段属性对应的值
  127.0.0.1:6379> HMGET hash age name
  1) "21.80000000000000071"
  2) "newName"
  # 查询指定哈希列表中的全部字段属性值
  127.0.0.1:6379> HGETALL hash
  1) "age"
  2) "12"
  # 查询指定哈希列表中存在的字段属性对应的键值
  127.0.0.1:6379> HKEYS hash
  1) "age"
  2) "name"
  3) "addr"
  4) "newField"
  # 查询指定哈希列表中存在的字段属性对应的value值的列表
  127.0.0.1:6379> hvals hash
  1) "20"
  2) "mName"
  3) "SH"
  4) "5"
  5) "nul"

  # 查询指定哈希列表中存在的字段属性的个数
  127.0.0.1:6379> HLEN hash
  (integer) 4
  ```

- **元素修改**

  ```bash
  # 修改指定的哈希列表中的指定字段属性的值
  127.0.0.1:6379> HSET hash name newName
  (integer) 0
  127.0.0.1:6379> HGET hash name
  "newName"
  # 同时修改指定哈希列表中的多个属性字段对应的值，如果对应的字段属性不存在则添加一个新的字段属性
  127.0.0.1:6379> HMSET hash age 20 name mName
  OK
  127.0.0.1:6379> HMGET hash age name
  1) "20"
  2) "mName"
  # 将指定的哈希列表中指定的字段属性值增加指定数值，如果对应的字段属性值不是`Integer`则报错，如果对应的字段属性不存在则增加一个新的字段属性
  127.0.0.1:6379> HGETALL hash
  1) "age"
  2) "12"
  3) "name"
  4) "newName"
  5) "addr"
  6) "SH"
  127.0.0.1:6379> HINCRBY hash newField 5
  (integer) 5
  127.0.0.1:6379> HINCRBY hash age 3
  (integer) 15
  127.0.0.1:6379> HGETALL hash
  1) "age"
  2) "15"
  3) "name"
  4) "newName"
  5) "addr"
  6) "SH"
  7) "newField"
  8) "5"
  # 将指定的哈希列表中指定的字段属性值增加指定数值,`HINCRBYFLOAT`可以增加指定的浮点数，运算过程中存在误差不建议使用
  127.0.0.1:6379> HINCRBYFLOAT hash age 3
  "18"
  127.0.0.1:6379> HGET hash age
  "18"
  127.0.0.1:6379> HINCRBYFLOAT hash age 3.8
  "21.80000000000000071"
  127.0.0.1:6379> HGET hash age
  "21.80000000000000071"
  ```

- **元素删除**
  ```bash
  # 删除指定哈希列表中的key-value元素对象，并返回删除的元素对象的个数
  ## HDEL key field [field ...]
  127.0.0.1:6379> HDEL hash name
  (integer) 1
  ```

#### 1.2.1.8. 不重复元素结合-SET

- **元素存储**

  ```bash
  # 向指定的元素集合中添加元素，如果指定的元素集合不存在则新创建一个集合，如果元素已存在则忽略
  127.0.0.1:6379> SADD set a b c
  (integer) 3
  ```

- **元素查询**

  ```bash
  # 查询元素集合中的元素个数
  127.0.0.1:6379> SCARD set
  (integer) 4
  # 查看指定元素集合中的全部元素
  127.0.0.1:6379> SMEMBERS set
  1) "c"
  2) "a"
  3) "abc"
  4) "b"
  127.0.0.1:6379> SINTER set
  1) "b"
  2) "c"
  3) "a"
  4) "abc"
  # 查询指定的元素集合中是否存在某元素
  ## SISMEMBER key member
  127.0.0.1:6379> SISMEMBER set f
  (integer) 0
  127.0.0.1:6379> SISMEMBER set a
  (integer) 1
  # 随机从指定的元素集合中返回指定个数的元素
  127.0.0.1:6379> SRANDMEMBER set 3
  1) "c"
  2) "k"
  3) "i"
  ```

- **元素统计**

  ```bash
  # 统计获取当前元素集合中存在且目标元素集合中不存在的元素（差集）
  127.0.0.1:6379> SMEMBERS set
  1) "b"
  2) "c"
  3) "a"
  4) "abc"
  127.0.0.1:6379> SMEMBERS setB
  1) "c"
  2) "f"
  3) "b"
  127.0.0.1:6379> SDIFF set setB
  1) "a"
  2) "abc"
   # 统计获取当前元素集合中存在且目标元素集合中不存在的元素（差集），并存储到指定的元素集合中，如果集合不存在则创建新的集合
   127.0.0.1:6379> smembers set
  1) "b"
  2) "c"
  3) "a"
  4) "abc"
  127.0.0.1:6379> smembers setB
  1) "c"
  2) "f"
  3) "b"
  127.0.0.1:6379> SDIFFSTORE newSet set setB
  (integer) 2
  127.0.0.1:6379> smembers newSet
  1) "a"
  2) "abc"
  # 统计两个元素集合中都存在元素对象（交集）
  127.0.0.1:6379> SMEMBERS set
  1) "c"
  2) "a"
  3) "abc"
  4) "b"
  127.0.0.1:6379> SMEMBERS setB
  1) "c"
  2) "f"
  3) "b"
  127.0.0.1:6379> SINTER set setB
  1) "c"
  2) "b"
  # 统计两个元素集合中都存在元素对象（交集）,并存在指定的元素集合中，如果此集合不存在则创建一个新的元素集合
  127.0.0.1:6379> SINTERSTORE interSet set setB
  (integer) 2
  127.0.0.1:6379> SMEMBERS interSet
  1) "c"
  2) "b"
  # 统计两个元素集合的并集
  ## SUNION key [key ...]
  127.0.0.1:6379> SMEMBERS set
  1) "c"
  2) "k"
  3) "i"
  4) "b"
  127.0.0.1:6379> SMEMBERS setB
  1) "c"
  2) "f"
  3) "b"
  127.0.0.1:6379> SUNION set setB
  1) "c"
  2) "k"
  3) "i"
  4) "f"
  5) "b"
  # 统计两个元素集合的并集并存储到指定的元素集合中，如果指定的集合不存在则创建
  127.0.0.1:6379> SUNIONSTORE UNIONSET set setB
  (integer) 5
  127.0.0.1:6379> SMEMBERS UNIONSET
  1) "c"
  2) "k"
  3) "i"
  4) "f"
  5) "b"
  ```

- **元素修改**
  ```bash
  # 将一个集合中的指定元素移动到另一个集合中，如果目标集合不存在则新创建一个元素集合
  127.0.0.1:6379> SMOVE set setB ab
  (integer) 0
  127.0.0.1:6379> SMOVE set setB abc
  (integer) 1
  127.0.0.1:6379> SMEMBERS set
  1) "c"
  2) "a"
  3) "b"
  127.0.0.1:6379> SMEMBERS setB
  1) "c"
  2) "abc"
  3) "f"
  4) "b"
  # 从指定的元素集合中移除指定个数的元素，并返回移除的元素对象
  127.0.0.1:6379> SMEMBERS set
  1) "b"
  2) "f"
  3) "g"
  4) "j"
  5) "c"
  6) "k"
  7) "a"
  8) "e"
  9) "i"
  10) "d"
  127.0.0.1:6379> SPOP set 5
  1) "f"
  2) "a"
  3) "j"
  4) "g"
  5) "d"
  # 移除指定元素集合中的指定元素对象，如果指定元素对象不存在则忽略
  ## SREM key member [member ...]
  127.0.0.1:6379> SREM set e
  (integer) 1
  127.0.0.1:6379> SREM set e
  (integer) 0
  ```

#### 1.2.1.9. 有序不重复元素集合-SortedSet

&emsp;&emsp;区别于 Set 集合，SortedSet 为每个元素对象维护了一个`score`字段属性（double），通过此字段来完成集合中元素的排序。

- **元素存储**

  ```bash
  # 将指定的元素对象添加到有序元素集合中，如果集合不存在则创建
  127.0.0.1:6379> ZADD zset 50 A 60 B 70 C
  (integer) 3
  ```

- **元素查询**

  ```bash
  # 统计元素集合中元素的个数
  ##  ZCARD key
  127.0.0.1:6379> ZCARD zset
  (integer) 3
  # 统计指定集合中分值在指定范围内的元素个数
  ## ZCOUNT key min max
  127.0.0.1:6379> ZCOUNT zset 50 65
  (integer) 2
  # 查询指定索引范围内的元素对象（根据升序排列）
  ## ZRANGE key start stop [WITHSCORES]
  127.0.0.1:6379> ZRANGE zset 0 2
  1) "B"
  2) "A"
  3) "C"
  ## WITHSCORES 指定输出结果包含元素对象的分值
  127.0.0.1:6379> ZRANGE zset 0 2 WITHSCORES
  1) "B"
  2) "60"
  3) "A"
  4) "60.799999999999997"
  5) "C"
  6) "70"
  # 查询指定分支范围内的元素对象
  ## ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
  127.0.0.1:6379> ZRANGEBYSCORE zset 50 60
  1) "B"
  127.0.0.1:6379> ZRANGEBYSCORE zset 50 60 WITHSCORES
  1) "B"
  2) "60"
  # 查询集合中指定的元素的排名（分值越高排名越大）
  ## ZRANK key member
  127.0.0.1:6379> ZRANK zset A
  (integer) 1
  # 查询集合中指定索引范围内的逆序输出结果
  ## ZREVRANGE key start stop [WITHSCORES]
  127.0.0.1:6379> ZREVRANGE zset 0 100 WITHSCORES
  1) "e"
  2) "38"
  3) "d"
  4) "15"
  # 查询集合中指定分值范围内的逆序输出结果
  ## ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
  127.0.0.1:6379> ZREVRANGEBYSCORE zset 100 0
  1) "e"
  2) "d"
  # 查询逆序排名中指定元素的排名（分值越大排名越底）
  127.0.0.1:6379> ZREVRANK zset d
  (integer) 1
  # 查询集合中指定元素对应的分值
  127.0.0.1:6379> ZSCORE zset e
  "38"
  ```

- **元素修改**

  ```bash
  # 将元素集合中指定的元素对象的分值增加指定的数目
  127.0.0.1:6379> ZCOUNT zset 55 65
  (integer) 1
  127.0.0.1:6379> ZINCRBY zset 5 A
  "55"
  127.0.0.1:6379> ZCOUNT zset 55 65
  (integer) 2
  # 删除集合中的指定元素，元素不存在则忽略
  ## ZREM key member [member ...]
  127.0.0.1:6379> ZREM zset A
  (integer) 1
  # 删除集合中指定分值排名范围内的元素
  127.0.0.1:6379> ZRANK zset B
  (integer) 6
  127.0.0.1:6379> ZREMRANGEBYRANK zset 5 6
  (integer) 2
  127.0.0.1:6379> ZRANGE zset 0 55
  1) "a"
  2) "b"
  3) "c"
  4) "d"
  5) "e"
  # 删除集合中指定分值范围内的元素
  127.0.0.1:6379> ZRANGE zset 0 55 WITHSCORES
  1) "a"
  2) "10"
  3) "b"
  4) "11"
  5) "c"
  6) "12"
  7) "d"
  8) "15"
  9) "e"
  10) "38"
  127.0.0.1:6379> ZREMRANGEBYSCORE zset 10 12
  (integer) 3
  127.0.0.1:6379> ZRANGE zset 0 55 WITHSCORES
  1) "d"
  2) "15"
  3) "e"
  4) "38"
  ```

- **元素统计**
  ```bash
  # 统计两个集合的交集并存储到指定的元素集合中，分值是两个集合中元素的分值的和
  127.0.0.1:6379> ZINTERSTORE asetI 2 asetA asetB
  (integer) 3
  127.0.0.1:6379> ZRANGE asetI 0 100 WITHSCORES
  1) "a"
  2) "22"
  3) "b"
  4) "27"
  5) "c"
  6) "29"
  # 统计两个集合的并集并存储到指定的元素集合中，分值是两个集合中元素的分值的和
  127.0.0.1:6379> ZADD asetA 11 a 12 b 13 c
  (integer) 3
  127.0.0.1:6379> ZADD asetB 11 a 15 b 16 c 17 d
  (integer) 4
  127.0.0.1:6379> ZUNIONSTORE asetU 2 asetA asetB
  (integer) 4
  127.0.0.1:6379> ZRANGE asetU 0 100 WITHSCORES
  1) "d"
  2) "17"
  3) "a"
  4) "22"
  5) "b"
  6) "27"
  7) "c"
  8) "29"
  ```

### 命令使用

#### 清空数据库[flushdb/flushall]

### 1.2.2. 事务操作

&emsp;&emsp;Redis 中支持事务操作，允许将一个事务中的多条命令同时执行，执行的结果要么全部成功，要么全部失败。

- **事务执行步骤**

  ```bash
  # 使用`MULTI`开启一个事物
  127.0.0.1:6379> MULTI
  OK
  # 执行操作，每一个操作都存放在一个队列中
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> get t1
  QUEUED
  # 通过EXEC提交事务执行队列中的操作
  127.0.0.1:6379> EXEC
  1) (integer) 18
  2) (integer) 19
  3) (integer) 20
  4) "20"
  ```

- **事务中断**<br>
  &emsp;&emsp;如果在事务操作过程中，想中断事务中的操作，可以通过`DISCARD`放弃当前事务。

```bash
# 7. 使用`MULTI`开启一个事物
127.0.0.1:6379> MULTI
OK
# 8. 执行操作，每一个操作都存放在一个队列中
127.0.0.1:6379> INCR t1
QUEUED
127.0.0.1:6379> INCR t1
QUEUED
127.0.0.1:6379> INCR t1
QUEUED
127.0.0.1:6379> get t1
QUEUED
# 9. 通过EXEC提交事务执行队列中的操作
127.0.0.1:6379> EXEC
1) (integer) 18
2) (integer) 19
3) (integer) 20
4) "20"
```

- **事务中断**<br>
  &emsp;&emsp;如果在事务操作过程中，想中断事务中的操作，可以通过`DISCARD`放弃当前事务。

- 对象监视（类似于锁）

  ```bash
  # 监控对象,需要在事务开启前进行
  127.0.0.1:6379> WATCH t1
  OK
  # 事务执行
  127.0.0.1:6379> MULTI
  OK
  127.0.0.1:6379> get t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> INCR t1
  QUEUED
  127.0.0.1:6379> get t1
  QUEUED
  # 事务提交前其它客户端修改了t1的值
  127.0.0.1:6379> get t1
  "20"
  127.0.0.1:6379> INCR t1
  (integer) 21
  # 再进行事务的提交，事务自动中断，未执行队列中的任务
  127.0.0.1:6379> EXEC
  (nil)
  ```