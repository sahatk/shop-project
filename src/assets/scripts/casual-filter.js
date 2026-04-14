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
    const $applyBtnMobile = document.getElementById('btn-apply-filter-mobile');
    const $filterTriggerMobile = document.querySelector('.btn-filter-mobile');
    const $filterModal = document.getElementById('modal-filter');
    
    // Initialize Modal
    let modal;
    if ($filterModal) {
      if ($filterModal.ui) {
        modal = $filterModal.ui;
      } else if (etUI.components.Modal) {
        modal = etUI.components.Modal();
        modal.core.init($filterModal, { type: 'bottom' });
      }
    }

    // Mobile Trigger
    if ($filterTriggerMobile && modal) {
      $filterTriggerMobile.addEventListener('click', () => {
        modal.open();
      });
    }

    const applyFilter = (isMobile = false) => {
      const containerSelector = isMobile ? '#modal-filter' : '.filter-sidebar';
      const $container = document.querySelector(containerSelector);
      
      if (!$container) return;

      const $rangeSlider = $container.querySelector('.component-range-slider');
      const $colorSelector = $container.querySelector('.color-list.component-selector');
      const $sizeSelector = $container.querySelector('.size-list.component-selector');

      const filterState = {
        price: getPriceRange($rangeSlider),
        colors: getSelectedColors($colorSelector),
        sizes: getSelectedSizes($sizeSelector)
      };

      console.log('Applying Filters:', filterState);
      
      // Visual feedback
      alert(`Filters Applied (${isMobile ? 'Mobile' : 'Desktop'})!\nPrice: ${filterState.price.min} - ${filterState.price.max}\nColors: ${filterState.colors.join(', ')}\nSizes: ${filterState.sizes.join(', ')}`);
      
      if (isMobile && modal) {
        modal.close();
      }
    };

    if ($applyBtn) {
      $applyBtn.addEventListener('click', () => applyFilter(false));
    }

    if ($applyBtnMobile) {
      $applyBtnMobile.addEventListener('click', () => applyFilter(true));
    }
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
