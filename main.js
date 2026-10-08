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
