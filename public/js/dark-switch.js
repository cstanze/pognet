const toggleSwitch = document.querySelector(`.theme-switch input[type="checkbox"]`);
const themeLabel = document.querySelector(`.theme-label`);
const currentTheme = localStorage.getItem(`theme`);

if(currentTheme) {
	document.documentElement.setAttribute(`data-theme`, currentTheme);

	if(currentTheme == `dark`) {
		toggleSwitch.checked = true;
	}
}

function switchTheme(e) {
	if(e.target.checked) {
		document.documentElement.setAttribute(`data-theme`, `dark`);
		localStorage.setItem(`theme`, `dark`);
		themeLabel.innerText = "Light Mode.";
	} else {
		document.documentElement.setAttribute(`data-theme`, `light`);
		localStorage.setItem(`theme`, `light`);
		themeLabel.innerText = "Dark Mode.";
	}
	changeButtonTheme(e.target.checked ? 'dark' : 'light')
}

toggleSwitch.addEventListener(`change`, switchTheme, false);