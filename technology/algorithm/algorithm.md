# 算法专题 :id=algorithm

## 1. 案例实践 :id=practice-case

### 1.1. 全局唯一 ID :id=global-unique-id

#### 1.1.1. UUID :id=unique-id-with-uuid

- 优点
  - 简单，代码方便。
  - 生成 ID 性能非常好，基本不会有性能问题。
  - 全球唯一，在遇见数据迁移，系统数据合并，或者数据库变更等情况下，可以从容应对。
- 缺点
  - 没有排序，无法保证趋势递增。
  - UUID 往往是使用字符串存储，查询的效率比较低。
  - 存储空间比较大，如果是海量数据库，就需要考虑存储量的问题。
  - 传输数据量大
  - 不可读。

#### 1.1.2. 数据库序列号或自增主键 :id=unique-id-with-database

- 优点

  - 简单，代码方便，性能可以接受。
  - 数字 ID 天然排序，对分页或者需要排序的结果很有帮助。

- 缺点

  - 不同数据库语法和实现不同，数据库迁移的时候或多数据库版本支持的时候需要处理。
  - 在单个数据库或读写分离或一主多从的情况下，只有一个主库可以生成。有单点故障的风险。
  - 在性能达不到要求的情况下，比较难于扩展。
  - 如果遇见多个系统需要合并或者涉及到数据迁移会相当痛苦。
  - 分表分库的时候会有麻烦。

- 优化方案

?> 在涉及分库分表可以通过设置相同其实数值不同增长步长来解决冲突问题。

#### 1.1.3. MySQL+REPLACE INTO

#### 1.1.4. Redis :id=unique-id-with-redis

?> 当使用数据库来生成 ID 性能不够要求的时候，我们可以尝试使用 Redis 来生成 ID。这主要依赖于 Redis 是单线程的，所以也可以用生成全局唯一的 ID。可以用 Redis 的原子操作 INCR 和 INCRBY 来实现。

- 优点

  - 不依赖于数据库，灵活方便，且性能优于数据库。
  - 数字 ID 天然排序，对分页或者需要排序的结果很有帮助。

- 缺点
  - 如果系统中没有 Redis，还需要引入新的组件，增加系统复杂度。
  - 需要编码和配置的工作量比较大。

#### 1.1.5. MongoDB ObjectID

?> MongoDB 中每一条记录都有一个’id’字段用来唯一标示本记录。如果用户插入数据时没有显示提供’id’字段，那么系统会自动生成一个。ObjectID 一共 12Bytes，设计的时候充分考虑了分布式环境下使用的情况，所以能保证在一个分布式 MongoDB 集群中唯一。

```text
0        4      7    9      12
+--------+------+----+------+
|time    |pc    |pid |inc   |
+--------+------+----+------+
```

- 核心思想

  - 前四个字节是 Unix Timestamp。
  - 接着三个字节是当前机器“hostname/mac 地址/虚拟编号”其中之一的 MD5 结果的前 3 个字节。
  - 接着两个字节是当前进程的 PID。
  - 最后三个字节是累加计数器或是一个随机数（只有当不支持累加计数器时才用随机数）。

- 示例

