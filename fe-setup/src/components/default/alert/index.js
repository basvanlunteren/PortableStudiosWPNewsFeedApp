import './_alert.scss';

const alerts = document.querySelectorAll('.alert');

alerts.forEach((alert) => {
    alert.addEventListener('click', ({ target }) => {
        if (target.classList.contains('alert__close')) {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 250);
        }
    });
});
