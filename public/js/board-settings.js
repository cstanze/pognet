const settingsServerId = window.location.pathname.replace('/board/', '').replace(/\/settings\/?/gi, '')

submitPhoto = async () => {
	if(typeof document.querySelector('.icon-change').files[0] == 'undefined') return
	const avatar = document.querySelector('.icon-change').files[0]
	const data = new FormData()
	data.append('icon', avatar)
	fetch(`/settings/board/icon/${settingsServerId}`, {
		method: 'PATCH',
		body: data
	}).then(json => { return json.json() }).then(profile => {
		document.querySelector('.settings-picture').src = `/${profile._profile}`
		document.querySelector('.icon-change').classList.add('is-valid')
		setTimeout(() => {
			document.querySelector('.icon-change').classList.remove('is-valid')
		}, 3000)
	})
}

resetPhotot = async () => {
  fetch(`/settings/board/reset/icon/${settingsServerId}`, {
    method: 'PATCH'
  }).then(json => { return json.json() }).then(board => {
    document.querySelector('.settings-picture').src = `/${profile._profile}`
  })
}
