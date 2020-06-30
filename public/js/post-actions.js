deletePost = (e, individualPost = false) => {
  const postId = e.id.replace('delete-','')
  fetch(`/api/delete/post/${postId}`).then(() => {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)
    let toast = document.querySelector('#delete-bar')
    toast.classList.add('show')
    setTimeout(() => {
      toast.classList.remove('show')
      if(individualPost) window.location.href = '/'
    }, 5000);
  })
}

upgradeUser = e => {
  const userId = e.id.replace('upgrade-', '')
  const boardId = e.firstChild.id.replace('board-', '')
  fetch(`/api/board/${boardId}`).then(async json => {
    let board = await json.json()
    if(board._mods.includes(userId)) return
    fetch(`/settings/board/push/mods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boardId,
        userId
      })
    }).then(async json => {
      let toast = document.querySelector('#upgrade-bar')
      toast.classList.add('show')
      setTimeout(() => {
        toast.classList.remove('show')
      }, 5000);
    })
  })
}

openBoardSettings = e => {
  const boardId = e.id.replace('board-', '')
  window.location.href = `/board/${boardId}/settings`
}

upvote = e => {
  let upvote = document.querySelector(`#${e.id}`).firstChild.classList
  let postId = e.id.replace('upvote-', '')
  let downvote = document.querySelector(`#downvote-${postId}`).firstChild.classList
  if(upvote.contains('activated')) {
    upvote.remove('activated')
    fetch(`/downvote/${postId}`)
    let posts = localStorage.getItem('upvoted') || ''
    posts = posts.split(',')
    posts = posts.filter(i => i.length > 1)
    posts = posts.filter(i => i != postId)
    localStorage.setItem('upvoted', posts.join(','))
  } else {
    upvote.add('activated')
    fetch(`/upvote/${postId}`)
    if(downvote.contains('activated')) {
      downvote.remove('activated')
      fetch(`/upvote/${postId}`)
    }
    let posts = localStorage.getItem('upvoted') || ''
    posts = posts.split(',')
    posts = posts.filter(i => i.length > 1)
    posts.push(postId)
    localStorage.setItem('upvoted', posts.join(','))
    let downPosts = localStorage.getItem('downvoted') || ''
    downPosts = downPosts.split(',')
    downPosts = downPosts.filter(i => i.length > 1)
    downPosts = downPosts.filter(i => i != postId)
    localStorage.setItem('downvoted', downPosts.join(','))
  }
}

downvote = e => {
  let downvote = document.querySelector(`#${e.id}`).firstChild.classList
  let postId = e.id.replace('downvote-', '')
  let upvote = document.querySelector(`#upvote-${postId}`).firstChild.classList
  if(downvote.contains('activated')) {
    downvote.remove('activated')
    fetch(`/upvote/${postId}`)
    let posts = localStorage.getItem('downvoted') || ''
    posts = posts.split(',')
    posts = posts.filter(i => i.length > 1)
    posts = posts.filter(i => i != postId)
    localStorage.setItem('downvoted', posts.join(','))
  } else {
    downvote.add('activated')
    fetch(`/downvote/${postId}`)
    // Downvote
    if(upvote.contains('activated')) {
      upvote.remove('activated')
      fetch(`/downvote/${postId}`)
    }
    // Local Storage Of Votes
    let posts = localStorage.getItem('downvoted') || ''
    posts = posts.split(',')
    posts = posts.filter(i => i.length > 1)
    posts.push(postId)
    localStorage.setItem('downvoted', posts.join(','))
    let upPosts = localStorage.getItem('upvoted') || ''
    upPosts = upPosts.split(',')
    upPosts = upPosts.filter(i => i.length > 1)
    upPosts = upPosts.filter(i => i != postId)
    localStorage.setItem('upvoted', upPosts.join(','))
  }
}
