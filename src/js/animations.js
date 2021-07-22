import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene'

function reliabilityAnimations() {
  const whyTrigger = document.querySelectorAll('.reliability__item');
  const height = document.documentElement.clientHeight;

  whyTrigger.forEach(item => {
    const tl = gsap.timeline({ paused: true });
    const header = item.querySelector('.reliability__header');
    // const action = item.querySelector('.why__action');
    const rightItems = item.querySelector('.reliability__item-right');

    tl.from(header, { opacity: 0, y: 20 });
    // tl.from(action, { opacity: 0, y: 10 }, '-=0.7');
    tl.from(rightItems, { opacity: 0 }, '-=1');

    new ScrollScene({
      triggerElement: item,
      triggerHook: 0.5,
      offset: height / 2,
      gsap: {
        timeline: tl,
      },
    });

    // whys.Scene.addIndicators({ name: 'why', colorEnd: '#FFFFFF' });
  });

  const reliabilityFeatures = document.querySelectorAll('.reliability__fade');

  reliabilityFeatures.forEach((feature, index, arr) => {
    let previous = arr[0];
    feature.style.opacity = 0.5;

    if (index >= 1) {
      previous = arr[index - 1];
    }

    const reliabilityFeatureScene = new ScrollScene({
      triggerElement: feature,
      triggerHook: 0.5,
    });

    reliabilityFeatureScene.Scene.on('enter', function () {
      // console.log('enter');
      gsap.to(previous, { opacity: 0.5 });
      gsap.to(feature, { opacity: 1 });
    });

    reliabilityFeatureScene.Scene.on('leave', function () {
      // console.log('leave');
      gsap.to(previous, { opacity: 1 });
      gsap.to(feature, { opacity: 0.5 });
    });

    // whyFeatureScene.Scene.addIndicators({
    //   name: 'features',
    //   colorEnd: '#FFFFFF',
    // });
  });

}

function initAnimations() {
  const isMobile = $(window).width() < 992;
  // const preloader = document.querySelector('.preloader');
  // preloader.classList.remove('active');

  gsap.defaults({
    ease: 'power4.out',
    duration: 1,
  });

  if (!isMobile) {
    reliabilityAnimations();
  }
}

window.onload = function () {
  initAnimations();
};