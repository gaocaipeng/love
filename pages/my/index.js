var a = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        userInfo: a.globalData.userInfo,
        bodyHeight: a.globalData.bodyHeight,
    },
    ready: function() {
    },
    detached: function() {
    },
    methods: {
        onShareAppMessage () {
            let bonusName = '欢迎来到高彩鹏的小程序'
            let url = `pages/love/index`
            let image = 'https://www.gaocaipeng.com/love/love-share-banner.png'
            return {
                imageUrl: image,
                title: bonusName,
                path: url
            }
        },
        onShareTimeline () {
            return {
                title: '欢迎来到高彩鹏的小程序',
                imageUrl: 'https://www.gaocaipeng.com/love/love-share-banner.png'
            }
        },
        savePhoto () {
            let url = 'https://www.gaocaipeng.com/love/weixin.png'
            wx.previewImage({
                current: url,
                urls: [url]
            })
        },
        savePay () {
            let url = 'https://www.gaocaipeng.com/love/guli.png'
            wx.previewImage({
                current: url,
                urls: [url]
            })
        }
    }
});