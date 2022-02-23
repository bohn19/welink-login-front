$(function(){
	var animateDH = $('.animationDH');
	var _ht = $(window).height();
	var breads = $('.aboutItems .abItem');
	var fixedTops = $('.publicNav')
	var animateTop = fixedTops.length>0?fixedTops.offset().top:0;
	$(window).bind('scroll load resize', function () {
	   if ($(document).scrollTop() > 150) {
           $('.header,.fiveItem').addClass('active')
       } else {
           $('.header,.fiveItem').removeClass('active')
       }
       if ($(document).scrollTop() > $(window).height() / 2) {
           $('.scrollToTop').stop(true, true).fadeIn();
       } else {
           $('.scrollToTop').stop(true, true).fadeOut();
       }
       if (animateDH.length > 0) {
            var scrollTop = $(window).scrollTop() + _ht;
            animateDH.each(function (i, o) {
                var animateTop = $(o).offset().top;
                if (scrollTop > animateTop) {
                    $(o).addClass('current');
                }
            });
        }
       if(fixedTops.length > 0){
        	fixedTops.each(function () {
	            scrollTop = $(window).scrollTop();
	            if (scrollTop >= animateTop) {
	                fixedTops.addClass("on");
	            } else {
	                fixedTops.removeClass("on");
	            }
	        });
        }
       if (breads.length > 0) {
            breads.each(function (i, o) {
                var scrollTop = $(window).scrollTop();
                var animateTop = $(o).offset().top - fixedTops.height();
                if (scrollTop >= animateTop - 100) {
                    index_ = i;
                    $('.publicNav dd').eq(index_).addClass('on').siblings().removeClass('on');
                }
            });
        }
        
    });
    setTimeout(function(){
		$('.preload').fadeOut(500);
	},4000)
})
document.onreadystatechange = loadingChange;
window.onload = function(){
	var url = window.location.href.toLowerCase() || '';
    var index = 0;
    if (url.indexOf("about")> 0 ) {
        index = 1;
    }else if (url.indexOf("product")> 0 ) {
        index = 2;
    }else if (url.indexOf("news")> 0 ) {
        index = 3;
    }else if (url.indexOf("party")> 0 ) {
        index = 4;
    }else if (url.indexOf("join")> 0 ) {
        index = 5;
    }else if (url.indexOf("contact")> 0 ) {
        index = 6;
    }
    $('.navDL dd').eq(index).addClass('on').siblings().removeClass('on')
	/*点击回顶部*/
	$(".scrollToTop").click(function(){
      	$('body,html').animate({ scrollTop: 0 }, 500);
    });
	/*手机导航切换*/
	$(".navMenuPhone").bind("click", function() {
		$('.headerDL').stop(true,true).slideToggle()
		$(this).toggleClass("on");
		$('.header').toggleClass('open')
	});
	$(".navMenuPc").bind("click", function() {
		$(this).toggleClass("on");
		$('.pcMenus').stop(true,true).slideToggle()
		$('.header').toggleClass('none')
	});
	

}
function loadingChange() {
 	if (document.readyState === "complete") { 
         $('.preload').fadeOut(500);
 	}
 }
function openVideo(src){
	if(!src){
      return
	}
	var htmls = '<div class="video-box">'+
				'<span class="video-close"><i class="iconfont">&#xe648;</i></span>'+
				'<div id="video1">'+
				'<video controls="controls" autoplay src="'+src+'" id="fz-videoAct"></video>'+
				'</div>'+
				'</div>'
	$('body').append(htmls)
	$('.video-box').fadeIn()
	$('.video-close').click(function(){
		$('.video-box').remove()
	})
}
















