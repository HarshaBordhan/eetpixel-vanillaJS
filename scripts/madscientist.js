"use strict";

const stackingImg = document.querySelector(".stacking__img");

const stackImages = stackingImg.querySelectorAll("img");

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
      console.log(entry.target);
    } else {
      // the image is not intersecting with the viewport
      // reset the image
      entry.target.style.position = "sticky";
      entry.target.style.top = "0";
    }
  });
});

// start observing the first image
observer.observe(stackImages[0]);

// Listen for the scroll event on the window
let lastScrollPos = 0;

/////////////////////////////////////
//////////////////////
// Stacking Image
window.addEventListener("scroll", () => {
  // Get the current scroll position
  const scrollPos = window.scrollY;
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
