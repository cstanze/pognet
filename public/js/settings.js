const userId = localStorage.getItem('userId')

submitPhoto = async () => {
	if(typeof document.querySelector('.photo-change').files[0] == 'undefined') return
	const avatar = document.querySelector('.photo-change').files[0]
	const data = new FormData()
	data.append('photo', avatar)
	fetch(`/settings/photo/${userId}`, {
		method: 'PATCH',
		body: data
	}).then(json => { return json.json() }).then(profile => {
		document.querySelector('.settings-picture').src = `/${profile.photo}`
		document.querySelector('.photo-change').classList.add('is-valid')
		document.querySelector('.photo-submit').parentNode.removeChild(document.querySelector('.photo-submit'))
		setTimeout(() => {
			document.querySelector('.photo-change').classList.remove('is-valid')
		}, 3000)
	})
}

submitUsername = async () => {
	if(document.querySelector('.username-change').value.replace(' ', '').length <= 0) return
	const username = document.querySelector('.username-change').value
	const data = JSON.stringify({
		username
	})
	fetch(`/settings/username/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	}).then(json => { return json.json() }).then(profile => {
		document.querySelector('.username-code').innerText = profile.username
		document.querySelector('.settings-title').innerText = `${profile.username}'s Settings`
		document.querySelector('.username-change').classList.add('is-valid')
		setTimeout(() => {
			document.querySelector('.username-change').classList.remove('is-valid')
		}, 3000)
	})
}

submitBio = async () => {
	if(document.querySelector('.settings-bio').value.length <= 0) return
	const bio = document.querySelector('.settings-bio').value
	const data = JSON.stringify({
		bio
	})
	fetch(`/settings/bio/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	}).then(json => { return json.json() }).then(profile => {
		document.querySelector('.settings-bio').value = profile.bio
		document.querySelector('.settings-bio').classList.add('is-valid')
		setTimeout(() => {
			document.querySelector('.settings-bio').classList.remove('is-valid')
		}, 3000)
	})
}