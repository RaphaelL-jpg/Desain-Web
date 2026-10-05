// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function() {
        nav.classList.toggle("nav-open")
    });
}

// Memakai event delegation di document karena baris tabel sekarang
// dirender dinamis via fetch (lihat buku.js/anggota.js) sehingga
// tombol .btn-hapus belum tentu ada saat DOMContentLoaded.
function initHapusConfirm() {
  document.addEventListener("click", function (e) {
    // Mengecek apakah elemen yang diklik adalah tombol Hapus
    const btn = e.target.closest(".btn-hapus");
    
    // Jika yang diklik bukan tombol hapus, hentikan proses
    if (!btn) return;

    // Jika benar tombol hapus, cari baris (tr) tempat tombol itu berada
    const row = btn.closest("tr");
    
    // Ambil teks dari kolom pertama (td) untuk nama/judul
    const nama = row ? row.querySelector("td")?.textContent : "data ini";
    
    // Tampilkan dialog konfirmasi bawaan browser
    const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");

    // Jika pengguna memilih "OK" (yakin) dan baris ditemukan, hapus baris tersebut
    if (yakin && row) {
      row.remove();
    }
  });
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function() {
        const keyword = input.value.toLocaleLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const teks = row.textContent.toLocaleLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = DocumentFragment.createElement("span");
    span.className = "error"
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span)
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;
    form.addEventListener("submit", function(e) {
        let valid = true;

        const judul = form.querySelector("[name='judul'], [name='nama']");
        if (judul && judul.value.trim() === "") {
            tampilkanError(judul, "Field ini wajib diisi.");
            valid = false;
        } else if (judul) {
            hapusError(judul);
        }

        // ...(pengecekan pengarang, tahun, stok dengan pola serupa)...

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
})