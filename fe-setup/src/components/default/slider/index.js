import Glide from '@glidejs/glide';
import './_slider.scss';

const sliders = document.querySelectorAll('.slider--basic');

if (sliders.length) {
    sliders.forEach((slider) => new Glide(slider).mount());
}

const sliderCards = document.querySelectorAll('.slider--cards');

if (sliderCards.length) {
    sliderCards.forEach((slider) => {
        let conf = { perView: slider.dataset.cards || 3 };

        if (slider.classList.contains('slider--peek')) {
            conf = {
                ...conf, rewind: false, focusAt: 1, peek: { before: 0, after: 100 },
            };
        }

        new Glide(slider, conf).mount();
    });
}
