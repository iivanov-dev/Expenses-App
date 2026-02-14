const modalNode = document.querySelector('.js-modal');
const modalCloseNodes = document.querySelectorAll('.js-modal-close');
const limitModalInput = document.querySelector('.js-limit-input');
const limitModalSaveButton = document.querySelector('.js-limit-save');

export function openLimitModal(currentLimit) {
  limitModalInput.value = currentLimit ?? '';
  modalNode.classList.add('is-open');
  limitModalInput.focus();
}

export function closeLimitModal() {
  modalNode.classList.remove('is-open');
}

export function onLimitSave(handler) {
  const handleSave = () => {
    const newLimitValue = parseInt(limitModalInput.value, 10);
    handler(newLimitValue, limitModalInput);
  };


  limitModalSaveButton.addEventListener('click', handleSave);


  limitModalInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  });
}


modalCloseNodes.forEach((node) => {
  node.addEventListener('click', () => {
    closeLimitModal();
  });
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLimitModal();
  }
});
