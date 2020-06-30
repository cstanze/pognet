const pfpUrl = window.location.href.replace('/profile/', '/api/pfp/')

fetch(pfpUrl).then(async json => {
	const pfp = await json.json()
	document.querySelector('.profile-img').src = pfp.url
})
