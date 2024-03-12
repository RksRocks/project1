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
      duration: 1.2,
    })
    .from("#basedIn", {
      y: -10,
      ease: Expo.easeInOut,
      opacity: 0,
      duration: 1,
    })
    .from("#smallHeadings h5", {
      y: -10,
      ease: Expo.easeInOut,
      delay: -0.8,
      opacity: 0,
      duration: 1,
    })

    .from("#homeFooter", {
      y: 10,
      ease: Expo.easeInOut,
      delay: -0.8,
      opacity: 0,
      duration: 1,
    });
}

circleMouseFollower();
skewed();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      xPercent: -55,
      yPercent: -50,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
