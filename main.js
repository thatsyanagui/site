// YANAGUI — pequenos comportamentos compartilhados pelas páginas.

// Estúdio: filtro por função (produção, gravação, mixagem...).
const chips = document.querySelectorAll(".chip[data-filter]");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    document.querySelectorAll(".work[data-roles]").forEach((work) => {
      work.hidden = filter !== "todos" && !work.dataset.roles.split(" ").includes(filter);
    });
  });
});

// Newsletter: ainda não está ligada a nenhum serviço (ex.: Mailchimp, Buttondown).
document.querySelectorAll(".newsletter").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.parentElement.querySelector(".form-msg");
    if (msg) msg.textContent = "Inscrição ainda não está ativa neste rascunho.";
  });
});

// Bio: botão de copiar e-mail.
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copiado";
    } catch {
      const code = btn.parentElement.querySelector("code");
      if (code) window.getSelection().selectAllChildren(code);
      btn.textContent = "Selecionado";
    }
    setTimeout(() => (btn.textContent = "Copiar"), 1800);
  });
});

// Ao vivo: o vídeo do YouTube só carrega quando se carrega no play.
document.querySelectorAll(".yt[data-id]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1&rel=0&start=${btn.dataset.start || 0}`;
    f.title = btn.getAttribute("aria-label");
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    const box = document.createElement("div");
    box.className = "yt";
    box.append(f);
    btn.replaceWith(box);
  }, { once: true });
});

// Live: nos artistas com quem o Gui ainda toca, o ano final é sempre o ano actual.
document.querySelectorAll("[data-this-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// Bio: versão em inglês ou português. Lembra a escolha; sem escolha, segue o idioma do browser.
const bioSwitch = document.querySelectorAll(".lang-switch [data-lang]");
if (bioSwitch.length) {
  const show = (lang) => {
    document.querySelectorAll("[data-bio]").forEach((el) => { el.hidden = el.dataset.bio !== lang; });
    bioSwitch.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  };
  let saved = null;
  try { saved = localStorage.getItem("bio-lang"); } catch {}
  show(saved || ((navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en"));
  bioSwitch.forEach((b) => b.addEventListener("click", () => {
    show(b.dataset.lang);
    try { localStorage.setItem("bio-lang", b.dataset.lang); } catch {}
  }));
}
