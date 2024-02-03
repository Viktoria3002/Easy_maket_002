const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let slideWidth = slides[0].clientWidth;

let currentIndex = 0;
let statusSlider = false;
let intervalId = null;

function nextSlide() {
  if (statusSlider) {
    currentIndex--
  } else {
    currentIndex++;
  }
  moveSlider();
}

function moveSlider() {
  // Перемещаем слайдер влево
  slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  
  // Проверяем, если текущий индекс достиг максимального значения, возвращаемся к первому слайду
  if (currentIndex === slides.length - 4) {
    statusSlider = true;
  }

  if (currentIndex === 0) {
    statusSlider = false;
  }
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

function handleResize() {
  slideWidth = slides[0].clientWidth;
  stopAutoSlide();
  slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  startAutoSlide();
}

// Добавляем обработчик события на изменение размера экрана
window.addEventListener("resize", handleResize);

// Запускаем автоматическое переключение слайдов при загрузке страницы
startAutoSlide();

// Останавливаем автоматическое переключение слайдов при наведении курсора на слайдер
slider.addEventListener('mouseover', stopAutoSlide);

// Возобновляем автоматическое переключение слайдов при уходе курсора с слайдера
slider.addEventListener('mouseleave', startAutoSlide);