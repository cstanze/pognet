const postContainer = document.querySelector('.post-container')
const postIO = io(`${window.location.origin}:90`)

fetch(`${window.location.origin}/api/posts/board/${document.querySelector('#boardId').value}`).then(async json => {
	const posts = await json.json()
	if(typeof posts.code != 'undefined') {
		let errMessage
		const postWrapper = document.createElement('div')
		postWrapper.classList.add('post-wrapper')
		if(posts.code == 10010) {
			errMessage = document.createElement('p')
			errMessage.classList.add('text-xl')
			errMessage.innerHTML = `<i class='fas fa-bomb'></i><br> Couldn't find the board!`
		}
		if(posts.code == 10011) {
			errMessage = document.createElement('p')
			errMessage.classList.add('text-xl')
			errMessage.innerHTML = `<i class='fas fa-bomb'></i><br> This user doesn't appear to have any posts.`
		}
		errMessage.classList.add('centered')
		postContainer.appendChild(errMessage)
		return
	}
	for(const post of posts) {
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
		postContainer.appendChild(postWrapper)
		postWrapper.appendChild(postTitle)
		postWrapper.appendChild(postBody)
		postWrapper.appendChild(postId)
	}
	postIO.on('posted', post => {
		if(posts[0]._board == post._board) {
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
		}
	})
})