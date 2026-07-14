const detailContainer = document.getElementById("detailContainer");

const AUTOPLAY_MS = 4500;

const icons = {
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.35 0-2.62-.32-3.74-.9L3 21l1.9-5.7A8.46 8.46 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20 3 17.5V4L9 6.5 15 4l6 2.5V20L15 17.5 9 20Z"/><path d="M9 6.5v13.5"/><path d="M15 4v13.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.13.99.36 1.96.68 2.9a2 2 0 0 1-.45 2.11L7.09 9.09a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.94.32 1.91.55 2.9.68A2 2 0 0 1 22 16.92Z"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7Z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>`,
};

function getIdFromURL() {
  const path = window.location.pathname;
  const match = path.match(/\/detail\/(\d+)/);
  if (match) return Number(match[1]);

  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function formatNomorWA(nomor) {
  if (!nomor || nomor === "-") return "";

  let hasil = String(nomor).replace(/\D/g, "");

  if (hasil.startsWith("0")) {
    hasil = "62" + hasil.slice(1);
  }

  return hasil;
}

function renderMedsosMarketplace(value) {
  if (!value || value === "-") return "-";

  const text = String(value).trim();
  const match = text.match(/^(.*?)\s*:\s*\((https?:\/\/[^)]+)\)$/i);

  if (!match) return text;

  const rawLabel = match[1].trim();
  const url = match[2].trim();

  const labelMap = {
    wa: "WhatsApp",
    whatsapp: "WhatsApp",
    fb: "Facebook",
    facebook: "Facebook",
    ig: "Instagram",
    instagram: "Instagram",
    shopee: "Shopee",
    tokopedia: "Tokopedia",
    youtube: "YouTube",
    tiktok: "TikTok",
  };

  const key = rawLabel.toLowerCase();
  const label =
    labelMap[key] ||
    rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);

  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function renderDetail() {
  const id = getIdFromURL();
  const pandaiBesi = dataUMKM.find((item) => item.id === id);

  if (!detailContainer) return;

  if (!id || !pandaiBesi) {
    detailContainer.innerHTML = `
      <div class="not-found">
        <h1>Data Pandai Besi tidak ditemukan</h1>
        <p>Data dengan ID tersebut belum tersedia.</p>
        <a href="/#daftar-umkm" class="btn">Kembali ke Daftar Pandai Besi</a>
      </div>
    `;
    return;
  }

  document.title = `${pandaiBesi.nama} - Detail Pandai Besi`;

  const pemilik = pandaiBesi.pemilik || pandaiBesi.nama || "-";
  const nomorWA = formatNomorWA(pandaiBesi.nomorHP);
  const pesanWA = encodeURIComponent(
    `Halo, saya ingin bertanya tentang usaha pandai besi ${pandaiBesi.nama}.`,
  );

  const linkWA = nomorWA ? `https://wa.me/${nomorWA}?text=${pesanWA}` : "#";
  const linkTel = nomorWA ? `tel:+${nomorWA}` : "";

  const linkMaps = pandaiBesi.gmaps
    ? pandaiBesi.gmaps
    : pandaiBesi.koordinat
      ? `https://www.google.com/maps?q=${encodeURIComponent(pandaiBesi.koordinat)}`
      : "#";

  const jenisProduksi = Array.isArray(pandaiBesi.jenisProduksi)
    ? pandaiBesi.jenisProduksi.join(", ")
    : pandaiBesi.jenisProduksi || "-";

  const fotoList = Array.isArray(pandaiBesi.foto)
    ? pandaiBesi.foto
    : [pandaiBesi.foto || "/assets/img/umkm-placeholder.webp"];

  const punyaBanyakFoto = fotoList.length > 1;

  detailContainer.innerHTML = `
    <div class="detail-hero">
      <div class="detail-gallery" id="detailGallery" tabindex="0" aria-label="Galeri foto ${pandaiBesi.nama}">
        <div class="gallery-track" id="galleryTrack">
          ${fotoList
            .map(
              (src, i) =>
                `<img src="${src}" alt="Foto usaha ${pandaiBesi.nama} ${i + 1}" class="gallery-slide" />`,
            )
            .join("")}
        </div>

        ${
          punyaBanyakFoto
            ? `
              <button class="gallery-nav prev" id="prevImage" aria-label="Foto sebelumnya">${icons.chevronLeft}</button>
              <button class="gallery-nav next" id="nextImage" aria-label="Foto berikutnya">${icons.chevronRight}</button>
              <button class="gallery-toggle" id="galleryToggle" aria-label="Jeda slide otomatis">${icons.pause}</button>
              <div class="gallery-dots" id="galleryDots">
                ${fotoList
                  .map(
                    (_, i) =>
                      `<button class="${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Ke foto ${i + 1}"></button>`,
                  )
                  .join("")}
              </div>
              <div class="gallery-progress"><div class="gallery-progress-bar" id="galleryProgressBar"></div></div>
            `
            : ""
        }
      </div>

      <div class="detail-headline">
        <h1>
          <span>Pandai Besi</span>
          <span>${pandaiBesi.nama}</span>
        </h1>

        <div class="detail-quickfacts">
          <span>${icons.pin} ${pandaiBesi.lokasi || `RT ${pandaiBesi.rt || "-"} / RW ${pandaiBesi.rw || "-"}`}</span>
          <span>${icons.user} ${pemilik}</span>
        </div>

        <div class="detail-actions">
          <a href="${linkWA}" target="_blank" class="btn-primary">${icons.chat} Hubungi via WhatsApp</a>
          <a href="${linkMaps}" target="_blank" class="btn-secondary">${icons.map} Lihat Lokasi</a>
        </div>
      </div>
    </div>

    <div class="detail-body">
      <section class="detail-row">
        <p class="detail-eyebrow">Informasi Usaha</p>
        <dl class="detail-facts">
          <div><dt>Jenis Produksi</dt><dd>${jenisProduksi}</dd></div>
          <div><dt>Jam Operasional</dt><dd>${pandaiBesi.jamOperasional || "-"}</dd></div>
          <div><dt>Hari Kerja</dt><dd>${pandaiBesi.hariKerja || "-"}</dd></div>
        </dl>
      </section>

      <hr class="detail-divider" />

      <section class="detail-row">
        <p class="detail-eyebrow">Kontak</p>
        <dl class="detail-facts">
          <div><dt>Nomor HP</dt><dd>${pandaiBesi.nomorHP || "-"}</dd></div>
          <div><dt>Medsos / Marketplace</dt><dd>${renderMedsosMarketplace(pandaiBesi.medsosMarketplace)}</dd></div>
        </dl>
      </section>

      <hr class="detail-divider" />

      <section class="detail-row">
        <p class="detail-eyebrow">Catatan</p>
        <p class="detail-note">${pandaiBesi.keteranganTambahan || "-"}</p>
      </section>
    </div>

    <div class="photo-lightbox" id="photoLightbox">
      <button class="photo-lightbox-close" id="photoLightboxClose">×</button>
      <img src="" alt="Foto pandai besi" id="photoLightboxImage" />
    </div>
  `;

  if (punyaBanyakFoto) {
    setupGallery(fotoList.length);
  }

  setupPhotoLightbox();
}

