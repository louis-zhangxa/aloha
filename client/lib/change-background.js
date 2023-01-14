export default function changeBackground(hash) {
  const $body = document.querySelector('body');
  if (hash === 'attractiondetail' || hash === 'login' || hash === 'signup') {
    $body.className = 'overlay';
  } else {
    $body.removeAttribute('class');
  }
}
