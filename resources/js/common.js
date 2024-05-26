//jQuery.noConflict();
!function($) {
	'use strict';

	$(function(){
		initUI.setup();

		// custom scrollbar
		if ($('.scrollbar-inner').length > 0) {
			$('.caption > .scrollbar-inner').scrollbar();
		}
	});

	var initUI = (function(){
		var isLoaded;

		function setup(){
			if(isLoaded){
				return;
			}
			isLoaded = true;

			checkResize().init(); // check resizing browser and width
			registUI('.quick-menu', menuAct, true);
			registUI('#wrap', conAni, true);
			registUI('#header', header, false); // header function
			registUI('#footer', footer, false); // footer function
			registUI('.page-title ', changeTitleInMo, false); // change title in mobile
			registUI('.ui-dial', dial, false); // dial ui with tab

			registUI('.rndtype', rndtype, false);
			registUI('.msds-search', msds, true); // select tab ui in msds.pug
			registUI('.gas-station', gasStation, true); // futuristic_gas_station.pug
			registUI('.direct_question', question, false); // direct_question.pug
			registUI('.product-container', swiperProduct, false); // rnd_bio.pug
			//registUI('.swiper-brochure', swiperBrochure, false);
			registUI('.tabmenu-group-mobile', tabMenuMobileFn, false);
			registUI('.ui-accordion', AccordionSelector, false);
			registUI('.container-mm', netWorkTab, false);

			//motion
			registUI('.intro-page', introMotion, false); // sub main
			registUI('.sub', subMotion, false);
			registUI('.page-contents.history', hPageCon, true);
			registUI('.ui-scroll-section', historyPage, false);
			registUI('.product-process-graphic.desktop', processPage, false);
			registUI('.search-area', serchform, true)
			
			// ex)
			// registUI('.sample_class', uiSampleFunction, false);
		}

		function registUI(el, fn, saveData){
			if(saveData === undefined){
				saveData = true;
			}

			var _inst;

			$(el).each(function(idx, obj){
				_inst = new fn();
				_inst.init(obj, el);
				if(saveData){
					$(el).data('_inst', _inst);
				}
			});
		}

		return {
			setup: setup,
			registUI : registUI
		};
	})();
}(jQuery);

// check resizing browser and width
var $mo, $pc, breakPoint
,runTime5 = .5
,runTime7 = .7
,runTime9 = .9
,delayTime1 = .7
,delayTime2 = 1.0
,delayTime3 = 1.2
,yvalm_1 = -20
,yvalp_1 = 20
,$scrollNext = false;

window.checkResize = function () {

	function init () {
		breakPoint = $(window).width();
		check();
		bindEvents();
		return this;
	};

	function bindEvents () {
			check();
		$(window).on('resize', function () {
			breakPoint = $(this).width();

			check();
		})
	}

	function check () {
		if (breakPoint > 0 && breakPoint <= 1023) {
			$mo = true;
			$pc = false;
			$('body').addClass('ui-mo')
			$('body').removeClass('ui-pc')
		} else if (breakPoint >= 1024) {
			$('body').addClass('ui-pc')
			$('body').removeClass('ui-mo')
			$mo = false;
			$pc = true;
		}
	}

	return {
		init : init
	}
};

