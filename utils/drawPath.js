function t(t, o) {
    this.x = t, this.y = o;
}

t.prototype = {
    rotate: function(t) {
        var o = this.x, r = this.y;
        return this.x = Math.cos(t) * o - Math.sin(t) * r, this.y = Math.sin(t) * o + Math.cos(t) * r, 
        this;
    },
    mult: function(t) {
        return this.x *= t, this.y *= t, this;
    },
    clone: function() {
        return new t(this.x, this.y);
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this;
    },
    set: function(t, o) {
        return this.x = t, this.y = o, this;
    }
};

var o = function() {
    function o(t, o, r, i, n, s) {
        this.stretchA = t, this.stretchB = o, this.startAngle = r, this.angle = i, this.flower = s, 
        this.growFactor = n, this.r = 1, this.isfinished = !1;
    }
    return o.prototype.update = function(o) {
        this.r <= this.flower.r ? (this.r += this.growFactor, this.v1 = new t(0, this.r).rotate(i.degrad(this.startAngle)), 
        this.v2 = this.v1.clone().rotate(i.degrad(this.angle)), this.v3 = this.v1.clone().mult(this.stretchA), 
        this.v4 = this.v2.clone().mult(this.stretchB), o.strokeStyle = this.flower.c, o.beginPath(), 
        o.moveTo(this.v1.x, this.v1.y), o.bezierCurveTo(this.v3.x, this.v3.y, this.v4.x, this.v4.y, this.v2.x, this.v2.y), 
        o.stroke()) : this.isfinished = !0;
    }, o;
}(), r = function() {
    function t(t, o, r, i, n) {
        this.p = t, this.r = o, this.c = r, this.pc = i, this.petals = [], this.heartFlower = n, 
        this.init(), this.heartFlower.addFlower(this);
    }
    return t.prototype = {
        init: function() {
            for (var t = 360 / this.pc, r = i.randomInt(0, 90), n = 0; n < this.pc; n++) {
                var s = new o(i.random(i.options.petalStretch.min, i.options.petalStretch.max), i.random(i.options.petalStretch.min, i.options.petalStretch.max), r + n * t, t, i.random(i.options.growFactor.min, i.options.growFactor.max), this);
                this.petals.push(s);
            }
        },
        update: function(t) {
            var o, r = !0;
            t.save(), t.translate(this.p.x, this.p.y);
            for (var i = 0; i < this.petals.length; i++) (o = this.petals[i]).update(t), o.x = this.p.x, 
            o.y = this.p.y, r *= o.isfinished;
            t.restore(), 1 == r && this.heartFlower.removeFlower(this);
        }
    }, t;
}(), i = function() {
    function o() {
        this.flowers = [];
    }
    return o.prototype.createRandomFlower = function(t, r) {
        this.createFlower(t, r, o.randomInt(o.options.flowerRadius.min, o.options.flowerRadius.max), o.randomrgba(o.options.color.rmin, o.options.color.rmax, o.options.color.gmin, o.options.color.gmax, o.options.color.bmin, o.options.color.bmax, o.options.color.opacity), o.randomInt(o.options.petalCount.min, o.options.petalCount.max));
    }, o.prototype.createFlower = function(o, i, n, s, e) {
        new r(new t(o, i), n, s, e, this);
    }, o.prototype.addFlower = function(t) {
        this.flowers.push(t);
    }, o.prototype.removeFlower = function(t) {
        for (var o = 0; o < this.flowers.length; o++) if (this.flowers[o] === t) return this.flowers.splice(o, 1), 
        this;
    }, o.prototype.update = function(t) {
        for (var o = 0; o < this.flowers.length; o++) this.flowers[o].update(t);
        return 0 == this.flowers.length;
    }, o.random = function(t, o) {
        return Math.random() * (o - t) + t;
    }, o.randomInt = function(t, o) {
        return Math.floor(Math.random() * (o - t + 1)) + t;
    }, o.circle = 2 * Math.PI, o.degrad = function(t) {
        return o.circle / 360 * t;
    }, o.raddeg = function(t) {
        return t / Garden.circle * 360;
    }, o.rgba = function(t, o, r, i) {
        return "rgba(" + t + "," + o + "," + r + "," + i + ")";
    }, o.randomrgba = function(t, r, i, n, s, e, a) {
        var h = Math.round(o.random(t, r)), c = Math.round(o.random(i, n)), u = Math.round(o.random(s, e));
        return Math.abs(h - c) <= 5 && Math.abs(c - u) <= 5 && Math.abs(u - h) <= 5 ? o.rgba(t, r, i, n, s, e, a) : o.rgba(h, c, u, a);
    }, o.options = {
        petalCount: {
            min: 8,
            max: 15
        },
        petalStretch: {
            min: .1,
            max: 3
        },
        growFactor: {
            min: .1,
            max: 1
        },
        flowerRadius: {
            min: 8,
            max: 10
        },
        density: 10,
        growSpeed: 1e3 / 60,
        color: {
            rmin: 128,
            rmax: 255,
            gmin: 0,
            gmax: 128,
            bmin: 0,
            bmax: 128,
            opacity: .1
        },
        tanAngle: 60
    }, o;
}(), n = 10, s = 10, e = 35, a = 0, h = 0;

module.exports = {
    loveHeart: function(t, o, r, c, u) {
        var l = 10, p = [];
        a = r / 2, h = c / 2 - e;
        var m = new i(), f = setInterval(function() {
            if (l <= 30.2) {
                for (var t = function(t) {
                    var o = t / Math.PI, r = n * (16 * Math.pow(Math.sin(o), 3)), i = -s * (13 * Math.cos(o) - 5 * Math.cos(2 * o) - 2 * Math.cos(3 * o) - Math.cos(4 * o));
                    return new Array(a + r, h + i);
                }(l), o = !0, r = 0; r < p.length; r++) {
                    var e = p[r];
                    if (Math.sqrt(Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2)) < 1.3 * i.options.flowerRadius.max) {
                        o = !1;
                        break;
                    }
                }
                o && (p.push(t), m.createRandomFlower(t[0], t[1])), l <= 30.2 && (l += .2);
            } else clearInterval(f), u();
        }, 50), d = function r() {
            m.update(o) || t.requestAnimationFrame(r);
        };
        setTimeout(function() {
            t.requestAnimationFrame(d);
        }, 100);
    }
};