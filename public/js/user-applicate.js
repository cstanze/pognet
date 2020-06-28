const userField = document.querySelector(`.userField`)

if(localStorage.getItem('userId')) {
	userField.value = localStorage.getItem('userId')
}