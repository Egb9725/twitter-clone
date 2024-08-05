// JavaScript pour ouvrir et fermer le popup
const openPopupBtn = document.getElementById('openPopupBtn')
const closePopupBtn = document.getElementById('closePopupBtn')
const popup = document.getElementById('popup')

openPopupBtn.addEventListener('click', () => {
  popup.style.display = 'flex'
})

closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none'
})

window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none'
  }
})
