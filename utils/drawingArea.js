var t;

!function(t) {
    var i = 5, e = [ [ -.00417, -.25796, -.44345, -.29936, -.49702, 0 ], [ -.54762, .30254, -.08333, .5, 0, .79618 ], [ .08333, .5, .54762, .30254, .49702, 0 ], [ .44345, -.29936, .0417, -.25796, 0, 0 ] ];
    t.create = function(t, i, e, s) {
        return new h(t, i, e, s);
    };
    var s = function() {
        function t() {}
        return t.getHSL = function(t, i, e, s) {
            return null == s ? "hsl(" + t % 360 + "," + i + "%," + e + "%)" : "hsla(" + t % 360 + "," + i + "%," + e + "%," + s + ")";
        }, t.getRGB = function(t, i, e, s) {
            return null != t && null == e && (s = i, e = 255 & t, i = t >> 8 & 255, t = t >> 16 & 255), 
            null == s ? "rgb(" + t + "," + i + "," + e + ")" : "rgba(" + t + "," + i + "," + e + "," + s + ")";
        }, t;
    }();
    function h(t, i, e, s) {
        var h = this;
        this.ctx = i, this.drawnWidth = e, this.drawnHeight = s, this.isMove = !0, this.touchMoveTime = 0, 
        this._emitter = new o(), this._linePoint = [], this.touchX = e / 2, this.touchY = s / 2;
        t.requestAnimationFrame(function i() {
            h.enterFrameHandler(), t.requestAnimationFrame(i);
        });
    }
    h.prototype.enterFrameHandler = function() {
        this.ctx.save(), this.ctx.globalCompositeOperation = "destination-out", this.ctx.beginPath(), 
        this.ctx.fillStyle = "red", this.ctx.fillRect(0, 0, this.drawnWidth, this.drawnHeight), 
        this.ctx.fill(), this.ctx.globalCompositeOperation = "source-over", this._isAutoAnimation || (this._isMove = new Date().getTime() - this._mouseMoveTime < 200), 
        this._emitter.latestX = this.touchX, this._emitter.latestY = this.touchY, this._emitter.update(this.ctx, this.drawnWidth, this.drawnHeight), 
        1 == this._isMove && this.createParticle(), this.ctx.restore();
    }, h.prototype.drawBackground = function() {
        this.ctx.fillStyle = "#fadbd9", this.ctx.fillRect(0, 0, this.drawnWidth, this.drawnHeight);
    }, h.prototype.updateLines = function() {
        this._isMove ? this._linePoint.push({
            x: this._emitter.x,
            y: this._emitter.y,
            vx: this._emitter.vx,
            vy: this._emitter.vy
        }) : this._linePoint.shift();
        for (var t = this._linePoint.length - 1, i = 0; i < t; i++) {
            var e = this._linePoint[i], h = this._linePoint[i + 1];
            this.ctx.save(), this.ctx.strokeStyle = s.getRGB(255, 255, 255), this.ctx.lineWidth = 3, 
            this.ctx.moveTo(e.x, e.y), this.ctx.lineTo(h.x, h.y), this.ctx.stroke(), this.ctx.restore();
            for (var o = 0; o < 6; o++) {
                this.ctx.save();
                var r = e.x + 1 * e.vx * (o - 3), n = e.y + 1 * e.vy * (o - 3), a = h.x + 1 * h.vx * (o - 3), c = h.y + 1 * h.vy * (o - 3);
                this.ctx.strokeStyle = s.getRGB(255, 255, 255), this.ctx.lineWidth = 3, this.ctx.moveTo(r, n), 
                this.ctx.lineTo(a, c), this.ctx.stroke(), this.ctx.restore();
            }
        }
        t > 20 && (this._linePoint.shift(), this._linePoint.length > 20 && this._linePoint.shift());
    }, h.prototype.touchStart = function(t) {
        this.touchX = t.touches[0].x, this.touchY = t.touches[0].y, this._mouseMoveTime = new Date().getTime();
    }, h.prototype.touchMove = function(t) {
        this._isMove = !0, this.touchX = t.touches[0].x, this.touchY = t.touches[0].y;
    }, h.prototype.touchEnd = function(t) {
        this.createParticle();
    }, h.prototype.createParticle = function() {
        this._emitter.emit(this.touchX, this.touchY);
    }, t.TouchParticleEffect = h;
    var o = function() {
        function t() {
            this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.latestY = 0, this.latestX = 0, 
            this.numParticles = i, this.PRE_CACHE_PARTICLES = 300, this._particleActive = [], 
            this._particlePool = [];
            for (var t = 0; t < this.PRE_CACHE_PARTICLES; t++) this._particlePool.push(new r());
        }
        return t.prototype.emit = function(t, i) {
            for (var e = 0; e < this.numParticles; e++) this.getNewParticle(t, i);
        }, t.prototype.update = function(t, i, e) {
            var s = this.latestX - this.x, h = this.latestY - this.y, o = .2 * Math.sqrt(s * s + h * h), r = Math.atan2(h, s);
            this.vx += Math.cos(r) * o, this.vy += Math.sin(r) * o, this.vx *= .4, this.vy *= .4, 
            this.x += this.vx, this.y += this.vy;
            for (var n = 0; n < this._particleActive.length; n++) {
                var a = this._particleActive[n];
                a.getIsDead() ? this.removeParticle(a) : (a.y >= e ? (a.vy *= -.8, a.y = e) : a.y <= 0 && (a.vy *= -.8, 
                a.y = 0), a.x >= i ? (a.vx *= -.8, a.x = i) : a.x <= 0 && (a.vx *= -.8, a.x = 0), 
                a.update(t));
            }
        }, t.prototype.getNewParticle = function(t, i) {
            var e = this.fromPool();
            return e.resetParameters(t, i, this.vx, this.vy), this._particleActive.push(e), 
            e;
        }, t.prototype.removeParticle = function(t) {
            var i = this._particleActive.indexOf(t);
            i > -1 && this._particleActive.splice(i, 1), this.toPool(t);
        }, t.prototype.getActiveParticles = function() {
            return this._particleActive;
        }, t.prototype.fromPool = function() {
            return this._particlePool.length > 0 ? this._particlePool.shift() : new r();
        }, t.prototype.toPool = function(t) {
            this._particlePool.push(t);
        }, t;
    }(), r = function() {
        function t() {
            var t = Math.random() * Math.random() * Math.random() * 80 + 3;
            this.size = t, this.random = Math.random(), this._destroy = !0;
        }
        return t.prototype.resetParameters = function(t, i, e, s) {
            this.x = t, this.y = i, this.vx = .5 * e + 10 * (Math.random() - .5), this.vy = .5 * s + 10 * (Math.random() - .5), 
            this.life = Math.random() * Math.random() * 120 + 4, this.random = Math.random(), 
            this._count = 0, this._destroy = !1, this.alpha = 1, this.scaleX = this.scaleY = 1;
        }, t.prototype.update = function(t) {
            this.x += this.vx, this.y += this.vy, this._count++;
            var i = 1 - this._count / this.life * 1 / 3;
            this.alpha = .6 * Math.random() + .4, this.scaleX = this.scaleY = i;
            var h = s.getRGB(255, 255, 255);
            t.save(), t.moveTo(this.x, this.y);
            for (var o = 0; o < e.length; o++) t.bezierCurveTo(e[o][0] * this.size + this.x, e[o][1] * this.size + this.y, e[o][2] * this.size + this.x, e[o][3] * this.size + this.y, e[o][4] * this.size + this.x, e[o][5] * this.size + this.y);
            this.random < .5 ? (t.fillStyle = h, t.fill()) : (t.strokeStyle = h, t.fineWidth = 2, 
            t.stroke()), t.restore(), this.life < this._count && (this._destroy = !0);
        }, t.prototype.getIsDead = function() {
            return this._destroy;
        }, t;
    }();
    !function() {
        function t() {}
        t.createStartPoints = function(i, e, s) {
            return [ t.createCordinate(i, -90, e, s), t.createCordinate(i, -234, e, s), t.createCordinate(i, -18, e, s), t.createCordinate(i, -162, e, s), t.createCordinate(i, -306, e, s) ];
        }, t.createCordinate = function(t, i, e, s) {
            return {
                x: t * Math.cos(i / 180 * Math.PI) + e,
                y: t * Math.sin(i / 180 * Math.PI) + s
            };
        };
    }();
}(t || (t = {})), module.exports = t;