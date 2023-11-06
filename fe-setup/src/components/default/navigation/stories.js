import { withA11y } from '@storybook/addon-a11y';

import './index';
import menu from './examples/menu.html';
import breadcrumb from './examples/breadcrumb.html';
import pagination from './examples/pagination.html';
import pager from './examples/pager.html';
import progress from './examples/progress.html';
import tree from './examples/tree.html';

export default {
    title: 'Navigation',
    decorators: [withA11y],
};

export const Menu = () => menu;
export const Breadcrumb = () => breadcrumb;
export const Pagination = () => pagination;
export const Pager = () => pager;
export const Progress = () => progress;
export const Tree = () => tree;
