hexo.extend.filter.register('after_post_render', function(data) {
    data.content = data.content.replace(/<img src="(..|\/source)\/images\/.*?>/g, function(match, capture) {
        return match.replace("/source/images", "/images").replace("../images", "/images")
    });

    return data;
});