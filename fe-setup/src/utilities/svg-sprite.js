// Import all SVGs from so they get smashed by webpack
const requireAll = (r) => r.keys().forEach(r);

requireAll(require.context('../assets/icons/', true, /\.svg$/));

// Load our SVG definitions and append to the document
fetch('./sprite.svg').then((res) => res.text()).then((data) => {
    const container = document.createElement('div');
    container.style.display = 'none';
    document.body.appendChild(container);
    container.innerHTML = data;
});
