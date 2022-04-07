# Zookeeper 概念基础

## 1. 认识 zookeeper :id=zookeeper-overview

> [菜鸟教程-Zookeeper](https://www.runoob.com/w3cnote/zookeeper-tutorial.html)

![](/assets/images/zookeeper-basic/20220319220044.png ':class=introduce :size=19%')

### 1.1. 概述

?> ZooKeeper 是一个集中式服务，用于维护配置信息、命名、提供分布式配置服务、同步服务和命名注册。
Zookeeper 的设计目标是将那些复杂且容易出错的分布式一致性服务封装起来，构成一个高效可靠的原语集，并以一系列简单易用的接口提供给用户使用。
一个典型的分布式数据一致性的解决方案，分布式应用程序可以基于它实现诸如数据发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能。

---

### 1.2. 数据结构

![](/assets/images/zookeeper-basic/20220319225427.png ':class=center :size=40%')

?> zookkeeper 提供的名称空间非常类似于标准文件系统，key-value 的形式存储。名称 key 由斜线 / 分割的一系列路径元素，zookeeper 名称空间中的每个节点都是由一个路径标识。

### 1.3. CAP 理论

![](/assets/images/zookeeper-basic/20220319231404.png ':class=center :size=40%')

?> 一个分布式计算系统来说，只能同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance）这三项中的两项。
其中 P 是必须的，因此只能在 CP 和 AP 中选择，zookeeper 保证的是 CP，对比 eruka 实现的是 AP。

- 一致性

?> 在分布式环境中，一致性是指数据在多个副本之间是否能够保持一致的特性，等同于所有节点访问同一份最新的数据副本。在一致性的需求下，当一个系统在数据一致的状态下执行更新操作后，应该保证系统的数据仍然处于一致的状态。

- 可用性

?> 每次请求都能获取到正确的响应，但是不保证获取的数据为最新数据。

- 分区容错性

?> 分布式系统在遇到任何网络分区故障的时候，仍然需要能够保证对外提供满足一致性和可用性的服务，除非是整个网络环境都发生了故障。

### 1.4. BASE 理论

?> BASE 是 Basically Available(基本可用)、Soft-state(软状态) 和 Eventually Consistent(最终一致性) 三个短语的缩写。
BASE 理论是对 CAP 中的一致性和可用性进行一个权衡的结果，理论的核心思想就是：我们无法做到强一致，但每个应用都可以根据自身的业务特点，采用适当的方式来使系统达到最终一致性。

- 基本可用

?> 在分布式系统出现故障，允许损失部分可用性（服务降级、页面降级）。

- 软状态

?> 允许分布式系统出现中间状态。而且中间状态不影响系统的可用性。这里的中间状态是指不同的 data replication（数据备份节点）之间的数据更新可以出现延时的最终一致性。

- 最终一致性

?> data replications 经过一段时间达到一致性。

## 2. 配置使用 :id=zookeeper-usage

### 2.1. 默认端口

- 2181 : 对 client 端提供服务
- 2888 : 集群内机器通信使用
- 3888 : 选举 leader 使用

### 2.2. 客户端连接

- 客户端 API 连接

  - 依赖

  ```xml
  <dependencies>
      <dependency>
          <groupId>org.apache.zookeeper</groupId>
          <artifactId>zookeeper</artifactId>
          <version>3.9.0-SNAPSHOT</version>
      </dependency>
  </dependencies>
  ```

  - 示例

  ```java
  public class ClientDemo {

    public static void main(String[] args)
      throws IOException, InterruptedException, KeeperException {
      final CountDownLatch countDownLatch = new CountDownLatch(1);
      ZooKeeper zooKeeper = new ZooKeeper(
        "42.192.117.191:2181",
        4000,
        event -> {
          if (Watcher.Event.KeeperState.SyncConnected == event.getState()) {
            //如果收到了服务端的响应事件，连接成功
            countDownLatch.countDown();
          }
        }
      );
      countDownLatch.await();
      //CONNECTED
      System.out.println(zooKeeper.getState());
      // 添加节点
      zooKeeper.create(
        "/icoder",
        "0".getBytes(),
        ZooDefs.Ids.OPEN_ACL_UNSAFE,
        CreateMode.PERSISTENT
      );
    }
  }
  ```

- Curator 连接

  - 依赖

  ```xml
  <dependencies>
      <dependency>
          <groupId>org.apache.curator</groupId>
          <artifactId>curator-framework</artifactId>
          <version>5.2.0</version>
      </dependency>
  
      <dependency>
          <groupId>org.apache.curator</groupId>
          <artifactId>curator-recipes</artifactId>
          <version>5.2.0</version>
      </dependency>
  
      <dependency>
          <groupId>org.apache.curator</groupId>
          <artifactId>curator-client</artifactId>
          <version>5.2.0</version>
      </dependency>
  </dependencies>
  ```

  - 示例

  ```java
  public class CuratorClientCase {

    public static void main(String[] args) throws Exception {
      CuratorFramework curatorFramework = CuratorFrameworkFactory
        .builder()
        .connectString("42.192.117.191:2181")
        .sessionTimeoutMs(4000)
        .retryPolicy(new ExponentialBackoffRetry(1000, 3))
        .namespace("")
        .build();
      curatorFramework.start();
      Stat stat = new Stat();
      //查询节点数据
      byte[] bytes = curatorFramework
        .getData()
        .storingStatIn(stat)
        .forPath("/icoder");
      System.out.println(new String(bytes));
      curatorFramework.close();
    }
  }
  ```

## 3. 数据模型

### 3.1. znode 节点

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-znode-data-model.html" height="500px"></iframe>

### 3.2. 节点特性

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-node-feature.html" height="500px"></iframe>

## 4. 命令使用

### 4.1. 基础命令

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-bs-command.html" height="500px"></iframe>

### 4.2. 四字命令

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-sc-4lw.html" height="500px"></iframe>

## 5. 权限控制

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-acl.html" height="500px"></iframe>

## 6. 事件机制 watch

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-watcher.html" height="500px"></iframe>

## 7. 数据同步

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-data-sync.html" height="500px"></iframe>

## 8. Leader 选举

<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-leader.html" height="500px"></iframe>

## 9. 应用场景

- 数据发布/订阅
- 负载均衡
- 分布式协调/通知
- 集群管理
- 集群管理
- master 管理
- 分布式锁
- 分布式队列

### 9.1. 分布式锁

?> 利用Zookeeper节点特性可以很容易实现分布式锁，如排它锁、共享锁。

#### 排它锁

?> 排他锁（Exclusive Locks），又被称为写锁或独占锁，如果事务T1对数据对象O1加上排他锁，那么整个加锁期间，只允许事务T1对O1进行读取和更新操作，其他任何事务都不能进行读或写。

- 定义锁

?> /exclusive_lock/lock

- 实现方式

?> 利用 zookeeper 的同级节点的唯一性特性，在需要获取排他锁时，所有的客户端试图通过调用 create() 接口，在 /exclusive_lock 节点下创建临时子节点 /exclusive_lock/lock，最终只有一个客户端能创建成功，那么此客户端就获得了分布式锁。同时，所有没有获取到锁的客户端可以在 /exclusive_lock 节点上注册一个子节点变更的 watcher 监听事件，以便重新争取获得锁。


#### 共享锁

?> 共享锁（Shared Locks），又称读锁。如果事务T1对数据对象O1加上了共享锁，那么当前事务只能对O1进行读取操作，其他事务也只能对这个数据对象加共享锁，直到该数据对象上的所有共享锁都释放。

- 定义锁

?> /shared_lock/[hostname]-请求类型W/R-序号

- 实现方式
    - 客户端调用 create 方法创建类似定义锁方式的临时顺序节点。
    ![](/assets/images/zookeeper-basic/20220320021141.png ':class=center :size=40%')
    - 客户端调用 getChildren 接口来获取所有已创建的子节点列表。
    - 判断是否获得锁，对于读请求如果所有比自己小的子节点都是读请求或者没有比自己序号小的子节点，表明已经成功获取共享锁，同时开始执行度逻辑。对于写请求，如果自己不是序号最小的子节点，那么就进入等待。
    - 如果没有获取到共享锁，读请求向比自己序号小的最后一个写请求节点注册 watcher 监听，写请求向比自己序号小的最后一个节点注册watcher 监听。

#### 具体实现

?> Curator中已经帮助我们集成了几种锁的实现，可以很方便地集成到实际应用开发中。

- InterProcessMutex：分布式可重入排它锁

- InterProcessSemaphoreMutex：分布式排它锁

- InterProcessReadWriteLock：分布式读写锁


<iframe id="iframe-content" src="https://www.runoob.com/w3cnote/zookeeper-locks.html" height="500px"></iframe>
