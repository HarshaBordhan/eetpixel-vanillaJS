"use strict";

const interactiveImg = document.querySelector(".interactive__img");
const img1 = document.querySelector(".in__img-1");
const img2 = document.querySelector(".in__img-2");
const stackingImg = document.querySelector(".stacking__img");
const stackImages = document.querySelectorAll(".stackImg");
// const stackImages = stackingImg.querySelectorAll("img");

const imgPos = interactiveImg.getBoundingClientRect();
// console.log(imgPos);

stackImages[0].classList.add("active");

// Create an observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // the image is intersecting with the viewport
      // stop the image
      entry.target.style.position = "sticky";
      entry.target.style.top = "0";
      // entry.target.style.top = 0;
      console.log(entry);
    } else {
      // the image is not intersecting with the viewport
      // reset the image
      // entry.target.style.position = "absolute";
      entry.target.style.position = "sticky";
      // entry.target.style.top = "auto";
      entry.target.style.top = "0";
    }
  });
});

// start observing the first image
observer.observe(stackImages[0]);

// Listen for the scroll event on the window
let lastScrollPos = 0;

/////////////////////////////////////
// Scrolling Effects
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  // console.log(scrollPos);

  ///////////////////////
  // Interact Image
  const translateX = scrollPos / 20;
  img1.style.transform = `translateX(${-translateX}px)`;
  img2.style.transform = `translateX(${translateX}px)`;

  //////////////////////
  // Stacking Image
  console.log(stackImages[0].offsetTop, scrollPos);
  // Get the current scroll position
  // Get the index of the active image
  let activeIndex = 0;
  stackImages.forEach((image, index) => {
    if (image.classList.contains("active")) {
      activeIndex = index;
    }
  });
  // Check if the user is scrolling up or down
  if (scrollPos > lastScrollPos) {
    // Scrolling down
    if (activeIndex < stackImages.length - 1) {
      stackImages[activeIndex].classList.remove("active");
      stackImages[activeIndex + 1].classList.add("active");
      observer.unobserve(stackImages[activeIndex]);
      observer.observe(stackImages[activeIndex + 1]);
    }
  } else {
    // Scrolling up
    if (activeIndex > 0) {
      stackImages[activeIndex].classList.remove("active");
      stackImages[activeIndex - 1].classList.add("active");
      observer.unobserve(stackImages[activeIndex]);
      observer.observe(stackImages[activeIndex - 1]);
    }
  }
  // Update the last scroll position
  lastScrollPos = scrollPos;

  const maxBrightness = 150;
  const brightness = scrollPos / maxBrightness;

  stackImages.forEach((img) => {
    img.style.filter = `brightness(${brightness}$)`;
  });
});
