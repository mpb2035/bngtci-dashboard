/**
 * Edit Modal System - Pencil Icon with Modal Popups
 * Allows users to edit content directly from the webpage
 * Uses localStorage to persist edits
 */

// Create and inject modal styles
function initEditModalStyles() {
  if (document.getElementById('edit-modal-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'edit-modal-styles';
  style.textContent = `
    .pencil-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      cursor: pointer;
      margin-left: 8px;
      opacity: 0.6;
      transition: opacity 0.2s ease;
      vertical-align: middle;
    }
    
    .pencil-icon:hover {
      opacity: 1;
    }
    
    .editable-section {
      position: relative;
      display: inline-block;
    }
    
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9998;
    }
    
    .modal-overlay.active {
      display: block;
    }
    
    .edit-modal-dialog {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      min-width: 400px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .edit-modal-dialog.active {
      display: flex;
      flex-direction: column;
    }
    
    .modal-header {
      padding: 20px;
      border-bottom: 1px solid #e1e4e8;
      font-weight: 600;
      font-size: 16px;
      flex-shrink: 0;
    }
    
    .modal-body {
      padding: 20px;
      flex-grow: 1;
      overflow-y: auto;
    }
    
    .modal-body textarea {
      width: 100%;
      min-height: 200px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: sans-serif;
      font-size: 14px;
      resize: vertical;
    }
    
    .modal-body textarea:focus {
      outline: none;
      border-color: #0366d6;
      box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
    }
    
    .modal-footer {
      padding: 15px 20px;
      border-top: 1px solid #e1e4e8;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      flex-shrink: 0;
    }
    
    .modal-button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .modal-button:hover {
      background: #f6f8fa;
      border-color: #bbb;
    }
    
    .modal-button.save {
      background: #28a745;
      color: white;
      border-color: #28a745;
    }
    
    .modal-button.save:hover {
      background: #218838;
      border-color: #218838;
    }
    
    .modal-button.cancel {
      background: #f6f8fa;
      color: #333;
    }
  `;
  
  document.head.appendChild(style);
}

// Create SVG pencil icon
function createPencilIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'pencil-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94m-4.62-4.62L19.93 2.07a2.25 2.25 0 0 1 3.18 3.18L16.37 16.56');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  
  svg.appendChild(path);
  return svg;
}

// Open edit modal for a section
function openEditModal(sectionId, title) {
  let modal = document.getElementById('edit-modal-' + sectionId);
  
  if (!modal) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay-' + sectionId;
    overlay.addEventListener('click', () => closeEditModal(sectionId));
    
    modal = document.createElement('div');
    modal.className = 'edit-modal-dialog';
    modal.id = 'edit-modal-' + sectionId;
    
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = 'Edit ' + title;
    
    const body = document.createElement('div');
    body.className = 'modal-body';
    
    const textarea = document.createElement('textarea');
    textarea.id = 'text-' + sectionId;
    textarea.placeholder = 'Enter your content here...';
    body.appendChild(textarea);
    
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'modal-button save';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => saveEditModal(sectionId));
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'modal-button cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => closeEditModal(sectionId));
    
    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);
    
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }
  
  const textarea = document.getElementById('text-' + sectionId);
  const storageKey = 'edit_' + sectionId;
  const savedContent = localStorage.getItem(storageKey);
  
  if (savedContent) {
    textarea.value = savedContent;
  }
  
  document.getElementById('modal-overlay-' + sectionId).classList.add('active');
  document.getElementById('edit-modal-' + sectionId).classList.add('active');
  
  textarea.focus();
  textarea.select();
}

// Save and close modal
function saveEditModal(sectionId) {
  const textarea = document.getElementById('text-' + sectionId);
  const content = textarea.value;
  const storageKey = 'edit_' + sectionId;
  
  localStorage.setItem(storageKey, content);
  
  const displayElement = document.getElementById('display-' + sectionId);
  if (displayElement) {
    displayElement.textContent = content || '(No content)';
  }
  
  closeEditModal(sectionId);
}

// Close modal without saving
function closeEditModal(sectionId) {
  const overlay = document.getElementById('modal-overlay-' + sectionId);
  const modal = document.getElementById('edit-modal-' + sectionId);
  
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
}

// Add editable section with pencil icon
function makeEditable(elementId, sectionId, displayText) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const displayContainer = document.createElement('span');
  displayContainer.className = 'editable-section';
  
  const display = document.createElement('span');
  display.id = 'display-' + sectionId;
  display.textContent = displayText || '(Click to edit)';
  
  const pencilBtn = document.createElement('button');
  pencilBtn.style.background = 'none';
  pencilBtn.style.border = 'none';
  pencilBtn.style.padding = '0';
  pencilBtn.style.cursor = 'pointer';
  pencilBtn.title = 'Click to edit';
  pencilBtn.appendChild(createPencilIcon());
  pencilBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openEditModal(sectionId, displayText || 'Content');
  });
  
  displayContainer.appendChild(display);
  displayContainer.appendChild(pencilBtn);
  
  element.innerHTML = '';
  element.appendChild(displayContainer);
  
  const storageKey = 'edit_' + sectionId;
  const savedContent = localStorage.getItem(storageKey);
  if (savedContent) {
    display.textContent = savedContent;
  }
}

// Initialize on page load
function initEditModalSystem() {
  initEditModalStyles();
}

// Make functions globally accessible
window.makeEditable = makeEditable;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.saveEditModal = saveEditModal;
window.initEditModalSystem = initEditModalSystem;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEditModalSystem);
} else {
  initEditModalSystem();
}
