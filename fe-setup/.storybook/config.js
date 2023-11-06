// Import our util Javascript
import "../src/utilities/index";

// Import our base SASS config
import "../src/sass/index.scss";

// Storybook only styling
import "./style.css";

const storiesRequiringJS = ['accordion', 'tabs', 'alerts', 'modals', 'sliders'];

// Super hacking reloading of pages that require JS to run on init
window.addEventListener('message', ({ data }) => {
    const info = data ? JSON.parse(data) : {};
    const story = info?.event?.args[0]?.storyId || '--';

    const reload = storiesRequiringJS.filter(s => story.split('--').find(p => p === s)).length

    if (info?.event?.type === 'setCurrentStory' && reload) {
        setTimeout(() => window.location.reload(), 100);
    }
});
