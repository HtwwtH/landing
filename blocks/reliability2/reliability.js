"use strict";

function reliabilityAnimations2() {
  var controller = new ScrollMagic.Controller();
  var reliabilityFeatures = document.querySelectorAll('.reliability__fade');
  reliabilityFeatures.forEach(function (feature, index, arr) {
    var tl = new TimelineMax();
    var previous = arr[0];
    feature.style.opacity = 0.5;

    if (index >= 1) {
      previous = arr[index - 1];
    }

    new ScrollMagic.Scene({
      triggerElement: feature,
      triggerHook: 0.6,
      duration: '60%'
    }) // .addIndicators()
    .on('enter', function () {
      // console.log('enter');
      tl.to(previous, 0.45, {
        opacity: 0.5
      });
      tl.to(feature, 0.45, {
        opacity: 1
      });
    }).on('leave', function () {
      // console.log('leave');
      tl.to(previous, 0.35, {
        opacity: 1
      });
      tl.to(feature, 0.35, {
        opacity: 0.5
      });
    }).addTo(controller);
  });
}

function initAnimations() {
  var isMobile = $(window).width() < 1200;

  if (!isMobile) {
    reliabilityAnimations2();
  }
}

$(document).ready(function () {
  initAnimations();
});