// header function
var header = function () {
	var el, cont, openBtn, closeBtn, $3depth;
	var allMenu_pc, allMenu_mo;

	function init (_el) {
		el = $(_el);
		cont = $('.content-info');
		openBtn = el.find('.utill-menu > .toggle-menu > button');
		closeBtn = el.find('.close-btn');
		$3depth = el.find('.more');
		// pc
		allMenu_pc = el.find('.quick-menu');
		// mo
		allMenu_mo = el.find('.quick-memu-mobile');
		$1depth = allMenu_mo.find('.quick-menu-list > li > button');
		$2depth = allMenu_mo.find('.quick-2depth-list > .menu-box');
		logo = allMenu_mo.find('.logo');
		back = allMenu_mo.find('.prev-area');
		// gnb
		gnbBtn = $('.global-navigation > ul > li > a');
		gnbList = $('.gnb-2depth .menu-list');
		gnb2depth = $('.gnb-2depth');

		// padding top control
//		changePaddingTop();

		// border bottom control
		if ($('.tabmenu-group-mobile').length > 0) {
			if ( $mo == true) {
				el.css('border-bottom', '0px')
			} else if ($pc == true && !$('.visual').length > 0) {
				el.css('border-bottom', '1px solid #d9d9d9')
			}
		}

		// 상단 배경에 사진이 있을 때, header class 제어
		var scrollTop = $(window).scrollTop();

		if ($('.page-header').hasClass('visual')) {
			var targetTop = $('.content-info').offset().top - el.height();

			if (targetTop <= scrollTop) {
				el.parent('#wrap').removeAttr('class');
			} else {
				el.parent('#wrap').removeAttr('class').addClass('header-inverse');
			}
		}

		// showing 3depth with on class
		if ($3depth.hasClass('on')) {
			// 최초 .more.on index / mo
			// console.log(allMenu_mo.find('.more.on').parents('.menu-box').index())
			mo3depthIdx = allMenu_mo.find('.more.on').parents('.menu-box').index();

			$('.more.on').next('.depth3-list').css('display','block');
			if($('.more.on').next('.depth3-list').length  > 0) {
				$('.sns-area').hide();
			}else{
				$('.sns-area').show();
			}
		}

		bindEvents();
	}

	function bindEvents () {
		// ------------------------------------- s : resize
		$(window).on('resize', function () {
			// padding top control
			changePaddingTop();

			// border bottom control
			if ($('.tabmenu-group-mobile').length > 0) {
				if ( $mo == true) {
					el.css('border-bottom', '0px')
				} else if ($pc == true && !$('.visual').length > 0) {
					el.css('border-bottom', '1px solid #d9d9d9')
				}
			}

			// ------------------------------------- s : resize all menu
			if (openBtn.attr('_open') == 'true') {
				// resizing 시점에서의 .more.on index
				mo3depthIdx = allMenu_mo.find('.more.on').parents('.menu-box').index();

				// all menu init
				if ($pc == true) {
					allMenu_mo.css('display','none');
					allMenu_pc.css('display','block');

					// 2 depth init
					$('.quick-area').css('transform', '');

				} else if ($mo == true) {
					allMenu_mo.css('display','block');
					allMenu_pc.css('display','none');

					// main & intro page
					if ($3depth.hasClass('on') && !($('body').hasClass('main') || $('body').hasClass('intro')) ) {
						// icon init
						TweenMax.set(logo, {y: - logo.height(), opacity: 0});
						TweenMax.set(back, {x: 0, opacity: 1, 'display': 'block'});

						// 2depth init
						$2depth.removeClass('on');
						$2depth.eq(mo3depthIdx).addClass('on');
						TweenMax.set($('.quick-area'), {x: - $(window).width()});
					}
				}
			}
			// ------------------------------------- e : resize all menu
			$('.quick-menu').data('_inst').init
			// ------------------------------------- s : resize gnb
			gnb2depth.removeAttr('style')

			if (breakPoint <= 1280) {
				gnbBtn.off('mouseenter');

				gnbBtn.parent('li').removeClass('on');
				gnb2depth.css('display', 'none');

			} else if (breakPoint >= 1281) {
				gnb();
			}
			// ------------------------------------- e : resize gnb
		})
		// ------------------------------------- e : resize

		// ------------------------------------- s : scroll
		$(window).on('scroll', function () {
			var scrollTop = $(window).scrollTop();

			if ($('.page-header').hasClass('visual') || $('.page-header-default').hasClass('visual') ) {
				var targetTop = $('.content-info').offset().top - el.height();

				if (targetTop <= scrollTop) {
					el.parent('#wrap').removeAttr('class');
				} else {
					el.parent('#wrap').removeAttr('class').addClass('header-inverse');
				}
			}
		})
		// ------------------------------------- e : scroll

		// ------------------------------------- s : all menu
		// open all menu
		openBtn.on('click', function () {
			// x btn ani
			setTimeout(function () {
				// scroll
				disableScroll();
				closeBtn.addClass('on');
			}, 1100);

			// showing menu
			if ($pc == true) {
				openPcAllMenu();
			} else if ($mo == true) {
				openMoAllMenu();
			}

			openBtn.attr('_open', 'true');
		})

		// close all menu
		closeBtn.on('click', function () {
			// scroll
			activeScroll();

			// x btn ani
			closeBtn.removeClass('on');

			// hide menu
			if ($pc == true) {
				closePcAllMenu();
			} else if ($mo == true) {
				closeMoAllMenu();
			}

			openBtn.attr('_open', 'false');
		})

		// click 1 depth in mobile
		$1depth.on('click', function () {
			var thisIndex = $1depth.index($(this));

			$2depth.removeClass('on');
			$2depth.eq(thisIndex).addClass('on');

			// and open 2 depth
			open2depth();
		})

		// click 2 depth in mobile
		$3depth.on('click', function () {
			// and open 3 depth (.more)
			if ($(this).hasClass('on')) {
				$(this).next('.depth3-list').stop().slideUp(350);
				$(this).removeClass('on');
				
			} else {
				$3depth.next('.depth3-list').stop().slideUp(350);
				$(this).next('.depth3-list').stop().slideDown(400);

				$3depth.removeClass('on');
				$(this).addClass('on');
				
			}
		})

		// go to back in mobile
		back.on('click', function () {
			goToBack();
		})
	

			// pc일 때만 gnb 작동
		if (breakPoint >= 1281) {
			gnb();
		}
		// ------------------------------------- e : gnb
	}

	// #container padding-top control
//	function changePaddingTop () {
//
//		if($('.page-header.visual').length > 0 ) {
//
//			 $('.page-header .scroll-guide').css({top : window.innerHeight-70,bottom:'auto'})
//		}
//		if ($mo == true) {
//			var height = el.height(),
//				tgmHeight = $('.tabmenu-group-mobile').height();
//
//			if ($('.tabmenu-group-mobile').length > 0) {
//				cont.css({ 'padding-top' : height + tgmHeight});
//			} else {
//				cont.css({ 'padding-top' : height });
//			}
//
//		} else if ($pc == true) {
//			cont.css({ 'padding-top' : 0 });
//		}
//	}

	function activeScroll () {
        $('body, html').css('overflow', 'auto');
    }

    function disableScroll () {
        $('body, html').css('overflow', 'hidden');
	}
/* 20210527 수정 */
	// animation of Pc's all menu
	// open
	function openPcAllMenu () {
        allMenu_pc.fadeIn();
//		TweenMax.fromTo(allMenu_pc, 1.3, {x: $(window).width(), 'display': 'block'}, {x: 0, ease: Expo.easeInOut});
		
	}
	// close
	function closePcAllMenu () {
//		TweenMax.to(allMenu_pc, 1.3, {x: $(window).width(), 'display': 'none', ease: Expo.easeInOut,onComplete:function(){
//			$('.quick-menu').data('_inst').pcQuick();
//		}});
     allMenu_pc.fadeOut();

	}
    
    /* // 20210527 수정 */
   
	// animation of Mo's all menu
	// open
	function openMoAllMenu () {

		$('.tabmenu-history-group').css({
			zIndex : 10
		})
		// main & intro page
		if ($('body').hasClass('main') || $('body').hasClass('intro')) {
			// icon init
			//TweenMax.set(logo, {y: 0, opacity: 1});
			TweenMax.set(back, {x: 0, opacity: 0})

			// 2depth init
			TweenMax.set($('.quick-area'), {x: 0});

			// 3depth init
			$3depth.next('.depth3-list').css('display', 'none');
			$3depth.removeClass('on');

		} else { // etc page

			if ($3depth.hasClass('on')) {


				// icon init
				TweenMax.set(logo, {y: - logo.height()});
				// TweenMax.set(logo, {y: - logo.height(), opacity: 0});
				TweenMax.set(back, {x: 0, opacity: 1, 'display': 'block'});

				// 2depth init
				$2depth.removeClass('on');
				$2depth.eq(mo3depthIdx).addClass('on');
				TweenMax.set($('.quick-area'), {x: - $(window).width()});

				// lang area init
				$('.lang-btn').removeClass('on');
				$('.lang-list').stop().slideUp(350);
			}
		}

		// open
		TweenMax.fromTo(allMenu_mo, 1.3, {x: $(window).width(), 'display': 'block'}, {x: 0, ease: Expo.easeInOut,onComplete:function(){
			//$('.quick-header').css({
				// position:'fixed'
			//})
			$('.quick-header').addClass('fixed')
		}});
	}

	// animation of oopen2depthpening 2depth when mo
	function open2depth () {
		// lang area init
		$('.lang-btn').removeClass('on');
		$('.lang-list').stop().slideUp(350);

		// opening animation
		TweenMax.to($('.quick-area'), 1.3, {x: - $(window).width(), ease: Expo.easeInOut});
		// fade out logo
		//TweenMax.to(logo, 2, {y: - logo.height(), opacity: 0, ease: Expo.easeOut, delay: 0.8})
		// showing back icon
		TweenMax.fromTo(back, 2, {'display': 'block', x: - back.width(), opacity: 0}, {x: 0, opacity: 1, ease: Expo.easeOut, delay: 0.8})
	}

	// close
	function closeMoAllMenu () {

		TweenMax.to(allMenu_mo, 1.3, {x: $(window).width(), 'display': 'none', ease: Expo.easeInOut,onComplete:function(){
			$('.quick-menu').data('_inst').mobileQuick();
			$('.tabmenu-history-group').css({
				zIndex: '21'
			})
			// $('.quick-header').css({
			// 	position:'fixed'
			// })
			$('.quick-header').addClass('fixed')
		}});

	}

	function goToBack () {
		// closing animation
		TweenMax.to($('.quick-area'), 1.3, {x: 0, ease: Expo.easeInOut});
		// fade out logo
		//TweenMax.to(logo, 2, {y: 0, opacity: 1, ease: Expo.easeOut, delay: 0.8})
		// showing back icon
		TweenMax.to(back, 2, {'display': 'block', x: - back.width(), opacity: 0, ease: Expo.easeOut, delay: 0.8})
	}

	function gnb () {
		// gnb mouse enter
		gnbBtn.on('mouseenter', function () {
			var scrollTop = $(window).scrollTop();
			var targetTop;
			if ($('.content-info').length > 0) {
				targetTop = $('.content-info').offset().top - el.height();
			}

			if(!gnb2depth.is(':animated')) {
				if (targetTop > scrollTop && $('.content-info').length > 0) {
					if ($('.page-header').hasClass('visual') || $('.page-header-default').hasClass('visual')) {
						el.parent('#wrap').removeClass('header-inverse');
					};
				}

				if ($('.main').length > 0 || $('.main.active').length > 0) {
					el.removeClass('header-inverse').css('background','#fff');

					if ($('.main.active').length > 0) {
						el.find('.global-navigation > ul > li > a').css('color','#333');
					}

				}

				gnbBtn.parent('li').removeClass('on');
				$(this).parent('li').addClass('on');

				gnb2depth.stop().slideDown(400,function(){

				});
			}
		})

		// gnb-2depth list mouse enter
		gnbList.on('mouseenter', function () {
			var thisIndex = gnbList.index($(this));

			gnbBtn.parent('li').removeClass('on');
			gnbBtn.parent('li').eq(thisIndex).addClass('on');
		})

		// gnb mouse leave
		el.on('mouseleave', function (e) {
			var scrollTop = $(window).scrollTop();
			var targetTop;
			if ($('.content-info').length > 0) {
				targetTop = $('.content-info').offset().top - el.height();
			}

			gnbBtn.parent('li').removeClass('on');
			gnb2depth.stop().slideUp(350, function () {
				if ($('.main').length > 0 || $('.main.active').length > 0) {
					el.addClass('header-inverse').css('background','transparent');

					if ($('.main.active').length > 0) {
						el.find('.global-navigation > ul > li > a').css('color','#fff');
					}
				}

				if (targetTop > scrollTop && $('.content-info').length > 0) {
					if ($('.page-header').hasClass('visual') || $('.page-header-default').hasClass('visual')) {
						el.parent('#wrap').addClass('header-inverse');
					}
				}
			});
		})
	}

	return {
		init : init
	}
}

