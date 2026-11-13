---
title: 搞定 VitePress 博客分页：我的踩坑与实现之旅
date: 2025-04-09 18:33:00
description: 本文分享了作者使用VitePress搭建个人博客时，解决文章过多导致侧边栏冗长、缺乏分页问题的实践过程。作者分析了选择VitePress的优势（熟悉、适合文档+博客混合、部署快），并指出了默认侧边栏不适合大量博客文章的问题。在寻求AI帮助时，作者踩坑了联网AI（Grok-3）给出的错误方案，最终在非联网AI（Gemini 2.5 Pro）的指引下，利用VitePress 1.x的核心功能createContentLoader成功实现了首页文章分页。详细介绍了createContentLoader在构建时加载和处理Markdown数据（提取frontmatter、生成摘要、排序）的步骤，以及如何创建Vue组件展示分页数据，并解决了创建.vitepress/theme目录后需要提供theme/index.js主题入口文件的“坑”。最后总结了实现过程中的关键点、踩坑经验和对AI辅助编程的看法，强调了规范frontmatter、注意文件路径、以及AI是助手而非全能“大神”的心得。
---

# 搞定 VitePress 博客分页：我的踩坑与实现之旅


当初为啥选 VitePress 来搭我的个人网站和博客呢？其实不是一时兴起，主要是看中了它几个地方：

1.  **顺手，好用：** 之前用 VitePress 写过技术文档，对它的配置、Markdown 写法、Vue 组件支持还有那快得飞起的 HMR (热更新) 都挺熟的。用熟悉的东西，自然省心省力。
2.  **既要写博客，也要放教程：** 我的网站不光是零散的博客文章，还想系统地放一些教程系列（比如 Python 入门、FFmpeg 怎么用）。VitePress 基于文件目录的路由和灵活的侧边栏，天生就适合这种“文档+博客”的混合模式，比一些纯博客系统更灵活。
3.  **部署快，跑得也快：** VitePress 安装部署挺简单，基于 Vite 打包速度嗖嗖的，最后生成的静态网站性能也没得说，正合我意。

不过，用着用着，博客越写越多，问题就来了。VitePress 默认的侧边栏，更像是给结构分明的文档准备的。面对一大堆按时间排的博客文章，它就有点力不从心了——没分页，文章一多，侧边栏能拉到地老天荒，看的人得累死。不行，得想个办法！于是，我琢磨着能不能利用 VitePress 自身的功能，在首页 (`index.md`) 搞一个能动态加载、按时间排序、还能分页的最新文章列表。

## 求助 AI：差点儿被带沟里

这年头，遇到技术难题，谁不想先问问 AI 呢？我当时想，VitePress 1.6.3 算比较新的，得找个能联网的 AI 吧。于是我试了试号称能获取最新信息的 Grok-3，心想它应该能直接给我生成可用的代码或者靠谱的思路。

结果呢？跟 Grok-3 的沟通，那叫一个“惨”！我清清楚楚地告诉它我的需求、目录结构、VitePress 版本，可它给的方案总是错漏百出：

*   要么把 VitePress 0.x 和 1.x 的 API 搞混。
*   要么建议我重装vitepress1.6.0,或用自定义主题方式实现，甚至直接修改 node_modules下的vitepress默认主题文件的js代码，以便解决插件无法启动的一堆问题。
*   给的代码片段，经常是导入错误、API 调用不对、逻辑不通，总之始终报错无法启动，好不容易启动了，功能却未实现，首页一片空白。
*   来来回回沟通修改，效果甚微，最后还碰到了它的使用频率限制，让我等待一小时后再使用，真是让人头大。

这番折腾让我明白，就算 AI 说自己能联网，对特定框架（尤其还在快速更新的）的理解深度和准确性，还是得打个问号。太依赖它，可能就在错误的路上白费功夫。

没辙了，试试 Gemini 2.5 Pro exp 吧。嘿，没想到跟 Gemini 沟通起来顺畅多了！我描述完需求，它很快就给出了基于 VitePress 1.6.x 核心特性 `createContentLoader` 的解决方案。中间就碰到一个小问题，是关于主题解析 (`@theme/index`) 的，我把报错信息一贴，Gemini 立马就指出了问题所在（没创建自定义主题入口文件），还告诉了我正确的修复方法（建个 `theme/index.js` 继承默认主题）。

这一来一回，不同 AI 模型在处理具体框架问题上的能力差别，真是体现得淋漓尽致。Gemini 对 VitePress 1.x 的理解明显更到位，给的方案也更贴合框架的最佳实践。

