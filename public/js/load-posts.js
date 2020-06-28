const postContainer = document.querySelector('.post-container')
const postIO = io(`${window.location.origin}:90`)

postIO.on('disconnect', () => {
  try {
  	postIO.open();
  } catch(e) {
  	console.log(e)
  }
});

fetch(`${window.location.origin}/api/posts/all`).then(async json => {
	const posts = await json.json()
	for(const post of posts) {
		let author = await fetch(`${window.location.origin}/api/user/${post._author}`)
		author = await author.json()
		let board = await fetch(`${window.location.origin}/api/board/${post._board}`)
		board = await board.json()
		const postWrapper = document.createElement('div')
		const postTitle = document.createElement('p')
		const postBoard = document.createElement('p')
		const postBody = document.createElement('p')
		postWrapper.classList.add('post-wrapper')
		postTitle.classList.add('text-3xl')
		postTitle.classList.add('post-title')
		postBoard.classList.add('text-lg')
		postBoard.classList.add('post-board')
		postBody.classList.add('post-content')
		postBody.classList.add('mt-4')
		postTitle.innerText = post.title
		postBoard.innerText = board.displayName
		postBody.innerText = post.body
		postWrapper.appendChild(postTitle)
		postWrapper.appendChild(postBoard)
		postWrapper.appendChild(postBody)
		postContainer.appendChild(postWrapper)
	}
})

/*postIO.on('posted', post => {
		const postWrapper = document.createElement('div')
		const postTitle = document.createElement('h3')
		const postBody = document.createElement('p')
		const postId = document.createElement('p')
		postWrapper.classList.add('post-wrapper')
		postTitle.classList.add('text-2xl')
		postId.classList.add('mt-2')
		postTitle.innerText = post.title
		postBody.innerText = post.body
		postId.innerText = post._id
		postContainer.insertBefore(postWrapper, postContainer.firstChild)
		postWrapper.appendChild(postTitle)
		postWrapper.appendChild(postBody)
		postWrapper.appendChild(postId)
	})*/