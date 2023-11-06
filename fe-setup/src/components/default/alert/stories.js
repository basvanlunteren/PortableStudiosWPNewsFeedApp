import { withA11y } from '@storybook/addon-a11y';

import inline from './examples/inline.html';
import banner from './examples/banner.html';

export default {
    title: 'Alerts',
    decorators: [withA11y],
};

export const Inline = () => inline;
export const Banner = () => banner;

// Load JS after HTML has been inserted into the DOM
setTimeout(() => import('./index.js'), 100);
