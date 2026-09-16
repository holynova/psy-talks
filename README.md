# 助人对话练习册

面向对话微技能学习的练习地图，通过阅读和练习梳理助人对话方式。

![助人对话练习册阅读界面](implementation-v2-reference-state.jpg)

- [GitHub Repo](https://github.com/holynova/psy-talks)
- [GitHub Pages](https://holynova.github.io/psy-talks/)

<a href="https://holynova.github.io/psy-talks/"><img src="github-pages-qr.png" width="180" alt="扫描访问助人对话练习册" /></a>

手机扫描二维码即可访问在线练习册。

## 本地运行

需要 Node.js 22.13.0 或更高版本。

```bash
npm ci
npm run dev
```

打开终端输出的本地地址。

## 构建与检查

```bash
npm run lint
npm test
```

`npm test` 会先构建，再检查渲染后的 HTML；单独构建使用 `npm run build`。
