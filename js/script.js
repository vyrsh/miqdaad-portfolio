// ===== Sidebar scroll spy =====
const sections = document.querySelectorAll('section[id], footer[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function updateActiveLink() {
  let current = 'hero';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  sidebarLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ===== Sidebar toggle (mobile) =====
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebarToggle');
const overlay = document.getElementById('sidebarOverlay');

function closeSidebar() {
  sidebar.classList.remove('open');
  toggle.classList.remove('active');
  overlay.classList.remove('visible');
}

function openSidebar() {
  sidebar.classList.add('open');
  toggle.classList.add('active');
  overlay.classList.add('visible');
}

toggle.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);

sidebarLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});

// ===== Scroll reveal animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));
