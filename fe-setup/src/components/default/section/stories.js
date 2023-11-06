import { withA11y } from '@storybook/addon-a11y';

import './index';
import header from './examples/header.html';
import footer from './examples/footer.html';

export default {
    title: 'Sections',
    decorators: [withA11y],
};

export const Header = () => header;
export const Footer = () => footer;
