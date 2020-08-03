App({
    onLaunch: function() {
        var a = this;
        wx.cloud ? wx.cloud.init({
            traceUser: !0
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力"), this.globalData = {
            playMusic: function(o) {
                if (null != a.globalData.config) {
                    if (a.globalData.audio) !a.globalData.audio.paused || !o && a.globalData.pauseByUser || a.globalData.audio.play(); else {
                        var t = wx.createInnerAudioContext();
                        t.src = encodeURI(a.globalData.config.musicUrl),
                        t.autoplay = !0, t.loop = !0, a.globalData.audio = t;
                    }
                    a.globalData.pauseByUser = !1;
                }
            },
            pauseMusic: function() {
                a.globalData.audio && (a.globalData.audio.pause(), a.globalData.pauseByUser = !0);
            },
            pauseByUser: !1
        };
        var o = this;
        wx.getSystemInfo({
            success: function(a) {
                o.globalData.StatusBar = a.statusBarHeight;
                var t = wx.getMenuButtonBoundingClientRect();
                t ? (o.globalData.Custom = t, o.globalData.CustomBar = t.bottom + t.top - a.statusBarHeight) : o.globalData.CustomBar = a.statusBarHeight + 50, 
                o.globalData.bodyHeight = a.windowHeight - o.globalData.CustomBar, o.globalData.windowWidth = a.windowWidth, 
                o.globalData.windowHeight = a.windowHeight;
            }
        }), wx.login({
            success: function(a) {
                o.globalData.code = a.code;
            }
        }), wx.cloud.callFunction({
            name: "login",
            data: {}
        }).then(function(o) {
            a.globalData.openid = o.result.openid;
        }), wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(a) {
                        o.globalData.userInfo = a.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(a);
                    }
                });
            }
        }), wx.cloud.database().collection("music").get().then(function(t) {
            o.globalData.config = t.data[0]
            a.globalData.playMusic(!1)
        }).catch(console.error);
    }
});