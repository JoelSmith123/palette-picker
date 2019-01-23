function toggleHeaderStyle() {
  const header = document.querySelector('.header')
  
  header.classList.toggle('header-hide')
  header.classList.toggle('header-view')
}

function toggleSavedPaletteContainerStyle() {
  const savedPaletteContainer = document.querySelector('.saved-palette-container')
  
  savedPaletteContainer.classList.toggle('saved-palette-container-hide')
  savedPaletteContainer.classList.toggle('saved-palette-container-view')
}

function toggleSelectSavedPaletteContainerStyle() {
  const selectSavedBtnContainer = document.querySelector('.select-saved-btn-container')
  
  selectSavedBtnContainer.classList.toggle('select-saved-btn-container-hide')
  selectSavedBtnContainer.classList.toggle('select-saved-btn-container-view')
}

selectSavedBtn.addEventListener('click', function (event) {
  event.preventDefault()

  toggleHeaderStyle()
  toggleSavedPaletteContainerStyle()
  toggleSelectSavedPaletteContainerStyle()
})