```java
package cn.whsin.whim.lang.generator;

import cn.whsin.whim.lang.reflect.ClassLoaderUtil;
import cn.whsin.whim.util.RandomUtil;
import java.lang.management.ManagementFactory;
import java.net.NetworkInterface;
import java.nio.ByteBuffer;
import java.time.Instant;
import java.util.Enumeration;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.experimental.UtilityClass;

/**
 * Id生成器对象.
 * <pre>
 * 设计思想: 参考MongoDb中的ObjectId.
 * </pre>
 *
 * @author whsin
 * @version 1.0.0
 * @see <a href="https://github.com/mongodb/mongo-java-driver/blob/master/bson/src/main/org/bson/types/ObjectId.java">ObjectId</a>
 * @see <a href="https://blog.csdn.net/qxc1281/article/details/54021882">objectId生成可读性唯一ID</a>
 * @since 2021-08-16
 */
@UtilityClass
public class ObjectId {
  /** 线程安全的下一个随机数,每次生成自增+1 */
  private static final AtomicInteger NEXT_INC = new AtomicInteger(
    RandomUtil.randomInt()
  );
  /** 机器信息 */
  private static final int MACHINE = getMachinePiece() | getProcessPiece();

  /**
   * 获取一个objectId的bytes表现形式
   *
   * @return objectId
   */
  public static byte[] nextBytes() {
    final ByteBuffer bb = ByteBuffer.wrap(new byte[12]);
    bb.putInt((int) Instant.now().getEpochSecond()); // 4位
    bb.putInt(MACHINE); // 4位
    bb.putInt(NEXT_INC.getAndIncrement()); // 4位

    return bb.array();
  }

  /**
   * 获取一个objectId用下划线分割
   *
   * @return objectId
   */
  public static String next() {
    return next(false);
  }

  /**
   * 获取一个objectId
   *
   * @param withHyphen 是否包含分隔符
   * @return objectId
   */
  public static String next(boolean withHyphen) {
    byte[] array = nextBytes();
    final StringBuilder buf = new StringBuilder(withHyphen ? 26 : 24);
    int t;
    for (int i = 0; i < array.length; i++) {
      if (withHyphen && i % 4 == 0 && i != 0) {
        buf.append("-");
      }
      t = array[i] & 0xff;
      if (t < 16) {
        buf.append('0');
      }
      buf.append(Integer.toHexString(t));
    }
    return buf.toString();
  }

  /**
   * 获取机器码片段
   *
   * @return 机器码片段
   */
  private static int getMachinePiece() {
    // 机器码
    int machinePiece;
    try {
      StringBuilder netSb = new StringBuilder();
      // 返回机器所有的网络接口
      Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
      // 遍历网络接口
      while (e.hasMoreElements()) {
        NetworkInterface ni = e.nextElement();
        // 网络接口信息
        netSb.append(ni.toString());
      }
      // 保留后两位
      machinePiece = netSb.toString().hashCode() << 16;
    } catch (Exception e) {
      // 出问题随机生成,保留后两位
      machinePiece = (RandomUtil.randomInt()) << 16;
    }
    return machinePiece;
  }

  /**
   * 获取进程码片段
   *
   * @return 进程码片段
   */
  private static int getProcessPiece() {
    // 进程码
    // 因为静态变量类加载可能相同,所以要获取进程ID + 加载对象的ID值
    final int processPiece;
    // 进程ID初始化
    int processId;
    try {
      // 获取进程ID
      final String processName = ManagementFactory.getRuntimeMXBean().getName();
      final int atIndex = processName.indexOf('@');
      if (atIndex > 0) {
        processId = Integer.parseInt(processName.substring(0, atIndex));
      } else {
        processId = processName.hashCode();
      }
    } catch (Exception t) {
      processId = RandomUtil.randomInt();
    }

    final ClassLoader loader = ClassLoaderUtil.getClassLoader();
    // 返回对象哈希码,无论是否重写hashCode方法
    int loaderId = System.identityHashCode(loader);

    // 进程ID + 对象加载ID
    // 保留前2位
    final String processSb =
      Integer.toHexString(processId) + Integer.toHexString(loaderId);
    processPiece = processSb.hashCode() & 0xFFFF;

    return processPiece;
  }
}
```

#### 1.1.6. 雪花算法 :id=unique-id-with-snowflake

?> snowflake 是 twitter 开源的分布式 ID 生成算法。

- 核心思想

  - 1 bit 保留位，默认 0
  - 41 bit 作为毫秒数，**41 位的长度可以使用 69 年**；
  - 10 bit 作为机器编号（5 个 bit 是数据中心，5 个 bit 的机器 ID），**10 位的长度最多支持部署 1024 个节点**；
  - 12 bit 作为毫秒内序列号，**12 位的计数顺序号支持每个节点每毫秒产生 4096 个 ID 序号**

- 优点

  - 不依赖于数据库，灵活方便，且性能优于数据库。
  - ID 按照时间在单机上是递增的。

- 缺点

  - 在单机上是递增的，但是由于涉及到分布式环境，每台机器上的时钟不可能完全同步，也许有时候也会出现不是全局递增的情况。

- 优化方案

?> 增加系统时钟回拨处理，并容忍指定时间内的时钟回拨。

- 示例

