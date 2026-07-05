const detailContainer = document.getElementById("detailContainer");

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function renderDetail() {
  const id = getIdFromURL();
  const umkm = dataUMKM.find((item) => item.id === id);

  if (!detailContainer) return;

  if (!id || !umkm) {
    detailContainer.innerHTML = `
      <div class="not-found">
        <h1>Data Pandai Besi tidak ditemukan</h1>
        <p>UMKM dengan ID tersebut belum tersedia.</p>
        <a href="index.html#daftar-umkm" class="btn">Kembali ke Daftar UMKM</a>
      </div>
    `;
    return;
  }

  document.title = `${umkm.namaUsaha} - Detail UMKM`;

  const pesanWA = encodeURIComponent(
    `Halo, saya ingin bertanya tentang ${umkm.namaUsaha}.`
  );

  const linkWA = umkm.kontakWA
    ? `https://wa.me/${umkm.kontakWA}?text=${pesanWA}`
    : "#";

  const instagram = umkm.medsos?.instagram || "-";
  const facebook = umkm.medsos?.facebook || "-";
  const tiktok = umkm.medsos?.tiktok || "-";

  detailContainer.innerHTML = `
    <div class="detail-hero">
      <img src="${umkm.foto}" alt="${umkm.namaUsaha}" class="detail-image" />

      <div class="detail-info">
        <h1>${umkm.namaUsaha}</h1>

        <div class="info-list">
          <p><strong>Nama Pemilik:</strong> ${umkm.namaPemilik}</p>
          <p><strong>Lokasi:</strong> ${umkm.lokasi}</p>
          <p><strong>Kontak:</strong> ${umkm.kontakWA || "Belum tersedia"}</p>
          <p><strong>Jam Operasional:</strong> ${umkm.jamOperasional || "Belum tersedia"}</p>
          <p><strong>Status Toko:</strong> ${umkm.statusToko || "Belum tersedia"}</p>
        </div>

        <div class="detail-actions">
          <a href="${linkWA}" target="_blank" class="btn">Hubungi Sekarang</a>
          <a href="${umkm.gmaps}" target="_blank" class="btn secondary">Google Maps</a>
        </div>
      </div>
    </div>

    <div class="detail-content-grid">
      <section class="content-box">
        <h2>Keunggulan</h2>
        <p>${umkm.keunggulan}</p>
      </section>

      <section class="content-box">
        <h2>Produk yang Dibuat</h2>
        <ul>
          ${umkm.produk.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>

      <section class="content-box">
        <h2>Alat-alat yang Tersedia</h2>
        <ul>
          ${umkm.alat.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>

      <section class="content-box">
        <h2>Media Sosial</h2>
        <div class="social-list">
          <p><strong>Instagram:</strong> ${instagram}</p>
          <p><strong>Facebook:</strong> ${facebook}</p>
          <p><strong>TikTok:</strong> ${tiktok}</p>
        </div>
      </section>

      <section class="content-box full-width">
        <h2>Keterangan Tambahan</h2>
        <p>${umkm.keterangan}</p>
      </section>
    </div>
  `;
}

renderDetail();