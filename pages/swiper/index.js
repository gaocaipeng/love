
Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        swiperList: []
    },
    ready: function() {
        const that = this
        const db = wx.cloud.database()
        const banner = db.collection('banner')
        banner.get().then(res => {
            that.setData({
                swiperList: res.data[0].bannerList
            });
        })
    },
    methods: {
        onShareTimeline () {
            return {
                title: '欢迎来到高彩鹏的小程序',
                imageUrl: 'https://www.gaocaipeng.com/love/love-share-banner.png'
            }
        },
        onShareAppMessage () {
            let bonusName = '欢迎来到高彩鹏的小程序'
            let url = `pages/love/index`
            let image = 'https://www.gaocaipeng.com/love/love-share-banner.png'
            return {
                imageUrl: image,
                title: bonusName,
                path: url
            }
        }
    }
})