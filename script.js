const umkmGrid = document.getElementById("umkmGrid");
const searchInput = document.getElementById("searchInput");

function getJenisProduksiText(data) {
  if (!data.jenisProduksi) return "-";

  if (Array.isArray(data.jenisProduksi)) {
    return data.jenisProduksi.join(", ");
  }

  return data.jenisProduksi;
}

const mapImage = document.getElementById("mapImage");
const mapLightbox = document.getElementById("mapLightbox");
const mapLightboxImage = document.getElementById("mapLightboxImage");
const mapLightboxClose = document.getElementById("mapLightboxClose");

if (mapImage && mapLightbox && mapLightboxImage && mapLightboxClose) {
  mapImage.addEventListener("click", function () {
    mapLightboxImage.src = this.src;
    mapLightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  function closeMapLightbox() {
    mapLightbox.classList.remove("show");
    mapLightboxImage.src = "";
    document.body.style.overflow = "";
  }

  mapLightboxClose.addEventListener("click", closeMapLightbox);

  mapLightbox.addEventListener("click", function (e) {
    if (e.target === mapLightbox) {
      closeMapLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMapLightbox();
    }
  });
}

function renderUMKMList(keyword = "") {
  if (!umkmGrid) return;

  const normalizedKeyword = keyword.toLowerCase();

  const filteredData = dataUMKM.filter((pandaiBesi) => {
    const alamat =
      pandaiBesi.lokasi ||
      `RT ${pandaiBesi.rt || "-"} / RW ${pandaiBesi.rw || "-"}`;

    const text = `
      ${pandaiBesi.noUrut || ""}
      ${pandaiBesi.nama || ""}
      ${pandaiBesi.pekerjaan || ""}
      ${alamat}
      ${pandaiBesi.nomorHP || ""}
      ${pandaiBesi.jenisProduksi || ""}
    `.toLowerCase();

    return text.includes(normalizedKeyword);
  });

  umkmGrid.innerHTML = "";

  if (filteredData.length === 0) {
    umkmGrid.innerHTML = `<p class="empty-message">Data pandai besi tidak ditemukan.</p>`;
    return;
  }

  filteredData.forEach((pandaiBesi) => {
    const alamat =
      pandaiBesi.lokasi ||
      `RT ${pandaiBesi.rt || "-"} / RW ${pandaiBesi.rw || "-"}`;

    const item = document.createElement("article");
    item.className = "umkm-list-item";

    item.innerHTML = `
      <div class="umkm-number">${pandaiBesi.noUrut}</div>

      <div class="umkm-list-content">
        <h3>Pandai Besi ${pandaiBesi.nama || "-"}</h3>
        <p><span>Pemilik</span> ${pandaiBesi.nama || "-"}</p>
        <p><span>Alamat</span> ${alamat}</p>
      </div>

      <div class="umkm-list-action">
        <a href="detail.html?id=${pandaiBesi.id}" class="btn-card">Lihat Detail</a>
      </div>
    `;

    umkmGrid.appendChild(item);
  });
}
if (searchInput) {
  searchInput.addEventListener("input", function () {
    renderUMKMList(this.value);
  });
}

renderUMKMList();
