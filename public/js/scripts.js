window.onload = function () {
  generatePaletteElement()
}


document.body.onkeyup = function (event) {
  if(event.keyCode == 32){
    generatePaletteElement()
  }
}


const selectSavedBtn = document.querySelector('.select-saved-btn')
selectSavedBtn.addEventListener('click', function (event) {
  event.preventDefault()
  toggleHeaderStyle()
  toggleSavedPaletteContainerStyle()
  toggleSelectSavedPaletteContainerStyle()
})

const generateNewPaletteBtn = document.querySelector('.select-saved-btn')
generateNewPaletteBtn.addEventListener('click', function (event) {
  event.preventDefault()
  generatePaletteElement()
})


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


function generateRandomHexCode() {
  let randomNumber = () => Math.floor(Math.random() * Math.floor(10))
  let randomLetter = () => {
    let letterArr = ['A', 'B', 'C', 'D', 'E', 'F']
    return letterArr[Math.floor(Math.random() * Math.floor(6))]
  }
  let randomDigit = () => { 
    let selectorNum = Math.floor(Math.random() * Math.floor(2))
    return selectorNum === 0 ? randomNumber() : randomLetter()
  }

  let hexCodeArray = []
  for (let i = 0; i < 6; i++) {
    hexCodeArray.push(randomDigit())
  }

  return '#' + hexCodeArray.join('')
}

function generatePaletteElement() {
  const paletteContainer = document.querySelector('.palette-container')
  paletteContainer.innerHTML = ''
  for (let i = 0; i < 5; i++) {
    let paletteColorElement = document.createElement('div')
    paletteColorElement.classList.add('palette-color')
    paletteColorElement.style.backgroundColor = generateRandomHexCode()
    paletteContainer.appendChild(paletteColorElement) 
  }
}