// footer
var footer = function () {
	var el;

	function init (_el) {
		el = $(_el);

		bindEvents();
	}

	function bindEvents () {
		// resize 시 푸터 초기화
		$(window).on('resize', function () {
			// mo -> pc 초기화
			el.find('.family-selector').parent('.family-site').removeClass('open');
			$('.family-site').css('height', '');
		})

		// footer click
		el.find('.family-selector').on('click', function () {
			var _this = $(this);

			// mo
			if ($mo == true) {
				_this.parent('.family-site').toggleClass('open');
				if(_this.parent('.family-site').hasClass('open')){
					$('.table-wrap-type01.table-type03').css({
						overflow : "hidden"
					})
					TweenMax.to($('.family-site'),0.5,{height:351,
						onUpdate:function(){
							var scrollEnd = $('html, body').height() - $(window).height();
							$('html, body').scrollTop(scrollEnd);

						}
					});
				}else{
					TweenMax.to($('.family-site'),0.5,{height:58})
					$('.table-wrap-type01.table-type03').removeAttr()
				}
			} else { // pc
				if(_this.hasClass('on')){
					_this.next('.family-site-list').slideUp(350);
					_this.removeClass('on');
				}else{
					_this.addClass('on');
					_this.next('.family-site-list').slideDown(400);
				}
			}

		})
	}

	return {
		init : init
	}
}

// change title in mobile // header func 안에 넣을 예정 !
var changeTitleInMo = function () {
	var title_mo, title ;

	function getUrl() {

		var sOriginImgUrl = window.location.pathname;
		var arSplitUrl   = sOriginImgUrl.split("/");    //   "/" 로 전체 url 을 나눈다
		var nArLength     = arSplitUrl.length;
		var arFileName         = arSplitUrl[nArLength-1];   // 나누어진 배열의 맨 끝이 파일명이다
		return arFileName;
	}

	function init (_el) {


		title_mo = $(_el);
		if($('.ui-mott').length  > 0) {
			title = $('.ui-mott')
		}else{
			title = ($('.page-header-default .heading3').length > 1) ? $('.page-header-default .heading3.mo-only') : $('.page-header-default .heading3').eq(0);
		}


		bindEvents();

	}

	function bindEvents () {

		var textV = title.text()
		var text = (!textV) ? getUrl() : title.text();
		if($('body').hasClass('main')){
			title_mo.text('')
		}else{
			title_mo.text(text)
		}

	}

	return {
		init : init
	}
}

var menuAct = function () {
	var nUrl = window.location.pathname,moEl,pcEl

	function init (_el) {
		moEl = $('.quick-memu-mobile .quick-2depth-list');
		pcEl = $('.quick-menu .menu-info ');
		bindEvents();
	}

	function bindEvents () {
		mobileQuick()
		pcQuick ()
	}

	function mobileQuick (){
		moEl.find('a').each(function(){
			var _url = $(this).attr('href');
			_url = _url.toLowerCase();
			$(this).attr('href',_url)
			nUrl = nUrl.toLowerCase();
			if(_url == nUrl) {
				$('.quick-memu-mobile').find('.menu-box').removeClass('on')
				$('.quick-memu-mobile').find('.menu-box .menu-list a.item.more.on').removeClass('on')
				$('.quick-memu-mobile .depth3-list').removeAttr('style')
				$(this).addClass('more on')
				$(this).closest('.menu-box').addClass('on')
				$(this).closest('.depth3-list').show();
				$(this).closest('.depth3-list').prev('a').addClass('more on')
			}else{
				$(this).removeClass('on')
			}
		})
	}

	function pcQuick (){
		pcEl.find('a').each(function(){
			var _url = $(this).attr('href');
			_url = _url.toLowerCase();
			$(this).attr('href',_url)
			nUrl = nUrl.toLowerCase();
			if(_url == nUrl) {
				$('.quick-memu').children('.menu-box').removeClass('on')
				$('.quick-memu').children('.menu-box .menu-list a.item.more.on').removeClass('on')
				$('.quick-memu .depth3-list').removeAttr('style')
				$(this).addClass('on more')
				$(this).closest('.menu-box').addClass('on')
				$(this).closest('.depth3-list').show();
				$(this).closest('.depth3-list').prev('a').addClass('more on')
			}else{
				$(this).removeClass('on')
			}
		})
	}

	return {
		init : init,
		mobileQuick : mobileQuick,
		pcQuick : pcQuick
	}
}

