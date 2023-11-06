import './_tabs.scss';

const tabs = document.querySelectorAll('.tab__link');

tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();

        const link = e.target;
        const group = link.closest('.tabs');

        // Update active link
        const links = group.querySelectorAll('.tab__link');
        links.forEach((item) => {
            item.classList.remove('tab__link--active');
            item.setAttribute('aria-selected', false);
        });
        link.classList.add('tab__link--active');
        link.setAttribute('aria-selected', true);

        // Update visible content
        const contents = group.querySelectorAll('.tab__content');
        contents.forEach((c) => c.classList.remove('tab__content--visible'));
        group.querySelector(`#${e.target.getAttribute('aria-controls')}`).classList.add('tab__content--visible');
    });
});
