export function pageEnter() {
  gsap.from("[data-animate]", {
    opacity: 0,
    y: 40,
    stagger: 0.15
  });
}
