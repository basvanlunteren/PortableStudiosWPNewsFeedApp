import { withA11y } from '@storybook/addon-a11y';

import basic from './examples/basic.html';
import scrollable from './examples/scrollable.html';
import signup from './examples/signup.html';

export default {
    title: 'Modals',
    decorators: [withA11y],
};

export const Basic = () => basic;
export const Scrollable = () => scrollable;
export const Signup = () => signup;

// Load JS after HTML has been inserted into the DOM, then trigger the modal
setTimeout(() => import('./index.js').then(() => document.querySelector('[data-modal]').click()), 100);
