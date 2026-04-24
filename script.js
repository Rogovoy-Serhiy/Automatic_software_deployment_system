const slides = document.querySelectorAll(".slide-container");

let currentSlide = 0;

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  currentSlide = index;
  updateCounter();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function updateCounter() {
  const counter = document.querySelector(".slide-counter");
  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }
}

function resizeSlides() {
  const baseWidth = 1280;
  const baseHeight = 720;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  document.documentElement.style.setProperty("--slide-scale", scale);
}

function createNavigation() {
  const nav = document.createElement("div");
  nav.className = "slide-nav";

  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.onclick = prevSlide;

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.onclick = nextSlide;

  nav.appendChild(prevButton);
  nav.appendChild(nextButton);

  const counter = document.createElement("div");
  counter.className = "slide-counter";

  document.body.appendChild(nav);
  document.body.appendChild(counter);
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "ArrowRight" ||
    event.key === " " ||
    event.key === "Enter"
  ) {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  }
});

document.addEventListener("click", (event) => {
  const isButton = event.target.closest("button");
  if (!isButton) {
    nextSlide();
  }
});

window.addEventListener("resize", resizeSlides);

createNavigation();
resizeSlides();
showSlide(currentSlide);