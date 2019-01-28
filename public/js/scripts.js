window.onload = function () {
  generatePaletteElement()
  toggleAllSavedPaletteStyles()
  loadSavedProjects()
}


document.body.onkeyup = function (event) {
  if(event.keyCode == 32){
    generatePaletteElement()
  }
}


const selectSavedBtn = document.querySelector('.select-saved-btn')
selectSavedBtn.addEventListener('click', function (event) {
  event.preventDefault()

  toggleAllSavedPaletteStyles()
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

const newProjectForm = document.querySelector('.new-project-form')
newProjectForm.addEventListener('submit', function (event) {
  event.preventDefault()

  saveNewProject()
})

const savePaletteBtn = document.querySelector('.save-palette-btn')
savePaletteBtn.addEventListener('click', function (event) {
  event.preventDefault()

  savePaletteToProject()
})



function toggleAllSavedPaletteStyles() {
  toggleBodyStyle()
  toggleHeaderStyle()
  toggleSavedPaletteContainerStyle()
  toggleSelectSavedPaletteContainerStyle()
}

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
  let parentPaletteColorElement

  if (event.target.parentNode.parentNode.classList.contains('palette-color')) {
    parentPaletteColorElement = event.target.parentNode.parentNode
    parentPaletteColorElement.classList.toggle('selected-palette-color')    
  }
}

function saveNewProject() {
  const newProjectInput = document.querySelector('.new-project-input')
  const project = [{ name: newProjectInput.value }]

  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: newProjectInput.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( response => response.json() )
  .catch(error => console.log(error))

  renderProjectsToPage(project)
}

function loadSavedProjects() {
  fetch('api/v1/projects')
    .then( response => response.json() )
    .then( returnedProjects => renderProjectsToPage(returnedProjects))
    .catch(error => console.log(error))
}

function renderProjectsToPage(projects) {
  const savedProjectContainer = document.querySelector('.saved-project-container')
  projects.forEach(project => {
    
    const newProjectElement = document.createElement('div')
    newProjectElement.id = project.id
    newProjectElement.classList.add('project-container')
    const newProjectElementTitle = document.createElement('h3')
    newProjectElementTitle.classList.add('project-title')
    newProjectElementTitle.innerText = project.name
    newProjectElement.appendChild(newProjectElementTitle)
    savedProjectContainer.appendChild(newProjectElement)    

    fetchPalettesForProject(project)
  })
}

function fetchPalettesForProject(project) {
  fetch(`api/v1/projects/${project.id}/palettes`)
    .then( response => response.json() )
    .then( returnedPalettes => renderPalettesToPageFromProject(returnedPalettes, project))
    .catch(error => console.log(error))
}

function renderPalettesToPageFromProject(palettes, project) {
  const projectElements = document.querySelectorAll('.project-container')
  const matchingProject = projectElements.find(projectElement => projectElement.id === project.id)

  palettes.forEach(palette => {
    const paletteElement = document.createElement('div')
    paletteElement.id = matchingProject.id
    paletteElement.classList.add('project-palette-container')
    const paletteElementTitle = document.createElement('h2')
    paletteElementTitle.classList.add('project-palette-container-title')

    renderPaletteColorBoxes(palette.color_1, paletteElement)  
    renderPaletteColorBoxes(palette.color_2, paletteElement)
    renderPaletteColorBoxes(palette.color_3, paletteElement)
    renderPaletteColorBoxes(palette.color_4, paletteElement)
    renderPaletteColorBoxes(palette.color_5, paletteElement) 
  })

}

function renderPaletteColorBoxes(color, paletteElement) => {
  const colorBox = document.createElement('div')
  colorBox.classList.add('palette-color-box')
  colorBox.style.backgroundColor = '#' + color 
  paletteElement.appendChild(colorBox)
}



function savePaletteToProject() {

}

