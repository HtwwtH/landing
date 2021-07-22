"use strict";

var _gsap = require("gsap");

var _scrollscene = require("scrollscene");

function reliabilityAnimations() {
  var whyTrigger = document.querySelectorAll('.reliability__item');
  var height = document.documentElement.clientHeight;
  whyTrigger.forEach(function (item) {
    var tl = _gsap.gsap.timeline({
      paused: true
    });

    var header = item.querySelector('.reliability__header'); // const action = item.querySelector('.why__action');

    var rightItems = item.querySelector('.reliability__item-right');
    tl.from(header, {
      opacity: 0,
      y: 20
    }); // tl.from(action, { opacity: 0, y: 10 }, '-=0.7');

    tl.from(rightItems, {
      opacity: 0
    }, '-=1');
    new _scrollscene.ScrollScene({
      triggerElement: item,
      triggerHook: 0.5,
      offset: height / 2,
      gsap: {
        timeline: tl
      }
    }); // whys.Scene.addIndicators({ name: 'why', colorEnd: '#FFFFFF' });
  });
  var reliabilityFeatures = document.querySelectorAll('.reliability__fade');
  reliabilityFeatures.forEach(function (feature, index, arr) {
    var previous = arr[0];
    feature.style.opacity = 0.5;

    if (index >= 1) {
      previous = arr[index - 1];
    }

    var reliabilityFeatureScene = new _scrollscene.ScrollScene({
      triggerElement: feature,
      triggerHook: 0.5
    });
    reliabilityFeatureScene.Scene.on('enter', function () {
      // console.log('enter');
      _gsap.gsap.to(previous, {
        opacity: 0.5
      });

      _gsap.gsap.to(feature, {
        opacity: 1
      });
    });
    reliabilityFeatureScene.Scene.on('leave', function () {
      // console.log('leave');
      _gsap.gsap.to(previous, {
        opacity: 1
      });

      _gsap.gsap.to(feature, {
        opacity: 0.5
      });
    }); // whyFeatureScene.Scene.addIndicators({
    //   name: 'features',
    //   colorEnd: '#FFFFFF',
    // });
  });
}

function initAnimations() {
  var isMobile = $(window).width() < 992; // const preloader = document.querySelector('.preloader');
  // preloader.classList.remove('active');

  _gsap.gsap.defaults({
    ease: 'power4.out',
    duration: 1
  });

  if (!isMobile) {
    reliabilityAnimations();
  }
}

window.onload = function () {
  initAnimations();
};