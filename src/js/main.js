/* ============================================================
   Parth Posts — main.js
   ============================================================ */

/* ---- Dark / Light Mode ---- */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  /* ---- Header scroll shadow ---- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Reading progress bar ---- */
  const progressBar = document.getElementById('reading-progress');
  const postContent = document.getElementById('post-content');
  if (progressBar && postContent) {
    const updateProgress = () => {
      const start = postContent.getBoundingClientRect().top + window.scrollY;
      const end   = postContent.getBoundingClientRect().bottom + window.scrollY;
      const height = end - start;
      const scrolled = Math.max(0, window.scrollY - start);
      const pct = Math.min(100, (scrolled / height) * 100);
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Estimated reading time ---- */
  const rtEl = document.getElementById('reading-time');
  if (rtEl && postContent) {
    const words = postContent.innerText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    rtEl.textContent = `${minutes} min read`;
  }

  /* ---- Auto Table of Contents ---- */
  const tocList = document.getElementById('toc-list');
  const tocWrapper = document.getElementById('toc');
  if (tocList && postContent) {
    const headings = postContent.querySelectorAll('h2, h3');
    if (headings.length < 2) {
      if (tocWrapper) tocWrapper.style.display = 'none';
    } else {
      headings.forEach((h, i) => {
        if (!h.id) h.id = 'heading-' + i;
        const li = document.createElement('li');
        li.style.paddingLeft = h.tagName === 'H3' ? '12px' : '0';
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        a.addEventListener('click', e => {
          e.preventDefault();
          document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        li.appendChild(a);
        tocList.appendChild(li);
      });

      /* Active TOC link on scroll */
      const tocLinks = tocList.querySelectorAll('a');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(a => a.classList.remove('active'));
            const active = tocList.querySelector(`a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }, { rootMargin: '-10% 0px -80% 0px' });

      headings.forEach(h => observer.observe(h));
    }
  }

  /* ---- Animate cards on scroll (homepage) ---- */
  if ('IntersectionObserver' in window) {
    const animEls = document.querySelectorAll('.post-item, .card');
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      animObserver.observe(el);
    });
  }
});