/**
 * Hot module replacement initializer
 */
if (module.hot) {
    module.hot.accept((err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.error('Cannot apply HMR update.', err);
        }
    });
}
