/*
6-fazer uma validação da data que o usuario inseriu 
*/

const form = document.getElementById('date-form')

form.addEventListener('submit', e => {
  e.preventDefault()

  const day = document.getElementById('day')
  const month = document.getElementById('month')
  const year = document.getElementById('year')

  if (validateDate(day, month, year)) {
    const { currentDay, currentMonth, currentYear } = getCurrentDate()

    const { daysSubtraction, monthsSubtraction, yearsSubtraction } =
      subtractDates(currentDay, day, currentMonth, month, currentYear, year)

    sendDataToHtml(daysSubtraction, monthsSubtraction, yearsSubtraction)
  }
})

function sendDataToHtml(daysSubtraction, monthsSubtraction, yearsSubtraction) {
  const daysOutputElement = document.getElementById('day-output')
  const monthsOutputElement = document.getElementById('month-output')
  const yearsOutputElement = document.getElementById('year-output')

  daysOutputElement.innerText = Math.abs(daysSubtraction)
  monthsOutputElement.innerText = Math.abs(monthsSubtraction)
  yearsOutputElement.innerText = yearsSubtraction
}

function subtractDates(
  currentDay,
  day,
  currentMonth,
  month,
  currentYear,
  year
) {
  const daysSubtraction = currentDay - day.value
  const monthsSubtraction = currentMonth - month.value
  const yearsSubtraction = currentYear - year.value

  return { daysSubtraction, monthsSubtraction, yearsSubtraction }
}

function getCurrentDate() {
  const date = new Date()

  const currentDay = date.getDate()
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()

  return { currentDay, currentMonth, currentYear }
}

function validateDate(day, month, year) {
  const inputs = document.querySelectorAll('input')
  let validator

  inputs.forEach(input => {
    const parentElement = input.parentElement
    const date = new Date()
    const currentYear = date.getFullYear()

    if (!input.value) {
      input.classList.add('error')
      parentElement.querySelector('.error-message').innerText =
        'Este campo é necessário'

      validator = false
    } else if (month.value > 12) {
      month.classList.add('error')
      month.parentElement.querySelector('.error-message').innerText =
        'Insira um mês válido'

      validator = false
    } else if (day.value > 31) {
      day.classList.add('error')
      day.parentElement.querySelector('.error-message').innerText =
        'Insira um dia válido'

      validator = false
    } else if (month.value == 2 && day.value > 28) {
      day.classList.add('error')
      day.parentElement.querySelector('.error-message').innerText =
        'Insira um dia válido'

      validator = false
    } else if (year.value > currentYear) {
      year.classList.add('error')
      year.parentElement.querySelector('.error-message').innerText =
        'Precisa estar no passado'

      validator = false
    } else {
      input.classList.remove('error')
      parentElement.querySelector('.error-message').innerText = ''

      validator = true
    }
  })

  return validator
}
