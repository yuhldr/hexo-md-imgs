# hexo图片

> 当前hexo版本为 `5.4.0`，NexT版本 `8.8.0`

## 使用方法

`sudo npm install hexo-md-imgs`

## 问题

hexo编写markdown文件时，插入图片，图片可以放在 `source/images` 目录里（NexT主题的赞赏码也是放在这里），但问题是，在markdown里如果要预览图片，代码应该是

```md
![图](/source/images/图片文件名)
```

或

```md
![图](../images/图片文件名)
```

这样markdown里可以预览了，但是这样编译出来的是

```html
<img src="/source/images/图片文件名" alt="图">
```

```html
<img src="../images/图片文件名" alt="图">
```

这在网页里是无法显示图片的，因为 `html` 里路径应该是

```html
<img src="/images/2021-04/gitalk.png" alt="图">
```

## 原理

这个插件就是在 `hexo s` 编译以后，更换图片的url，从而保证 `markdown` 图片预览与网页中图片一致

## 其他

很简单就几行代码，主要是学习一下 `hexo插件开发` 和 `npm库发布`

### hexo插件开发

其实也就是 npm库 开发

1. 新建目录 `hexo-test`

    > 为了使用hexo的语法，插件名必须 `hexo-` 开头

    ```bash
    mkdir hexo-test && cd hexo-test
    ```

2. 初始化

    ```bash
    npm init
    ```

    根据提示输入包名等信息

    这个只是创建了一个`package.json`，里面包含包名、作者、描述、版本等信息

3. 创建js文件

    ```bash
    touch index.js
    ```

    代码写在这里，我是为了在 `hexo s` 以后替换，所以看 [官网文档](https://hexo.io/zh-cn/api/filter#%E8%BF%87%E6%BB%A4%E5%99%A8%E5%88%97%E8%A1%A8)，用的 `after_post_render`

    ```bash
    hexo.extend.filter.register('after_post_render', function(data) {
        data.content = data.content.replace(/<img src="(..|\/source)\/images\/.*?>/g, function(match, capture) {
            return match.replace("/source/images", "/images").replace("../images", "/images")
        });

        return data;
    });
    ```

4. 测试

    在 `hexo-test` 里面运行

    ```bash
    npm ln
    ```

    在hexo的博客项目 `yuhldr` 文件夹里运行

    ```bash
    npm ln hexo-test
    ```

    在博客项目里，找到 `package.json` 的 `dependencies` 中添加依赖 `"hexo-md-imgs": "^1.0.0",`

    其实这也就类似于 `npm install hexo-md-imgs`，且此时对 `hexo-md-imgs` 的修改会直接反映到博客中。

### npm库发布

1. 在这里注册一个账号 [网站](https://www.npmjs.com/)

    > 注意，在浏览器里激活邮箱，直接在qq邮箱点激活，有问题，如果不激活，发布时会报错 

    ```bash
    a package version that is forbidden by your security policy, or
    npm ERR! 403 on a server you do not have access to.
    ```

2. npm源保证是官方的

    ```bash
    npm config get registry
    ```

    应该查看到

    ```bash
    https://registry.npmjs.org/
    ```

    如果不是，更换一下

    ```bash
    npm config set registry https://registry.npmjs.org
    ```

3. npm添加账户信息

    ```bash
    npm adduser
    ```

    按照提示输入刚才注册的账号密码和邮箱

4. 发布

    ```bash
    npm publish
    ```

    邮箱必须验证，不然发布会报错，而且保证包名唯一，可以先去 [官网](https://www.npmjs.com/) 搜一下

5. 忽略

    某个文件只是说明不需要发布的话，当前目录新建 `.npmignore` 文件，添加忽略，与 `git` 类似