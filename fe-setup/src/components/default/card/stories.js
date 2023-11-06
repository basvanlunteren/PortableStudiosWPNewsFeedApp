import { withA11y } from '@storybook/addon-a11y';

import './index';
import grid from './examples/grid.html';
import list from './examples/list.html';

export default {
    title: 'Cards',
    decorators: [withA11y],
};

export const Grid = () => grid;
export const List = () => list;
