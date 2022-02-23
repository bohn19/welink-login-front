/*
 * @Author: zhiqiang
 * @Date: 2021-05-25 18:31:07
 * @LastEditTime: 2021-05-25 18:31:20
 */
var imgWidth = $(".loginBg").width()
var imgHeight = $(".loginBg").height()
var pointLifetime = 500
var points = []
var canTick = !0
$(function(){
    var canvas = document.querySelector("#canvas-overlay"),
    e = canvas.getContext("2d");
    e.fillStyle = "rgba(0, 0, 0, 0.5)",
    e.fillRect(0, 0, canvas.width, canvas.height),
    init()
})
init = function(){
    document.addEventListener("mousemove", onMouseMove),
    window.addEventListener("resize", resizeCanvases),
    resizeCanvases(),
    tick()
}
resizeCanvases =  function() {
    var canvas = document.querySelector("#canvas-overlay"),
    t = document.querySelector("#canvas-lines");
    canvas.width = t.width = $(".loginBg").width(),
    canvas.height = t.height = $(".loginBg").height(),
    imgWidth / imgHeight <= canvas.width / canvas.height ? (imgHeight = imgHeight * canvas.width / imgWidth, imgWidth = canvas.width) : (imgWidth = imgWidth * canvas.height / imgHeight, imgHeight = canvas.height)
},
onMouseMove =  function(e) {
    points.push({
        time: Date.now(),
        x: e.clientX,
        y: e.clientY
    })
},
tick = function() {
    canTick && (points = points.filter((function(t) {
        return Date.now() - t.time < pointLifetime
    })), drawLineCanvas(), drawImageCanvas(), setTimeout((function() {
        tick()
    }), 20))
},
drawLineCanvas = function() {
    var e = document.querySelector("#canvas-lines"),
    t = e.getContext("2d");
    t.clearRect(0, 0, e.width, e.height),
    t.lineCap = "round",
    t.shadowBlur = 50,
    t.shadowColor = "#000";
    for (var i = 1; i < points.length; i++) {
        var r = this.points[i],
        n = points[i - 1],
        o = getDistanceBetween(r, n),
        c = (70 - Math.max(0, Math.min(70, o))) / 70;
        t.lineWidth = 70 + 70 * c;
        var l = Date.now() - r.time,
        h = (pointLifetime - l) / pointLifetime;
        t.strokeStyle = "rgba(0, 0, 0, " + h + ")",
        t.beginPath(),
        t.moveTo(n.x, n.y),
        t.lineTo(r.x, r.y),
        t.stroke()
    }
},
getDistanceBetween = function(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
},
drawImageCanvas = function() {
    var canvas = document.querySelector("#canvas-overlay"),
    e = canvas.getContext("2d"),
    t = document.querySelector("#canvas-lines");
    img = document.querySelector(".imgBg");
    e.globalCompositeOperation = "source-over",
    e.save(),
    e.fillStyle = "rgb(0, 0, 0)",
    e.fillRect(0, 0, canvas.width, canvas.height),
    e.restore(),
    e.globalCompositeOperation = "destination-out",
    e.drawImage(t, 0, 0),
    e.globalCompositeOperation = "source-in"
    let sx, sy, sw, sh, imgRatio, canvasRatio;
    canvasRatio = canvas.width / canvas.height;
    // cover 方式
    imgRatio = img.width / img.height;
　　if(imgRatio <= canvasRatio){
　　　　sw = img.width
　　　　sh = sw / canvasRatio
　　　　sx = 0
　　　　sy = (img.height - sh) / 2
　　}else{
　　　  sh = img.height
　　　　sw = sh * canvasRatio
　　　　sx = (img.width - sw) / 2
　　　　sy = 0
　　} 　　
    e.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height) // 因为是cover覆盖， 所以dx,dy都是0，绘制宽高即为canvas宽高 
}
