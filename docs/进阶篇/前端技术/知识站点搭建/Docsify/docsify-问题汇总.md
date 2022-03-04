# Docsify 问题汇总

## Markdown解析换行问题

``` javascript
// 修改marked默认配置 breaks 默认false软换行
marked.getDefaults = function() {
    return {
        baseUrl: null,
        breaks: true,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: new Renderer(),
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        xhtml: false
    };
};
```
