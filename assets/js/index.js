$(function() {
    themeSwitchLoader();
})
var themeLink = Docsify.dom.find('#theme');
// 主题换肤功能加载
function themeSwitchLoader() {
    var themes = Docsify.dom.find('.theme-skin');
    if (themes == null) return;

    themes.onclick = function (e) {
        var name = e.target.getAttribute('data-theme-name')
        if (name == null || themeLink.themeName === name) return;
        themeLink.href = 'assets/plugins/' + name;
    };
    isLoaded = true;
}
