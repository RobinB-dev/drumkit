const container = document.querySelector('.container')

const fond = container.querySelector('.fond')
const changeTitleh1 = container.querySelector('.drumpad1')
const changeTitleh2 = container.querySelector('.playground')
const changeTitleh3 = container.querySelector('.memory')
const changeTitleh4 = container.querySelector('.drumpad2')
const text1 = container.querySelector('.text1')
const playBut = container.querySelector('.playBut')
const text2 = container.querySelector('.text2')
const animateColor = document.querySelector('.aniamteColor')
const animateColor1 = document.querySelector('.aniamteColor1')
// const animateColor2 = document.querySelector('animate')

const styles = getComputedStyle(document.documentElement)
const varAccent1 = String(styles.getPropertyValue('--accent1')).trim()
const varAccent2 = String(styles.getPropertyValue('--accent2')).trim()
const varPrimaryColor = String(styles.getPropertyValue('--primaryColor')).trim()

const arrow = container.querySelectorAll('.arrowSpan')
const button = container.querySelectorAll('.but')
const nbButtons = 15
const arrayNb = []
const getKeyboard = []
const getKeycode = []
let botMem = []
let playerMem = []
let trim = {}
let modeGame = 0
let playValue = 0
let wrong = 0
var win = 0

let greetings = ['wow impressionnant', 'joli !', 'excellente mémoire', 'bravo', 'clap clap clap', 'tu vas battre mon score là', 'hop un niveau de plus', 'bien joué', 'niveau suivant !', 't\'es sur la bonne voie', 'continue comme ça', 'Bruno Simon le meilleur prof', 'champion' ,'t\'es le meilleur', 'c\'était facile', 'mémoire au top', 't\'es bien partis', 'encore un peu aller', 'un niveau de plus']

// if (typeof(codeTable) == 'undefined') {
// 	const codeTable = ['A', 'Z', 'E', 'R', 'T', 'Q', 'S', 'D', 'F', 'G', 'W', 'X', 'C', 'V', 'B']
// }



animateColor.setAttribute('values', varAccent1 + ';' + varPrimaryColor + ';' + varAccent1);
animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent1 + ';' + varPrimaryColor);

for (let but of button) {
	// put in an array all the data-key of the buttons of the page
	const countNb = but.getAttribute('data-key')
	if (countNb == null){
	}else {
		arrayNb.push(countNb)
	}
	butClick(but)
}




// run the soundFunct function when a button is clicked
function butClick(but){
	but.onclick = function() {
		const nbKey = but.getAttribute('data-key')
		if(!nbKey) {
			return;
		}
		playerMem.push(parseInt(nbKey))
		soundFunct(nbKey)
	}
}


// getKeyboard : get all the lettres of the keyboard chosen in the table for change the keys on display depending on whether you choose azerty or querty
// getKeycode : get all keycode in the table to disable key that aren't in it
for (i = 1; i <= nbButtons; i++) {
	const searchObj = codeTable.find(search => search.nb == i ).azerty // I may add this functionality later
	const searchKeycode = codeTable.find(search => search.nb == i ).keycode // I may add this functionality later
	getKeyboard.push(searchObj)
	getKeycode.push(searchKeycode)
	
}

// run the soundFunct function when a keyboard key is pressed
window.addEventListener('keydown', keySelect )
function keySelect(event){
	const found = getKeycode.find(element => element == event.keyCode)
	// IF is to remove error messages from keycode that aren't in the table (not necessary)
	if (typeof(found) == 'undefined' ) {
	} else {
		const dataKey = event.keyCode
		const nbKey = codeTable.find(xd => xd.keycode == dataKey ).nb
		playerMem.push(parseInt(nbKey))
		soundFunct(nbKey)
	}
	
}


const soundArray = []


function soundFunct(nbKey) {
	const audio = document.querySelector(`audio[data-key='${nbKey}']`)
	const trim = document.querySelector(`.but[data-key='${nbKey}']`)

	// test if we are in the memory mode
	if(modeGame%2 != 0)
	{
		// test if the play button is press
		if (playValue == 1) {
			for (i = 0; i <= botMem.length; i++) {
				// test if the key press by the user is the same as the corresponding key press by the bot
				if (playerMem[i] == botMem[i]) {
					// test if the full sequence is the same
					if (i+1 == botMem.length) { // It seems to be a fairly simple structure but I struggled to get there, really
						win = win + 1
						const greetingsText = greetings[Math.floor(Math.random() * greetings.length)]
						text1.textContent = 'Niveau : ' + win
						text2.textContent = greetingsText
						setTimeout(function () {
							wrong = 0
							verifFunc()
						}, 2000)
					}
				} else if (playerMem[i] === undefined) {
					// console.log('pas joué')
				} else {
					wrong = 1
					verifFunc()
				}
			}
		} else if (playValue == 0) {
			// console.log('playBut non cliqué')
		} else {
			console.log('erreur')
		}
	} else if (modeGame%2 != 1) {
		text2.textContent = audio.getAttribute('data-id')
	}
	
	
	if(!audio) {
		return;
	}
	
	audio.currentTime = 0
	audio.play()
	
	// animation of the touchdown
	trim.classList.add('active')
	setTimeout( function () { trim.classList.remove('active'); }, 200)
	
	// array of all sounds played
	const nameAudio = audio.getAttribute('data-id')
	soundArray.push(nameAudio)
	// text2.textContent = nameAudio
}



