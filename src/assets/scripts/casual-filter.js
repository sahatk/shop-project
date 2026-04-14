/**
 * casual-filter.js
 * Handles the interaction for the filter sidebar on the Casual category page.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initFilterActions();
  });

  /**
   * Initialize filter interactions
   */
  function initFilterActions() {
    const $applyBtn = document.getElementById('btn-apply-filter');
    const $rangeSlider = document.querySelector('.component-range-slider');
    const $colorSelector = document.querySelector('.color-list.component-selector');
    const $sizeSelector = document.querySelector('.size-list.component-selector');

    if (!$applyBtn) return;

    $applyBtn.addEventListener('click', () => {
      const filterState = {
        price: getPriceRange($rangeSlider),
        colors: getSelectedColors($colorSelector),
        sizes: getSelectedSizes($sizeSelector)
      };

      console.log('Applying Filters:', filterState);
      
      // Visual feedback (Alert for demo purposes)
      alert(`Filters Applied!\nPrice: ${filterState.price.min} - ${filterState.price.max}\nColors: ${filterState.colors.join(', ')}\nSizes: ${filterState.sizes.join(', ')}`);
      
      // Here you would typically trigger an AJAX request to update the product list
      // updateProductList(filterState);
    });
  }

  /**
   * Get values from RangeSlider component
   * @param {HTMLElement} $el 
   */
  function getPriceRange($el) {
    if ($el && $el.ui && $el.ui.core && $el.ui.core.state) {
      const state = $el.ui.core.state;
      return {
        min: state.currentMin,
        max: state.currentMax
      };
    }
    
    // Fallback to DOM if component state is not accessible
    const $values = document.querySelectorAll('.range-values .value');
    if ($values.length >= 2) {
      return {
        min: $values[0].textContent.replace(/[^0-9.-]+/g,""),
        max: $values[1].textContent.replace(/[^0-9.-]+/g,"")
      };
    }

    return { min: 0, max: 0 };
  }

  /**
   * Get selected colors
   * @param {HTMLElement} $el 
   */
  function getSelectedColors($el) {
    if (!$el) return [];
    const $selected = $el.querySelectorAll('.color-btn.is-active');
    return Array.from($selected).map($btn => $btn.getAttribute('aria-label') || 'Unknown');
  }

  /**
   * Get selected sizes
   * @param {HTMLElement} $el 
   */
  function getSelectedSizes($el) {
    if (!$el) return [];
    const $selected = $el.querySelectorAll('.size-btn.is-active');
    return Array.from($selected).map($btn => $btn.textContent.trim());
  }

})();
