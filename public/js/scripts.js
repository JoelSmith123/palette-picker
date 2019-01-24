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

  toggleBodyStyle()
  toggleHeaderStyle()
  toggleSavedPaletteContainerStyle()
  toggleSelectSavedPaletteContainerStyle()
})

const generateNewPaletteBtn = document.querySelector('.generate-btn')
generateNewPaletteBtn.addEventListener('click', function (event) {
  event.preventDefault()

  generatePaletteElement()
})

document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('unlocked-color-icon'))
  event.preventDefault()

  lockPaletteColor(event)
})


function toggleBodyStyle() {
  const body = document.querySelector('.body')

  if (body.classList.contains('body-view')) {
    setTimeout(function(){ body.classList.toggle('body-view') }, 1000)
  }
  else {
    body.classList.toggle('body-view')
  }
}

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
  let paletteColorElementsArr = document.querySelectorAll('.palette-color')

  if (paletteColorElementsArr[0]) {
    paletteColorElementsArr.forEach(paletteColorElement => {
      if (paletteColorElement.classList.contains('selected-palette-color')) {
        return 
      }
      else {
        paletteColorElement.style.backgroundColor = generateRandomHexCode()
      }
    })
  }
  else {
    paletteContainer.innerHTML = ''

    for (let i = 0; i < 5; i++) {
      let paletteColorElement = document.createElement('div')

      let iconContainer = document.createElement('div')
      iconContainer.classList.add('color-icon-container')
      let icon = document.createElement('i')
      icon.classList.add('fas', 'fa-lock-open', 'unlocked-color-icon')
      iconContainer.appendChild(icon)
      paletteColorElement.appendChild(iconContainer)

      paletteColorElement.classList.add('palette-color')
      paletteColorElement.style.backgroundColor = generateRandomHexCode()
      paletteContainer.appendChild(paletteColorElement) 
    }    
  }
}

function lockPaletteColor(event) {
  let parentPaletteColorElement = event.target.parentNode.parentNode
  parentPaletteColorElement.classList.toggle('selected-palette-color')
}

