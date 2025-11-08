// === Last login ===
const lastLogin = document.getElementById('last-login');
if (lastLogin) {
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
  lastLogin.textContent = formatter.format(new Date());
}

// === Nav & Sections ===
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('.section'));

// Kích hoạt link theo id section (chỉ áp dụng cho link hash)
const activateLink = (id) => {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      link.classList.toggle('is-active', href === `#${id}`);
    }
  });
};

// Scroll spy chỉ khi có section trên trang hiện tại
if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateLink(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: 0.4 }
  );
  sections.forEach((section) => observer.observe(section));
}

// Click handler:
// - Nếu href là #hash -> smooth scroll trong trang
// - Nếu KHÔNG phải #hash -> để mặc định (chuyển trang)
navLinks.forEach((link) => {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('#')) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activateLink(targetId);
      history.replaceState(null, '', `#${targetId}`);
    });
  }
});

// Đặt .active theo URL hiện tại (áp dụng cho link trang con)
(function () {
  var path = location.pathname.replace(/\/+$/, "");
  document.querySelectorAll('.sidebar__nav .nav-link').forEach(function (a) {
    try {
      var href = a.getAttribute('href') || '';
      // Chuẩn hóa URL tuyệt đối cho so sánh
      var abs = new URL(href, location.origin + location.pathname).pathname.replace(/\/+$/, "");
      if (abs === path) a.classList.add('active');
    } catch {}
  });
})();

// (Tùy chọn) Khi mở trang với #hash, scroll tới section tương ứng (nếu có)
(function () {
  if (!location.hash) return;
  var target = document.querySelector(location.hash);
  if (target && typeof target.scrollIntoView === 'function') {
    setTimeout(function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
})();
