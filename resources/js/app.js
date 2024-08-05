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

// basculer avec les onglets
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.page-tab')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('page-tab-active'))
      tab.classList.add('page-tab-active')
    })
  })
})
