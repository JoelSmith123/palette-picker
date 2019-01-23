const header = document.querySelector('.header')
const savedPaletteContainer = document.querySelector('.saved-palette-container')
const selectSavedBtnContainer = document.querySelector('.select-saved-btn-container')
const selectSavedBtn = document.querySelector('.select-saved-btn')

selectSavedBtn.addEventListener('click', function (event) {
  event.preventDefault()

  header.classList.toggle('header-hide')
  header.classList.toggle('header-view')

  savedPaletteContainer.classList.toggle('saved-palette-container-hide')
  savedPaletteContainer.classList.toggle('saved-palette-container-view')

  selectSavedBtnContainer.classList.toggle('select-saved-btn-container-hide')
  selectSavedBtnContainer.classList.toggle('select-saved-btn-container-view')

  selectSavedBtn.classList.toggle('select-saved-btn-hide')
  selectSavedBtn.classList.toggle('select-saved-btn-view')
})