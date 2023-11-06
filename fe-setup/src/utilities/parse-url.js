export default function (name, url) {
    let tempUrl = url;
    let tempName = name;
    if (!tempUrl) tempUrl = window.location.href;
    tempName = tempName.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${tempName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(tempUrl);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
