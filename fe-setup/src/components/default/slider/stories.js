import { withA11y } from '@storybook/addon-a11y';

import basic from './examples/basic.html';
import card from './examples/card.html';

export default {
    title: 'Sliders',
    decorators: [withA11y],
};

export const Basic = () => basic;
export const Card = () => card;

setTimeout(() => import('./index.js'), 100);
