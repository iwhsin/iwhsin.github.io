# 1. Redis 数据结构

## 1.1. 基本数据结构

### 1.1.1. String 动态字符串

&emsp;&emsp;字符串是 Redis 最常用的数据结构,可以将不同的数据信息通过序列化为对应的子串存储到 Redis 中,通用也可以将 Redis 中的数据通过反序列获取对应的字串.

- 数据存储形式

  - 动态字符串: 可以进行修改的字符串,类似 Java 的中`ArrayList`,预分配冗余空间减少内存的频繁分配;
  - 内部结构: 是一个带长度信息的字节数组;
  - 字符串中的存储字节由 8 位组成,因此字符串又可以看做为很多位图(BitMap)

- 命令操作

  ```bash
  get set mget mset setnx incr incrby strlen
  ```

- 内部结构

  ```c++
  struct SDS<T> {
    T capacity; // 数组容量
    T len; // 数组长度
    byte flags; // 特殊标识位
    byte[] content; // 数组内容
  }
  ```

  - 带长度信息的字节数组
  - 内部存储在 44 个字节长度内使用`emdsr`,超过 44 个字节使用`raw`进行存储.
    - [Redis 对象头](#redis-对象头) 占据固定的 16 个字节大小的存储存储空间
    - 内存分配器在分配内存时, 为了能够容纳一个`emstr`对象至少需要分配 32 字节的存储空间,最大不超过 64 字节,超过 64 字节则认为是一个大字符串,该使用`raw`形式存储;
    - 对于一个标准的 SDS 字符串占用的存储空间至少为 capacity+3 个字节,并以字节`\0`作为结尾,因此 64-16-3-1=44 ==> 故而 一个 emstr 对象最多能存储 44 个字节的 SDS 字符串.

- 扩容策略
  - 1M 长度内的数据扩容时自动扩容至现有容量的 2 倍,超过 1M 每次扩容只会增加 1M 空间大小;
  - 字符串的最大长度 512M;

### 1.1.2. Hash 哈希字典

&emsp;&emsp;Redis 中的哈希字典相当于 Java 中的`HashMap`, 通过数据+链表的形式进行元素数据的存储.

- 数据存储形式
  - 数组+链表: 内部维护了一个字典数组,当键值发生哈希碰撞时,将元素存储到数组节点中链表的下一个位置处.
  - 新建一个 hash 对象时开始是用ziplist 来存储，如果 field 或者 value 的大小超出一定限制后，redis 会在内部自动将 ziplist 替换成正常的 hashtable 实现.
  - 扩容时进行 rehash 时和 Java 中`HashMap`不同, HashMap 采用的一次性进行 rehash 操作,是个耗时的操作,Redis 中的字典为了高性能,避免阻塞服务,采用了渐进式 rehash 的操作;

- 注意
  - 渐进式 rehash: 渐进式 rehash 会在 rehash 的同时，保留新旧两个 hash 结构，查询时会同时查询两个 hash 结构，然后在后续的定时任务中以及 hash 的子指令中，循序渐进地将旧 hash 的内容一点点迁移到新的 hash 结构中.
  - 字典中存储的值只能是字符串

- ziplist使用限制
  ```conf
  # 最多 512 个 fields
  hash-max-ziplist-entries 512
  # 最多 64 字节的 value 长度
  hash-max-ziplist-value 64
  ```

- 命令操作
  ```bash
  hget hset hmget hmset hgetall hlen hincrby(原子计数)
  ```

- 内部结构
  - 字典
    ``` bash
    struct dict { ...
      dictht ht[2];
    }
    ```
    - dict 结构内部包含两个 hashtable，通常情况下只有一个 hashtable 是有值的
    - 在 dict 扩容缩容时，需要分配新的 hashtable，然后进行渐进式搬迁，这时候两个 hashtable 存储的分别是旧的 hashtable 和新的 hashtable。待搬迁结束后，旧的 hashtable 被删除，新的hashtable 取而代之
  

---

### 1.1.3. List 列表

&emsp;&emsp;Redis 中的列表用于保存元素列表，可以在列表的头部或尾部添加新的元素, 相当于 Java 中的`LinkedList`链表,在数据插入和删除时速度非常快,时间复杂度为 O(1),查询和修改时进行索引定位很慢,时间复杂度为 O(n);

- 数据存储形式

  - 元素较少时使用内存连续的压缩列表 `ziplist` 进行数据存储,当数据超过一定量时会改成快速列表 `quicklist` 进行数据存储;
  - 快速列表 `quicklist` 是由多个内存连续的压缩列表构成,这样减少了内存碎片化的情况.
  - 元素最多可以存储`2^32-1`个

- 命令操作

```bash
rpush rpop lpush lpop ltrim lrange llen
```

- 内部结构
  - 压缩列表 zipList
    ```c++
    struct ziplist<T> {
      int32 zlbytes; // 整个压缩列表占用字节数
      int32 zltail_offset; // 最后一个元素距离压缩列表起始位置的偏移量，用于快速定位到最后一个节点
      int16 zllength; // 元素个数
      T[] entries; // 元素内容列表，挨个挨个紧凑存储 int8 zlend; // 标志压缩列表的结束，值恒为 0xFF
    }
    ```
    - 压缩列表是一块连续的内存空间，元素之间紧挨着存储，没有任何冗余空隙
    - ziplist 紧凑存储,没有额外的冗余空间,因此在新增一个元素时,需要调用`realloc`扩展内存,内存分配器根据当前的 ziplist 的内存大小进行扩容
    - 重新分配内存和拷贝内存就会有很大的消耗,不适合存储大型字符串，存储的元素也不宜过多
  - 快速列表 quicklist
    ```c++
    struct quicklistNode {
      quicklistNode* prev;
      quicklistNode* next;
      ziplist* zl; // 指向压缩列表
      int32 size; // ziplist 的字节总数
      int16 count; // ziplist 中的元素数量
      int2 encoding; // 存储形式 2bit，原生字节数组还是 LZF 压缩存储 ...
    }
    struct quicklist {
      quicklistNode* head;
      quicklistNode* tail;
      long count; // 元素总数
      int nodes; // ziplist 节点的个数
      int compressDepth; // LZF 算法压缩深度 ...
    }
    ```
    - quicklist 是 ziplist 和 linkedlist 的混合体，它将 linkedlist 按段切分，每一段使用 ziplist 来紧凑存储，多个 ziplist 之间使用双向指针串接起来
    - quicklist 内部默认单个 ziplist 长度为 8k 字节，超出了这个字节数，就会新起一个 ziplist。ziplist 的长度由配置参数 list-max-ziplist-size 决定

### 1.1.4. Set 集合

&emsp;&emsp;Redis 中的集合相当于 Java 中的 `HashSet`, 其内部维护的键值是无序且唯一的,内部实现相当于一个特殊的字典,字典中的值都是 NULL.

- 数据存储形式
  - inset
  - hashtable

- 命令操作

```bash
sadd smembers sismenber scard spop
```

### 1.1.5. SortedSet(Zset) 有序列表

&emsp;&emsp;Redis 中的有序列表相当于 Java 中的 SortedSet 和 HashMap 的结合体, 内部维护了有序且唯一的数组元素,同时每个元素对象可以绑定一个权重值 score.

- 数据存储形式
  - 内部实现: 采用了压缩列表 ziplist 和跳跃表 skiplist 的方式进行数据存储和查找

- 命令操作
  ```bash
  zadd zrange zrevrange zcard zscore zrangebyscore zrem
  ```

- 内部结构
  - 跳跃表 skipList
    - 类似金字塔的形式: zset 为了能够迅速得进行随机访问,采用了类似二分法的思想,引入了跳跃表
    - 跳跃表共有 64 层，意味着最多可以容纳 2^64 次方个元素
    

### 1.1.6. 总结

- list/set/hash/zset
  - 在进行元素操作当容器存在时自动进行创建
  - 当容器中的元素为空时自动进行删除

## 1.2. 扩展数据结构

### 1.2.1. BitMap 位图

#### 1.2.1.1. 基本使用

- 命令操作

```bash
# 零存整取: 存放一个字符A(0b1000001)
tx-os-redis:0>setbit key 1 1
"0"
tx-os-redis:0>setbit key 7 1
"0"
tx-os-redis:0>get key
"A"

# 整存零取: 存放已给字符a(0b01100001)
tx-os-redis:0>set x a
"OK"
tx-os-redis:0>getbit x 0
"0"
tx-os-redis:0>getbit x 1
"1"
tx-os-redis:0>getbit x 2
"1"
```

#### 1.2.1.2. 查找统计

- 命令操作

```bash
# 统计1出现的次数
tx-os-redis:0>set bit welcome
"OK"
tx-os-redis:0>bitcount bit
"33"
## 指定索引范围内字符中1出现的字数
tx-os-redis:0>bitcount bit 0 0
"6"
tx-os-redis:0>bitcount bit 0 1
"10"

# 查找第一个0/1出现的位置
tx-os-redis:0>bitpos key 0
"0"
tx-os-redis:0>bitpos key 1
"1"
# 查找指定索引范围内字符0/1最先出现的位置
tx-os-redis:0>bitpos bit 1 5 9
"1"
tx-os-redis:0>bitpos bit 1 1
"9
```

### 1.2.2. HyperLogLog 基数统计

&emsp;&emsp;HyperLogLog 这种高级数据结构常用于基数统计并能进行自动去重如页面 PV,但数据的准确性存在一定的误差.是替代 set 数据结构进行数据统计的利器.

- 命令操作

```bash
# 添加数据
tx-os-redis:0>pfadd pv u1 u2 u3 u3 u4 u5 u5
"1"
tx-os-redis:0>pfadd pv u3   # 添加重复数据会自动去重
"0"
# 统计总数
tx-os-redis:0>pfcount pv
"5"

# 数据合并汇总
tx-os-redis:0>pfadd pv1 u1 u2 u3 u3 u4 u5 u5 u6
"1"
tx-os-redis:0>pfcount pv
"5"
tx-os-redis:0>pfmerge pv pv1
"OK"
tx-os-redis:0>pfcount pv
"6"

# 数据汇总统计
tx-os-redis:0>pfadd pv2 s1 s2 s3 s4
"1"
tx-os-redis:0>pfcount pv2
"4"
tx-os-redis:0>pfcount pv pv1 pv2
"10"
```

- 注意事项

&emsp;&emsp;HyperLogLog 数据结构需要占据 12k 的存储空间,因此不适合存储单个用户相关的数据(用户量过多,空间成本是很大的)。<br>
&emsp;&emsp;Redis 对 HyperLogLog 的存储进行了优化，在计数比较小时，它的存储空间采用稀疏矩阵存储，空间占用很小，仅仅在计数慢慢变大，稀疏矩阵占用空间渐渐超过了阈值时才会一次性转变成稠密矩阵，才会占用 12k 的空间

- 实现原理

### 1.2.3. Geo 地理位置经纬度

&emsp;&emsp;Redis 中的 Geo 数据结构用于记录地址的经纬度信息, 通过 GeoHash 算法进行转换为一维编码位置,进行位置相关的数据操作.

- 数据存储形式

  - 内部存储了地址元素的精度和维护通过转换为 zset 数据结构,对应的 score 是通过 GeoHash 编码计算所得的一维整数值.

- 命令操作

```bash
geoadd geodist geopos geohash georadiusbymember georadius
```

### 1.2.4. Stream

### 1.2.5. Radix

## 1.3. Redis 对象

### 1.3.1. Redis 对象头

- 内部结构

  ```c++
  struct RedisObject {
    int4 type; // 4bits 类型
    int4 encoding; // 4bits 存储形式
    int24 lru; // 24bits
    int32 refcount; // 4bytes 引用计数
    void *ptr; // 8bytes，64-bit system 指针
  }

  // 通过debug查询对象头信息
  tencent-redis:0>debug object a
  "Value at:0x7f26ee035190 refcount:1 encoding:embstr serializedlength:14 lru:1643651 lru_seconds_idle:1040"
  tencent-redis:0>debug object hash
  "Value at:0x7f26ee028540 refcount:1 encoding:ziplist serializedlength:24 lru:1644776 lru_seconds_idle:5"
  ```

  - 对象头占据 16 个字节的存储空间
