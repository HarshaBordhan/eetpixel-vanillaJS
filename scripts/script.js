"use strict";

const navbar = document.querySelector(".navbar");
const nav = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link-item");
const allSections = document.querySelectorAll(".section");
const header = document.querySelector(".header");

////////////////////
// Srolling
document.querySelector(".nav__link-logo").addEventListener("click", () => {
  const headercoords = header.getBoundingClientRect();

  // console.log(header);
  // console.log(headercoords);

  header.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

////////////////////
// Active Nav
const activeNav = () => {
  let index = allSections.length;
  // console.log(index);
  // console.log(--index);
  // console.log(window.scrollY + 50);
  // console.log(allSections[index].offsetTop);

  while (--index && window.scrollY + 50 < allSections[index].offsetTop) {}

  navLink.forEach((link) => link.classList.remove("nav__link--active"));

  navLink[index].classList.add("nav__link--active");

  if (window.scrollY + 50 < allSections[0].offsetTop) {
    navLink.forEach((link) => link.classList.remove("nav__link--active"));
  }
};

document.addEventListener("scroll", activeNav);

///////////////
// Lazy load image
// const img = document.querySelectorAll("img[data-src]");
// console.log(img);

// const loading = (entries, observer) => {
// const [entry] = entries;

/*
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.classList.remove("lazy-load");
    observer.unobserve(entry.target);
  }
*/

// Or,

//   if (!entry.isIntersecting) return;

//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", () => {
//     entry.target.classList.remove("lazy-load");
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loading, {
//   root: null,
//   threshold: 0,
//   rootMargin: "-200px",
// });

// img.forEach((img) => {
//   imgObserver.observe(img);
//   img.classList.add("lazy-load");
// });

//////////////
// Show nav
document.querySelector(".navbtn").addEventListener("click", (e) => {
  e.preventDefault();

  nav.classList.toggle("show");
  document.querySelector(".navbar").classList.toggle("show");
});

/*
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    nav.classList.add("hidden");
  }
});

document.querySelectorAll(".nav__link").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".nav__links").classList.add("hidden");
  })
);
*/

// Close when click anywhere

document.body.addEventListener("mousedown", (e) => {
  let isClickInsideButton = document
    .querySelector(".navbtn")
    .contains(e.target);
  let isClickInsideNav = navbar.contains(e.target);

  if (!isClickInsideNav && !isClickInsideButton) {
    navbar.classList.remove("show");
    nav.classList.remove("show");
  }
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    navbar.classList.remove("show");
  });
});
