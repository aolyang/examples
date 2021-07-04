# 合成（Layer-compositing）

今天无意看到一篇文章介绍了页面动画效果优化的文章[掘金：疯狂操作 CSS3 实现 60 FPS 动画效果，CodeReview 时同事直呼：细节！]([疯狂操作 CSS3 实现 60 FPS 动画效果，CodeReview 时同事直呼：细节！ (juejin.cn)](https://juejin.cn/post/6980220327951335432))

本就对CSS比较薄弱的我决定深入研究一下到底**Composite**是什么。

# 像素管道

![repaint](./repaint.jpg)

- **JavaScript**。一般来说，我们会使用 JavaScript 来实现一些视觉变化的效果。比如用 jQuery 的 `animate` 函数做一个动画、对一个数据集进行排序或者往页面里添加一些 DOM 元素等。当然，除了 JavaScript，还有其他一些常用方法也可以实现视觉变化效果，比如: CSS Animations、Transitions 和 Web Animation API。
- **样式计算**（Style）。此过程是根据匹配选择器（例如 `.headline` 或 `.nav > .nav__item`）计算出哪些元素应用哪些 CSS 规则的过程。从中知道规则之后，将应用规则并计算每个元素的最终样式。
- **布局**（Layout）。在知道对一个元素应用哪些规则之后，浏览器即可开始计算它要占据的空间大小及其在屏幕的位置。网页的布局模式意味着一个元素可能影响其他元素，例如 `<body>` 元素的宽度一般会影响其子元素的宽度以及树中各处的节点，因此对于浏览器来说，布局过程是经常发生的。
- **绘制**（Paint）。绘制是填充像素的过程。它涉及绘出文本、颜色、图像、边框和阴影，基本上包括元素的每个可视部分。绘制一般是在多个表面（通常称为层）上完成的。
- **合成**（Composite）。由于页面的各部分可能被绘制到多层，由此它们需要按正确顺序绘制到屏幕上，以便正确渲染页面。对于与另一元素重叠的元素来说，这点特别重要，因为一个错误可能使一个元素错误地出现在另一个元素的上层。

上面每一个步骤都可能会产生渲染性能而造成卡顿，所以，确定代码触发了管道哪一部分十分重要。



## 页面如何从文件到用户看到的画面

1. 下载html文件以及相关的css文件并解析成**Dom Tree**

   ![Dom Tree](./dom-tree.png)

2. `Dom`+`CSS`生成`Render Tree`，也就是Compputed style里的内容；那么干了什么呢？1）解析不显示的dom-node，将其从tree里删除，2）解析伪类的content，插入新的dom-node。注意里面去掉了与页面样式无关的`<header>`和`<script>`标签，因为这些在获取样式之后和dom并没有任何关联。

   ![RenderTree](./render-tree.png)

3. 根据`Render Tree` + `CSS`解析出Layout，也就是几何内容、盒子关系。也是引起回流（**Reflow**）的内容。

   ![Layout](./layout.png)

4. 