// dial ui with tab
var dial = function () {
	var el,_index, photoGroup, _url, cu, swiper,imgsrc= '../images/',nImg
	,productsIntro,moEl,pcEl;
	function init (_el) {
		el = $(_el);
		photoGroup = $('.product-photo');
		activeImg = photoGroup.find('.active-img');
		circleImg = photoGroup.find('.circle-img');
		productsIntro = $('.products-intro .select-custom')
		moEl = $('.quick-memu-mobile .quick-2depth-list');
		pcEl = $('.quick-menu .menu-info ');
		_link =  el.find('a')
		cu = 0;

		_destroy = true;

		$('#wrap').css('overflow','hidden')

		bindEvents();
	}

	function bindEvents () {
		if ($mo == true) {
			setSwiper();
		}

		$(window).on('resize', function () {
			if (_destroy == false) {
				swiper.destroy();
				_destroy = true;
			}

			if ($mo == true && _destroy == true) {
				setSwiper();
			}


		})

		// list click
		_link.on('click', function (e) {
			e.preventDefault()
			_url = $(this).attr('href')
			_index = $(this).parent().index();
			if (_link.attr('done') == 'true') {
				return false;
			}

			// active list
			_link.removeClass('is-active');
			$(this).addClass('is-active');
			nImg = imgsrc+$(this).attr('img-data')+".jpg"
			shortenImg();

			if ($(this).attr('img-data')) {
				// widen img after rotate end
				widenImg();
			} else {

			}
			// rotate circle
			rotateCircle(function () {
				// 속성 제거, tab list 클릭 가능
				_link.attr('done', 'false');

			});


			// overlap 방지 위한 속성 추가
			_link.attr('done', 'true')

		});

		productsIntro.on('change',function(){
			var _index = productsIntro.prop('selectedIndex');
			$('.product-tabmenu li').eq(_index).find('a').trigger('click')
		})
	}
	function vproduct() {
			callMedia()
	}

	function callMedia() {




		$.ajax({
			url:_url,
			success: function(response) {
				$(".product-info").html($(response).find(".product-info > *")).hide().fadeIn();
				$("#media-container").html($(response).find("#media-container > *"));
				$(".msds-container").html($(response).find(".msds-container > *"));
			}
		}).done(function(){

		});
		mobileQuick ()
		pcQuick ()
	}



	function mobileQuick (){
		moEl.find('a').each(function(){
			_url = _url.toLowerCase();
			nUrl = $(this).attr('href').toLowerCase();

			if(_url == nUrl) {
				$('.quick-memu-mobile').find('.menu-box').removeClass('on')
				$('.quick-memu-mobile').find('.menu-box .menu-list a.item.more.on').removeClass('on')
				$('.quick-memu-mobile .depth3-list').removeAttr('style')
				$(this).addClass('on more')
				$(this).closest('.menu-box').addClass('on')
				$(this).closest('.depth3-list').show();
				$(this).closest('.depth3-list').prev('a').addClass('more on')
			}else{
				$(this).removeClass('on')
			}
		})
	}

	function pcQuick (){
		pcEl.find('a').each(function(){

			_url = _url.toLowerCase();
			nUrl = $(this).attr('href').toLowerCase();

			if(_url == nUrl) {
				$('.quick-memu').children('.menu-box').removeClass('on')
				$('.quick-memu').children('.menu-box .menu-list a.item.more.on').removeClass('on')
				$('.quick-memu .depth3-list').removeAttr('style')
				$(this).addClass('on more')
				$(this).closest('.menu-box').addClass('on')
				$(this).closest('.depth3-list').show();
				$(this).closest('.depth3-list').prev('a').addClass('more on')
			}else{
				$(this).removeClass('on')
			}
		})
	}
	function shortenImg (_onComplete) {
		var _duration = 1;
		//$('.product-info > *').remove();
		// wrap scale
		TweenMax.to(activeImg, _duration, {scale: 0.02, rotation: 180, ease: Expo.easeInOut, onComplete: function () {
			TweenMax.set(activeImg, {rotation: 0});
			activeImg.find('img').attr('src',nImg)
			vproduct()
		}});
		// img opacity
		TweenMax.to(activeImg.find('img'), _duration, {opacity: 0, ease: Expo.easeInOut, onComplete: _onComplete});
	}

	function widenImg (_onComplete) {
		var _duration = 0.9;
		var _delay = 1;

		// wrap scale
		TweenMax.to(activeImg, _duration, {scale: 1, ease: Expo.easeInOut, onComplete: _onComplete, delay: _delay});
		// img opacity
		TweenMax.to(activeImg.find('img'), _duration, {opacity: 1, ease: Expo.easeInOut,  delay: _delay});
	}

	function rotateCircle (_onComplete) {
		var _duration = 1;
		var rotateNum = 90;

		TweenMax.fromTo(circleImg, _duration, {rotation: cu}, {rotation: cu + rotateNum, ease: Expo.easeInOut, onComplete: _onComplete});

		cu += rotateNum;
	}


	function setSwiper () {
		swiper = new Swiper($('.media-container .prod-media-wrap'), {
			slidesPerView: 'auto',
		});

		_destroy = false;
	}

	return {
		init : init
	}
}

// select tab ui in msds.pug
var msds = function () {
	var el;

	function init (_el) {
		el = $(_el);
		bttn = el.find('.bttn');
		listBtn = el.find('.msds-select-list > li > button');

		bindEvents();

	}

	function bindEvents () {
		// click select tab
		bttn.on('click', function () {
			var _this = $(this)

			if (_this.hasClass('on')) {
				_this.next('ul').stop().slideUp(350);
				setTimeout(function () {
					_this.removeClass('on')
				}, 350)
			} else {
				bttn.next('ul').stop().slideUp(350);
				setTimeout(function () {
					bttn.not(_this).removeClass('on')
				}, 350)

				_this.addClass('on');
				_this.next('ul').stop().slideDown(400);
			}
		})

		// init tab after focusing input
		$('.input-info > input').on('focus', function () {
			bttn.next('ul').stop().slideUp(350);
			setTimeout(function () {
				bttn.removeClass('on')
			}, 350)
		})

		// change txt
		listBtn.on('click', function () {
			$(this).closest('.msds-select-info').find('span.txt').text($(this).text());
			bttn.next('ul').stop().slideUp(350);
			setTimeout(function () {
				bttn.removeClass('on')
			}, 350);
		})
	}

	function listAction(){
		$('.msds-select-list2 > li > button').on('click', function () {
			$(this).closest('.msds-select-info').find('span.txt').text($(this).text());
			bttn.next('ul').stop().slideUp(350);
			setTimeout(function () {
				bttn.removeClass('on')
			}, 350);
		})
	}

	return {
		init : init,
		listAction: listAction
	}
}

// futuristic_gas_station.pug
var gasStation = function () {
	var el, controller, swiper;

	function init (_el) {
		el = $(_el);
		controller = new ScrollMagic.Controller();

		bindEvents();
	}

	function bindEvents () {


		// -------------------------------- s: scroll magic
		// pin
		// var scrollPin = new ScrollMagic.Scene({
		// 	triggerElement: ".gscaltex-space",
		// 	triggerHook: "onLeave",
		// 	duration: $(".gscaltex-space").height() * 2
		// })
		// scrollPin.setPin(".gscaltex-space")
		// scrollPin.addTo(controller);

		// // tween
		// // tween01 -- down
		// var scean = new ScrollMagic.Scene({
        //     offset: $(".gscaltex-space").offset().top + $(".gscaltex-space").height(),
        //     duration: $(".gscaltex-space").height()
		// })
		// scean.on('enter', function () {
		// 	// txt
		// 	TweenMax.to($('.article-component-wrap'), 1, {y: -$(".gscaltex-space").height(), ease: Expo.easeInOut})
		// 	// bg
		// 	TweenMax.to($('.flagship-network'), 1, {'backgroundColor': '#b8d3d9', ease: Expo.easeInOut})
		// 	// img
		// 	TweenMax.to($('.example-img > .img01'), 1, {opacity: 0, ease: Expo.easeInOut})
		// });
		// scean.addTo(controller);
		// // tween02 -- up
		// var scean = new ScrollMagic.Scene({
        //     offset: $(".gscaltex-space").offset().top + $(".gscaltex-space").height(),
		// })
		// scean.on('leave', function () {
		// 	// txt
		// 	TweenMax.to($('.article-component-wrap'), 1, {y: 0, ease: Expo.easeInOut})
		// 	// bg
		// 	TweenMax.to($('.flagship-network'), 1, {'backgroundColor': '#e6dfd3', ease: Expo.easeInOut})
		// 	// img
		// 	TweenMax.to($('.example-img > .img01'), 1, {opacity: 1, ease: Expo.easeInOut})
		// });
		// scean.addTo(controller);
		// // -------------------------------- e: scroll magic

		setSwiper();
	}

	function setSwiper () {
		swiper = new Swiper(el.find('.swiper-container'), {
			speed: 500,
			slidesPerView: 1,
			navigation: {
				nextEl: el.find('.swiper-btn-next'),
				prevEl: el.find('.swiper-btn-prev'),
			},
			on: {
				slideChangeTransitionStart : function () {
					var thisIndex = this.realIndex;

					$('.future-tabmenu > li').removeClass('is-active');
					$('.future-tabmenu > li').eq(thisIndex).addClass('is-active');
				}
			}
		});
		
		$('.future-tabmenu li a').on('click',function(e){
			e.preventDefault()
			var _index = $(this).closest('li').index()
			$('.future-tabmenu li').removeClass('is-active')
			$('.future-tabmenu li').eq(_index).addClass('is-active')

			if(swiper.length === undefined) {
				swiper.slideTo(_index,1000,false );
			}else{
				swiper[swiper.length-1].slideTo(_index,1000,false );
			}
			
			
		})

	}

	return {
		init : init
	}
}


