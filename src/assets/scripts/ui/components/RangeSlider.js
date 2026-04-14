/**
 * RangeSlider
 * Handles dual-handle range selection for price filters, etc.
 */
function RangeSlider() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
      min: 0,
      max: 500,
      step: 1,
      unit: '$',
    },
    {
      // state
      currentMin: 0,
      currentMax: 0,
      isDragging: null, // 'min' or 'max'
    },
    render,
  );

  // variable
  const name = 'range-slider';
  let component = {};
  let $target, $track, $range, $handleMin, $handleMax, $valueMin, $valueMax;

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
    setupSelector();
    setupElement();
    
    // Initial state from dataset if provided
    const startMin = parseFloat($target.dataset.startMin) || props.min;
    const startMax = parseFloat($target.dataset.startMax) || props.max;
    
    setState({ 
      currentMin: startMin, 
      currentMax: startMax 
    }, { immediate: true });
  }

  function setupSelector() {
    $track = $target.querySelector('.slider-track');
    $range = $target.querySelector('.slider-range');
    $handleMin = $target.querySelectorAll('.slider-handle')[0];
    $handleMax = $target.querySelectorAll('.slider-handle')[1];
    
    // Associated value displays (usually in .range-values)
    const $rangeValues = $target.nextElementSibling?.classList.contains('range-values') 
      ? $target.nextElementSibling 
      : $target.closest('.filter-group')?.querySelector('.range-values') || 
        $target.closest('.accordion-item')?.querySelector('.range-values');
    
    if ($rangeValues) {
      $valueMin = $rangeValues.querySelectorAll('.value')[0];
      $valueMax = $rangeValues.querySelectorAll('.value')[1];
    }
  }

  function setupElement() {
    // Basic accessibility
    if ($handleMin) $handleMin.setAttribute('role', 'slider');
    if ($handleMax) $handleMax.setAttribute('role', 'slider');
  }

  function setEvent() {
    // Pointer drag logic
    const onPointerMove = (e) => {
      if (!state.isDragging) return;
      
      const rect = $track.getBoundingClientRect();
      let percent = ((e.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      
      const value = Math.round((percent / 100) * (props.max - props.min) + props.min);
      
      if (state.isDragging === 'min') {
        const nextMin = Math.min(value, state.currentMax - props.step);
        setState({ currentMin: nextMin });
      } else if (state.isDragging === 'max') {
        const nextMax = Math.max(value, state.currentMin + props.step);
        setState({ currentMax: nextMax });
      }
    };

    const onPointerUp = () => {
      if (!state.isDragging) return;
      setState({ isDragging: null });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.userSelect = '';
    };

    const onPointerDown = (type) => (e) => {
      setState({ isDragging: type });
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      document.body.style.userSelect = 'none';
    };

    if ($handleMin) $handleMin.addEventListener('pointerdown', onPointerDown('min'));
    if ($handleMax) $handleMax.addEventListener('pointerdown', onPointerDown('max'));
    
    // Window resize to re-render if needed
    window.addEventListener('resize', etUI.utils.debounce(() => render(true), 100));
  }

  function render(immediate = false) {
    if (!$track || !$range || !$handleMin || !$handleMax) return;

    const minPercent = ((state.currentMin - props.min) / (props.max - props.min)) * 100;
    const maxPercent = ((state.currentMax - props.min) / (props.max - props.min)) * 100;

    // Update Handles
    $handleMin.style.left = `${minPercent}%`;
    $handleMax.style.left = `${maxPercent}%`;

    // Update Range Bar
    $range.style.left = `${minPercent}%`;
    $range.style.width = `${maxPercent - minPercent}%`;

    // Update Text Values
    if ($valueMin) $valueMin.textContent = `${props.unit}${state.currentMin}`;
    if ($valueMax) $valueMax.textContent = `${props.unit}${state.currentMax}`;

    // Update Progress bar visual if needed
    $target.style.setProperty('--min-percent', `${minPercent}%`);
    $target.style.setProperty('--max-percent', `${maxPercent}%`);
  }

  function update(_props) {
    setProps({ ...props, ..._props });
    render(true);
  }

  function destroy() {
    removeEvent();
    $target.ui = null;
    $target.removeAttribute('data-init');
  }

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