function setupGallery(totalSlide) {
  const gallery = document.getElementById("detailGallery");
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");
  const toggleBtn = document.getElementById("galleryToggle");
  const dots = Array.from(document.querySelectorAll("#galleryDots button"));
  const progressBar = document.getElementById("galleryProgressBar");

  let index = 0;
  let isPlaying = true;
  let timer = null;

  function playProgress() {
    if (!progressBar) return;
    progressBar.classList.remove("animate");
    progressBar.style.transitionDuration = "0ms";
    progressBar.style.width = "0%";
    void progressBar.offsetWidth;
    requestAnimationFrame(() => {
      progressBar.classList.add("animate");
      progressBar.style.transitionDuration = `${AUTOPLAY_MS}ms`;
      progressBar.style.width = "100%";
    });
  }

  function stopProgress() {
    if (!progressBar) return;
    progressBar.classList.remove("animate");
  }

  function goTo(i) {
    index = (i + totalSlide) % totalSlide;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
    if (isPlaying) playProgress();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, AUTOPLAY_MS);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() {
    if (isPlaying) {
      startTimer();
      playProgress();
    }
  }

  prevBtn.addEventListener("click", () => {
    prev();
    restart();
  });

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.index));
      restart();
    });
  });

  toggleBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    toggleBtn.innerHTML = isPlaying ? icons.pause : icons.play;
    toggleBtn.setAttribute(
      "aria-label",
      isPlaying ? "Jeda slide otomatis" : "Putar slide otomatis",
    );

    if (isPlaying) {
      startTimer();
      playProgress();
    } else {
      stopTimer();
      stopProgress();
    }
  });

  gallery.addEventListener("mouseenter", () => {
    if (isPlaying) {
      stopTimer();
      stopProgress();
    }
  });

  gallery.addEventListener("mouseleave", () => {
    if (isPlaying) {
      startTimer();
      playProgress();
    }
  });

  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      restart();
    } else if (e.key === "ArrowRight") {
      next();
      restart();
    }
  });

  let touchStartX = 0;

  gallery.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      if (isPlaying) {
        stopTimer();
        stopProgress();
      }
    },
    { passive: true },
  );

  gallery.addEventListener(
    "touchend",
    (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;

      if (deltaX > 40) {
        prev();
      } else if (deltaX < -40) {
        next();
      }

      restart();
    },
    { passive: true },
  );

  startTimer();
  playProgress();
}

function setupPhotoLightbox() {
  const lightbox = document.getElementById("photoLightbox");
  const lightboxImage = document.getElementById("photoLightboxImage");
  const closeBtn = document.getElementById("photoLightboxClose");
  const gallerySlides = document.querySelectorAll(".gallery-slide");

  if (!lightbox || !lightboxImage || !closeBtn) return;

  gallerySlides.forEach((slide) => {
    slide.addEventListener("click", () => {
      lightboxImage.src = slide.src;
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

renderDetail();
