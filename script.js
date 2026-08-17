"use strict";

const header = document.querySelector('.site-header');

if (header) {
  const updateHeader = () => {
    header.style.background = window.scrollY > 20 ? 'rgba(11,11,11,.94)' : 'rgba(11,11,11,.76)';
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

// Basic clickjacking protection for this static site.
// Strong HTTP security headers should still be enforced by the hosting/proxy layer.
if (window.top !== window.self) {
  document.documentElement.style.display = 'none';
}
