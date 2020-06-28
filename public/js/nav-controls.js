let drawerShown = false

$(() => {
	setTimeout(() => {
		let userId = localStorage.getItem('userId') || ""
		if(userId.length < 1) {
			document.querySelector('#settings-mobile').style.display = 'none'
			document.querySelector('#settings').style.display = 'none'
			document.querySelector('#signout').innerText = 'Sign up / Log In'
			document.querySelector('#signout').setAttribute('onclick', 'login()')
			document.querySelector('#signout-full').innerText = 'Sign up / Log In'
			document.querySelector('#signout-full').setAttribute('onclick', 'login()')
		}
	}, 200)
})

signout = () => {
	localStorage.setItem(`userId`, '')
	window.location.reload()
}

login = () => {
	window.location.pathname = '/login'
}

showDrawer = () => {
	let drawer = document.querySelector(`.drawer`)
	if(drawerShown) {
		drawer.style.height = '0'
		drawer.style.display = 'none'
	} else {
		drawer.style.height = '100vh'
		drawer.style.display = 'block'
	}
	drawerShown = !drawerShown
}

closeDrawer = () => {
	let drawer = document.querySelector(`.drawer`)
	drawer.style.height = '0'
	drawer.style.display = 'none'
	drawerShown = false
}