```java
package cn.whsin.whim.lang.time;

import java.sql.Timestamp;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * 系统时钟.
 * <pre>
 *     高并发场景下{@link System#currentTimeMillis()}性能问题优化使用系统时钟定期去更新系统时间.
 *     可以参考<a href="https://mp.weixin.qq.com/s/0xTlhO5iGmPDplRbtCSPoA">System.currentTimeMillis的性能分析</a>
 * </pre>
 *
 * @author whsin
 * @version 1.0.0
 * @since 2021-08-16
 */
public final class SystemClock {
  /** 时钟更新间隔，单位毫秒 */
  private final long period;
  /** 现在时刻的毫秒数 */
  private volatile long now;

  /**
   * 构造
   * @param period 时钟更新间隔，单位毫秒
   */
  public SystemClock(long period) {
    this.period = period;
    this.now = System.currentTimeMillis();
    scheduleClockUpdating();
  }

  /**
   * 开启计时器线程
   */
  private void scheduleClockUpdating() {
    ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor(
      runnable -> {
        Thread thread = new Thread(runnable, "System Clock");
        thread.setDaemon(true);
        return thread;
      }
    );
    scheduler.scheduleAtFixedRate(
      () -> now = System.currentTimeMillis(),
      period,
      period,
      TimeUnit.MILLISECONDS
    );
  }

  /**
   * @return 当前时间毫秒数
   */
  private long currentTimeMillis() {
    return now;
  }

  //------------------------------------------------------------------------ static
  /**
   * 单例
   */
  private static class InstanceHolder {
    public static final SystemClock INSTANCE = new SystemClock(1);
  }

  /**
   * 单例实例
   * @return 单例实例
   */
  @SuppressWarnings("SameReturnValue")
  private static SystemClock instance() {
    return InstanceHolder.INSTANCE;
  }

  /**
   * @return 当前时间
   */
  public static long now() {
    return instance().currentTimeMillis();
  }

  /**
   * @return 当前时间字符串表现形式
   */
  public static String nowDate() {
    return new Timestamp(instance().currentTimeMillis()).toString();
  }
}
```

