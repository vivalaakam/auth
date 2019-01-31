/**
 * Created by vivalaakam on 31.01.2019.
 *
 * @flow
 */
if (window.opener) {
  var info = document.querySelector('pre')
  window.opener.postMessage(JSON.parse(info.innerText), '*')
} else {
  window.close()
}
