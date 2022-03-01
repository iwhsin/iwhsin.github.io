# 常用插件汇总

## 提示信息增强插件

```html
<script src="https://unpkg.com/docsify-plugin-flexible-alerts"></script>

<script>
  window.$docsify = {
    'flexible-alerts': {
      style: 'flat'// callout
    }
  };
</script>


<!-- 自定义提示信息 -->
<script>
  window.$docsify = {
    'flexible-alerts': {
      note: {
        label: "Hinweis"
      },
      tip: {
        label: "Tipp"
      },
      warning: {
        label: "Warnung"
      },
      danger: {
        label: "Achtung"
      }
    }
  };
</script>
```

- 使用

``` markdown
> [!NOTE]
> An alert of type 'note' using global style 'callout'.


> [!NOTE|style:flat]
> An alert of type 'note' using alert specific style 'flat' which overrides global style 'callout'
```

Key Allowed value
style One of follwowing values: callout, flat
label Any text
icon A valid Font Awesome icon, e.g. 'fas fa-comment'
className A name of a CSS class which specifies the look and feel
labelVisibility One of follwowing values: visible (default), hidden
iconVisibility One of follwowing values: visible (default), hidden

> [!TIP|style:flat|label:My own heading|iconVisibility:hidden]
> An alert of type 'tip' using alert specific style 'flat' which overrides global style 'callout'.
> In addition, this alert uses an own heading and hides specific icon.
