const userBio = document.querySelector('.profile-bio')

userBio.innerText = userBio.innerText.length > 240 ? userBio.innerText.substring(0, 240)+'...' : userBio.innerText