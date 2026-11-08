/**
 * Handcrafted Furniture Workshop Gallery - Floor Management Portal
 * Vanilla JavaScript Implementation (NFR, a11y & Telemetry Compliant)
 * Ticket: ENG-15994 | Epic: Core Infrastructure Overhaul
 */

(function () {
  'use strict';

  // --- Initial Workshop Furniture Catalog ---
  const INITIAL_FURNITURE = [
    {
      id: 'FURN-101',
      title: 'Monolith Live-Edge Black Walnut Dining Table',
      category: 'Dining Tables',
      timber: 'Solid American Black Walnut',
      artisan: 'Master Joiner Tobias Vance',
      dimensions: '96"L x 42"W x 30"H',
      leadTimeDays: 28,
      leadTimeText: '4-5 Weeks (Made to Order)',
      price: 4850,
      formattedPrice: '$4,850',
      finish: 'Organic Hand-Rubbed Tung Oil',
      status: 'Showroom Ready',
      statusClass: 'status-in-stock',
      icon: '🪵',
      description: 'Bookmatched live-edge slabs connected with hand-carved butterfly key Dutch dovetails and architectural ebonized trestle joinery.'
    },
    {
      id: 'FURN-102',
      title: 'Kanso Traditional Mortise & Tenon Low Bench',
      category: 'Seating & Benches',
      timber: 'Quarter-Sawn White Oak',
      artisan: 'Kaito Mori & Atelier',
      dimensions: '60"L x 16"W x 18"H',
      leadTimeDays: 0,
      leadTimeText: 'In Stock (Ready to Ship)',
      price: 1420,
      formattedPrice: '$1,420',
      finish: 'Fumed Patina & Beeswax Seal',
      status: '3 Pieces in Stock',
      statusClass: 'status-in-stock',
      icon: '🪑',
      description: 'Pure Japanese-inspired post-and-beam construction built without nails or screws. Features chamfered corners and micro-textured edge profiles.'
    },
    {
      id: 'FURN-103',
      title: 'Brutalist Architectural Fluted Credenza',
      category: 'Credenzas & Storage',
      timber: 'Ebonized Hard Ash & Solid Brass',
      artisan: 'Elena Rostova',
      dimensions: '72"L x 20"D x 34"H',
      leadTimeDays: 35,
      leadTimeText: '5 Weeks (Custom Commission)',
      price: 5200,
      formattedPrice: '$5,200',
      finish: 'Matte Charcoal Patina',
      status: 'Custom Commission Only',
      statusClass: 'status-commission',
      icon: '🏛️',
      description: 'Fluted ash tambour doors concealing soft-close English sycamore interior drawers and adjustable audio-visual cable port routing.'
    },
    {
      id: 'FURN-104',
      title: 'Sculptural Curved Cantilever Lounge Chair',
      category: 'Seating & Benches',
      timber: 'Steam-Bent Walnut & Saddle Leather',
      artisan: 'Marcus Lindqvist',
      dimensions: '32"W x 34"D x 29"H',
      leadTimeDays: 0,
      leadTimeText: 'In Stock (Floor Model)',
      price: 2150,
      formattedPrice: '$2,150',
      finish: 'Organic Danish Oil',
      status: '1 Floor Model Left',
      statusClass: 'status-in-stock',
      icon: '🛋️',
      description: 'Engineered multi-ply steam-bent frame holding full-grain vegetable-tanned saddle leather straps with hand-stitched wax threading.'
    },
    {
      id: 'FURN-105',
      title: 'Chevron Parquetry Minimalist Executive Desk',
      category: 'Desks & Workspaces',
      timber: 'Reclaimed Hard Rock Maple',
      artisan: 'Tobias Vance Studio',
      dimensions: '68"L x 32"W x 30"H',
      leadTimeDays: 21,
      leadTimeText: '3 Weeks (Batch Production)',
      price: 3650,
      formattedPrice: '$3,650',
      finish: 'Zero-VOC Satin Hardwax',
      status: 'Batch Production',
      statusClass: 'status-made-to-order',
      icon: '📐',
      description: 'Hand-cut chevron parquetry tabletop with integrated hidden magnetic wireless charging pad and precision brass power conduit.'
    },
    {
      id: 'FURN-106',
      title: 'Floating Asymmetrical Sculptural Coffee Table',
      category: 'Accent & Coffee Tables',
      timber: 'Spalted Beech & Smoked Tempered Glass',
      artisan: 'Maya Lin Atelier',
      dimensions: '50"L x 28"W x 16"H',
      leadTimeDays: 0,
      leadTimeText: 'In Stock (Showroom Gallery)',
      price: 1880,
      formattedPrice: '$1,880',
      finish: 'Hand-Planed Water-Resistant Seal',
      status: 'Available in Showroom',
      statusClass: 'status-in-stock',
      icon: '☕',
      description: 'Continuous carved beech leg root base that penetrates a 12mm smoked grey low-iron tempered glass surface with polished pencil bevel.'
    },
    {
      id: 'FURN-107',
      title: 'Half-Blind Dovetail Sideboard & Record Console',
      category: 'Credenzas & Storage',
      timber: 'Figured American Black Cherry',
      artisan: 'Tobias Vance',
      dimensions: '64"L x 18"D x 30"H',
      leadTimeDays: 42,
      leadTimeText: '6 Weeks (Custom Commission)',
      price: 4400,
      formattedPrice: '$4,400',
      finish: 'Organic Linseed & Carnauba Wax',
      status: 'Commission Waitlist',
      statusClass: 'status-commission',
      icon: '📻',
      description: 'Classic half-blind dovetail carcase with bookmatched vertical grain sliding bypass doors engineered specifically for LP vinyl and audio amplifiers.'
    },
    {
      id: 'FURN-108',
      title: 'Continuous Spindle Windsor High-Back Chair',
      category: 'Seating & Benches',
      timber: 'Appalachian White Oak & Hickory',
      artisan: 'Liam O’Connor',
      dimensions: '26"W x 28"D x 38"H',
      leadTimeDays: 7,
      leadTimeText: '1 Week (Limited Run)',
      price: 1650,
      formattedPrice: '$1,650',
      finish: 'Traditional Burnished Amber Oil',
      status: '2 Ready in Workshop',
      statusClass: 'status-in-stock',
      icon: '🪑',
      description: 'Hand-adzed pine saddle seat with 16 steam-bent hickory spindles and wedged cylindrical tenons for lifetime durability.'
    }
  ];

  // --- State Store ---
  let furnitureState = [...INITIAL_FURNITURE];
  let activeCategory = 'ALL';
  let searchQuery = '';
  let activeSort = 'featured';
  let selectedPieceForQuote = null;

  // --- DOM Element References ---
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const pillBtns = document.querySelectorAll('.pill-btn');
  const furnitureGrid = document.getElementById('furniture-grid');
  const emptyState = document.getElementById('empty-state');
  const loadingSpinner = document.getElementById('loading-spinner');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const simSlowBtn = document.getElementById('sim-slow-btn');
  const pieceCountBadge = document.getElementById('piece-count-badge');
  const activeFilterIndicator = document.getElementById('active-filter-indicator');

  // Custom Accessible Select References
  const customSelectContainer = document.getElementById('custom-category-select');
  const categorySelectTrigger = document.getElementById('category-select-trigger');
  const categoryDropdownList = document.getElementById('category-dropdown-list');
  const selectedCategoryText = document.getElementById('selected-category-text');
  const customOptions = document.querySelectorAll('.custom-option');
  const categorySelect = document.getElementById('category-select');

  // Modal References
  const quoteModal = document.getElementById('quote-modal');
  const quoteForm = document.getElementById('quote-form');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const pieceSummaryBox = document.getElementById('piece-summary-box');
  const formErrorAlert = document.getElementById('form-error-alert');
  const toastContainer = document.getElementById('toast-container');

  // Form Field References
  const clientNameInput = document.getElementById('client-name');
  const clientEmailInput = document.getElementById('client-email');
  const clientPhoneInput = document.getElementById('client-phone');
  const customTimberSelect = document.getElementById('custom-timber');
  const budgetEstimateInput = document.getElementById('budget-estimate');
  const customNotesInput = document.getElementById('custom-notes');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const budgetError = document.getElementById('budget-error');

  // --- Telemetry Simulation Logger (NFR Requirement) ---
  function logTelemetry(actionName, details = {}) {
    const timestamp = new Date().toISOString();
    console.log(
      `%c[Analytics] User interacted with Handcrafted Furniture Workshop Gallery | Action: ${actionName} | Timestamp: ${timestamp}`,
      'color: #10b981; font-weight: bold; background: #090d16; padding: 2px 6px; border-radius: 4px;',
      details
    );
  }

  // --- XSS Security Sanitizer (NFR Requirement) ---
  function sanitizeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- Toast Notification System ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span aria-hidden="true">🪵</span> <span>${sanitizeHTML(message)}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // --- Filter & Sorting Logic ---
  function getFilteredAndSortedPieces() {
    let result = furnitureState.filter(piece => {
      const matchesCategory = activeCategory === 'ALL' || piece.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        piece.title.toLowerCase().includes(q) ||
        piece.timber.toLowerCase().includes(q) ||
        piece.artisan.toLowerCase().includes(q) ||
        piece.description.toLowerCase().includes(q) ||
        piece.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (activeSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'lead-time') {
      result.sort((a, b) => a.leadTimeDays - b.leadTimeDays);
    }

    return result;
  }

  // --- Render Gallery Grid ---
  function renderGallery() {
    const pieces = getFilteredAndSortedPieces();
    pieceCountBadge.textContent = `${pieces.length} Piece${pieces.length === 1 ? '' : 's'}`;
    activeFilterIndicator.innerHTML = `Showing: <strong>${sanitizeHTML(activeCategory === 'ALL' ? 'All Workshop Pieces' : activeCategory)}</strong>`;

    // The Unhappy Path: Handle Empty State
    if (pieces.length === 0) {
      furnitureGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    furnitureGrid.innerHTML = pieces.map(item => `
      <article class="furniture-card" id="card-${item.id}">
        <div class="card-visual-badge">
          <span class="card-status-badge ${item.statusClass}">${sanitizeHTML(item.status)}</span>
          <div class="card-icon" aria-hidden="true">${item.icon}</div>
        </div>

        <div class="card-content">
          <div class="card-meta-row">
            <span class="category-tag">${sanitizeHTML(item.category)}</span>
            <span class="price-tag">${item.formattedPrice}</span>
          </div>

          <h4 class="piece-title">${sanitizeHTML(item.title)}</h4>
          <p class="piece-desc">${sanitizeHTML(item.description)}</p>

          <div class="spec-list">
            <div class="spec-item">
              <span class="spec-label">Timber:</span>
              <span class="spec-value">${sanitizeHTML(item.timber)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Dimensions:</span>
              <span class="spec-value">${sanitizeHTML(item.dimensions)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Artisan:</span>
              <span class="spec-value">${sanitizeHTML(item.artisan)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Lead Time:</span>
              <span class="spec-value">${sanitizeHTML(item.leadTimeText)}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button 
            type="button" 
            class="btn btn-primary quote-trigger-btn" 
            style="width: 100%;"
            data-piece-id="${item.id}"
            aria-label="Request custom workshop quote for ${sanitizeHTML(item.title)}"
          >
            Inquire / Custom Commission
          </button>
        </div>
      </article>
    `).join('');

    // Attach Event Listeners to Commission Quote Buttons
    document.querySelectorAll('.quote-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pieceId = e.currentTarget.getAttribute('data-piece-id');
        openQuoteModal(pieceId);
      });
    });
  }

  // --- Async Connectivity Simulation (Bad Connectivity NFR) ---
  function triggerAsyncUpdate(callback, delayMs = 300) {
    loadingSpinner.classList.remove('hidden');
    furnitureGrid.style.opacity = '0.35';

    setTimeout(() => {
      callback();
      loadingSpinner.classList.add('hidden');
      furnitureGrid.style.opacity = '1';
    }, delayMs);
  }

  // --- Custom Select Dropdown Helpers ---
  function toggleCustomDropdown() {
    const isOpen = customSelectContainer.classList.contains('open');
    if (isOpen) {
      closeCustomDropdown();
    } else {
      customSelectContainer.classList.add('open');
      categoryDropdownList.classList.remove('hidden');
      categorySelectTrigger.setAttribute('aria-expanded', 'true');
    }
  }

  function closeCustomDropdown() {
    customSelectContainer.classList.remove('open');
    categoryDropdownList.classList.add('hidden');
    categorySelectTrigger.setAttribute('aria-expanded', 'false');
  }

  function handleCategoryChange(category) {
    activeCategory = category;
    categorySelect.value = category;

    // Synchronize Custom Select Trigger UI
    const matchingOption = Array.from(customOptions).find(opt => opt.getAttribute('data-value') === category);
    if (matchingOption) {
      selectedCategoryText.textContent = matchingOption.textContent;
    }

    customOptions.forEach(opt => {
      const isMatch = opt.getAttribute('data-value') === category;
      opt.classList.toggle('active', isMatch);
      opt.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    closeCustomDropdown();

    // Synchronize Category Pills
    pillBtns.forEach(btn => {
      const isMatch = btn.getAttribute('data-category') === category;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    logTelemetry('Category Filter Applied', { category });
    triggerAsyncUpdate(renderGallery, 300);
  }

  function handleSearchInput(e) {
    searchQuery = e.target.value;
    logTelemetry('Workshop Catalog Search Performed', { query: searchQuery });
    triggerAsyncUpdate(renderGallery, 250);
  }

  function handleSortChange(e) {
    activeSort = e.target.value;
    logTelemetry('Sort Order Changed', { sort: activeSort });
    triggerAsyncUpdate(renderGallery, 250);
  }

  function resetFilters() {
    searchQuery = '';
    activeCategory = 'ALL';
    activeSort = 'featured';

    searchInput.value = '';
    sortSelect.value = 'featured';
    categorySelect.value = 'ALL';
    selectedCategoryText.textContent = 'All Furniture Categories';

    customOptions.forEach(opt => {
      const isAll = opt.getAttribute('data-value') === 'ALL';
      opt.classList.toggle('active', isAll);
      opt.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    pillBtns.forEach(btn => {
      const isAll = btn.getAttribute('data-category') === 'ALL';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    closeCustomDropdown();
    logTelemetry('Filters and Search Reset to Default', {});
    triggerAsyncUpdate(renderGallery, 350);
  }

  // --- Commission Quote Modal Logic & Validation (The Unhappy Path) ---
  function openQuoteModal(pieceId) {
    const piece = furnitureState.find(p => p.id === pieceId);
    if (!piece) return;

    selectedPieceForQuote = piece;
    document.getElementById('piece-id-input').value = pieceId;

    pieceSummaryBox.innerHTML = `
      <div class="piece-summary-title">${sanitizeHTML(piece.title)}</div>
      <div class="piece-summary-meta">Category: ${sanitizeHTML(piece.category)} • Base Price: ${piece.formattedPrice}</div>
      <div class="piece-summary-meta">Standard Timber: ${sanitizeHTML(piece.timber)} • Dimensions: ${sanitizeHTML(piece.dimensions)}</div>
      <div class="piece-summary-meta">Artisan: ${sanitizeHTML(piece.artisan)} • Lead Time: ${sanitizeHTML(piece.leadTimeText)}</div>
    `;

    clearFormErrors();
    quoteForm.reset();
    budgetEstimateInput.value = piece.price;

    quoteModal.classList.remove('hidden');
    clientNameInput.focus();

    logTelemetry('Commission Quote Modal Opened', { pieceId: piece.id, title: piece.title });
  }

  function closeQuoteModal() {
    quoteModal.classList.add('hidden');
    selectedPieceForQuote = null;
    clearFormErrors();
    logTelemetry('Commission Quote Modal Dismissed', {});
  }

  function clearFormErrors() {
    formErrorAlert.classList.add('hidden');
    [clientNameInput, clientEmailInput, clientPhoneInput, budgetEstimateInput].forEach(input => {
      input.classList.remove('invalid');
    });
    [nameError, emailError, phoneError, budgetError].forEach(err => {
      err.classList.add('hidden');
    });
  }

  // --- Form Validation (Invalid Inputs NFR Requirement) ---
  function handleQuoteSubmit(e) {
    e.preventDefault();
    clearFormErrors();

    let isValid = true;
    const nameVal = clientNameInput.value.trim();
    const emailVal = clientEmailInput.value.trim();
    const phoneVal = clientPhoneInput.value.trim();
    const budgetVal = parseFloat(budgetEstimateInput.value);
    const customTimberVal = customTimberSelect.value;
    const customNotesVal = customNotesInput.value;

    // Validate Name (min 2 characters)
    if (!nameVal || nameVal.length < 2) {
      clientNameInput.classList.add('invalid');
      nameError.classList.remove('hidden');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      clientEmailInput.classList.add('invalid');
      emailError.classList.remove('hidden');
      isValid = false;
    }

    // Validate Phone (digits >= 7)
    const phoneDigits = phoneVal.replace(/\D/g, '');
    if (!phoneVal || phoneDigits.length < 7) {
      clientPhoneInput.classList.add('invalid');
      phoneError.classList.remove('hidden');
      isValid = false;
    }

    // Validate Budget ($500 - $100,000)
    if (isNaN(budgetVal) || budgetVal < 500 || budgetVal > 100000) {
      budgetEstimateInput.classList.add('invalid');
      budgetError.classList.remove('hidden');
      isValid = false;
    }

    // If invalid, stop submission and reveal error alert
    if (!isValid) {
      formErrorAlert.classList.remove('hidden');
      logTelemetry('Commission Form Validation Rejected', {
        nameValid: nameVal.length >= 2,
        emailValid: emailRegex.test(emailVal),
        phoneValid: phoneDigits.length >= 7,
        budgetValid: !isNaN(budgetVal) && budgetVal >= 500 && budgetVal <= 100000
      });
      return;
    }

    // Sanitize user inputs against XSS before storage/logging
    const sanitizedName = sanitizeHTML(nameVal);
    const sanitizedEmail = sanitizeHTML(emailVal);
    const sanitizedNotes = sanitizeHTML(customNotesVal);

    closeQuoteModal();

    showToast(`Inquiry received for "${sanitizeHTML(selectedPieceForQuote ? selectedPieceForQuote.title : 'Custom Piece')}". Dispatch confirmation sent to ${sanitizedEmail}.`);

    logTelemetry('Commission Quote Inquiry Confirmed & Dispatched', {
      pieceId: selectedPieceForQuote ? selectedPieceForQuote.id : 'N/A',
      clientName: sanitizedName,
      clientEmail: sanitizedEmail,
      budget: budgetVal,
      timberChoice: customTimberVal,
      notesLength: sanitizedNotes.length
    });
  }

  // --- Initialize Application Listeners ---
  function init() {
    // Search, Filter & Sort Events
    searchInput.addEventListener('input', handleSearchInput);
    sortSelect.addEventListener('change', handleSortChange);

    // Custom Select Component Events
    if (categorySelectTrigger && categoryDropdownList) {
      categorySelectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCustomDropdown();
      });

      customOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = opt.getAttribute('data-value');
          handleCategoryChange(val);
        });

        opt.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            const val = opt.getAttribute('data-value');
            handleCategoryChange(val);
          }
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (customSelectContainer && !customSelectContainer.contains(e.target)) {
          closeCustomDropdown();
        }
      });
    }

    // Quick Category Pills
    pillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        handleCategoryChange(cat);
      });
    });

    // Reset Filters Action
    resetFiltersBtn.addEventListener('click', resetFilters);

    // 3G Latency Simulation Trigger
    simSlowBtn.addEventListener('click', () => {
      logTelemetry('Simulated 3G Slow Connection Triggered', {});
      triggerAsyncUpdate(renderGallery, 1200);
    });

    // Modal Control Events
    closeModalBtn.addEventListener('click', closeQuoteModal);
    cancelModalBtn.addEventListener('click', closeQuoteModal);

    // Keyboard ESC Listener (Modal & Dropdown)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (categoryDropdownList && !categoryDropdownList.classList.contains('hidden')) {
          closeCustomDropdown();
        }
        if (quoteModal && !quoteModal.classList.contains('hidden')) {
          closeQuoteModal();
        }
      }
    });

    // Commission Form Submit
    quoteForm.addEventListener('submit', handleQuoteSubmit);

    // Initial Telemetry & Render
    logTelemetry('Handcrafted Furniture Workshop Gallery Initialized', {
      initialCount: furnitureState.length
    });
    renderGallery();
  }

  // DOM Loaded Trigger
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
