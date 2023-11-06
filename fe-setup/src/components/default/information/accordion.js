import './_accordion.scss';

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
    accordion.addEventListener('click', ({ target }) => {
        if (target.classList.contains('accordion__toggle')) {
            const expanded = target.getAttribute('aria-expanded');

            target.setAttribute('aria-expanded', expanded === 'true' ? false : true);
            accordion.classList.toggle('accordion--expanded');
        }
    });
});
