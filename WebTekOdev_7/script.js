document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;

  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function updateSlide() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  window.nextSlide = function () {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  };

  window.prevSlide = function () {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  };
  updateSlide();
});
document.querySelectorAll('.gezin').forEach(section => {
  section.addEventListener('click', () => {
    document.querySelectorAll('.gezin').forEach(s => s.classList.remove('active'));
    section.classList.add('active');
  });
});
document.querySelectorAll('.slider a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Tüm gezin bölümlerinden active class'ı kaldır
    document.querySelectorAll('.gezin').forEach(section => {
      section.classList.remove('active');
    });

    // Hedef bölümü bul
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId)?.closest('.gezin');

    if (targetSection) {
      // active class ekle
      targetSection.classList.add('active');

      // Sayfayı hedef bölüme yumuşakça kaydır
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  });
});


