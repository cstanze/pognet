let formControl = document.querySelector('#continue')
let passwrdSect = document.querySelector('.password-section')
let inputMid = document.querySelector('#input-mid')
let labelTop = document.querySelector('#label-top')
let labelMid = document.querySelector('#label-mid')
let newMid
let bioCount
let buttonSect
let restart
let continueButton

formControl.onclick = () => {
  passwrdSect.classList.add("password-slide")
  setTimeout(() => {
    passwrdSect.parentElement.removeChild(passwrdSect)
  }, 300)
  labelTop.style.opacity = '0'
  labelMid.style.opacity = '0'
  setTimeout(() => {
    labelTop.innerText = "Username:"
    labelMid.innerText = "Bio:"
  }, 710)
  setTimeout(() => {
    labelTop.style.opacity = '100'
    labelMid.style.opacity = '100'
  }, 810)
  setTimeout(() => {
    newMid = document.createElement('textarea')
    newMid.rows = '5'
    newMid.cols = '6'
    newMid.className = 'form-control bg-white focus:outline-none focus:shadow-outline shadow border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-non leading-normal charCounted'
    newMid.style.marginBottom = '15px'
    newMid.style.resize = 'none'
    newMid.setAttribute('name', 'email')
    newMid.setAttribute('id', 'input-mid')
    newMid.setAttribute('maxlength', '200')
    newMid.style.opacity = '0'
    inputMid.parentElement.replaceChild(newMid, inputMid)
    // small(id="emailHelp" class="form-help text-muted") An Interesting Title...
    bioCount = document.createElement('small')
    bioCount.id = 'charCount'
    bioCount.classList = 'form-help text-muted'
    bioCount.innerText = '200 / 200'
    newMid.after(bioCount)
    newMid.onkeydown = () => {
      bioCount.innerText = `${200-newMid.value.length} / 200`
    }
    /*
     * div(class="button-control")
     *  button(id="continue" class="btn-form-50 shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded") Restart ↻
     *  button(id="continue" class="btn-form-50 shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded") Finish ➤
    */
    buttonSect = document.createElement('div')
    buttonSect.className = 'button-control'
    restart = document.createElement('button')
    restart.id = 'restart'
    restart.className = 'btn-form-50 shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
    restart.innerText = 'Restart ↻'
    continueButton = document.createElement('button')
    continueButton.id = 'finish'
    continueButton.className = 'btn-form-50 shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
    continueButton.innerText = 'Finish ➤'
    buttonSect.appendChild(restart)
    restart.after(continueButton)
    buttonSect.style.opacity = '0'
    formControl.parentElement.replaceChild(buttonSect, formControl)
    restart.onclick = () => {
      window.location.reload()
    }
    continueButton.onclick = () => {
      /*
       * Gather Data And Set It To Certain Variables.
       * With These Variables, POST to the main server. It'll deal with it from there :/
       * So, we'll do some in-file stuff and before, we set the variable to certain
      */
    }
  }, 1210)
  setTimeout(() => {
    newMid.style.opacity = '100'
    buttonSect.style.opacity = '100'
  }, 1310)
}
