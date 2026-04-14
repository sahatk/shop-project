function useCore(
  initialProps = {},
  initialState = {},
  render,
  options = {
    dataset: true,
  },
) {
  const actions = {};
  let $target;
  const cleanups = [];
  const NO_BUBBLING_EVENTS = ['blur', 'focus', 'focusin', 'focusout', 'pointerleave'];
  const onStateChange = () => {};
  let stateCallback;
  const props = new Proxy(initialProps, {
    set: (target, key, value) => {
      Reflect.set(target, key, value);
      return true;
    },
  });

  const state = new Proxy(initialState, {
    set: (target, key, value) => {
      Reflect.set(target, key, value);
      return true;
    },
  });

  function setTarget(_$target, { stateCallback: _stateCallback } = {}) {
    $target = _$target;
    if (_stateCallback) {
      stateCallback = _stateCallback;
    }

    if (options.dataset) {
      const { getPropsFromDataset, getVarsFromDataset } = etUI.hooks.useDataset($target);
      const datasetProps = getPropsFromDataset();
      const datasetVars = getVarsFromDataset();

      setProps({ ...props, ...datasetProps });
      setState({ ...state, ...datasetVars }, { silent: true, immediate: true });
    }
  }

  function setProps(newProps) {
    Object.keys(newProps).forEach((key) => {
      props[key] = newProps[key];
    });
  }

  function setState(newState, { silent = false, immediate = false } = {}) {
    if (etUI.utils.isDeepEqual(state, newState)) return;

    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
    if (!silent && render !== undefined && render !== null && typeof render === 'function') {
      render(immediate);
    }

    if (options.dataset) {
      const { setVarsFromDataset } = etUI.hooks.useDataset($target);
      setVarsFromDataset(state);
    }

    stateCallback && stateCallback(state);
  }

  function addEvent(eventType, selector, callback) {
    const $eventTarget = selector ? $target.querySelector(selector) : $target;

    if (NO_BUBBLING_EVENTS.includes(eventType)) {
      const cleanup = etUI.hooks.useEventListener($eventTarget, eventType, callback);
      return cleanups.push(cleanup);
    }

    const eventHandler = (event) => {
      let $eventTarget = event.target.closest(selector);

      if (!selector) {
        $eventTarget = event.target;
      }

      if ($eventTarget) {
        callback(event);
      }
    };

    $target.addEventListener(eventType, eventHandler);
    const cleanup = () => $target.removeEventListener(eventType, eventHandler);
    cleanups.push(cleanup);
  }

  function removeEvent() {
    etUI.utils.allCleanups(cleanups);
  }

  return {
    cleanups,
    setTarget,
    actions,
    state,
    props,
    setState,
    setProps,
    addEvent,
    removeEvent,
  };
}