## 柳暗花明：`createContentLoader` 立大功

最后能搞定，全靠 VitePress 1.x 自带的一个“神器”——`createContentLoader`。它允许我们在打包构建的时候，就去加载、处理 Markdown 文件，然后把处理好的数据打包，让前端的 Vue 组件直接用。

具体怎么做呢？分几步走：

1.  **加载数据 (`.vitepress/theme/posts.data.js`)**: 这是核心！创建一个 `posts.data.js` 文件，用 `createContentLoader` 来干活：

    ```javascript
    // .vitepress/theme/posts.data.js
    import { createContentLoader } from 'vitepress'
    import matter from 'gray-matter' // 这个库用来解析 frontmatter 和正文

    // 这里省略了 createExcerpt 函数的具体实现，它主要负责提取纯文本摘要
    function createExcerpt(content, maxLength) {
        // ... 实现去除 Markdown/HTML 标记并截取的逻辑 ...
        // 简单示例：去除标签，截取前 maxLength 字符
        const plainText = content.replace(/<[^>]*>/g, '').replace(/#+\s/g, ''); 
        return plainText.slice(0, maxLength) + (plainText.length > maxLength ? '...' : '');
    }


    export default createContentLoader('**/*.md', { // 匹配所有 Markdown 文件
      includeSrc: true, // 需要加载源文件内容来提取摘要
      ignore: ['index.md', '**/node_modules/**', '.vitepress/**'], // 排除非文章文件
      transform(rawData) {
        return rawData
          // 过滤掉 frontmatter 不完整或非目标内容的 md 文件
          .filter(({ frontmatter, src }) => frontmatter && frontmatter.date && frontmatter.title && src) 
          .map(({ url, frontmatter, src }) => {
            // 使用 gray-matter 分离出 frontmatter 和纯 Markdown 内容
            const { content } = matter(src); 
            return {
              title: frontmatter.title,
              url,
              // 确保 date 是 Date 对象，方便排序
              date: new Date(frontmatter.date), 
              // 调用我们写的函数生成摘要
              excerpt: createExcerpt(content, 200), 
            }
          })
          // 按日期倒序排，最新的在前面
          .sort((a, b) => b.date.getTime() - a.date.getTime()); 
      }
    })
    ```

    *   `'**/*.md'`：告诉 VitePress 去扫描所有目录下的 Markdown 文件。
    *   `ignore`：排除掉首页、`node_modules`、`.vitepress` 目录等不需要作为文章处理的文件。
    *   `includeSrc: true`：这个很重要，得设成 `true` 才能拿到 Markdown 的原始内容，用来生成摘要。
    *   `transform` 函数是魔法发生的地方：
        *   先 `filter` 过滤，确保文章有 `title` 和 `date` 这两个我们需要的 `frontmatter` 字段。
        *   然后 `map` 处理每个符合条件的文件：用 `gray-matter` 分离 `frontmatter` 和 `content`，再调用 `createExcerpt` 函数生成摘要（这个函数得自己写，逻辑就是去掉 Markdown/HTML 标签，截取前 200 个字）。
        *   最后返回一个包含 `title`, `url`, `date`, `excerpt` 信息的对象数组。
        *   别忘了 `sort`，按日期 `date` 降序排，这样最新的文章就排在最前面了。

