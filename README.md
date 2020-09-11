# Styled Roam (Research)

My custom CSS files for [Roam Research](https://roamresearch.com)

## Quick Start

`{{[[roam/js]]}}`

```js
window.URLScriptServer = 'https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@dev/'

var s = document.createElement('script')
	s.type = "text/javascript"
    s.src =  window.URLScriptServer + "js/index.js"
	s.async = true
document.getElementsByTagName('head')[0].appendChild(s)
```

## Quick Review

![Roam Research 卡片式写作 Candy 主题](https://cdn.jsdelivr.net/gh/jimmylv/images@master/2020/09/Roam%20Research%20%E5%8D%A1%E7%89%87%E5%BC%8F%E5%86%99%E4%BD%9C%20Candy%20%E4%B8%BB%E9%A2%98.jpg)

```css
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/Roam-Research-Themes@patch-1/Candy.css');
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/card.min.css');
```

![Roam 绿色主题样式](https://jimmylv.github.io/images/2020/Roam%20绿色主题样式.jpg)

```css
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/index.min.css');
```

![Roam 绿色主题黑夜样式](https://jimmylv.github.io/images/2020/Roam%20绿色主题黑夜样式.jpg)

```css
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/index.min.css');
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/dark.min.css');
```

> Dark 模式只需要多增加一条代码即可，Dark 模式生效的前提是 macOS 系统已经切换为夜间模式。

## Basic Usage

> 可能屏幕适配会有个小问题：我是根据自己的屏幕尺寸设置的 content 宽度，如果大家发现左右宽度不合适，可以调整一下 article-width 这个参数。👇

```css
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/index.min.css');
@import url('https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@master/dark.min.css');

:root {
  --article-width: 716px;
 
  --header-font: "Source Sans Pro", "Inter", sans-serif;
  --body-font: "Source Sans Pro", "Inter", sans-serif;

  --bg-color: #EEEEEE;
  --page-color: rgba(255, 255, 255, 0.95);

  --text-color: #000000;
  --icon-color: #5c7080; /* #5c7080 */
  --bullet-color: rgba(0, 0, 0, 0.2);

  --page-shadow: 0px 8px 14px rgba(0, 0, 0, 0.05);

  --color-primary: 73, 197, 91;
  --color-primary-contrast: #FFFFFF;
  --color-secondary: 147, 100, 235;
  /*--color-secondary: 255, 165, 0;*/
  --color-secondary-contrast: #FFFFFF;
}
```

## References

- [Roamcult Themes](https://roamresearch.com/#/app/help/page/fJRcVITNY)
- [palashkaria/roam-modifiers: userscripts/custom CSS files for Roam Research](https://github.com/palashkaria/roam-modifiers)