var tabMenuMobileFn = function(){
	var el;
	var isPlay = true;
	var $el,
		$list,
		$title,
		$item;

	function init(_el){
		el = $(_el);
		$el = el.children('.menu-btn');
		$list = $el.next('.tabmenu-list');
		$title = $el.children('.txt');
		$item = $list.find('li');

		bindEvents();

		return this;
	}

	function bindEvents(){
		//탭메뉴 클릭
		$el.on('click', function(e){

			$title.css('opacity','0');
			if(isPlay) {
				$el.addClass('on');
				$list.slideDown(280);

				$el.css('border-bottom', '0px')

				isPlay = false;
			}else if(!isPlay) {
				$el.removeClass('on');
				$list.slideUp(300);
				isPlay = true;
				$title.css('opacity','1');
				$el.css('border-bottom', '1px solid #dadada');
			}
		});
		//탭메뉴 리스트
		$item.on('click', function(e){
			// e.preventDefault();
			isPlay = true;
			$item.children('.item').removeClass('on');
			$(this).children('.item').addClass('on');
			var $idx = $(this).index();
			$list.slideUp(400);
			$el.removeClass('on');

			$title.css('opacity','1');
			$title.text($(this).find('.txt').text());
		})
	}

	return {
		init: init
	};
}

var AccordionSelector = function(){
	var el;
	var $selector,
		$content;
		_this = this;

	function init (_el){
		el = $(_el);

		bindEvents();
	}

	function bindEvents(){
		if (!$('.ui-acc-type02').length > 0) {
			type01();
		} else {
			type02();
		}
	}

	function type01 () {
		$selector = el.find('.accordion-item .btn-acc');
		$content = el.find('.detail');

		$selector.on('click', function(e){
			e.preventDefault();

			//최초 활성화 분기처리
			if($(this).parent().hasClass('on')){
				$(this).next().slideUp(350);
				$(this).parent().removeClass('on');
				return false;
			}

			var $idx = $(this).index();
			$content.slideUp(350);
			$(this).next().slideDown(400);

			$selector.parent().removeClass('on');
			$(this).parent().addClass('on');
		})
	}

	function type02 () {
		$selector = $('.privacy-selection .btn-select');
		$content = $('.privacy-selection .link-wrap');

		$selector.on('click', function(e){
			e.preventDefault();

			//최초 활성화 분기처리
			if($(this).hasClass('on')){
				$(this).next().slideUp(350);
				$(this).removeClass('on');
				return false;
			}

			var $idx = $(this).index();
			$content.slideUp(350);
			$(this).next().slideDown(400);

			$selector.removeClass('on');
			$(this).addClass('on');
		})
	}

	return {
		init : init
	}
}

