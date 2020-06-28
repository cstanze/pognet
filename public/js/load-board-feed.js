const postContainer = document.querySelector('.feed-container')
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
			errMessage.innerHTML = `<i class='fas fa-bomb'></i><br> This board doesn't appear to have any posts.`
		}
		errMessage.classList.add('centered')
		postContainer.appendChild(errMessage)
		return
	}
	for(const post of posts) {

				// Author Fetch
				let author = await fetch(`${window.location.origin}/api/user/${post._author}`)
				author = await author.json()

				if(typeof author.code != 'undefined') {
					if(author.code == 10050) author.username = 'deleted account'
					if(author.code == 10051) author.username = 'deleted account'
				}

				// Board Fetch
				let board = await fetch(`${window.location.origin}/api/board/${post._board}`)
				board = await board.json()

				if(typeof board.code != 'undefined') {
					if(board.code == 10060) board.displayName = 'deleted board'
					if(board.code == 10061) board.displayName = 'deleted board'
				}

		    // Constructs
		    const postWrapper = document.createElement('div')
		    const postTitle = document.createElement('a')
		    const postAuthor = document.createElement('a')
		    const postBoard = document.createElement('a')
		    const postImage = document.createElement('img')
		    const postVideo = document.createElement('video')
		    const videoSource = document.createElement('source')
		    const postBody = document.createElement('p')

		    // Wrapper
		    postWrapper.classList.add('post-wrapper')

		    // Title
		    postTitle.classList.add('text-2xl')
		    postTitle.classList.add('font-medium')
		    postTitle.classList.add('post-title')

		    // Author
		    postAuthor.classList.add('post-author')
		    postAuthor.classList.add('text-lg')
		    postAuthor.classList.add('my-1')
		    postAuthor.classList.add('block')

		    // Board
		    postBoard.classList.add('text-md')
		    postBoard.classList.add('post-board')

		    // Image & Video
		    postImage.classList.add('post-attachment')
		    postVideo.classList.add('post-attachment')
		    postImage.classList.add('shadow-md')
		    postVideo.classList.add('post-attachment')

		    // Body
		    postBody.classList.add('post-content')
		    postBody.classList.add('mt-4')

		    // Sourcing
		    videoSource.src = `/${post.video}`
		    videoSource.setAttribute('type', post.videoMime)
		    postVideo.setAttribute('controls', 'true')
		    postImage.src = `/${post.image}`

		    // Inner Text
		    postTitle.innerText = post.title
		    postBoard.innerText = board.displayName+'\n'
		    postAuthor.innerText = author.username+'\n'
		    postBody.innerText = post.body

		    // Href
		    postTitle.href = `/post/${post.title}`
		    // postBoard.href = `/board/${board.displayName}`
		    postAuthor.href = `/profile/${author.username}`

		    // Append
		    postWrapper.appendChild(postTitle)
		    postWrapper.appendChild(postAuthor)
		    postWrapper.appendChild(postBoard)

		    // Condition Append
		    if(post.hasImage) postWrapper.appendChild(postImage)
		    if(post.hasVideo) {
		      postWrapper.appendChild(postVideo)
		      postVideo.appendChild(videoSource)
		    }

		    // Final Append
		    postWrapper.appendChild(postBody)
		    postContainer.appendChild(postWrapper)
	}
	postIO.on('posted', async post => {
		if(posts[0]._board == post._board) {

			    // Author Fetch
			    let author = await fetch(`${window.location.origin}/api/user/${post._author}`)
			    author = await author.json()

			    // Board Fetch
			    let board = await fetch(`${window.location.origin}/api/board/${post._board}`)
			    board = await board.json()

			    // Constructs
			    const postWrapper = document.createElement('div')
			    const postTitle = document.createElement('a')
			    const postAuthor = document.createElement('a')
			    const postBoard = document.createElement('a')
			    const postImage = document.createElement('img')
			    const postVideo = document.createElement('video')
			    const videoSource = document.createElement('source')
			    const postBody = document.createElement('p')

			    // Wrapper
			    postWrapper.classList.add('post-wrapper')

			    // Title
			    postTitle.classList.add('text-2xl')
			    postTitle.classList.add('font-medium')
			    postTitle.classList.add('post-title')

			    // Author
			    postAuthor.classList.add('post-author')
			    postAuthor.classList.add('text-lg')
			    postAuthor.classList.add('my-1')
			    postAuthor.classList.add('block')

			    // Board
			    postBoard.classList.add('text-md')
			    postBoard.classList.add('post-board')

			    // Image & Video
			    postImage.classList.add('post-attachment')
			    postVideo.classList.add('post-attachment')
			    postImage.classList.add('shadow-md')
			    postVideo.classList.add('post-attachment')

			    // Body
			    postBody.classList.add('post-content')
			    postBody.classList.add('mt-4')

			    // Sourcing
			    videoSource.src = `/${post.video}`
			    videoSource.setAttribute('type', post.videoMime)
			    postVideo.setAttribute('controls', 'true')
			    postImage.src = `/${post.image}`

			    // Inner Text
			    postTitle.innerText = post.title
			    postBoard.innerText = board.displayName+'\n'
			    postAuthor.innerText = author.username+'\n'
			    postBody.innerText = post.body

			    // Href
			    postTitle.href = `/post/${post.title}`
			    postBoard.href = `/board/${board.displayName}`
			    postAuthor.href = `/profile/${author.username}`

			    // Append
			    postWrapper.appendChild(postTitle)
			    postWrapper.appendChild(postAuthor)
			    postWrapper.appendChild(postBoard)

			    // Condition Append
			    if(post.hasImage) postWrapper.appendChild(postImage)
			    if(post.hasVideo) {
			      postWrapper.appendChild(postVideo)
			      postVideo.appendChild(videoSource)
			    }

			    // Final Append
			    postWrapper.appendChild(postBody)
			    postContainer.appendChild(postWrapper)
		}
	})
})