```java
package cn.whsin.whim.lang.generator;

import cn.whsin.whim.lang.time.SystemClock;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

/**
 * Twitter的Snowflake 算法.
 * 系统原有工具类优化修改.参考开源雪花算法工具类.
 * <pre>
 * 符号位（1bit）- 时间戳相对值（41bit）- 数据中心标志（5bit）- 机器标志（5bit）- 递增序号（12bit）
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
 * 第一位为未使用(符号位表示正数)，接下来的41位为毫秒级时间(41位的长度可以使用69年)
 * 然后是5位datacenterId和5位workerId(10位的长度最多支持部署1024个节点）
 * 最后12位是毫秒内的计数（12位的计数顺序号支持每个节点每毫秒产生4096个ID序号）
 * </pre>
 *
 * 并且可以通过生成的id反推出生成时间,datacenterId和workerId
 * x[1] xxx[41] xxxxx[5] xxxxx[5] xxxxx[12]
 * @author whsin
 * @version 1.0.0
 * @since 2021-08-16
 */
@Getter
@Setter
public class Snowflake implements Serializable {
  private static final long serialVersionUID = 1L;

  /** 系统开始时间截 默认为:1629043200000L (UTC 2021-08-16 00:00:00) */
  private final long startTime;
  /** 机器id所占的位数(0~31，一共32个) */
  private static final long WORKER_ID_BIT = 5L;
  /** 数据标识id所占的位数 */
  private static final long DATA_CENTER_ID_BIT = 5L;
  /**
   * 支持的最大机器id(十进制)，结果是31(0~31，一共32个) (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
   * -1L 左移 5位 (worker id 所占位数) 即 5位二进制所能获得的最大十进制数 - 31
   */
  private static final long MAX_WORKER_ID = ~(-1L << WORKER_ID_BIT);
  /** 支持的最大数据标识id - 31 */
  private static final long MAX_DATA_CENTER_ID = ~(-1L << DATA_CENTER_ID_BIT);
  /** 序列号序列在id中占的位数 */
  private static final long SEQUENCE_BIT = 12L;
  /** 机器节点左移12位(即末 sequence 所占用的位数) */
  private static final long WORKER_ID_SHIFT = SEQUENCE_BIT;
  /** 数据中心节点左移17位 */
  private static final long DATA_CENTER_ID_SHIFT = SEQUENCE_BIT + WORKER_ID_BIT;
  /** 时间毫秒数左移22位 */
  private static final long TIMESTAMP_LEFT_SHIFT =
    SEQUENCE_BIT + WORKER_ID_BIT + DATA_CENTER_ID_BIT;
  /** 生成序列的掩码(12位所对应的最大整数值)，这里为4095 (0b111111111111=0xfff=4095) */
  private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BIT);

  /** 工作机器ID(0~31) */
  private final long workerId;
  /** 数据中心ID(0~31) */
  private final long dataCenterId;
  /** 毫秒内序列(0~4095) */
  private long sequence = 0L;
  /** 上次生成ID的时间截 */
  private long lastTimestamp = -1L;
  /** 是否使用系统时钟:避免高并发场景下{@link System#currentTimeMillis()} 的性能问题 */
  private final boolean useSystemClock;

  /**
   * 构造
   *
   * @param workerId     终端ID
   * @param dataCenterId 数据中心ID
   */
  public Snowflake(long workerId, long dataCenterId) {
    this(workerId, dataCenterId, false);
  }

  /**
   * 构造
   *
   * @param workerId         终端ID
   * @param dataCenterId     数据中心ID
   * @param isUseSystemClock 是否使用{@link SystemClock} 获取当前时间戳
   */
  public Snowflake(long workerId, long dataCenterId, boolean isUseSystemClock) {
    this(null, workerId, dataCenterId, isUseSystemClock);
  }

  /**
   * @param startTime        初始化时间起点（null表示默认起始日期）,后期修改会导致id重复,如果要修改连workerId dataCenterId，慎用
   * @param workerId         工作机器节点id
   * @param dataCenterId     数据中心id
   * @param isUseSystemClock 是否使用{@link SystemClock} 获取当前时间戳
   * @since 5.1.3
   */
  public Snowflake(
    Date startTime,
    long workerId,
    long dataCenterId,
    boolean isUseSystemClock
  ) {
    if (null != startTime) {
      this.startTime = startTime.getTime();
    } else {
      // Thu, 04 Nov 2010 01:42:54 GMT
      this.startTime = Instant.now().toEpochMilli();
    }
    if (workerId > MAX_WORKER_ID || workerId < 0) {
      throw new IllegalArgumentException(
        String.format(
          "worker Id can't be greater than %s or less than 0",
          MAX_WORKER_ID
        )
      );
    }
    if (dataCenterId > MAX_DATA_CENTER_ID || dataCenterId < 0) {
      throw new IllegalArgumentException(
        String.format(
          "datacenter Id can't be greater than %s or less than 0",
          MAX_DATA_CENTER_ID
        )
      );
    }
    this.workerId = workerId;
    this.dataCenterId = dataCenterId;
    this.useSystemClock = isUseSystemClock;
  }

  /**
   * 根据Snowflake的ID，获取机器id
   *
   * @param id snowflake算法生成的id
   * @return 所属机器的id
   */
  public long getWorkerId(long id) {
    return id >> WORKER_ID_SHIFT & ~(-1L << WORKER_ID_BIT);
  }

  /**
   * 根据Snowflake的ID，获取数据中心id
   *
   * @param id snowflake算法生成的id
   * @return 所属数据中心
   */
  public long getDataCenterId(long id) {
    return id >> DATA_CENTER_ID_SHIFT & ~(-1L << DATA_CENTER_ID_BIT);
  }

  /**
   * 根据Snowflake的ID，获取生成时间
   *
   * @param id snowflake算法生成的id
   * @return 生成的时间
   */
  public long getGenerateDateTime(long id) {
    return (id >> TIMESTAMP_LEFT_SHIFT & ~(-1L << 41L)) + startTime;
  }

  /**
   * 下一个ID
   *
   * @return ID
   */
  public synchronized long nextId() {
    long timestamp = genTime();
    if (timestamp < lastTimestamp) {
      if (lastTimestamp - timestamp < 2000) {
        // 容忍2秒内的回拨，避免NTP校时造成的异常
        timestamp = lastTimestamp;
      } else {
        // 如果服务器时间有问题(时钟后退) 报错。
        throw new IllegalStateException(
          String.format(
            "Clock moved backwards. Refusing to generate id for %s ms",
            lastTimestamp - timestamp
          )
        );
      }
    }

    if (timestamp == lastTimestamp) {
      sequence = (sequence + 1) & SEQUENCE_MASK;
      if (sequence == 0) {
        timestamp = tilNextMillis(lastTimestamp);
      }
    } else {
      sequence = 0L;
    }

    lastTimestamp = timestamp;

    return (
      ((timestamp - startTime) << TIMESTAMP_LEFT_SHIFT) |
      (dataCenterId << DATA_CENTER_ID_SHIFT) |
      (workerId << WORKER_ID_SHIFT) |
      sequence
    );
  }

  /**
   * 下一个ID（字符串形式）
   *
   * @return ID 字符串形式
   */
  public String nextIdStr() {
    return Long.toString(nextId());
  }

  /**
   * 循环等待下一个时间
   *
   * @param lastTimestamp 上次记录的时间
   * @return 下一个时间
   */
  private long tilNextMillis(long lastTimestamp) {
    long timestamp = genTime();
    // 循环直到操作系统时间戳变化
    while (timestamp == lastTimestamp) {
      timestamp = genTime();
    }
    if (timestamp < lastTimestamp) {
      // 如果发现新的时间戳比上次记录的时间戳数值小，说明操作系统时间发生了倒退，报错
      throw new IllegalStateException(
        String.format(
          "Clock moved backwards. Refusing to generate id for %sms",
          lastTimestamp - timestamp
        )
      );
    }
    return timestamp;
  }

  /**
   * 生成时间戳
   *
   * @return 时间戳
   */
  private long genTime() {
    return this.useSystemClock ? SystemClock.now() : System.currentTimeMillis();
  }
}
```

