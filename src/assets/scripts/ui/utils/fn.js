function debounce(callback, delay = 250) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

function throttle(callback, delay = 250) {
  let isThrottled = false;
  let args;
  let context;

  function wrapper(...wrapperArgs) {
    if (isThrottled) {
      args = wrapperArgs;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, wrapperArgs);
    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }

  return wrapper;
}

function isMarkerQS() {
  return location.search.includes('marker121212');
}

function triggerEvent(el, eventType) {
  if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
    el[eventType]();
  } else {
    const event = typeof eventType === 'string' ? new Event(eventType, { bubbles: true }) : eventType;
    el.dispatchEvent(event);
  }
}
