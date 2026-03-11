/* ── HYTORC Colombia — Contact Form ── */
(function () {
    'use strict';

    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    if (!form) return;

    function validate(field) {
        const group = field.closest('.form-group');
        if (!group) return true;
        const msg = group.querySelector('.form-error-msg');
        let valid = true;
        let errText = 'Este campo es requerido';

        if (!field.value.trim()) {
            valid = false;
        } else if (field.type === 'email') {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(field.value)) { valid = false; errText = 'Ingresa un correo válido'; }
        } else if (field.type === 'tel') {
            if (field.value.replace(/\D/g, '').length < 7) { valid = false; errText = 'Ingresa un teléfono válido'; }
        }

        if (!valid) {
            group.classList.add('error');
            if (msg) msg.textContent = errText;
        } else {
            group.classList.remove('error');
        }
        return valid;
    }

    /* Real-time validation on blur */
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => validate(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) validate(field);
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let allValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!validate(field)) allValid = false;
        });

        if (!allValid) return;

        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.textContent = 'Enviando…';
        submitBtn.disabled = true;

        /* Simulate sending (replace with real endpoint if needed) */
        setTimeout(() => {
            form.reset();
            form.style.display = 'none';
            if (successMsg) successMsg.style.display = 'block';
        }, 1400);
    });

})();
