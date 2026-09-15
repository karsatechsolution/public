// ============================================================
// Bimbel Edufa - Interaksi utama
// ============================================================
(function () {
  "use strict";

  const CONFIG_DATA = (typeof CONFIG !== "undefined" && CONFIG) || {};
  const WHATSAPP_NUM = CONFIG_DATA.whatsapp || "";
  const REG_URL = CONFIG_DATA.registrationUrl || "#";
  const WHATSAPP_MESSAGES = {
    general: "Halo Bimbel Edufa, saya ingin bertanya mengenai program bimbel.",
    student: "Halo Bimbel Edufa, saya ingin bertanya program untuk siswa kelas 8.",
    parent: "Halo Bimbel Edufa, saya ingin konsultasi mengenai program belajar untuk anak saya.",
    sd: "Halo Bimbel Edufa, saya ingin bertanya mengenai program Bimbel SD.",
    smp: "Halo Bimbel Edufa, saya ingin bertanya mengenai program Bimbel SMP.",
    sma: "Halo Bimbel Edufa, saya ingin bertanya mengenai program Bimbel SMA.",
    fee: "Halo Bimbel Edufa, saya ingin menanyakan biaya dan program terbaru.",
  };

  // ---------- Helpers: WhatsApp ----------
  function createWhatsAppLink(message) {
    if (!WHATSAPP_NUM) return null;
    return (
      "https://wa.me/" +
      WHATSAPP_NUM +
      "?text=" +
      encodeURIComponent(message || WHATSAPP_MESSAGES.general)
    );
  }

  function openWhatsApp(message) {
    const link = createWhatsAppLink(message);
    if (!link) {
      showToast("Nomor WhatsApp Edufa belum tersedia. Silakan gunakan tombol Daftar Sekarang.");
      return;
    }
    window.open(link, "_blank", "noopener");
  }

  function bindWhatsAppButtons(scope) {
    const root = scope || document;
    root.querySelectorAll("[data-wa]").forEach(function (btn) {
      if (btn.dataset.waBound) return;
      btn.dataset.waBound = "1";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const key = btn.dataset.wa;
        const custom = btn.dataset.waMessage;
        const message = custom || WHATSAPP_MESSAGES[key] || WHATSAPP_MESSAGES.general;
        openWhatsApp(message);
      });
    });
  }

  function setRegistrationLinks(scope) {
    const root = scope || document;
    root.querySelectorAll("[data-register]").forEach(function (a) {
      a.setAttribute("href", REG_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  // ---------- Toast ----------
  let toastTimer = null;
  function showToast(text) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3400);
  }

  // ---------- Navbar ----------
  function initNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });

    const header = document.querySelector(".site-header");
    const onScroll = function () {
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Sticky CTA (mobile) ----------
  function initStickyCta() {
    const bar = document.getElementById("stickyCta");
    if (!bar) return;
    const hero = document.getElementById("hero");
    let lastY = window.scrollY;
    let ticking = false;
    const update = function () {
      const pastHero = hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 500;
      const show = pastHero && window.scrollY > lastY;
      bar.classList.toggle("visible", show);
      document.body.classList.toggle("sticky-on", show);
      lastY = window.scrollY;
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
  }

  // ---------- Reveal on scroll ----------
  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.visible)");
    if (!items.length) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      items.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  // ---------- FAQ accordion ----------
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      if (!q || !a) return;
      const inner = a.querySelector(".faq-a-inner");
      q.addEventListener("click", function () {
        const isOpen = item.classList.contains("open");
        closeAllFaq();
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = inner.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function closeAllFaq() {
    document.querySelectorAll(".faq-item.open").forEach(function (item) {
      item.classList.remove("open");
      const a = item.querySelector(".faq-a");
      const q = item.querySelector(".faq-q");
      a.style.maxHeight = null;
      q.setAttribute("aria-expanded", "false");
    });
  }

  // ---------- Render: LEVELS ----------
  function renderLevels() {
    const wrap = document.getElementById("levelWrap");
    if (!wrap || typeof LEVELS === "undefined") return;
    let html = '<div class="level-grid">';
    Object.keys(LEVELS).forEach(function (key) {
      const lv = LEVELS[key];
      const range = Array.isArray(lv.classes)
        ? "Kelas " + lv.classes[0] + " - " + lv.classes[lv.classes.length - 1]
        : "Kelas " + lv.classes;
      let chips = "";
      (lv.classes || []).forEach(function (c) {
        chips += '<span class="chip">Kelas ' + c + "</span>";
      });
      html +=
        '<div class="level-card reveal ' +
        (lv.accent || "blue") +
        '">' +
        '<div class="level-card-head">' +
        '<span class="level-badge" aria-hidden="true">' +
        lv.label +
        "</span>" +
        "<div><h3>" +
        (lv.name || lv.label) +
        "</h3>" +
        '<p class="level-range">' +
        range +
        "</p></div></div>" +
        '<div class="chips" aria-label="Kelas yang dilayani untuk ' +
        (lv.name || lv.label) +
        '">' +
        chips +
        "</div>" +
        "</div>";
    });
    html += "</div>";
    wrap.innerHTML = html;
  }

  // ---------- Render: SCHEDULES ----------
  function renderSchedules() {
    const wrap = document.getElementById("scheduleWrap");
    if (!wrap || typeof SCHEDULES === "undefined") return;
    const items = SCHEDULES.items || [];
    let note = "";
    if (SCHEDULES.isExample) {
      note =
        '<div class="schedule-note">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        "Jadwal di bawah adalah contoh format. Jadwal aktual dapat ditanyakan melalui WhatsApp Edufa.</div>";
    }
    let rows = "";
    items.forEach(function (s) {
      rows +=
        "<tr><td><strong>" +
        s.day +
        '</strong></td><td>' +
        s.time +
        '</td><td><span class="level-tag">' +
        s.level +
        "</span></td><td>" +
        s.subject +
        "</td></tr>";
    });
    wrap.innerHTML =
      note +
      '<div class="table-scroll"><table class="schedule-table"><thead><tr>' +
      "<th>Hari</th><th>Jam</th><th>Jenjang</th><th>Mata Pelajaran</th>" +
      "</tr></thead><tbody>" +
      rows +
      "</tbody></table></div>";
  }

  // ---------- Render: FEES ----------
  function renderFees() {
    const grid = document.getElementById("feeGrid");
    if (!grid || typeof FEES === "undefined") return;
    const usesHubungi = !FEES.available;
    let html = "";
    FEES.items.forEach(function (item) {
      const priceHtml = usesHubungi
        ? '<div class="price hubungi">Hubungi Edufa</div>'
        : '<div class="price">' + FEES.currency + " " + item.price + "</div>";
      html +=
        '<div class="card fee-card reveal">' +
        '<div class="card-icon" style="margin-inline:auto">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' +
        "</div>" +
        "<h3>" +
        item.name +
        "</h3>" + 
        priceHtml +
        '<div class="price-muted">' +
        (item.note || "") +
        "</div></div>";
    });
    grid.innerHTML = html;
  }

  function renderFeeNote() {
    const el = document.getElementById("feeNote");
    if (el) el.textContent = FEES.note || "";

    document.querySelectorAll("#feeCta, #googleCta").forEach(function (a) {
      if (CONFIG_DATA.googleBusinessUrl) {
        a.setAttribute("href", CONFIG_DATA.googleBusinessUrl);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
        a.hidden = false;
      } else {
        a.hidden = true;
      }
    });
  }

  // ---------- Render: TESTIMONIALS ----------
  function renderTestimonials() {
    const wrap = document.getElementById("testiWrap");
    if (!wrap || typeof TESTIMONIALS === "undefined") return;
    if (!TESTIMONIALS.hasReal) {
      wrap.innerHTML =
        '<div class="testi-empty">' +
        '<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2456e6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 14px"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"/></svg>' +
        "<h3>Kolom Testimoni Edufa</h3>" +
        "<p>Saat ini kami sedang mengumpulkan cerita dari orang tua dan siswa. Testimoni asli akan kami tampilkan di sini.</p>" +
        '<p class="mt-8">Punya pengalaman belajar di Edufa? <a href="javascript:void(0)" data-wa="parent" style="font-weight:700">Ceritakan melalui WhatsApp</a>.</p>' +
        "</div>";
      bindWhatsAppButtons(wrap);
      return;
    }
    const items = TESTIMONIALS.items || [];
    let slides = "";
    items.forEach(function (t) {
      const initials = (t.name || "ET")
        .split(" ")
        .map(function (w) {
          return w.charAt(0).toUpperCase();
        })
        .slice(0, 2)
        .join("");
      const stars = t.rating
        ? '<div class="testi-stars" aria-label="Rating ' + t.rating + " dari 5\">" + "\u2605".repeat(t.rating) + "</div>"
        : "";
      slides +=
        '<div class="testi-slide"><div class="testi-card">' +
        stars +
        "<blockquote>\u201C" +
        t.comment +
        '\u201D</blockquote><div class="testi-meta">' +
        '<div class="testi-avatar" aria-hidden="true">' +
        initials +
        '</div><div><div class="testi-name">' +
        t.name +
        '</div><div class="testi-role">' +
        t.status +
        (t.level ? " - " + t.level : "") +
        "</div></div></div></div></div>";
    });
    wrap.innerHTML =
      '<div class="testi-slider"><div class="testi-track">' +
      slides +
      '</div></div><div class="testi-controls"><button class="btn btn-ghost btn-sm" id="testiPrev" aria-label="Testimoni sebelumnya">&#8592; Sebelumnya</button>' +
      '<div class="testi-dots" id="testiDots"></div>' +
      '<button class="btn btn-ghost btn-sm" id="testiNext" aria-label="Testimoni berikutnya">Berikutnya &#8594;</button></div>';
    initTestiSlider(items.length);
  }

  function initTestiSlider(count) {
    const track = document.querySelector(".testi-track");
    const dotsEl = document.getElementById("testiDots");
    if (!track || !dotsEl || count <= 1) {
      if (dotsEl && count <= 1) dotsEl.innerHTML = "";
      return;
    }
    let index = 0;
    let timer = null;
    const slides = track.children;
    const maxIndex = slides.length - 1;

    const go = function (i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      Array.prototype.forEach.call(dotsEl.children, function (d, j) {
        d.classList.toggle("active", j === index);
      });
    };

    Object.keys(slides).forEach?.(function () {});
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Tampilkan testimoni " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        go(i);
        restart();
      });
      dotsEl.appendChild(dot);
    }

    const prev = document.getElementById("testiPrev");
    const next = document.getElementById("testiNext");
    if (prev) prev.addEventListener("click", function () {
      go(index - 1);
      restart();
    });
    if (next) next.addEventListener("click", function () {
      go(index + 1);
      restart();
    });

    const restart = function () {
      clearInterval(timer);
      timer = setInterval(function () {
        go(index + 1);
      }, 6000);
    };
    restart();
  }

  // ---------- Render: GALLERY + lightbox ----------
  function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid || typeof GALLERY === "undefined") return;
    const items = GALLERY.items || [];

    if (!items.length) {
      grid.innerHTML =
        '<div class="testi-empty" style="grid-column:1/-1">' +
        "<p>Foto kegiatan belajar Edufa akan segera hadir di sini.</p></div>";
      return;
    }

    const cats = ["Semua"];
    items.forEach(function (g) {
      if (g.category && cats.indexOf(g.category) === -1) cats.push(g.category);
    });

    const filters = document.getElementById("galleryFilters");
    if (filters) {
      filters.innerHTML = "";
      cats.forEach(function (c, i) {
        const b = document.createElement("button");
        b.className = "filter-btn" + (i === 0 ? " active" : "");
        b.textContent = c;
        b.dataset.filter = c;
        filters.appendChild(b);
      });
    }

    const paint = function (filter) {
      grid.innerHTML = "";
      items.forEach(function (g, idx) {
        if (filter !== "Semua" && g.category !== filter) return;
        const el = document.createElement("figure");
        el.className = "gallery-item reveal visible";
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", "Perbesar foto: " + g.title);
        el.dataset.index = idx;
        el.innerHTML =
          '<img src="' +
          g.src +
          '" alt="' +
          g.title +
          '" loading="lazy" decoding="async">' +
          '<figcaption class="gallery-caption">' +
          g.title +
          "</figcaption>";
        grid.appendChild(el);
      });
    };
    paint("Semua");

    filters.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filters.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      paint(btn.dataset.filter);
    });
  }

  function initLightbox() {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    const cap = document.getElementById("lightboxCaption");
    if (!lb || !img) return;

    const open = function (src, caption) {
      img.src = src;
      cap.textContent = caption || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = function () {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    };

    document.addEventListener("click", function (e) {
      const item = e.target.closest(".gallery-item");
      if (item) {
        const im = item.querySelector("img");
        open(im ? im.src : "", im ? im.alt : "");
      }
    });

    document.getElementById("lightboxClose").addEventListener("click", close);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  // ---------- Render: BLOG (index preview + listing) ----------
  function renderBlog(target, limit) {
    const wrap = document.getElementById(target);
    if (!wrap || typeof BLOG_POSTS === "undefined") return;
    const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
    let html = "";
    posts.forEach(function (p) {
      html +=
        '<article class="blog-card reveal">' +
        '<div class="blog-thumb"><span class="blog-cat">' +
        p.category +
        '</span><a href="blog/' +
        p.slug +
        '.html" aria-hidden="true" tabindex="-1"><img src="' +
        p.image +
        '" alt="' +
        p.title +
        '" loading="lazy" decoding="async"></a></div>' +
        '<div class="blog-body"><span class="blog-date">' +
        formatDate(p.date) +
        '</span><h3><a href="blog/' +
        p.slug +
        '.html">' +
        p.title +
        '</a></h3><p>' +
        p.excerpt +
        '</p><a class="read-more" href="blog/' +
        p.slug +
        '.html">Baca selengkapnya <span aria-hidden="true">&#8594;</span></a></div>' +
        "</article>";
    });
    wrap.innerHTML = html;
  }

  function formatDate(iso) {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  // ---------- Program selector ----------
  function initSelector() {
    const form = document.getElementById("selectorForm");
    const result = document.getElementById("selectorResult");
    if (!form || !result || typeof LEVELS === "undefined") return;

    const jenjangSel = form.querySelector("#selJenjang");
    const kelasSel = form.querySelector("#selKelas");
    const mapelSel = form.querySelector("#selMapel");
    const text = result.querySelector("#resultText");
    const action = result.querySelector("#resultAction");

    const levelsKey = { SD: "sd", SMP: "smp", SMA: "sma" };

    const fillKelas = function () {
      const key = levelsKey[jenjangSel.value];
      const lv = LEVELS[key];
      if (!lv) return;
      kelasSel.innerHTML = "";
      lv.classes.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = "Kelas " + c;
        kelasSel.appendChild(opt);
      });
    };

    jenjangSel.addEventListener("change", fillKelas);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const jenjang = jenjangSel.value;
      const kelas = kelasSel.value;
      const mapel = mapelSel.options[mapelSel.selectedIndex] ? mapelSel.options[mapelSel.selectedIndex].text : mapelSel.value;
      const msg =
        "Untuk siswa " +
        jenjang +
        " kelas " +
        kelas +
        " yang ingin meningkatkan " +
        mapel +
        ", Anda dapat berkonsultasi mengenai program Bimbel " +
        jenjang +
        " Edufa.";
      text.textContent = msg;
      action.innerHTML = "";
      const btn = document.createElement("a");
      btn.className = "btn btn-whatsapp btn-sm";
      btn.setAttribute("href", "#");
      btn.dataset.waMessage =
        "Halo Bimbel Edufa, saya ingin konsultasi program untuk siswa " + jenjang + " kelas " + kelas + " (" + mapel + ").";
      btn.dataset.wa = "general";
      btn.textContent = "Konsultasi via WhatsApp";
      action.appendChild(btn);
      bindWhatsAppButtons(action);
      result.classList.add("show");
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // ---------- Footer ----------
  function initFooter() {
    const year = document.getElementById("footerYear");
    if (year) year.textContent = new Date().getFullYear();
  }

  // ---------- Inject floating buttons ----------
  function injectFloating() {
    if (document.getElementById("waFloat")) return;
    if (!WHATSAPP_NUM) return;

    const wa = document.createElement("a");
    wa.id = "waFloat";
    wa.className = "wa-float";
    wa.setAttribute("href", "#");
    wa.setAttribute("aria-label", "Chat Bimbel Edufa di WhatsApp");
    wa.dataset.wa = "general";
    wa.innerHTML =
      '<span class="wa-pulse" aria-hidden="true"></span>' +
      '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4.6 28l6.3-1.6c1.5.7 3.2 1.1 5.1 1.1 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.6c-1.6 0-3.2-.4-4.6-1.2l-.5-.3-3.7 1 1-3.6-.3-.5c-1-1.8-1.6-3.8-1.6-5.9 0-5 4.7-9.1 10.7-9.1s10.7 4.1 10.7 9.1-4.7 9.1-10.7 9.1zm5.4-6.8c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5z"/></svg>';
    document.body.appendChild(wa);
    bindWhatsAppButtons(wa);
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initStickyCta();
    initFaq();
    renderLevels();
    renderSchedules();
    renderFees();
    renderFeeNote();
    renderTestimonials();
    renderGallery();
    initLightbox();
    renderBlog("blogPreview", 3);
    renderBlog("blogListing");
    initSelector();
    initFooter();
    bindWhatsAppButtons();
    setRegistrationLinks();
    injectFloating();
    observeReveals();
  });

  // Expose helpers for other scripts
  window.createWhatsAppLink = createWhatsAppLink;
  window.EdufaTools = {
    createWhatsAppLink: createWhatsAppLink,
    messages: WHATSAPP_MESSAGES,
    formatDate: formatDate,
  };
})();