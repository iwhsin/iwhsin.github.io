# 使用自定义的Json解析器
> Spring中默认使用`jackson-databind`进行Json数据解析，支持自定义Json解析器。
## 注入`HttpMessageConverters`
```
/**
    * 自定义Json解析器<br>
    *     注入{@link HttpMessageConverters}
    * @return {@link HttpMessageConverters}
    */
@Bean
public HttpMessageConverters fastJsonHttpMessageConverter(){

    FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
    FastJsonConfig config = new FastJsonConfig();
    config.setSerializerFeatures(SerializerFeature.PrettyFormat);
    converter.setFastJsonConfig(config);
    List<MediaType> mediaTypes = new ArrayList<>();
    mediaTypes.add(MediaType.APPLICATION_JSON);
    mediaTypes.add(MediaType.TEXT_HTML);
    mediaTypes.add(MediaType.TEXT_PLAIN);
    mediaTypes.add(MediaType.TEXT_XML);
    converter.setSupportedMediaTypes(mediaTypes);
    return new HttpMessageConverters(converter);
}
```
## 继承`WebMvcConfigurerAdapter`类或实现`WebMvcConfigurer`接口
> Spring 5.0之前使用继承`WebMvcConfigurerAdapter`类，重写`configureMessageConverters(List<HttpMessageConverter<?>> converters)`方法。<br>
> Spring 5.0后`WebMvcConfigurer`接口提供了默认的接口实现方法，实现`WebMvcConfigurer`接口重写`configureMessageConverters(List<HttpMessageConverter<?>> converters)`方法。
```
/**
    * 自定义Json解析器<br>
    *     实现{@link WebMvcConfigurer}接口重写{@link WebMvcConfigurer#configureMessageConverters}方法。
    * @param converters 转换器
    */
@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    WebMvcConfigurer.super.configureMessageConverters(converters);
    FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
    FastJsonConfig config = new FastJsonConfig();
    config.setSerializerFeatures(SerializerFeature.PrettyFormat);
    converter.setFastJsonConfig(config);
    List<MediaType> mediaTypes = new ArrayList<>();
    mediaTypes.add(MediaType.APPLICATION_JSON);
    mediaTypes.add(MediaType.TEXT_HTML);
    mediaTypes.add(MediaType.TEXT_PLAIN);
    mediaTypes.add(MediaType.TEXT_XML);
    converter.setSupportedMediaTypes(mediaTypes);
    converters.add(converter);
}
```

# 自定义jackson序列化和反序列化
> SpringBoot提供了`@JsonComponent`注解可以方便的定制自己需要的对象的序列化和反序列化方式.
```java
@JsonComponent
public class CustomizedJackson {
    /**
     * json序列化
     */
    public static class Serializer extends JsonSerializer<JavaBean> {
        @Override
        public void serialize(JavaBean value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            gen.writeBoolean(false);
        }
    }
    /**
     * json反序列化
     */
    public static class Deserializer extends JsonDeserializer<JavaBean> {
        @Override
        public JavaBean deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            return null;
        }
    }
}
```