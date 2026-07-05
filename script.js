const mapPoints = document.getElementById("mapPoints");
const umkmGrid = document.getElementById("umkmGrid");
const searchInput = document.getElementById("searchInput");

function renderMapPoints() {
  if (!mapPoints) return;

  mapPoints.innerHTML = "";

  dataUMKM.forEach((umkm) => {
    const link = document.createElement("a");
    link.href = `detail.html?id=${umkm.id}`;
    link.className = "map-point";
    link.style.top = umkm.posisiTop;
    link.style.left = umkm.posisiLeft;
    link.title = umkm.namaUsaha;
    link.textContent = umkm.id;

    mapPoints.appendChild(link);
  });
}

function renderUMKMList(keyword = "") {
  if (!umkmGrid) return;

  const normalizedKeyword = keyword.toLowerCase();

  const filteredData = dataUMKM.filter((umkm) => {
    const text = `
      ${umkm.namaUsaha}
      ${umkm.namaPemilik}
      ${umkm.lokasi}
      ${umkm.produk.join(" ")}
      ${umkm.alat.join(" ")}
    `.toLowerCase();

    return text.includes(normalizedKeyword);
  });

  umkmGrid.innerHTML = "";

  if (filteredData.length === 0) {
    umkmGrid.innerHTML = `<p class="empty-message">Data UMKM tidak ditemukan.</p>`;
    return;
  }

  filteredData.forEach((umkm) => {
    const item = document.createElement("article");
    item.className = "umkm-list-item";

    item.innerHTML = `
      <div class="umkm-number">${umkm.id}</div>

      <div class="umkm-list-content">
        <h3>${umkm.namaUsaha}</h3>
        <p><span>Pemilik</span> ${umkm.namaPemilik}</p>
        <p><span>Alamat</span> ${umkm.lokasi}</p>
      </div>

      <div class="umkm-list-action">
        <a href="detail.html?id=${umkm.id}" class="btn-card">Lihat Detail</a>
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

renderMapPoints();
renderUMKMList();
