const postContainer = document.querySelector('.post-container')

fetch(`${window.location.origin}/api/posts/all`).then(async json => {
	const posts = await json.json()
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
    				const postToolbar = document.createElement('div')
            const votingContainer = document.createElement('div')
            const upvote = document.createElement('button')
            const upvoteImg = document.createElement('img')
            const voteCounter = document.createElement('p')
            const downvote = document.createElement('button')
            const downvoteImg = document.createElement('img')
    				const deleteAction = document.createElement('button')
    				const deleteIcon = document.createElement('i')
    				const upgradeAction = document.createElement('button')
    				const upgradeIcon = document.createElement('i')
            const settingsAction = document.createElement('button')
            const settingsIcon = document.createElement('i')
						let ups = (localStorage.getItem('upvoted') || '').split(',').filter(i => i != '' || i != ' ')
						let downs = (localStorage.getItem('downvoted') || '').split(',').filter(i => i != '' || i != ' ')

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
    		    postTitle.href = `/post/${post._id}`
    		    postBoard.href = `/board/${board.displayName}`
    		    postAuthor.href = `/profile/${author.username}`

    				// Toolbar
    				postToolbar.classList.add('flex')
    				postToolbar.classList.add('justify-between')
    				postToolbar.classList.add('px-2')
            postToolbar.classList.add('mt-1')
            postToolbar.classList.add('post-toolbar')

            // Voting
						if(typeof board.code == 'undefined') {
	            votingContainer.classList.add('mx-2')
	            votingContainer.classList.add('my-1')
	            votingContainer.classList.add('p-1')
	            votingContainer.classList.add('flex')
	            votingContainer.classList.add('flex-row')
	            votingContainer.classList.add('justify-around')
	            upvoteImg.src = '/images/voting/up.png'
	            upvoteImg.classList.add('upvote')
							if(ups.includes(post._id)) upvoteImg.classList.add('activated')
	            downvoteImg.src = '/images/voting/down.png'
	            downvoteImg.classList.add('downvote')
							if(downs.includes(post._id)) downvoteImg.classList.add('activated')
	            upvote.setAttribute('onclick', 'upvote(this)')
	            upvote.id = `upvote-${post._id}`
	            upvote.appendChild(upvoteImg)
	            downvote.setAttribute('onclick', 'downvote(this)')
	            downvote.id = `downvote-${post._id}`
	            downvote.appendChild(downvoteImg)
	            votingContainer.appendChild(upvote)
	            voteCounter.classList.add('font-medium')
	            voteCounter.classList.add('pt-1')
							voteCounter.classList.add('mx-1')
	            voteCounter.innerText = post.votes
	            votingContainer.appendChild(voteCounter)
	            votingContainer.appendChild(downvote)
	            postToolbar.appendChild(votingContainer)
						}

    				// Delete Post
    				deleteAction.setAttribute('onclick', 'deletePost(this)')
            deleteAction.id = `delete-${post._id}`
    				deleteIcon.classList.add('fas')
    				deleteIcon.classList.add('fa-trash')
            deleteIcon.classList.add('post-icon')
    				deleteAction.appendChild(deleteIcon)
            if(localStorage.getItem('userId')) {
              if(localStorage.getItem('userId') == post._author || board._mods.includes(localStorage.getItem('userId')) || localStorage.getItem('userId') == board._creator) postToolbar.appendChild(deleteAction)
            }

            // Upgrade Post
            upgradeAction.setAttribute('onclick', 'upgradeUser(this)')
            upgradeAction.id = `upgrade-${post._author}`
            upgradeIcon.id = `board-${board._id}`
            upgradeIcon.classList.add('fas')
            upgradeIcon.classList.add('fa-level-up-alt')
            upgradeIcon.classList.add('post-icon')
            upgradeAction.appendChild(upgradeIcon)
            if(localStorage.getItem('userId')) {
              if(localStorage.getItem('userId') == board._creator || board._mods.includes(localStorage.getItem('userId'))) postToolbar.appendChild(upgradeAction)
            }

            // Board Settings
            settingsAction.setAttribute('onclick', 'openBoardSettings(this)')
            settingsAction.id = `board-${board._id}`
            settingsIcon.classList.add('fas')
            settingsIcon.classList.add('fa-cog')
            settingsIcon.classList.add('post-icon')
            settingsAction.appendChild(settingsIcon)
            if(localStorage.getItem('userId')) {
              if(localStorage.getItem('userId') == board._creator || board._mods.includes(localStorage.getItem('userId'))) postToolbar.appendChild(settingsAction)
            }


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
    				if(typeof board.code == 'undefined') postWrapper.appendChild(postToolbar)
    		    postContainer.appendChild(postWrapper)
	}
})