2.  **展示组件 (`.vitepress/theme/components/LatestPosts.vue`)**: 创建一个 Vue 组件来消费上面处理好的数据，并实现分页：

    ```vue
    <script setup>
    import { ref, computed } from 'vue'
    // 导入构建时生成的数据，注意路径要对
    import { data as allPosts } from '../posts.data.js' 

    const postsPerPage = ref(10); // 每页显示多少篇
    const currentPage = ref(1); // 当前在哪一页

    // 计算总页数
    const totalPages = computed(() => Math.ceil(allPosts.length / postsPerPage.value));

    // 计算当前页应该显示哪些文章
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value;
      const end = start + postsPerPage.value;
      return allPosts.slice(start, end);
    });

    // 切换页码的函数
    function changePage(newPage) {
      if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
      }
    }

    // 格式化日期，让它好看点
    function formatDate(date) {
      if (!(date instanceof Date)) date = new Date(date);
      return date.toLocaleDateString(); // 或者用更详细的格式
    }
    </script>

    <template>
      <div class="latest-posts">
        <ul>
          <li v-for="post in paginatedPosts" :key="post.url">
            <div class="post-item">
                <a :href="post.url" class="post-title">{{ post.title }}</a>
                <span class="post-date">{{ formatDate(post.date) }}</span>
                <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p> 
            </div>
          </li>
        </ul>

        <!-- 分页控件 -->
        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            上一页
          </button>
          <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            下一页
          </button>
        </div>
      </div>
    </template>

    <style scoped> 
    /* 这里加点样式让列表好看些 */
    .latest-posts ul { list-style: none; padding: 0; }
    .post-item { margin-bottom: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 1em; }
    .post-title { font-size: 1.2em; font-weight: bold; display: block; margin-bottom: 0.3em; }
    .post-date { font-size: 0.9em; color: #888; margin-bottom: 0.5em; display: block;}
    .post-excerpt { font-size: 1em; color: #555; line-height: 1.6; margin-top: 0.5em; }
    .pagination { margin-top: 2em; text-align: center; }
    .pagination button { margin: 0 0.5em; padding: 0.5em 1em; cursor: pointer; }
    .pagination button:disabled { cursor: not-allowed; opacity: 0.5; }
    .pagination span { margin: 0 1em; }
    </style>
    ```

    *   用 `import { data as allPosts } from '../posts.data.js'` 把所有处理好的文章数据引进来。
    *   用 Vue 的 `ref` (响应式变量) 和 `computed` (计算属性) 来实现分页逻辑，数据变化时页面会自动更新。

3.  **首页用起来 (`index.md`)**: 在你的首页 Markdown 文件 (`index.md`) 里，像用普通 HTML 标签一样使用这个组件就行：

    ```markdown
    ---
    layout: home # 确保你的布局支持 Vue 组件，默认的 home 布局通常可以
    ---
    <script setup>
    // 导入我们刚写的组件
    import LatestPosts from './.vitepress/theme/components/LatestPosts.vue' 
    </script>

    # 我的博客首页

    欢迎来到我的小站...

    ## 最新文章

    <LatestPosts /> <!-- 把组件放在你想展示列表的地方 -->

    其他想放的内容...
    ```

4.  **搞定主题报错 (`.vitepress/theme/index.js`)**: 那个烦人的 `@theme/index` 报错怎么解决？其实很简单，只要你创建了 `.vitepress/theme` 目录（哪怕只是为了放 `posts.data.js` 或组件），VitePress 就需要一个主题入口文件。你只需要创建一个 `theme/index.js`，然后简单地继承默认主题就行了：

    ```javascript
    // .vitepress/theme/index.js
    import DefaultTheme from 'vitepress/theme'
    // 就这样，导出一个继承了默认主题的对象
    export default { ...DefaultTheme } 
    ```
    这样 VitePress 就知道怎么加载主题，同时你自定义的 `posts.data.js` 和组件也能正常工作了。

## 回顾与小结：踩过的坑和几点心得

这次折腾下来，收获还是挺多的，也总结几点经验吧：

*   **`createContentLoader` 是关键钥匙:** 对 VitePress 1.x 来说，想在构建时处理内容数据，这是官方推荐的、性能又好又方便的办法。
*   **Frontmatter 规范很重要:** `posts.data.js` 里的处理逻辑，很大程度上依赖 Markdown 文件头部的 `title` 和 `date` 字段。所以，写文章时，这玩意儿**一定**要规范，特别是 `date` 的格式要对，不然数据处理会出错，功能就跑不起来了。
*   **路径别搞错:** 在 `.vue` 文件或者 `data.js` 里 `import` 其他文件时，相对路径要写对，不然找不到文件。
*   **摘要生成有取舍:** 用正则表达式去标签生成纯文本摘要，是个简单快速的方法，但对付特别复杂的 Markdown 可能不够完美。不过嘛，作为快速预览通常也够用了。
*   **小心主题入口这个“坑”:** 只要你动了 `.vitepress/theme` 目录，哪怕只加了个文件，记得一定要提供 `theme/index.js`，就算它只是简单继承默认主题。不然启动就报错。
*   **AI 是好帮手，但别把它当“大神”:** AI 确实能帮上忙，但不能完全代替你对框架的理解。遇到问题，还是要学会看官方文档、自己动手调试。而且，选对 AI 模型也很关键，这次 Gemini 就比 Grok 给力多了。

---

最终，我总算在 VitePress 网站首页加上了想要的分页文章列表，既保留了文档站的结构化导航，也满足了博客文章流的需求，目标达成(本博客网站即是应用了这个插件)！

虽然过程有点小波折，但也让我对 VitePress 的理解更深了一层，顺便还体验了一把不同 AI 工具在实战中的表现差异，挺值的！