const settingsPhoto = document.querySelector('.settings-picture')
const settingsTitle = document.querySelector('.settings-title')
const usernameTitle = document.querySelector('.username-title')
const settingsBio = document.querySelector('.settings-bio')

if(/\/me(\/)?/gi.test(window.location.href)) {
	const settingsId = localStorage.getItem('userId')
	fetch(`/api/user/${settingsId}`).then(json => { return json.json() }).then(user => {
		settingsPhoto.src = `/${user.photo}`
		settingsTitle.innerText = `${user.username}'s Settings`
		usernameTitle.innerHTML = `Your username is <code class='username-code'>${user.username}</code>. Want to change it?`
		settingsBio.value = user.bio
	}).catch(err => {
		console.log(err)
		window.location.href = '/'
	})
}