### 1.2. 实现一个带有过期时间的 LRU 缓存

?> 参考 LinkedHashMap 的实现，底层数据存储基于 HashMap，根据数据访问顺序更新数据存储位置，空间不足时，自动淘汰队头元素。
缓存过期淘汰策略可以使用`定时扫描`或`惰性删除`的方式实现。

- 设计思想
  - 数据存储：
    - 参考 LinkedHashMap，继承 HashMap 重写数据更新策略，保证访问有序和插入有序，提供头尾元素访问接口。
  - 淘汰策略
    - 存储空间不足时，从链表头部开始删除指定个数的元素。
  - 过期策略
    - 定时扫描删除
    - 惰性删除

### 1.3. 分布式锁

- 问题描述

?> 在分布式模型下，数据只有一份（或有限制），此时需要利用锁的技术控制某一时刻修改数据的进程，分布式锁是控制分布式系统之间同步访问共享资源的一种方式。 
与单机模式下的锁不仅需要保证进程可见，还需要考虑进程与锁之间的网络问题。
分布式锁还是可以将标记存在内存，只是该内存不是某个进程分配的内存而是公共内存如 Redis、Memcache。至于利用数据库、文件等做锁与单机的实现是一样的，只要保证标记能互斥就行。

- 问题分析：分布式锁要满足哪些需求
  - 可以保证在分布式部署的应用集群中，同一个方法在同一时间只能被一台机器上的一个线程执行。
  - 这把锁要是一把可重入锁（避免死锁）
  - 这把锁最好是一把阻塞锁（根据业务需求考虑要不要这条）
  - 这把锁最好是一把公平锁（根据业务需求考虑要不要这条）
  - 有高可用的获取锁和释放锁功能
  - 获取锁和释放锁的性能要好

- 注意事项
  - 分布式锁的开销
  - 加锁的粒度
  - 加锁的方式

#### 1.3.1. 基于数据库

- 唯一性约束

  > 使用数据库唯一索引或主键的唯一性约束条件进行分布式系统的加锁实现，在进行业务操作时先执行数据插入操作，如果成功则视为获取到锁，执行业务逻辑，当业务逻辑执行完成再删除此条锁记录。

      - 问题点
          - 这把锁强依赖数据库的可用性，数据库是一个单点，一旦数据库挂掉，会导致业务系统不可用。
          - 这把锁没有失效时间，一旦解锁操作失败，就会导致锁记录一直在数据库中，其他线程无法再获得到锁。
          - 这把锁只能是非阻塞的，因为数据的 insert 操作，一旦插入失败就会直接报错。没有获得锁的线程并不会进入排队队列，要想再次获得锁就要再次触发获得锁操作。
          - 这把锁是非重入的，同一个线程在没有释放锁之前无法再次获得该锁。因为数据中数据已经存在了。
          - 这把锁是非公平锁，所有等待锁的线程凭运气去争夺锁。
          - 在 MySQL 数据库中采用主键冲突防重，在大并发情况下有可能会造成锁表现象。

      - 优化方案
          - 数据库是单点？搞两个数据库，数据之前双向同步，一旦挂掉快速切换到备库上。
          - 没有失效时间？只要做一个定时任务，每隔一定时间把数据库中的超时数据清理一遍。
          - 非阻塞的？搞一个 while 循环，直到 insert 成功再返回成功。
          - 非重入的？在数据库表中加个字段，记录当前获得锁的机器的主机信息和线程信息，那么下次再获取锁的时
          - 候先查询数据库，如果当前机器的主机信息和线程信息在数据库可以查到的话，直接把锁分配给他就可以了。
          - 非公平的？再建一张中间表，将等待锁的线程全记录下来，并根据创建时间排序，只有最先创建的允许获取锁。比较好的办法是在程序中生产主键进行防重。

