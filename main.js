
// animate the first section in after 4 seconds
gsap.to(".hero-image", {y: 0, duration: 1.5, delay: 4});
// amimate the text with it
gsap.to(".contents-list", {y: 0, duration: 1.5, delay: 4});

gsap.registerPlugin(ScrollTrigger);

// scrolltrigger for about section
gsap.from(".about-image", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-image",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// debugging
// ScrollTrigger.create({
//   trigger: ".about-image",
//   start: "top top",
//   markers: true
// });

// scrolltrigger for work section
gsap.from(".work-bckg", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".work-bckg",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// scrolltrigger for contact section
gsap.from(".contact-bckg", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".contact-bckg",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


