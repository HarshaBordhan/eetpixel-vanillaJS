"use strict";

const navLink = document.querySelectorAll(".nav__link");
const allSections = document.querySelectorAll(".section");

////////////////////
// Srolling
/*
navLink.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = e.target.getAttribute("href");
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  })
);
*/

// Or,

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

////////////////////
// Active Nav
/*
document.querySelector(".nav__links").addEventListener("click", (e) => {
  const activeted = e.target.closest(".nav__link");
  console.log(activeted);

  // Guard clause
  if (!activeted) return;

  navLink.forEach((item) => {
    item.classList.remove("nav__link--active");
  });

  // Activeted nav item
  activeted.classList.add("nav__link--active");
});
*/

const activeNav = () => {
  let index = allSections.length;

  while (--index && window.scrollY + 50 < allSections[index].offsetTop) {}

  navLink.forEach((link) => link.classList.remove("nav__link--active"));
  navLink[index].classList.add("nav__link--active");
};

document.addEventListener("scroll", activeNav);
////////////////////
// Reveal sections
/*
const section = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(section);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
*/
////////////////////
/*
// Lazy loading
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loading = (entries, observer) => {
  const [entry] = entries;

//  const [entry] = entries;
//   if (entry.isIntersecting) {
//     entry.target.src = entry.target.dataset.src;

//     entry.target.classList.remove("lazy-load");
//     observer.unobserve(entry.target);
//   }

  // Or, 

  if (!entry.isIntersecting) return;

  entry.target.src == entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-load");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  // rootMargin: "200px",
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});
*/
