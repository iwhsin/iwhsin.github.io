
``` xml
<dependency>
    <groupId>com.aliyun.mq</groupId>
    <artifactId>mq-http-sdk</artifactId>
    <version>1.0.3.2</version>
</dependency>
```

`代码块`**字体加处**


``` yaml
ali:
  rocketmq:
    producers:
      - key: MQ_TOPIC_GU_PAI
        instance-id: MQ_INST_1218137459707574_BcaYDkHA
        topic-name: content-receiver
```

``` java
SQLWrapper.CustomerExample example = new SQLWrapper.CustomerExample(McnVideoWash.class);
example.createCriteria()
        .andEqualTo(FunctionUtil.notEmpty(), "userNo", WebUtil.getUserNo())
        .andEqualTo("id", request.getId());

// 查询洗稿内容是否存在
McnVideoWash mcnVideoWash = mcnVideoWashService.getBaseMapper().selectOneByExample(example);
if (mcnVideoWash == null) {
    return ResObject.result(ValidCode.WASH_CONTENT_NOT_EXIST);
}

if (!(Integer.valueOf(IMcnConstant.VideoWashStatus.FINISH.getStatus()).equals(mcnVideoWash.getStatus()) ||
        Integer.valueOf(IMcnConstant.VideoWashStatus.MODIFIED.getStatus()).equals(mcnVideoWash.getStatus()))) {
    return ResObject.result(ValidCode.WASH_CONTENT_NOT_ALLOW_MODIFY, mcnVideoWash.getStatus());
}
if (!StringUtils.isEmpty(request.getContent())) {
    mcnVideoWash.setContent(request.getContent());
    mcnVideoWash.setStatus(IMcnConstant.VideoWashStatus.MODIFIED.getStatus());
}
mcnVideoWash.setTags(request.getTags());
mcnVideoWash.beforeUpdate(WebUtil.getUserNo());
return ResObject.success(mcnVideoWashService.update(mcnVideoWash));
```
