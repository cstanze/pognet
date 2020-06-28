const user_id = document.querySelector(`.user_id-field`).value

localStorage.setItem(`userId`, user_id)
window.location.pathname = "/"