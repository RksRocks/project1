const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;

function skewed() {
  var xscale = 1;
  var yscale = 1;

  var yprev = 0;
  var xprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#smallCircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#smallCircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: 20,
    ease: Expo.easeInOut,
    opacity: 0,
    duration: 1,
  })
    .to(".boundingElem", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
      duration: 1.4,
    })
    // .to("#smallHeadings h5", {
    //   y: -20,
    //   ease: Expo.easeInOut,
    //   opacity: 0,
    //   duration: 1,
    // })
    .from("#homeFooter", {
      y: 10,
      ease: Expo.easeInOut,
      delay: -0.8,
      opacity: 0,
      duration: 1.5,
    });
}

circleMouseFollower();
skewed();
firstPageAnim();