- 基于版本号实现乐观锁

#### 1.3.2. Redis 实现分布式锁

?> 利用 Redis 的原子性操作和过期时间可以很方便实现分布式锁，可以参考`Redission`的实现，满足了分布式锁的各种特性。

- 设计思想

  - 原子操作命令：SET key value [EX seconds][px milliseconds] [NX|XX]
    - NX|EX：指示当 Key 不存在|存在时才进行数据插入
    - EX|PX：指示过期时间秒|毫秒

  1. 程序获取锁时通过 SETNX 返回 1，判断加锁成功执行业务逻辑，如果返回 0 则竞争锁失败
  2. 加锁成功后通过 EXPIRE|PEXPIRE key seconds|milliseconds 设置锁过期时间
  3. 执行业务逻辑，业务逻辑执行完成，手动删除锁

- 问题点：

  1. 上述设计中将加锁和操作分开进行的，如果在加锁成功后，超时时间设置时系统宕机或网络波动，到时超时时间设置失败则会出现死锁的问题。
  2. 锁提前过期并被其他线程获取，当前线程任务执行完可能会误删其他线程占用的此锁。
  3. 锁提前释放，导致当前线程未执行完成出现并发执行的场景，可能会产生数据不一致问题。
  4. 锁的重入问题

- 优化方案

  1. 问题 1：保证加锁和超时时间设置的原子性，通过原子命令操作同时进行加锁和超时时间的逻辑处理。
  2. 问题 2：释放锁时通过 lua 脚本原子操作，与加锁时设置的值一致才进行删除
  3. 问题 3：配置合理的超时时间，增加锁延期策略。
  4. 在加锁时维护当前线程的 Id，再次重入锁时先查询持有锁中维护的线程 Id 如果和当前线程一致则获取锁。

- 示例

  ```java
  // 定时任务默认实现
  public static class DefaultTask extends TimerTask {
    private Runnable runnable;

    public DefaultTask(Runnable runnable) {
      this.runnable = runnable;
    }

    @Override
    public void run() {
      if (this.runnable != null) {
        this.runnable.run();
      }
    }
  }
  ```

  ```java
  public static void main(String[] args) {
      Jedis jedis = new Jedis("127.0.0.1");
      final String             key                 = "lock:bizId:uid";
      final String             value               = String.valueOf(System.currentTimeMillis());
      String                   result              = jedis.set(key, value, SetParams.setParams().nx().px(3000));
      Timer timer = new Timer("lock-auto-extension");
      if ("OK".equalsIgnoreCase(result)) {
          // 自动延长锁时间
          DefaultTask task = new DefaultTask(() -> jedis.pexpire(key, 3000));
          try {
              timer.schedule(task, 2000, 2000);
              // Do something
          } finally {
              // 取消自动延期任务
              task.cancel();
              // 释放锁
              jedis.eval("local current = redis.call('get', KEYS[1]);\n" +
                                  "if current == false then\n" +
                                  "    return nil;\n" +
                                  "end\n" +
                                  "if current == ARGV[1] then\n" +
                                  "    return redis.call('del', KEYS[1]);\n" +
                                  "else\n" +
                                  "    return 0;\n" +
                                  "end", 1, key, value);

          }
      }
  }
  ```

#### 1.3.3. 基于 ZooKeeper 实现

### Top k 问题

- 问题描述

?> 从一定规模地数据集中找出排名前k的元素数据集，如搜索频率最高的前100个关键词，打赏排名最高的前十个等。

- 解决方案
  - 数据排序再取值
  - 局部淘汰法
  - 分治法
  
  ?> 将数据集拆分为不同规模的数据集再分别找出每个数据集排名前K的元素

  - Hash去重
  - 最小堆

### 资源池

- 作用
  1. 降低资源消耗
  2. 提高响应速度
  3. 增强可管理性
