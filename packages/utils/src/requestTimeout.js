/**  Copyright 2011, Joe Lambert.
 **  Free to use under the MIT license.
 **  http://www.opensource.org/licenses/mit-license.php
 **/
import requestAnimationFrame, {cancelAnimationFrame} from './requestAnimationFrame'
import perf from './perf'


export function clearRequestTimeout (handle) {
  cancelAnimationFrame
  ? cancelAnimationFrame(handle.value)
  : window.clearTimeout(handle)
}


export default function requestTimeout (fn, delay) {
  if(!requestAnimationFrame) {
    return window.setTimeout(fn, delay)
  }

  let start = perf.now()
  let handle = {}

  function loop() {
    const current = perf.now()
    const delta = current - start

    delta >= delay
      ? fn.call()
      : handle.value = requestAnimationFrame(loop)
  }

  handle.value = requestAnimationFrame(loop)
  return handle
}
