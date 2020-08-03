var t = require("../../utils/drawPath.js"), a = (require("../../utils/drawingArea.js"), 
getApp());

Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        musicTop: (a.globalData.Custom.top + a.globalData.Custom.bottom) / 2,
        musicLeft: a.globalData.windowWidth - a.globalData.Custom.right,
        isInit: !1,
        animationData: {},
        loveWords: "这是Wo们相识相爱的时光",
        loveTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        animationEnd: !1,
        isPlay: !0,
        loveHeadUrl: null,
        loveHeadAnimation: !1
    },
    ready: function(o) {
        var e = this;
        e.data.isInit || (e.data.isInit = !0, wx.createSelectorQuery().in(this).select(".love_heart").fields({
            size: !0,
            node: !0
        }).exec(function(o) {
            var i = o[0].width, n = o[0].height, l = o[0].node, s = l.getContext("2d"), c = wx.getSystemInfoSync().pixelRatio, r = l._width, u = l._height;
            l.width = r * c, l.height = u * c, s.scale(c, c), t.loveHeart(l, s, i, n, function() {
                a.globalData.isLoveCanvasFinsih = !0, e.timing(l, a.globalData.config.loveStartDate), 
                e.setData({
                    loveWords: a.globalData.config.loveWords,
                    loveHeadUrl: a.globalData.config.loveHeadUrl,
                    loveHeadAnimation: a.globalData.config.loveHeadAnimation
                }), e.createAnimation();
            });
        }));
    },
    methods: {
        createAnimation: function() {
            var t = wx.createAnimation({
                duration: 1500,
                timingFunction: "ease"
            });
            t.opacity(1).step(), this.setData({
                animationData: t.export()
            });
        },
        timing: function(t, a) {
            var o = this;
            t.requestAnimationFrame(function e() {
                o.calculateTime(a), t.requestAnimationFrame(e);
            });
        },
        calculateTime: function(t) {
            var a = Date()
            var o = (Date.parse(a) - Date.parse(new Date(t))) / 1e3
            var e = Math.floor(o / 86400);
            o %= 86400;
            var i = Math.floor(o / 3600);
            i < 10 && (i = "0" + i), o %= 3600;
            var n = Math.floor(o / 60);
            n < 10 && (n = "0" + n), (o %= 60) < 10 && (o = "0" + o)
            this.setData({
                loveTime: {
                    days: e,
                    hours: i,
                    minutes: n,
                    seconds: o
                }
            });
        },
        audioPlay: function() {
            var t;
            this.data.isPlay ? (a.globalData.pauseMusic(), t = !1) : (a.globalData.playMusic(!0),
            t = !0), this.setData({
                isPlay: t
            });
        },
        onTouchStart: function(t) {
            this.touchEffect.touchStart(t);
        },
        onTouchMove: function(t) {
            this.touchEffect.touchMove(t);
        },
        onTouchEnd: function(t) {
            this.touchEffect.touchEnd(t);
        },
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
    },
});