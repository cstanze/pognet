const boardSelector = document.querySelector('#board')
let boards

fetch(`${window.location.origin}/api/boards/all`).then(async (json) => {
	boards = await json.json()
	for(const board of boards) {
		const option = document.createElement('option')
		option.innerHTML = board.displayName
		option.value = board._id
		boardSelector.appendChild(option)
	}
})