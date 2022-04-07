# 🎨 前言

!> 🍺 本站主要是平时工作学习中的一些所想所得, 希望能够通过不断地总结, 能构建属于自己的一套完善的知识体系,并提升自己的综合能力!  ✨✨✨💪🏻💪🏻

---
# <i class="icon-brand-openstreetmap">站点地图</i> :id=site-map
## <i class='icon-brand-skyliner'>技术小站</i> :id=article

## <i class='icon-brand-keybase'>技术专题</i> :id=technical-topic
### <i class='icon-brand-java'>Java基础</i> :id=java-basic
### <i class='icon-brand-abbrobotstudio'>Java虚拟机</i> :id=jvm
### <i class='icon-brand-tripadvisor'>并发编程</i> :id=concurrent-programming


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


参与对公网银项目的开发与维护升级工作，独立完成安排的的网银功能需求，使用公司的「产品/作品」框架进行功能的开发。