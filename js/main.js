document.addEventListener('DOMContentLoaded', function () {
    
    /* Live Date and Time Display (index.html) */
    const liveDateTimeElement = document.getElementById('liveDateTime');
    if (liveDateTimeElement) {
        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            liveDateTimeElement.textContent = now.toLocaleDateString('ru-RU', options);
        }
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    /* Background Color Changer using Math.random (index.html) */
    const bgColorToggleBtn = document.getElementById('bgColorToggleBtn');
    if (bgColorToggleBtn) {
        const themeColors = ['#0c0617', '#120826', '#1a0b36', '#240d4a', '#10041f'];
        bgColorToggleBtn.addEventListener('click', function () {
            const randomIndex = Math.floor(Math.random() * themeColors.length);
            document.body.style.backgroundColor = themeColors[randomIndex];
        });
    }

    /* Popup Modal Form Handling (pricing.html) */
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const subscriptionPopupOverlay = document.getElementById('subscriptionPopupOverlay');
    const popupContactForm = document.getElementById('popupContactForm');

    if (openPopupBtn && subscriptionPopupOverlay) {
        openPopupBtn.addEventListener('click', function () {
            subscriptionPopupOverlay.style.display = 'flex';
        });
    }

    if (closePopupBtn && subscriptionPopupOverlay) {
        closePopupBtn.addEventListener('click', function () {
            subscriptionPopupOverlay.style.display = 'none';
        });
    }

    if (subscriptionPopupOverlay) {
        subscriptionPopupOverlay.addEventListener('click', function (event) {
            if (event.target === subscriptionPopupOverlay) {
                subscriptionPopupOverlay.style.display = 'none';
            }
        });
    }

    if (popupContactForm) {
        popupContactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const clientName = document.getElementById('clientName').value.trim();
            alert(`Спасибо, ${clientName}! Ваша заявка на консультацию принята. Мы свяжемся с вами.`);
            popupContactForm.reset();
            subscriptionPopupOverlay.style.display = 'none';
        });
    }

    /* TASK 2: Custom JavaScript Accordion for FAQs and Content Sections */
    const accordionHeaders = document.querySelectorAll('.custom-accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            this.classList.toggle('active');

            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
            } else {
                // Добавляем запас в 30px для правильного отображения отступов текста
                content.style.maxHeight = (content.scrollHeight + 30) + 'px';
                content.style.opacity = '1';
            }
        });
    });

    /* Form Validation & Submission (profile.html) */
    const form = document.getElementById('bookingForm');
    const result = document.getElementById('form-result');

    if (form && result) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.classList.add('was-validated');
            if (!form.checkValidity()) return;

            const name = document.getElementById('username').value.trim();
            const branch = document.getElementById('branch');
            const branchName = branch.options[branch.selectedIndex].text;

            result.innerHTML =
                '<div class="alert alert-success border-secondary bg-dark text-light" role="alert">' +
                'Спасибо, ' + name + '! Заявка в филиал ' + branchName + ' успешно отправлена.' +
                '</div>';
            form.reset();
            form.classList.remove('was-validated');
        });

        form.addEventListener('reset', function () {
            result.innerHTML = '';
            form.classList.remove('was-validated');
        });
    }
}); 