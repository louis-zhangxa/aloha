export default function changeBackground(hash) {
  const $body = document.querySelector('body');
  if (hash === 'attractiondetail') {
    $body.className = 'overlay';
  } else {
    $body.removeAttribute('class');
  }
}
