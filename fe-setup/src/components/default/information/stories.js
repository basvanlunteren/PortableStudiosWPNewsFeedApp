import { withA11y } from '@storybook/addon-a11y';

import accordion from './examples/accordion.html';
import tabs from './examples/tabs.html';
import tooltip from './examples/tooltip.html';

export default {
    title: 'Information',
    decorators: [withA11y],
};

export const Accordion = () => accordion;
export const Tabs = () => tabs;
export const Tooltip = () => tooltip;

// Load JS after HTML has been inserted into the DOM
setTimeout(() => import('./index.js'), 100);
