import requests from "./ajax";
//API统一管理
//轮播图 接口地址：https://autumnfish.cn/banner get
export const reqBanner = () => requests.get('/banner')
//推荐歌单 **接口地址 :** https://autumnfish.cn/personalized
export const reqPersonalized = (limit = 10) => requests.get('/personalized', { params: { limit } })
//最新音乐 **接口地址 :** https://autumnfish.cn/personalized/newsong
export const reqNewsong = () => requests.get('/personalized/newsong')
//推荐MV **接口地址 :** https://autumnfish.cn/personalized/mv
export const reqMv = () => requests.get('/personalized/mv')
//播放歌曲 **接口地址 :** https://autumnfish.cn/song/url **参数 :** `id`: 音乐 id, 如 `id=347230`
export const reqSongUrl = (id) => requests.get('/song/url', id)
//## 歌单列表 - 精品歌单 **接口地址 :**  https://autumnfish.cn/top/playlist/highquality 1. `limit`: 取出歌单数量 , 默认为 20 2. `cat`: 歌单的标签，可选值如下 
export const reqHighquality = (limit = 1, cat = '全部') => requests.get('/top/playlist/highquality', { params: { limit, cat } })
//## 歌单列表 - 歌单列表 **接口地址 :** https://autumnfish.cn/top/playlist/ 1. `limit`:获取的个数2. `offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)*20, 其中 20 为 limit 的值3. `cat`: 歌单的标签, 可选值如下
export const reqPlaylist = (data) => requests.get('/top/playlist/', data)
//最新音乐 **接口地址 :**  https://autumnfish.cn/top/song **必选参数 :**`type`: 地区类型 id,对应以下:全部:0华语:7欧美:96日本:8韩国:16
export const reqSong = (type) => requests.get('/top/song', type)
//最新MV页面 接口文档 **接口地址 :**  https://autumnfish.cn/mv/all 
// **可选参数 :**
// 1. `area`: 地区,可选值为：全部、内地、港台、欧美、日本、韩国、不填则为全部 
// 2. `type`: 类型,可选值为：全部、官方版、原生、现场版、网易出品,不填则为全部
// 3. `order`: 排序,可选值为：上升最快、最热、最新、不填则为上升最快
// 4. `limit`: 取出数量 , 默认为 30
// 5. `offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const reqAllMv = (data) => requests.get('/mv/all', data)
//MV地址 **接口地址 :** https://autumnfish.cn/mv/url **必选参数 :** `id`: mv的id
export const reqMvUrl = (id) => requests.get('/mv/url', id)
//相关MV **接口地址 :** https://autumnfish.cn/simi/mv **必选参数 :** `mvid`: mv的id
export const reqSimiMv = (mvid) => requests.get('/simi/mv', mvid)
//MV信息 **接口地址 :** https://autumnfish.cn/mv/detail  **必选参数 :** `mvid`: mv 的 id
export const reqMvDetail = (mvid) => requests.get('/mv/detail', mvid)
//歌手信息 **接口地址 :** https://autumnfish.cn/artists **必选参数 :** `id`: 歌手 id, 可由搜索接口获得
export const reqArtists = (data) => requests.get('/artists/detail', data)
//搜索接口 **接口地址 :**  https://autumnfish.cn/search **必选参数 :** `keywords` : 关键词 
// **可选参数 :** 
// 1. `limit` : 返回数量 , 默认为 30 
// 2. `offset` : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 3. `type`: 搜索类型；默认为 1 即单曲 , 取值意义 :如下
// ```
// 歌曲:1
// 歌单:1000
// MV:1004
// ```
export const reqSearch = (data) => requests.get('/search', data)
//歌单信息  **接口地址 :** https://autumnfish.cn/playlist/detail **必选参数 :** `id` : 歌单 id
export const reqPlaylistDetail = (id) => requests.get(`/playlist/detail?id=${id}`)
//歌单评论 调用例子 : /comment/playlist?id=705123491 可选参数 : limit: 取出评论数量 , 默认为 20offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export const reqCommentPlaylist = (data) => requests.get(`/comment/playlist`, data)
//mv 评论 调用例子 : /comment/mv?id=5436712
export const reqCommentMv = (data) => requests.get(`/comment/mv`, data)
//获取歌曲详情 /song/detail?ids=347230
export const reqSongDetail = (id) => requests.get(`/song/detail?ids=${id}`)
