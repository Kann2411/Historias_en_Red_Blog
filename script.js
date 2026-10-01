// Historias en Red — interacciones del blog
// (menú móvil + demo de comentarios en memoria, sin backend)

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menú de navegación (móvil) ---------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Comentarios de ejemplo (solo en memoria) ---------- */
  var form = document.getElementById('commentForm');
  var list = document.getElementById('commentList');
  var comments = [];

  function renderComments() {
    if (!list) return;

    if (comments.length === 0) {
      list.innerHTML = '<li class="comment-empty">Aún no hay comentarios. ¡Sé la primera persona en escribir uno!</li>';
      return;
    }

    list.innerHTML = comments.map(function (c) {
      return (
        '<li>' +
          '<span class="comment-author">' + escapeHtml(c.name) + '</span>' +
          '<span class="comment-time">' + c.time + '</span>' +
          '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
        '</li>'
      );
    }).join('');
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = document.getElementById('commentName');
      var textInput = document.getElementById('commentText');
      var name = nameInput.value.trim();
      var text = textInput.value.trim();
      if (!name || !text) return;

      comments.unshift({
        name: name,
        text: text,
        time: new Date().toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
      });

      renderComments();
      form.reset();
      nameInput.focus();
    });
  }

  renderComments();
});
