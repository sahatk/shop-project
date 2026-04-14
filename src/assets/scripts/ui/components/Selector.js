/**
 * Selector
 * Handles toggling selection states for color grids, size chips, etc.
 */
function Selector() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
      multiSelect: true,
      type: 'default', // 'color', 'size', etc.
      itemSelector: 'button',
      activeClass: 'is-active',
    },
    {
      // state
    },
    render,
  );

  // variable
  const name = 'selector';
  let component = {};
  let $target;

  /**
   * init
   * @param _$target
   * @param _props
   */
  function init(_$target, _props) {
    if (typeof _$target === 'string') {
      $target = document.querySelector(_$target);
    } else {
      $target = _$target;
    }

    if (!$target) {
      throw Error('Target does not exist.');
    }

    setTarget($target);
    setProps({ ...props, ..._props });

    if ($target.ui) return;
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
    // Initial setup if needed
  }

  function setEvent() {
    addEvent('click', props.itemSelector, actions.toggleSelection);
  }

  function setupActions() {
    actions.toggleSelection = (e) => {
      const $item = e.target.closest(props.itemSelector);
      if (!$item) return;

      const isMultiSelect = state.multiSelect !== undefined ? state.multiSelect : props.multiSelect;
      const type = state.type || props.type;
      const isActive = $item.classList.contains(props.activeClass);

      if (isMultiSelect) {
        if (isActive) {
          $item.classList.remove(props.activeClass);
          handleVisuals($item, false, type);
        } else {
          $item.classList.add(props.activeClass);
          handleVisuals($item, true, type);
        }
      } else {
        // Single select logic
        $target.querySelectorAll(`${props.itemSelector}.${props.activeClass}`).forEach($el => {
          $el.classList.remove(props.activeClass);
          handleVisuals($el, false, type);
        });
        $item.classList.add(props.activeClass);
        handleVisuals($item, true, type);
      }
    };
  }

  function handleVisuals($item, isActive, type) {
    if (type === 'color') {
      if (isActive) {
        if (!$item.querySelector('.ico-check')) {
          const $ico = document.createElement('i');
          $ico.className = 'ico-check';
          $item.appendChild($ico);
        }
      } else {
        const $ico = $item.querySelector('.ico-check');
        if ($ico) $ico.remove();
      }
    }
  }

  function render() {
    // State-based rendering if needed
  }

  function update(_props) {
    setProps({ ...props, ..._props });
    render();
  }

  function destroy() {
    removeEvent();
    $target.ui = null;
    $target.removeAttribute('data-init');
  }

  // Pre-bind actions to use props/state correctly
  setupActions();

  component = {
    core: {
      state,
      props,
      init,
      removeEvent,
      destroy,
    },
    update,
  };

  return component;
}
