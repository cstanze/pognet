const settingsPhoto = document.querySelector('.settings-picture')
const settingsTitle = document.querySelector('.settings-title')

const settingsId = window.location.pathname.replace('/board/', '').replace(/\/settings\/?/gi, '')
if(settingsId == 'id') window.location.pathname = '/'

fetch(`/api/board/${settingsId}`).then(async json => {
	let board = await json.json()
	if(typeof board.code != 'undefined') {
    if(board.code == 10060) return
  }
	settingsPhoto.src = `/${board._profile}`
	settingsTitle.innerText = `${board.displayName}'s Settings`
})
