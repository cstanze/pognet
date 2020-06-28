const boardPermissionsId = document.querySelector('#boardId').value
const boardSpacer = document.querySelector('#board-spacer')
const boardSettingsMobile = document.querySelector('#board-settings-mobile')
const boardSettings = document.querySelector('#board-settings')
const newBoardReference = document.querySelector('#new-board-ref')

fetch(`${window.location.origin}/api/board/${boardPermissionsId}`).then(async json => {
  let board = await json.json()
  if(typeof board.code != 'undefined') {
    if(board.code == 10060) return
  }
  if(localStorage.getItem('userId').length > 1) {
    let boardViewerId = localStorage.getItem('userId')
    if(!(board._creator == boardViewerId || board._mods.includes(boardViewerId))) {
      boardSettingsMobile.parentNode.removeChild(boardSettingsMobile)
      boardSettings.parentNode.removeChild(boardSettings)
    } else {
      boardSettingsMobile.href = boardSettingsMobile.href.replace('id', boardPermissionsId)
      boardSettings.href = boardSettings.href.replace('id', boardPermissionsId)
    }
  } else {
    boardSettingsMobile.parentNode.removeChild(boardSettingsMobile)
    boardSettings.parentNode.removeChild(boardSettings)
  }
})
