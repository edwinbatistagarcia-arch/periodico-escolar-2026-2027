(function () {
  // Visor de fotos: toca una foto de la noticia para verla en grande
  var photos = Array.prototype.slice.call(document.querySelectorAll(".gallery img"));
  var cover = document.querySelector(".article-cover");
  if (photos.length || cover) {
    var srcs = photos.map(function (img) { return img.getAttribute("src"); });
    if (cover && srcs.indexOf(cover.getAttribute("src")) === -1) srcs.unshift(cover.getAttribute("src"));
    var box, view, count, current = 0, startX = null;

    function show(i) {
      current = (i + srcs.length) % srcs.length;
      view.src = srcs[current];
      count.textContent = (current + 1) + " / " + srcs.length;
    }
    function close() { box.hidden = true; document.body.style.overflow = ""; }
    function open(src) {
      if (!box) {
        box = document.createElement("div");
        box.className = "lightbox";
        box.innerHTML =
          '<img alt="">' +
          '<button class="lb-close" aria-label="Cerrar">&times;</button>' +
          '<button class="lb-prev" aria-label="Anterior">&#8249;</button>' +
          '<button class="lb-next" aria-label="Siguiente">&#8250;</button>' +
          '<div class="lb-count"></div>';
        document.body.appendChild(box);
        view = box.querySelector("img");
        count = box.querySelector(".lb-count");
        box.querySelector(".lb-close").onclick = close;
        box.querySelector(".lb-prev").onclick = function (e) { e.stopPropagation(); show(current - 1); };
        box.querySelector(".lb-next").onclick = function (e) { e.stopPropagation(); show(current + 1); };
        box.addEventListener("click", function (e) { if (e.target === box) close(); });
        box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
        box.addEventListener("touchend", function (e) {
          if (startX === null) return;
          var dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
          startX = null;
        });
        document.addEventListener("keydown", function (e) {
          if (box.hidden) return;
          if (e.key === "Escape") close();
          if (e.key === "ArrowRight") show(current + 1);
          if (e.key === "ArrowLeft") show(current - 1);
        });
      }
      box.hidden = false;
      document.body.style.overflow = "hidden";
      var single = srcs.length < 2;
      box.querySelector(".lb-prev").hidden = single;
      box.querySelector(".lb-next").hidden = single;
      show(Math.max(0, srcs.indexOf(src)));
    }
    photos.concat(cover ? [cover] : []).forEach(function (img) {
      img.addEventListener("click", function () { open(img.getAttribute("src")); });
    });
  }

  // Menú: marca la sección que se está leyendo en la portada
  var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = byId[en.target.id];
        if (!a) return;
        links.forEach(function (l) { l.classList.remove("active"); });
        a.classList.add("active");
        var ul = a.closest("ul");
        if (ul.scrollWidth > ul.clientWidth) ul.scrollLeft = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2;
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
})();

// Portada automática: la noticia más reciente arriba y las dos siguientes debajo.
// Para publicar una noticia nueva basta con añadir su tarjeta (con data-date="AAAA-MM-DD") en su sección.
(function () {
  var portada = document.getElementById("portada");
  if (!portada) return;
  var nombres = { noticias: "Noticias", academico: "Académico", deportes: "Deportes", cultura: "Cultura", voz: "Voz Estudiantil" };
  var meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var cards = Array.prototype.slice.call(document.querySelectorAll("section:not(#portada) a.card-link[data-date]"));
  if (!cards.length) return;
  cards.sort(function (a, b) { return a.dataset.date < b.dataset.date ? 1 : a.dataset.date > b.dataset.date ? -1 : 0; });
  function info(a) {
    var p = a.dataset.date.split("-"), sec = a.closest("section");
    var img = a.querySelector("img"), cat = a.querySelector(".cat");
    return {
      href: a.getAttribute("href"), img: img.getAttribute("src"), alt: img.getAttribute("alt"),
      title: a.querySelector("h3").textContent, text: a.querySelector("p").textContent,
      cat: cat ? cat.textContent : "", sec: nombres[sec && sec.id] || "Noticias",
      corta: (+p[2]) + " de " + meses[+p[1] - 1], larga: (+p[2]) + " de " + meses[+p[1] - 1] + " de " + p[0],
      byline: a.dataset.byline || "Por la Redacción Estudiantil"
    };
  }
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML.replace(/"/g, "&quot;"); }
  var h = info(cards[0]);
  var html =
    '<a href="' + esc(h.href) + '" class="hero-link"><div class="hero"><div>' +
    '<span class="kicker">Lo más reciente · ' + esc(h.cat || h.sec) + '</span>' +
    '<h2>' + esc(h.title) + '</h2>' +
    '<p class="byline">' + esc(h.byline) + ' · ' + esc(h.larga) + '</p>' +
    '<p class="dropcap">' + esc(h.text) + '</p></div>' +
    '<div class="hero-img" style="padding:0;overflow:hidden;"><img src="' + esc(h.img) + '" alt="' + esc(h.alt) +
    '" style="width:100%;height:100%;object-fit:cover;display:block;"></div></div></a>';
  var sec = cards.slice(1, 3).map(function (a) {
    var c = info(a);
    return '<a href="' + esc(c.href) + '" class="card-link"><article class="card">' +
      '<img src="' + esc(c.img) + '" alt="' + esc(c.alt) + '" class="card-img">' +
      '<span class="cat">' + esc(c.sec) + ' · ' + esc(c.corta) + '</span>' +
      '<h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></article></a>';
  }).join("");
  if (sec) html += '<div class="grid portada-sec">' + sec + '</div>';
  portada.innerHTML = html;
})();
