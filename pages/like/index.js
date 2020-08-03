Component({
    data: {
        userList: [],
        openId: '',
        userInfo: ''
    },
    ready () {
        const that = this
        that.getUserList()
      },
      methods: {
        sendGreet (e) {
          const that = this
          if (e.detail.errMsg === 'getUserInfo:ok') {
            wx.getUserInfo({
              success: function (res) {
                that.userInfo = res.userInfo
                that.getOpenId()
              }
            })
          }
        },
    
        addUser () {
          const that = this
          const db = wx.cloud.database()
          const user = db.collection('user')
          user.add({
            data: {
              user: that.userInfo
            }
          }).then(res => {
            that.getUserList()
          })
        },
    
        getOpenId () {
          const that = this
          wx.cloud.callFunction({
            name: 'user',
            data: {}
          }).then(res => {
            that.openId = res.result.openid
            that.getIsExist()
          })
        },
        getIsExist () {
          const that = this
          const db = wx.cloud.database()
          const user = db.collection('user')
          user.where({
            _openid: that.openId
          }).get().then(res => {
            if (res.data.length === 0) {
                wx.showToast({
                    title: "感谢您的祝福~"
                });
              that.addUser()
            } else {
                wx.showToast({
                    title: "您已经送过祝福了~"
                });
            }
          })
        },
        getUserList () {
          const that = this
          wx.cloud.callFunction({
            name: 'userList',
            data: {}
          }).then(res => {
            that.setData({
                userList: res.result.data
            })
          })
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
        },
        onShareTimeline () {
          return {
            title: '欢迎来到高彩鹏的小程序',
            imageUrl: 'https://www.gaocaipeng.com/love/love-share-banner.png'
          }
        }
      }
});