// sub page motion
var subMotion = function () {
	var el;

	function init (_el) {
		el = $(_el);

		img01 = el.find('.cover-visual'); // bg

		moveEl01 = el.find('.page-header .group > h2 > span').eq(0); // ko txt
		moveEl02 = el.find('.page-header .group > h2 > span').eq(1); // en txt
		moveEl03 = el.find('.page-header .group > .headline'); // .headlin

		moveEl04 = el.find('.page-header .biz-summary'); // circle el

		moveEl05 = el.find('.scroll-guide'); // scroll icon

		if ($pc == true) {
			// set
			TweenMax.set(moveEl01, {x : 60, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl02, {x : 100, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl03, {y : 30, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl04, {width: 0, height:0});
			TweenMax.set(moveEl05, {y : 50, opacity: 0, 'display':'block'});

			bindEvents();
		}
	}


	function bindEvents () {
		TweenMax.fromTo(img01, 4, {scale: 1.05}, {scale: 1, ease: Power4.easeOut});
		TweenMax.fromTo(moveEl05, 4, {y : 50, opacity: 0}, {y: 0, opacity: 1, ease: Power4.easeOut});

		setTimeout(function () {
			TweenMax.to(moveEl01, 1.8, {x: 0, opacity: 1, ease: Power4.easeOut});
			TweenMax.to(moveEl02, 1.8, {x: 0, opacity: 1, ease: Power4.easeOut, delay: 0.2});
			TweenMax.to(moveEl03, 2, {y: 0, opacity: 1, ease: Power4.easeOut, delay: 0.8});
			TweenMax.to(moveEl04, 2, {width:380,opacity: 1, height:380, x:-190, y:190, ease: Power4.easeOut});
		}, 300)
	}

	return {
		init : init
	}
}

// sub 의 intro page
var introMotion = function () {
	var el, scrollFunction, lottieAnimation;

	function init (_el) {
		el = $(_el);
		$('body').addClass('ui-Active')
		
		// txt
		moveEl01 = el.find('.intro-summary-wrap > h2 > span').eq(0);
		moveEl02 = el.find('.intro-summary-wrap > h2 > span').eq(1);

		moveEl03 = el.find('.intro-summary > .txt01 > span').eq(0);
		moveEl04 = el.find('.intro-summary > .txt01 > span').eq(1);

		moveEl05 = el.find('.intro-summary > .txt02').eq(0);
		moveEl06 = el.find('.intro-summary > .txt02').eq(1);
		// ul
		moveEl07 = el.find('.intro-list');
		moveEl08 = el.find('.intro-summary-wrap > .infographic').eq(0);
		moveEl09 = el.find('.interested-parties-group');

		// 가로 스크롤 적용
		// _scroll = new ScrollLeftFunction();
		// _scroll.active(el.find('.intro-wrapper'));


			scrollFunction = new SectionScroll();
			scrollFunction.init($('.intro-summary-wrap'), $('.intro-list-wrap'));


		// pc
		if ($pc == true) {
			// 가로 스크롤 적용을 위한 css init
			$('body, html').css('overflow','hidden');
			$('#footer').css('display','none');
			$('.page-header-intro').css( {
				'overflow-y':'hidden',
				'opacity' : 1
			});
			$('.intro-list-wrap').css('width', $(window).width());

			// txt ani init
			TweenMax.set(moveEl01, {x : 60, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl02, {x : 100, opacity: 0, 'display':'block'});

			TweenMax.set(moveEl03, {y : 50, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl04, {y : 50, opacity: 0, 'display':'block'});

			TweenMax.set(moveEl05, {y : 50, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl06, {y : 50, opacity: 0, 'display':'block'});

			// ul ani init
			TweenMax.set(moveEl07, {x: 15 + 'vw', opacity: 0});
			TweenMax.set(moveEl08, {y : 50, opacity: 0, 'display':'block'});
			TweenMax.set(moveEl09, {y : 50, opacity: 0, 'display':'block'});



		}

		bindEvents();
	}

	function bindEvents () {
		// svg



		$('a.photo').on('click',function(){

			$('.intro-wrapper').hide()

		})

		$('.ui-mott').css
		var i = 0;
		if ($('.svg-area').length > 0) {
			titleAnimationEvents(function(){
				i ++ ;

				if (i == 100) {
					lottieAnimation.removeEventListener('enterFrame');

					ani();
				}
			});

		} else {
			ani();
		}

		// resize
		$(window).on('resize', function () {
			// pc
			if ($pc == true) {
				// 가로 스크롤 적용
				$('.page-header-intro').scrollLeft(0)
				$('body, html').attr('_move', 'false');
				$('.intro-list-wrap').css('width', $(window).width());
				$('.map-wrap').css('display','block')
				// 가로 스크롤 제거
				scrollFunction.active();
				underNav = $('.intro-page .intro-menu-group');
				TweenMax.set(underNav, {y : underNav.height() + 10});
				$('html, body').attr('_move', 'false');
				$('body, html').css('overflow','hidden');
				$('.page-header-intro').css('overflow-y','hidden');
			

			} else { // mo

				// 가로 스크롤 제거
				scrollFunction.destroy();


				// 가로 스크롤 해제를 위한 css init
				$('body, html').css('overflow','visible');
				$('#footer').css('display','block');
				$('.page-header-intro').css('overflow-y','scroll');
				$('.intro-list-wrap').css('width', '');
				moveEl07.find('li').removeAttr('style')

				$('.map-wrap').css('display','none');
			}

		}).resize()

		// pc
		if ($pc == true) {
			var index;

			// list hover
			// lodash debounce 참고하기
			moveEl07.find('li').stop().on('mouseenter',function () {
				$('.intro-list > li').trigger('mouseout');
				var _this = $(this);
				index = moveEl07.find('li').index(_this);
				
				if ($('body').attr('_move') == 'true') {
				
					// list hover motion
					//_this.css('height', _this.height() * 2)
					TweenMax.to(_this, 1.3, {y: - 60, ease: Power4.easeOut});
					TweenMax.fromTo(_this.find('p'), 1.3, {y: 30}, {y: 0, opacity: 1, ease: Power4.easeOut});

					// navi active class control
					$('.intro-menu.justify > li').removeClass('on');
					$('.intro-menu.justify > li').eq(index).addClass('on');
				}


			})

			// list mouseleave
			moveEl07.find('li').stop().on('mouseleave',function () {
				// list mouseleave motion
				TweenMax.to($(this), 1.3, {y: 0, ease: Power4.easeOut});
				TweenMax.to($(this).find('p'), 1.3, {opacity: 0, ease: Power4.easeOut});

				// navi active class control
				$('.intro-menu.justify > li').removeClass('on');
			})

			// navi click
			$('.intro-menu.justify > li').on('click', function () {
				var _index = $(this).index() ;
				var moveOffset = _index == 0 ? $('.intro-list > li').eq(_index).position().left : $('.intro-list > li').eq(_index).position().left + 120;

				$('.intro-menu.justify > li').removeClass('on');
				$(this).addClass('on');

				// move scroll left
				$('.intro-list-wrap').stop().animate({scrollLeft : moveOffset+1},800);
				setTimeout(function(){
					$('.intro-list > li').trigger('mouseout');
					$('.intro-list > li').eq(_index).trigger('mouseover');
				},600)
			})
		} else {
			$('.map-wrap').css('display','none');

			// 가로 스크롤 제거
			scrollFunction.destroy();

		}
	}

	//- svg pc
	function titleAnimationEvents(_callBack){
		lottieAnimation = bodymovin.loadAnimation({
			container : document.querySelector('.svg-area'),
			path : '/images/common/json/maps/data.json',
			renderer : 'svg',
			// loop : true,
			autoplay : true,
		})

		lottieAnimation.addEventListener('enterFrame', _callBack);
	}

	function ani () {
		// scroll icon

		// txt
		var _duration = 1.8;
		var ease = Power4.easeOut;

		TweenMax.to(moveEl01, _duration, {x: 0, opacity: 1, ease: ease});
		TweenMax.to(moveEl02, _duration, {x: 0, opacity: 1, ease: ease, delay: 0.2});

		TweenMax.to(moveEl03, _duration, {y: 0, opacity: 1, ease: ease, delay: 0.8});
		TweenMax.to(moveEl04, _duration, {y: 0, opacity: 1, ease: ease, delay: 1});
		TweenMax.to(moveEl05,_duration, {y: 0, opacity: 1, ease: ease, delay: 1.2});
		TweenMax.to(moveEl06, _duration, {y: 0, opacity: 1, ease: ease, delay: 1.4});

		// ul
		TweenMax.to(moveEl07, _duration, {x: 0, opacity: 1, ease: ease, delay: 2});
		TweenMax.to(moveEl08, _duration, {y: 0, opacity: 1, ease: ease, delay: 1.7});
		TweenMax.to(moveEl09, _duration, {y: 0, opacity: 1, ease: ease, delay: 1.5,onComplete:function(){
			$('body').removeClass('ui-Active')
		}});
			
	
	}

	return {
		init : init
	}
}

//hPageCon function
var hPageCon = function(){
	var el,scrollV,rvalue=false;;

	function init(_el){
		el = $(_el);

		bindEvents();

		return this;
	}

	function bindEvents(){
		setUp()

		$('.intro-scroll-guide').on('click',function(){
			virginAction();
		}).css({
			cursor:'pointer'
		})



		$('.tabmenu-history li a').on('click',function(e){
			e.preventDefault();
			var _index = $(this).parent().index()
			$('.tabmenu-history li').removeClass('on')
			$('.tabmenu-history li').eq(_index).addClass('on')
			activeStep(_index)
		})


		var link = $('.mobile .tabmenu-history a');
		var el =$('.mobile .tabmenu-history li')
		link.on('click',function(e){
			e.preventDefault();

			_index = $(this).closest('li').index()


			//target section의 좌표를 통해 꼭대기로 이동
			$('html, body').animate({
				scrollTop: $('.mobile .section-history').eq(_index).offset().top
			},600);

			el.removeClass('on');
			$(this).closest('li').addClass('on');

		});

		$(window).on('scroll',function(){
			findPosition();
		});

		function findPosition(){
			$('.mobile .section-history').each(function(){
				if( ($(this).offset().top - $(window).scrollTop() ) < 20){
					el.removeClass('on');
					el.eq($(this).index()-1).addClass('on')
				}
			});
		}

		findPosition();


	}

	function reSet() {
		if(breakPoint == 1024) {
			$('.page-header-default.history').css('cssText', 'height: 89px !important;display:block;border: none');
			$('.photo.ui-virgin').css({
				marginTop : 0
			})
			$('.intro-scroll-guide').fadeOut();
			$('html ,body').removeAttr('style')
			$('body').removeClass('ui-virgin')
		}
		else{
			$('body').addClass('ui-virgin')
			$('.page-header-default.history').show()
			$('.tabmenu-history-group').css({
				bottom : "-74px"
			})
			if($pc){
				$('html ,body').css({
					overflow : "hidden"
				})
			}else{
				$('html ,body').removeAttr('style')
			}
			$('.page-header, .page-header-default').css({
				border:'none',
				height : '360px',
				display : 'block'
			})
			$('.desktop .timelinebar').width('0%');

		}
		$('.ui-scroll-section').removeClass('change').removeClass('next').removeClass('reverse')
		pressRst()
	}

	function pressRst() {

		$('.section-list-container').each(function(){
			$(this).scrollLeft(0);
		})
		$('desktop .timelinebar').css({
			width : 0
		})
		$('.tabmenu-history li').removeClass('on')
		$('.tabmenu-history li').eq(0).addClass('on')

	}

	function setUp() {
		if(breakPoint == 1024) {

			$('.page-header-default.history').css('cssText', 'height: 89px !important;display:block;border: none');
			$('.photo.ui-virgin').css({
				marginTop : 0
			})
			$('html ,body').removeAttr('style')
			$('body').removeClass('ui-virgin')
			$('.intro-scroll-guide').fadeOut();
		}
		else{

			$('body').addClass('ui-virgin')

			if($pc){
				$('html ,body').css({
					overflow : "hidden"
				})
			}

			$('.page-header, .page-header-default').css({
				border:'none'
			})
		}

		// $('.section-history').css({
		// 	right: "-100%"
		// })

		// $('.section-history.ui-scroll-section').eq(0).find('.desc').css({

		// })
	}

	function virginAction() {

		TweenMax.to($('.page-header-default.history'), .5, {height:89, ease: Expo.easeInOut,onComplete:function(){}});
		TweenMax.to($('.photo.ui-virgin'), .5, {marginTop:0, ease: Expo.easeInOut,onComplete:function(){
			TweenMax.to($('.title.ui-virgin'), .4, {fontSize:100, ease: Power4.easeOut,onComplete:function(){

				TweenMax.to($('.tabmenu-history-group'), .2, {bottom:0, ease: Power4.easeIn,onComplete:function(){
					$('.intro-scroll-guide').fadeOut();
					$('html ,body').removeAttr('style')
					$('body').removeClass('ui-virgin')

				}});

			}});


		}});
	}

	function activeStep(){
		var _indexV = arguments[0]
		window.breakaa = 0

		pressRst(_indexV)

		switch (_indexV) {
			case 0:
				$('.ui-scroll-section').removeClass('change').removeClass('next').removeClass('reverse')
				$('.desktop .timelinebar').eq(0).width('0%');
				$('.desktop .timelinebar').eq(1).width('0%');
				$('.desktop .timelinebar').eq(2).width('0%');
				break;
			case 1:
				$('.tabmenu-history li').removeClass('on')
				$('.tabmenu-history li').eq(1).addClass('on')
				$('.ui-scroll-section').eq(1).addClass('next').removeClass('change')
				$('.ui-scroll-section').eq(2).removeClass('next').removeClass('reverse').removeClass('change')
				$('.ui-scroll-section').eq(0).addClass('change').removeClass('change')
				progressBar = $('.desktop .timelinebar').eq(0).width('100%');
				progressBar = $('.desktop .timelinebar').eq(1).width('0%');
				progressBar = $('.desktop .timelinebar').eq(2).width('0%');
				break;
			case 2:
				$('.tabmenu-history li').removeClass('on')
				$('.tabmenu-history li').eq(2).addClass('on')
				$('.ui-scroll-section').eq(0).addClass('change')
				$('.ui-scroll-section').eq(1).addClass('next').addClass('change')
				if($('.ui-scroll-section').eq(2).hasClass('next')){
					$('.ui-scroll-section').eq(2).addClass('next').addClass('reverse')
				}else{
					$('.ui-scroll-section').eq(2).addClass('next')
				}
				$('.ui-scroll-section').eq(2).addClass('next')
				$('.desktop .timelinebar').eq(0).width('100%');
				$('.desktop .timelinebar').eq(1).width('100%');
				$('.desktop .timelinebar').eq(2).width('0%');
				break;
			default:
				console.log(_indexV)
				break;
		}



	}

	return {
		init: init,
		virginAction:virginAction,
		activeStep:activeStep,
		reSet:reSet,

	};
}


// netWorkTab
var netWorkTab = function(){
	var el, _tabLink, _tabMenu;

	function init(_el){
		el = $(_el),
		_tabLink = el.find('.stabmenu > li a'),
		_tabMenu = el.find('.stabmenu li')
		bindEvents();
	}

	function bindEvents(){
		if(!el.hasClass('link')) {
			_tabLink.on('click',function(e){
				var actionV = $(this).parent().index(),
					_url = $(this).attr('href')
					e.preventDefault()
					if($(this).parent().hasClass('on')){
						return false;
					}else{
						tabshow(actionV,_url)
					}
			})
		}
	}
	// function makeDiv(){
	// 	$('.stabmenu-group').after("<div id='uitab'></div>")
	// }
	function tabshow(){
		var tabShow = arguments[0], _url = arguments[1];
		_tabMenu.removeClass('on')
		_tabMenu.eq(tabShow).addClass('on')
		callAjax(_url,tabShow)
	}

	function callAjax(){
		var  _url = arguments[0]
		//var _url = 'network_domestic03.html'
		var actionV = arguments[1]
		//console.log(actionV)
		$.ajax({
			url:_url,
			success: function(response) {
				$("#nDarea").html($(response).find("#nDarea > *"));
			}
		}).done(function(){
			if(actionV == 4){
				bindStab();
			}
		});

	}
	function bindStab(){
		var _list = $('.stabmenu-group02 .stabmenu li'),
			_link = $('.stabmenu-group02 .stabmenu li a');

		_link.on('click',function(e){
			e.preventDefault();
			var _index = $(this).parent().index();
			_list.removeClass('on')
			_list.eq(_index).addClass('on')
			subMenuAct(_index)
		})
	}

	function subMenuAct() {
		var showindex = arguments[0]
		switch (showindex){
			case 0 :
				$('#nDarea .section-component').show()
				break;
			case 1 :
				$('#nDarea .section-component').hide()
				$('#nDarea .section-component.ui-s').show()
				break;
			case 2 :
				$('#nDarea .section-component').hide()
				$('#nDarea .section-component.ui-h').show()
				break;
			case 3 :
				$('#nDarea .section-component').hide()
				$('#nDarea .section-component.ui-y').show()
				break;
			default :
			$('#nDarea .section-component').show()
		}

	}

	return {
		init: init
	};
}

// gnbActive
 var processPage = function(){
	var el,
		tabBtn;

	function init(_el){
		el = $(_el);
		tabBtn = el.find('.process-tabmenu li button')
		tabLst = el.find('.process-tabmenu li')

		setUp()


		return this;
	}
	function setUp(){
		$('.laypopup-produnction').hide()
		$('.process-graphic-container').removeClass('disabled')
		$('.process-graphic-container button').css({
			cursor:'pointer'
		})
		bindEvents();
	}

	function bindEvents(){
		// 탭클릭시
		tabBtn.on('click',function(e) {
			e.preventDefault()
			var _index =  $(this).closest('li').index()
			tabLst.removeClass('is-active')
			tabAction(_index)
		})

		$('.bttn-popover-close').on('click',function(e) {
			e.preventDefault()
			$('.process-popover').slideUp()
			showstep()
		})

		$('.process-graphic-container button').on('click',function(e) {
			e.preventDefault()
			layerID = $(this).attr('data-Layer')

			$('.dimed').fadeIn();
			$('#'+layerID).fadeIn();

		})

		$('.bttn-laypopup-close').on('click',function(e) {
			$(this).closest('.laypopup-produnction').fadeOut(function(){

			})
			$('.dimed').fadeOut()
		})

		animationInit()
	}

	function animationInit() {

	}
	function showstep() {
		var _index  = arguments[0]


		function stepbtnConttoll(){
			$('.process-graphic-container button').removeClass('on')
		}
		switch ( _index ) {
			case 0:
				$('.process-graphic-container').addClass('disabled')
				stepbtnConttoll()
				$('.ui-step1').addClass('on')
			  break;
			case 1:
				$('.process-graphic-container').addClass('disabled')
				stepbtnConttoll()
				$('.ui-step2').addClass('on')
			  break;
			case 2:
				$('.process-graphic-container').addClass('disabled')
				stepbtnConttoll()
				$('.ui-step3').addClass('on')
			  break;
			case 3:
				$('.process-graphic-container').addClass('disabled')
				stepbtnConttoll()
				$('.ui-step4').addClass('on')
			  break;
			default:
				$('.process-graphic-container').removeClass('disabled')
				stepbtnConttoll()
				tabLst.removeClass('is-active')
			break;
		  }

	}

	function tabAction() {
		var _index  = arguments[0]
		tabLst.eq(_index).addClass("is-active")
		$('.process-popover').slideDown()
		$('.process-popover p').hide().eq(_index).show();
		showstep(_index)
	}

	return {
		init: init
	};
}

//각종 콘텐츠 에니메이션
var conAni = function(){
	var el;

	function init(_el){
		el = $(_el);

		bindEvents();

		return this;
	}

	function bindEvents(){

		headerAnimation()
	}
	function headerAnimation() {

		// if(element.hasClass('class1') || element.hasClass('class2')) {
		if($('#container').hasClass('ui-nonai') ||$('.cover-visual').length > 0 ||$('.job-notice').length > 0){
			return false
		}
		if( $('.page-header-default , .page-header').length > 0 || $('.cover-visual').length < 1 ){
			TweenMax.set($('.page-header-default .heading3 , .page-header .heading3'), {x: 20, opacity: 0});
			TweenMax.set($('.page-header-default .headline , .page-header .headline'), {x: 20, opacity: 0});
			TweenMax.to($('.page-header-default .heading3 ,.page-header .heading3'), .5, {x: 0,opacity: 1,onComplete:function(){
				TweenMax.to($('.page-header-default .headline , .page-header .headline'), .7, {x: 0,opacity: 1, onComplete:function(){
					TweenMax.to($('.ui-sAnim'), .3, {opacity: 1});
				}});
			}});
		}
	}


	return {
		init: init
	};
}
var rndtype = function(){
	var productsIntro;

	function init(_el){
		el = $(_el);
		productsIntro = $('.products-intro .select-custom')
		bindEvents();

		return this;
	}

	function bindEvents(){
		productsIntro.on('change',function(){

			var _index = productsIntro.prop('selectedIndex');
			$('.product-tabmenu li').eq(_index).find('a').trigger('click')
		})
	}

	return {
		init: init
	};
}


var serchform = function(){
	var el,searchArea,searchList;

	function init(_el){
		el = $(_el);
		searchArea = el.find('.search-atc-result')
		searchList = el.find('ul.atc-result-list li')
		searchLink = el.find('ul.atc-result-list li a')
		searchFrm =  el.find('.inputbox input')
		bindEvents();
		return this;
	}

	function bindEvents(){
		searchLink.on('click',function(){
			searchFrm.val($(this).text().trim())
			searchArea.hide();
			searchList.remove();
		})

		// searchFrm.on('focus',function(){
		// 	realSch()
		// })
	}
	
	function frmClear(){
		searchFrm.val('')
	}

	function realSch() {
		frmClear()
		searchArea.show();
	}

	return {
		init: init,
		realSch : realSch,
		frmClear : frmClear
	};
}

function gtagWrite(event, menuName, fileName){
	gtag('event', menuName, {'event_category':event, 'event_label':fileName});
}

function gtagWriteMove(event, menuName, fileName, moveUrl){
	gtag('event', menuName, {'event_category':event, 'event_label':fileName});
	document.location.href = moveUrl;
}

window.devFunc = function(){
	function realSch(){
		$('.search-area').data('_inst').realSch()
	}
	function frmClear(){
		$('.search-area').data('_inst').frmClear()
	}
	return {
		realSch : realSch,
		frmClear :frmClear
	}
}();



/*mobileNav*/
    function showMobileNav() {
        pausedScrollTop = $(window).scrollTop();
        $('body').addClass('mobile-nav-opened');
        $('body').css({'top':-pausedScrollTop});
        if (pausedScrollTop > $(window).innerHeight() - $('#header .header-container').innerHeight()) {
            $('body').addClass('header-fixed-at-mobile-nav-opened');
        } else {
            $('body').removeClass('header-fixed-at-mobile-nav-opened');
        }
    }

    function hideMobileNav() {
        $('body').removeClass('mobile-nav-opened');
        $('body').removeClass('header-fixed-at-mobile-nav-opened');
		$(window).scrollTop(pausedScrollTop);
		activeScroll();
    }

    $('#header .btn-toggle-menu').on('click', function(e){
        e.preventDefault();
		showMobileNav();
		disableScroll();
    });


	function activeScroll () {
        $('body, html').css('overflow', 'auto');
    }

    function disableScroll () {
        $('body, html').css('overflow', 'hidden');
	}

    $('#mobileNav .gnb .first-menu > a').on('click', function(e){
        e.preventDefault();
        if($(this).closest('li').hasClass('active') ) {
            $(this).closest('.first-menu').next().stop().slideUp();
            $(this).closest('li').removeClass('active').siblings().removeClass('active');
        } else {
            $(this).closest('.first-menu').next().stop().slideDown();
            $(this).closest('li').addClass('active').siblings().removeClass('active');
        }
        $(this).closest('li').siblings().find('.sub-menu').stop().slideUp();
    });


    $('#mobileNav .btn-toggle-menu').on('click', function(e){
        e.preventDefault();
        hideMobileNav();
    });


    $('#mobileNav .mobile-search .btn-close').on('click', function(e) {
        e.preventDefault();
        $('.mobile-search').removeClass('active');
        $('form[name="search_form"] input[name="query"]').val('');
    });


    $('#mobileNav').on('click touchstart', function(e){
        if ( e.target == $('#mobileNav')[0]) {
            hideMobileNav();
        }
    });

    $('#mobileNav .gnb li .first-menu a.on').trigger('click');
