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
            this.style.transform = 'scale(1.1)';
            setTimeout(() => this.style.transform = 'scale(1)', 200);
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
                content.style.maxHeight = (content.scrollHeight + 30) + 'px';
                content.style.opacity = '1';
            }
        });
    });

    /* ==========================================
       ASSIGNMENT 5: ADVANCED JS FEATURES
       ========================================== */

    /* 1. Play Sound Effect using Web Audio API */
    function playBeepSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.15);
        } catch (e) {
            console.log('Audio context not supported or blocked', e);
        }
    }

    document.querySelectorAll('.btn-primary, .btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            playBeepSound();
        });
    });

    /* 2. Rating Stars Logic using querySelectorAll & Callbacks (trainers.html) */
    const ratingContainers = document.querySelectorAll('.rating-stars');
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                playBeepSound();
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('selected');
                        s.textContent = '★';
                    } else {
                        s.classList.remove('selected');
                        s.textContent = '☆';
                    }
                });
                const trainerName = container.dataset.trainer || 'тренеру';
                console.log(`Оценка для ${trainerName}: ${index + 1} из 5`);
            });
        });
    });

    /* 3. Switch Statement for Category Filtering */
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                this.classList.add('active-filter');

                const trainerCards = document.querySelectorAll('.trainer-card-col');
                trainerCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    switch (category) {
                        case 'all':
                            card.style.display = 'block';
                            break;
                        case 'strength':
                        case 'yoga':
                        case 'crossfit':
                            if (cardCategory === category) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                            break;
                        default:
                            card.style.display = 'block';
                    }
                });
            });
        });
    }

    /* 4. Arrays, Objects & Higher-Order Functions (forEach, map) */
    const fitnessTips = [
        { title: "Пейте воду", desc: "Выпивайте не менее 2 литров чистой воды во время тренировок." },
        { title: "Разминка обязательна", desc: "Уделяйте 10 минут разминке перед началом работы с весами." },
        { title: "Сон и восстановление", desc: "Мышцы растут во время отдыха, спите не менее 7-8 часов." }
    ];

    const tipsContainer = document.getElementById('dynamicTipsContainer');
    if (tipsContainer) {
        const tipsHTML = fitnessTips.map(tip => `
            <div class="col-md-4 mb-3">
                <div class="p-3 border rounded bg-dark text-light h-100">
                    <h5 class="text-brand">${tip.title}</h5>
                    <p class="small text-body-secondary mb-0">${tip.desc}</p>
                </div>
            </div>
        `).join('');
        tipsContainer.innerHTML = tipsHTML;
    }

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
            playBeepSound();
            form.reset();
            form.classList.remove('was-validated');
        });

        form.addEventListener('reset', function () {
            result.innerHTML = '';
            form.classList.remove('was-validated');
        });
    }
});