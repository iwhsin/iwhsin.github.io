## 基本数据结构

### String
### Hash
### List
### Set
### SortedSet

## 扩展数据结构

### BitMap 位图

#### 基本使用
- 命令操作
``` bash
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
``` bash
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
&emsp;&emsp;HyperLogLog 这种高级数据结构常用于基数统计并能进行自动去重如页面PV,但数据的准确性存在一定的误差.是替代set数据结构进行数据统计的利器.

#### 基本操作
- 命令操作
``` bash
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

#### 注意事项
&emsp;&emsp;HyperLogLog数据结构需要占据12k的存储空间,因此不适合存储单个用户相关的数据(用户量过多,空间成本是很大的)。<br>
&emsp;&emsp;Redis对HyperLogLog 的存储进行了优化，在计数比较小时，它的存储空间采用稀疏矩阵存储，空间占用很小，仅仅在计数慢慢变大，稀疏矩阵占用空间渐渐超过了阈值时才会一次性转变成稠密矩阵，才会占用 12k 的空间


#### 实现原理


