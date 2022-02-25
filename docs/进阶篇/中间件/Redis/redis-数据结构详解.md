## 基本数据结构

### String 动态字符串

&emsp;&emsp;字符串是 Redis 最常用的数据结构,可以将不同的数据信息通过序列化为对应的子串存储到 Redis 中,通用也可以将 Redis 中的数据通过反序列获取对应的字串.

- 数据存储形式

  - 动态字符串: 可以进行修改的字符串,类似 Java 的中`ArrayList`,预分配冗余空间减少内存的频繁分配;
  - 自动扩容: 1M 长度内的数据扩容时自动扩容至现有容量的 2 倍,超过 1M 每次扩容只会增加 1M 空间大小;
  - 字符串的最大长度 512M;
  - 字符串中的存储字节由 8 位组成,因此字符串又可以看做为很多位图(BitMap)

- 命令操作

```bash
get set mget mset setnx incr incrby
```

### Hash 哈希字典

&emsp;&emsp;Redis 中的哈希字典相当于 Java 中的`HashMap`, 通过数据+链表的形式进行元素数据的存储.

- 数据存储形式

  - 数组+链表: 内部维护了一个字典数组,当键值发生哈希碰撞时,将元素存储到数组节点中链表的下一个位置处.
  - 扩容时进行 rehash 时和 Java 中`HashMap`不同, HashMap 采用的一次性进行 rehash 操作,是个耗时的操作,Redis 中的字典为了高性能,避免阻塞服务,采用了渐进式 rehash 的操作;

- 注意

  - 渐进式 rehash: 渐进式 rehash 会在 rehash 的同时，保留新旧两个 hash 结构，查询时会同时查询两个 hash 结构，然后在后续的定时任务中以及 hash 的子指令中，循序渐进地将旧 hash 的内容一点点迁移到新的 hash 结构中.
  - 字典中存储的值只能是字符串

- 命令操作

```bash
hget hset hmget hmset hgetall hlen hincrby(原子计数)
```

### List 列表

&emsp;&emsp;Redis 中的列表相当于 Java 中的`LinkedList`链表,在数据插入和删除时速度非常快,时间复杂度为 O(1),查询和修改时进行索引定位很慢,时间复杂度为 O(n);

- 数据存储形式

  - 元素较少时使用内存连续的压缩列表 `ziplist` 进行数据存储,当数据超过一定量时会改成快速列表 `quicklist` 进行数据存储;
  - 快速列表 `quicklist` 是由多个内存连续的压缩列表构成,这样减少了内存碎片化的情况.

- 命令操作

```bash
rpush rpop lpush lpop ltrim lrange llen
```

### Set 集合

&emsp;&emsp;Redis 中的集合相当于 Java 中的 `HashSet`, 其内部维护的键值是无序且唯一的,内部实现相当于一个特殊的字典,字典中的值都是 NULL

- 命令操作

```bash
sadd smembers sismenber scard spop
```

### SortedSet(Zset) 有序列表

&emsp;&emsp;Redis 中的有序列表相当于 Java 中的 SortedSet 和 HashMap 的结合体, 内部维护了有序且唯一的数组元素,同时每个元素对象可以绑定一个权重值 score.

- 数据存储形式

  - 内部实现: 采用了压缩列表 ziplist 和跳跃表 skiplist 的方式进行数据存储和查找

- 跳跃表

  - 类似金字塔的形式: zset 为了能够迅速得进行随机访问,采用了类似二分法的思想,引入了跳跃表,最多可以分为 31 层

- 命令操作

```bash
zadd zrange zrevrange zcard zscore zrangebyscore zrem
```

### 总结

- list/set/hash/zset
  - 在进行元素操作当容器存在时自动进行创建
  - 当容器中的元素为空时自动进行删除

## 扩展数据结构

### BitMap 位图

#### 基本使用

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

#### 查找统计

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

### HyperLogLog 基数统计

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

### Geo 地理位置经纬度

&emsp;&emsp;Redis 中的 Geo 数据结构用于记录地址的经纬度信息, 通过 GeoHash 算法进行转换为一维编码位置,进行位置相关的数据操作.

- 数据存储形式

  - 内部存储了地址元素的精度和维护通过转换为 zset 数据结构,对应的 score 是通过 GeoHash 编码计算所得的一维整数值.

- 命令操作

```bash
geoadd geodist geopos geohash georadiusbymember georadius
```
