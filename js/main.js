document.addEventListener("DOMContentLoaded", () => {
    // URL do Web App do Google Apps Script (vamos preencher na Task 5)
    const GOOGLE_SCRIPT_URL = "";

    // =========================================================================
    // 1. Menu Mobile
    // =========================================================================
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // =========================================================================
    // 2. Acordeão do FAQ
    // =========================================================================
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const answer = button.nextElementSibling;

            button.setAttribute("aria-expanded", String(!isExpanded));
            if (answer) {
                answer.hidden = isExpanded;
            }
        });
    });

    // =========================================================================
    // 3. Máscara simples de WhatsApp
    // =========================================================================
    const whatsappInput = document.getElementById("whatsapp");

    if (whatsappInput) {
        whatsappInput.addEventListener("input", (event) => {
            let digits = event.target.value.replace(/\D/g, "").slice(0, 11);
            if (digits.length > 6) {
                digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
            } else if (digits.length > 2) {
                digits = digits.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            }
            event.target.value = digits;
        });
    }

    // =========================================================================
    // 4. Validação e Envio do Formulário
    // =========================================================================
    const form = document.getElementById("lead-form");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");

    function setStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = "form-status";
        if (type) {
            formStatus.classList.add(`form-status--${type}`);
        }
    }

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Anti-spam (honeypot): se preenchido, ignora silenciosamente
            if (form.website && form.website.value.trim() !== "") {
                form.reset();
                setStatus("Solicitação recebida! Em breve entraremos em contato.", "success");
                return;
            }

            const nome = form.nome.value.trim();
            const whatsapp = form.whatsapp.value.trim();
            const email = form.email.value.trim();
            const lgpd = form.lgpd.checked;

            if (!nome || whatsapp.replace(/\D/g, "").length < 10 || !email.includes("@")) {
                setStatus("Por favor, preencha nome, WhatsApp e um e-mail válido.", "error");
                return;
            }

            if (!lgpd) {
                setStatus("Você precisa concordar com a Política de Privacidade.", "error");
                return;
            }

            // Modo de teste enquanto o Google Apps Script ainda não foi conectado
            if (!GOOGLE_SCRIPT_URL) {
                setStatus("Formulário validado! (Conecte o Google Sheets na Task 5 para salvar).", "success");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";
            setStatus("Enviando seus dados...", "");

            try {
                const payload = new FormData(form);
                payload.delete("website");

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    body: payload,
                    mode: "no-cors",
                });

                form.reset();
                setStatus("Solicitação enviada com sucesso! Entrarei em contato em breve.", "success");
            } catch (error) {
                setStatus("Não foi possível enviar agora. Tente novamente em instantes.", "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Solicitar agendamento";
            }
        });
    }
    // =========================================================================
    // 5. Animação suave ao rolar a página (Scroll Reveal)
    // =========================================================================
    const revealElements = document.querySelectorAll(
        ".section__header, .card, .step-card, .faq-item, .about__media, .about__content"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((el) => {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }
});