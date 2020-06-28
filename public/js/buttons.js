const buttonTheme = localStorage.getItem(`theme`);

if(buttonTheme) {
	if(buttonTheme == `dark`) {
		const buttons = document.getElementsByClassName("btn");
		console.log(buttons)
		for(let i=0;i<buttons.length;i++) {
			let el = buttons[i];
			if(el.getAttribute("aria-link") != 'true') {
				el.classList.remove("bg-black")
				el.classList.remove("text-black")
				el.classList.add("bg-white")
				el.classList.add("text-black")
			}
		}
	} else {
		const buttons = document.getElementsByClassName("btn");
		console.log(buttons)
		for(let i=0;i<buttons.length;i++) {
			let el = buttons[i];
			if(el.getAttribute("aria-link") != 'true') {
				el.classList.remove("bg-white")
				el.classList.remove('text-black')
				el.classList.add('bg-black')
				el.classList.add('text-white')
			}
		}
	}
} else {
	const buttons = document.getElementsByClassName("btn");
	console.log(buttons)
	for(let i=0;i<buttons.length;i++) {
		let el = buttons[i];
		if(el.getAttribute("aria-link") != 'true') {
			el.classList.remove("bg-white")
			el.classList.remove('text-black')
			el.classList.add("bg-black")
			el.classList.add("text-white")
		}
	}
}

function changeButtonTheme(buttonTheme) {
	if(buttonTheme) {
		if(buttonTheme == `dark`) {
			const buttons = document.getElementsByClassName("btn");
			console.log(buttons)
			for(let i=0;i<buttons.length;i++) {
				let el = buttons[i];
				if(el.getAttribute("aria-link") != 'true') {
					el.classList.remove("bg-black")
					el.classList.remove("text-black")
					el.classList.add("bg-white")
					el.classList.add("text-black")
				}
			}
		} else {
			const buttons = document.getElementsByClassName("btn");
			console.log(buttons)
			for(let i=0;i<buttons.length;i++) {
				let el = buttons[i];
				if(el.getAttribute("aria-link") != 'true') {
					el.classList.remove("bg-white")
					el.classList.remove('text-black')
					el.classList.add('bg-black')
					el.classList.add('text-white')
				}
			}
		}
	} else {
		const buttons = document.getElementsByClassName("btn");
		console.log(buttons)
		for(let i=0;i<buttons.length;i++) {
			let el = buttons[i];
			if(el.getAttribute("aria-link") != 'true') {
				el.classList.remove("bg-white")
				el.classList.remove('text-black')
				el.classList.add("bg-black")
				el.classList.add("text-white")
			}
		}
	}
}