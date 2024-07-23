function toggleMenu() {
  const links = document.querySelector('.header-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
  }
}