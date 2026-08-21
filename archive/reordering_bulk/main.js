import { defineCustomElements } from '@meridian/web/dist/esm/loader.js';
import '@meridian/core/css/slim-reset.css';
import '@meridian/core/css/variables.css';
import '@meridian/core/css/font.css';

defineCustomElements(window);

/* ── Data ── */
const PACKSHOT_COLORS = [
  { bg: '#dbeafe', fg: '#1e40af' },
  { bg: '#dcfce7', fg: '#166534' },
  { bg: '#fce7f3', fg: '#9d174d' },
  { bg: '#fef3c7', fg: '#92400e' },
  { bg: '#e0e7ff', fg: '#3730a3' },
  { bg: '#f3e8ff', fg: '#6b21a8' },
  { bg: '#fee2e2', fg: '#991b1b' },
  { bg: '#d1fae5', fg: '#065f46' },
];

let items = [
  { id: 1, name: 'Always Radiant FlexFoam Pads with Wings Overnight', upc: '0003700081811', qty: '--', price: '$6.49' },
  { id: 2, name: 'Always InFinity FlexFoam Pads With Wings Heavy', upc: '0003700011714', qty: '16 ct', price: '$6.49' },
  { id: 3, name: 'Always Maxi Feminine Pads without Wings for W...', upc: '0003077203369', qty: '--', price: '$5.79' },
  { id: 4, name: 'Always Ultra Thin Feminine Pads with Wings Extra', upc: '0003700089908', qty: '--', price: '$9.99' },
  { id: 5, name: 'Always Discreet Adult Incontinence Liners for Women', upc: '0003700088634', qty: '--', price: '$7.49' },
  { id: 6, name: 'Always Discreet Adult Incontinence Underwear', upc: '0003700088736', qty: '19 ct', price: '$17.99' },
  { id: 7, name: 'Always Discreet Boutique Incontinence & Postpartum', upc: '0003700072795', qty: '--', price: '$17.99' },
  { id: 8, name: 'Always Pure Cotton FlexFoam Pads with Wings', upc: '0003700087977', qty: '28 ct', price: '$9.99' },
];

let selectedIds = new Set();
let searchQuery = '';
let dragSrcIndex = null;

/* ── Utilities ── */
function getFilteredItems() {
  if (!searchQuery) return items;
  const q = searchQuery.toLowerCase();
  return items.filter(it => it.name.toLowerCase().includes(q) || it.upc.includes(q));
}

/* ── Render ── */
function render() {
  const tbody = document.getElementById('table-body');
  const filtered = getFilteredItems();
  tbody.innerHTML = '';

  filtered.forEach((item) => {
    const realIndex = items.indexOf(item);
    const color = PACKSHOT_COLORS[realIndex % PACKSHOT_COLORS.length];
    const checked = selectedIds.has(item.id);

    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.dataset.index = realIndex;
    tr.draggable = true;
    tr.className = checked ? 'row-selected' : '';

    tr.innerHTML = `
      <td class="col-checkbox">
        <label class="native-checkbox">
          <input type="checkbox" class="row-cb" data-id="${item.id}" ${checked ? 'checked' : ''} />
          <span class="checkbox-indicator"></span>
        </label>
      </td>
      <td class="col-display-order">
        <div class="order-cell">
          <div class="drag-handle" title="Drag to reorder">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
              <circle cx="2.5" cy="2.5" r="1.5"/>
              <circle cx="7.5" cy="2.5" r="1.5"/>
              <circle cx="2.5" cy="8"   r="1.5"/>
              <circle cx="7.5" cy="8"   r="1.5"/>
              <circle cx="2.5" cy="13.5" r="1.5"/>
              <circle cx="7.5" cy="13.5" r="1.5"/>
            </svg>
          </div>
          <span class="row-number">${realIndex + 1}</span>
        </div>
      </td>
      <td class="col-upc">
        <div class="upc-cell">
          <span class="product-name">${item.name}</span>
          <span class="upc-code">${item.upc}</span>
        </div>
      </td>
      <td class="col-qty"><span class="cell-muted">${item.qty}</span></td>
      <td class="col-price"><span class="cell-muted">${item.price}</span></td>
      <td class="col-packshot">
        <div class="packshot-thumb" style="background:${color.bg}; color:${color.fg};">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      </td>
    `;

    tr.addEventListener('dragstart', onDragStart);
    tr.addEventListener('dragover', onDragOver);
    tr.addEventListener('dragleave', onDragLeave);
    tr.addEventListener('drop', onDrop);
    tr.addEventListener('dragend', onDragEnd);

    tbody.appendChild(tr);
  });

  syncSelectAll();
  syncBulkBar();
}

function syncSelectAll() {
  const sa = document.getElementById('select-all');
  if (!sa) return;
  const visible = getFilteredItems();
  const checkedCount = visible.filter(it => selectedIds.has(it.id)).length;
  sa.checked = checkedCount === visible.length && visible.length > 0;
  sa.indeterminate = checkedCount > 0 && checkedCount < visible.length;
}

function syncBulkBar() {
  const bar = document.getElementById('bulk-bar');
  const countEl = document.getElementById('bulk-count');
  if (!bar) return;
  const n = selectedIds.size;
  if (n > 0) {
    bar.removeAttribute('hidden');
    countEl.textContent = `${n} item${n !== 1 ? 's' : ''} selected`;
  } else {
    bar.setAttribute('hidden', '');
  }
}

/* ── Checkbox wiring ── */
document.addEventListener('change', e => {
  if (e.target.classList.contains('row-cb')) {
    const id = parseInt(e.target.dataset.id);
    if (e.target.checked) selectedIds.add(id); else selectedIds.delete(id);
    render();
  }
  if (e.target.id === 'select-all') {
    getFilteredItems().forEach(it => {
      if (e.target.checked) selectedIds.add(it.id); else selectedIds.delete(it.id);
    });
    render();
  }
});

/* ── Search ── */
document.addEventListener('mdsChange', e => {
  if (e.target.id === 'search-input') {
    searchQuery = e.detail ?? '';
    render();
  }
});

/* ── Clear filters ── */
document.addEventListener('mdsClick', e => {
  if (e.target.id === 'clear-filters-btn') {
    ['filter-subcommodity', 'filter-commodity', 'filter-department'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
});

/* ── Drag & Drop ── */
function onDragStart(e) {
  dragSrcIndex = parseInt(e.currentTarget.dataset.index);
  e.dataTransfer.effectAllowed = 'move';
  requestAnimationFrame(() => e.currentTarget.classList.add('row-dragging'));
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  clearDragOver();
  e.currentTarget.classList.add('row-drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('row-drag-over');
}

function onDrop(e) {
  e.preventDefault();
  const targetIndex = parseInt(e.currentTarget.dataset.index);
  if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
    const [moved] = items.splice(dragSrcIndex, 1);
    items.splice(targetIndex, 0, moved);
    render();
  }
}

function onDragEnd(e) {
  e.currentTarget.classList.remove('row-dragging');
  clearDragOver();
  dragSrcIndex = null;
}

function clearDragOver() {
  document.querySelectorAll('#table-body tr').forEach(tr =>
    tr.classList.remove('row-drag-over')
  );
}

/* ── Init ── */
render();