playBut.addEventListener('click', function() {
	playValue = 1

})

playBut.addEventListener('click', debut )
function debut(){
	text1.style.fontSize = '16px'
	text1.textContent = 'Niveau : 0'
	butDisable()
	playBut.style.display = 'none'
	setTimeout(function () {
		verifFunc()
	}, 1000 )
}

// disable click end change cursor
function butDisable(){
	fond.style.cursor = 'not-allowed'
	for (let but of button) {
		but.style.cursor = 'not-allowed'
		but.style.pointerEvents = 'none'
	}
}

// reenable click end change cursor
function butReEnable(){
	fond.style.cursor = 'auto'
	for (let but of button) {
		but.style.cursor = 'pointer'
		but.style.pointerEvents = 'auto'
	}
}

function verifFunc(){
	if (wrong == 0) {
		botTurn()	
	} else if (wrong == 1) {
		playBut.textContent = 'REJOUER'
		text2.textContent = 'dommage !'
		text1.textContent = 'Niveau : ' + win + ' Echec'
		for (let but of button) {
			but.classList.add('wrong')
			but.style.pointerEvents = 'none'
			setTimeout( function () { but.classList.remove('wrong'); }, 200)
		}
		
		setTimeout( function () { playBut.style.display = 'block'; }, 1200)
		win = 0
		wrong = 0
		botMem = []
	} else if (wrong ==2) {
		win = 0
		wrong = 0
		botMem = []
		
	} else {
		console.log('erreur')
	}
	

}

function botTurn(){
	const randomKey = arrayNb[Math.floor(Math.random() * arrayNb.length)]
	botMem.push(randomKey)
	playerMem = []
	// const last = botMem[i-1]
	for (let i = 0; i < botMem.length; i++) {
		butDisable()
		setTimeout(function () {
			const dataKey = botMem[i]
			soundFunct(dataKey)
			// console.log('player')
		}, i * 1000)
	}
	setTimeout(function () {
		butReEnable()
	}, 1000 * botMem.length - 500)

}






// change the game mode by using the side arrows
for (i = 0; i < arrow.length; i++) {	
	
	arrow[i].addEventListener('click', function() {
		modeGame++
		if(modeGame%2 != 0)
		{
			document.documentElement.setAttribute('data-theme', 'dark')
			changeTitleh1.style.display = 'none'
			changeTitleh2.style.display = 'none'
			changeTitleh3.style.display = 'block'
			changeTitleh4.style.display = 'block'
			text1.textContent = 'Testez votre memoire en reproduisant la sequence'
			playBut.textContent = 'JOUER'
			text2.textContent = ''
			playBut.style.display = 'block'
			animateColor.setAttribute('values', varAccent2 + ';' + varPrimaryColor + ';' + varAccent2);
			animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent2 + ';' + varPrimaryColor);
			for (let but of button) {
				but.style.pointerEvents = 'none'
			}
		}
		else
		{
			document.documentElement.setAttribute('data-theme', 'light')
			changeTitleh1.style.display = 'block'
			changeTitleh2.style.display = 'block'
			changeTitleh3.style.display = 'none'
			changeTitleh4.style.display = 'none'
			text1.textContent = 'Espace terrain de jeu, vous avez le controle ici'
			text2.textContent = ''
			playBut.style.display = 'none'
			wrong = 2
			butReEnable()
			verifFunc()
			if (mediaChange.matches == true) {
				text1.style.fontSize = '9.5px'
				
			}
			animateColor.setAttribute('values', varAccent1 + ';' + varPrimaryColor + ';' + varAccent1);
			animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent1 + ';' + varPrimaryColor);
		}
  })
}


// function that changes the display according to the width of the screen
const mediaChange = window.matchMedia('(max-width: 630px)')
mediaChange.addListener(changeKeyboard)
changeKeyboard(mediaChange)

function changeKeyboard(mediaChange) {
	const mem = getKeyboard
	const changeKeys = container.querySelectorAll('.textBut')
	
	if (mediaChange.matches) { // If media query matches
		for (i = 0; i < changeKeys.length; i++) {
			changeKeys[i].textContent = '•'
			changeKeys[i].style.fontSize =  '70px'
			if (playValue == 1) {
				text1.style.fontSize = '16px'
			} else {
				text1.style.fontSize = '9.5px'
			}
		}
	} else {
		for (i = 0; i < changeKeys.length; i++) {
			mem.push (changeKeys[i].textContent)
			changeKeys[i].textContent = mem[i]
			changeKeys[i].style.fontSize =  ''
			text1.style.fontSize = '16px'
		}
		
}}
