我想在要设计一个数据库使用sqlite,是用来做类似于浏览器书签的功能. 我需要你帮我设计数据库模型使用drizzle,以下是我的要求
所有的表都是用自增 ID作为主键 需要你严格按照drizzle官网来https://orm.drizzle.team/docs/sql-schema-declaration
1. 目前使用了clerk做第三方登录, 后续很有可能切回到自己实现登录, 可以完善一下用户表
   1. 每个用户可以有关注者也有被关注者
2. 未来会根据用户的权限开放功能, 现在设想的是只有普通用户和pro用户, 也许可能还会有其他比pro更高级的会员 目前只区分pro和普通用户,pro用户会有一些跟高级的功能, 但是还没想好有什么功能,设计一下这个表.
3. 收藏功能
   1. 用户可以添加一个网站作为一个item, 需要记录网站的url, title, img,description等信息
   2. 还可以把这个网站设置为公开还是私有, 公开可以对所有人可见.
   3. 如果是公开的还可以被其他用户收藏, 还有点赞功能
   4. 每个收藏的网站可以进行tag分类,可以有多个tag
   5. 每个item还有被查看次数的功能
   6. 有创建时间
   7. item不一定是网站,后续可能会添加其他类型的,比如个人笔记之类的,现在默认type=website
   8. 可以拖动排列顺利, 默认是根据创建时间排序, 如果用户调整了顺序需要按照用户的顺序来.
4. 回收站功能:
   1.  用户可以对自己的item进行删除, 默认删除会删除到回收站, 在回收站可以恢复.
   2.  如果在回收站删除, 那就是彻底删除.
   3.  回收站将自动删除超过 7 天的内容 
5. 收藏夹功能(类似于文件夹)
   1.  用户可以对每个item进行整理,可以把不同的tag的item整理到一个收藏夹中.
   2.  有创建时间和编辑时间
   3.  可以被用户一键克隆到自己的收藏夹
   4.  收藏夹可以嵌套(类似于文件夹里嵌套文件夹)
6.  发现功能
    1. 用户可以在发现广场去浏览那些公开的item
    2. 可以按tag分类