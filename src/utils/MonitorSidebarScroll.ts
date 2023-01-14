export default function monitorScroll(mainElems: HTMLCollectionOf<Element>) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.innerHTML + "-sidebar-item";
        const sidenavItem = document.getElementById(id);
        sidenavItem?.classList.add("sidebar-inview");
      } else {
        const id = entry.target.innerHTML + "-sidebar-item";
        const sidenavItem = document.getElementById(id);
        sidenavItem?.classList.remove("sidebar-inview");
      }
    });
  }, observerOptions);

  for (let i = 0, length = mainElems.length; i < length; i++) {
    if (mainElems[i]) {
      observer.observe(mainElems[i]);
    }
  }
}
