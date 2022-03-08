# 🎨 前言

!> 🍺 本站主要是平时工作学习中的一些所想所得, 希望能够通过不断地总结, 能构建属于自己的一套完善的知识体系,并提升自己的综合能力!  ✨✨✨💪🏻💪🏻

---
# <i class="icon-brand-openstreetmap">站点地图</i> :id=site-map :class=title-title
## <i class='icon-brand-skyliner'>技术小站</i> :id=article

---
## <i class='icon-brand-keybase'>技术专题</i> :id=technical-topic
### [Java基础](/technology/basic/ ':class=icon-brand-java') :id=java-basic
### [Java虚拟机](/technology/jvm/ ':class=icon-brand-abbrobotstudio') :id=jvm
### [并发编程](/technology/concurrent/ ':class=icon-brand-tripadvisor') :id=concurrent-programming




### <i class='emoji-sparkles'>技术框架</i> :id=framework
#### <i class='emoji-sparkles'>Spring</i> :id=spring
#### <i class='emoji-sparkles'>SpringMVC</i> :id=spring-mvc
#### <i class='emoji-sparkles'>SpringBoot</i> :id=spring-boot
#### <i class='emoji-sparkles'>Mybatis</i> :id=mybatis
#### <i class='emoji-sparkles'>Netty</i> :id=netty
#### <i class='emoji-sparkles'>Eureka</i> :id=eureka
#### <i class='emoji-sparkles'>Nacos</i> :id=nacos
#### <i class='emoji-sparkles'>Zookeeper</i> :id=eureka

### <i class='icon-brand-mysql'>数据库</i> :id=database
#### <i class='icon-brand-cloudbees title'>索引</i> :id=index
- [索引的概念](/technology/database/database ':class=icon-brand-tripadvisor')

---
### <i class='emoji-sparkles'>中间件</i>

#### <i class='emoji-sparkles details'>缓存中间件</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>

- Redis
</details>

#### <i class='emoji-sparkles details'>消息队列</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>
- RabbitMQ
</details>

#### <i class='emoji-sparkles details'>搜索中间件</i>
<details>
<summary hidden>
<i class='emoji-sparkles title'>文章列表</i>
</summary>
- ElasticSearch
</details>







---
## <i class='icon-brand-leetcode'>书籍阅读</i>
### <i class='emoji-notebook-with-decorative-cover'>Java 基础</i>
- [:green_book: 编程思想 第五版](/books/think-in-java-8/)
- [:blue_book: 编程思想 第四版](/books/storage/java-basic/think-in-java-chinese-4th)
- [:orange_book: Effective Java 第三版](/books/effective-java-3rd-chinese/)


### <i class='emoji-notebook-with-decorative-cover'>并发编程</i>
- [并发编程的艺术](/books/storage/concurrency/the-art-of-concurrency-programming ':class=emoji-closed-book')

### <i class='emoji-notebook-with-decorative-cover'>数据结构和算法</i>
### <i class='emoji-notebook-with-decorative-cover'>编程思想</i>
- **码出高效**
- **Java 开发手册(嵩山版)**

## <i class='icon-brand-icloud'>资源分享</i>
## <i class='icon-brand-docker'>实验室</i>
- [Brand Font](/assets/scss/font/font-brand/demo.html ':class=icon-brand-apacheairflow')


<script type="text/javascript">
$('h3,h4').click(function(){
    var details = $(this).next()[0];
    console.info(details)
    toggleDetails(details);
})

function isDetails(details){
    return 'DETAILS' == details.nodeName;
}

function toggleDetails(details){
    if(!isDetails(details)) {
    return;
    }
    console.log(details.open)
    details.open = !details.open;
}
</script>