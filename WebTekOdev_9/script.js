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

    document.querySelectorAll('.gezin').forEach(section => {
      section.classList.remove('active');
    });

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId)?.closest('.gezin');

    if (targetSection) {
      targetSection.classList.add('active');

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  });
});
document.getElementById("ara").addEventListener("click", function () {
      const kitapIsmi = document.getElementById("kitap-ismi").value.trim();
      if (!kitapIsmi) {
        alert("Lütfen bir kitap ismi girin.");
        return;
      }

      fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(kitapIsmi)}`)
        .then(res => res.json())
        .then(data => {
          const kitaplar = data.docs;
          if (kitaplar.length === 0) {
            alert("Kitap bulunamadı.");
            return;
          }
          const kitap = kitaplar[0];

          fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(kitapIsmi)}`)
            .then(res => res.json())
            .then(googleData => {
              let ozet = "Özet bulunamadı.";
              if (googleData.totalItems > 0) {
                const googleKitap = googleData.items[0].volumeInfo;
                if (googleKitap.description) {
                  ozet = googleKitap.description;
                }
              }
             
              const sonucDiv = document.createElement("div");
              sonucDiv.className = "sonuc";
              sonucDiv.innerHTML = `
                <h3>${kitap.title}</h3>
                <p><strong>Yazar:</strong> ${kitap.author_name ? kitap.author_name.join(", ") : "Bilinmiyor"}</p>
                <p><strong>İlk Yayın Yılı:</strong> ${kitap.first_publish_year || "Bilinmiyor"}</p>
                <p><strong>Yayınevi:</strong> ${kitap.publisher ? kitap.publisher[0] : "Bilinmiyor"}</p>
                <p><strong>Özet:</strong> ${ozet}</p>
              `;
              document.body.appendChild(sonucDiv);
            })
            .catch(() => {
              alert("Kitap özeti alınamadı.");
            });
        })
        .catch(err => {
          console.error(err);
          alert("Bir hata oluştu.");
        });
    });

