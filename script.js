const container = document.querySelector('.container')

const zone = container.querySelector('.zone')
const changeTitleh1 = container.querySelector('.drumpad1')
const changeTitleh2 = container.querySelector('.playground')
const changeTitleh3 = container.querySelector('.memory')
const changeTitleh4 = container.querySelector('.drumpad2')
const text1 = container.querySelector('.text1')
const playBut = container.querySelector('.playBut')
const text2 = container.querySelector('.text2')
const animateColor = document.querySelector('.aniamteColor')
const animateColor1 = document.querySelector('.aniamteColor1')
const keyboardBut = container.querySelector('.keyboardBut')
const dot = container.querySelector('.dot')
const deep = container.querySelector('.deep')
const modeKeyboard = container.querySelector('.modeKeyboard')
// const animateColor2 = document.querySelector('animate')

const styles = getComputedStyle(document.documentElement)
const varAccent1Light = String(styles.getPropertyValue('--accent1')).trim()
const varAccent1Dark = String(styles.getPropertyValue('--accent1Dark')).trim()
const varPrimaryColorLight = String(styles.getPropertyValue('--primaryColor')).trim()
const varPrimaryColorDark = String(styles.getPropertyValue('--primaryColorDark')).trim()

const arrow = container.querySelectorAll('.arrowSpan')
const button = container.querySelectorAll('.clickable')
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
let win = 0
let varPrimaryColor = varPrimaryColorLight
let varAccent1 = varAccent1Light
let timer = 0

let greetings = ['wow impressionnant', 'joli !', 'excellente mémoire', 'bravo', 'clap clap clap', 'tu vas battre mon score là', 'hop un niveau de plus', 'bien joué', 'niveau suivant !', 't\'es sur la bonne voie', 'continue comme ça', 'Bruno Simon le meilleur prof', 'champion' ,'t\'es le meilleur', 'c\'était facile', 'mémoire au top', 't\'es bien partis', 'encore un peu aller', 'un niveau de plus']

// if (typeof(codeTable) == 'undefined') {
// 	const codeTable = ['A', 'Z', 'E', 'R', 'T', 'Q', 'S', 'D', 'F', 'G', 'W', 'X', 'C', 'V', 'B']
// }



animateColor.setAttribute('values', varAccent1 + ';' + varPrimaryColor + ';' + varAccent1);
animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent1 + ';' + varPrimaryColor);

for (const but of button) {
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

let keyboardMode = 0

keyboardBut.addEventListener('click', function() {
	keyboardMode++
	for (i = 1; i <= nbButtons; i++) {
		if(keyboardMode%2 != 0){
			keyboardBut.classList.add('keyboardButActive')
			dot.style.color = varAccent1
			const changeKeys = container.querySelectorAll('.textBut')
			const changeKeyboard = []
			for (i = 0; i < changeKeys.length; i++) {
				const searchObj = codeTable.find(search => search.nb == i+1 ).querty
				// console.log(searchObj);
				changeKeyboard.push(searchObj)
				changeKeys[i].textContent = changeKeyboard[i]
			}
			// modeKeyboard.textContent = 'QUERTY'
		} else if (keyboardMode%2 != 1){
			const changeKeys = container.querySelectorAll('.textBut')
			const changeKeyboard = []
			keyboardBut.classList.remove('keyboardButActive')
			dot.style.color = '#5e5e5e'
			for (i = 0; i < changeKeys.length; i++) {
				const searchObj = codeTable.find(search => search.nb == i+1 ).azerty
				// console.log(searchObj);
				changeKeyboard.push(searchObj)
				changeKeys[i].textContent = changeKeyboard[i]
			}
			// modeKeyboard.textContent = 'QUERTY'
	
		} else {
			console.log(error);
		}
		
	}
})


// getKeyboard : get all the lettres of the keyboard chosen in the table for change the keys on display depending on whether you choose azerty or querty
// getKeycode : get all keycode in the table to disable key that aren't in it
for (i = 1; i <= nbButtons; i++) {
	const searchObj = codeTable.find(search => search.nb == i ).azerty
	const searchKeycode = codeTable.find(search => search.nb == i ).keycode
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
	const trim = document.querySelector(`.clickable[data-key='${nbKey}']`)

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

playBut.addEventListener('click', start )
function start(){
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
	zone.style.cursor = 'not-allowed'
	for (const but of button) {
		but.style.cursor = 'not-allowed'
		but.style.pointerEvents = 'none'
	}
}

// reenable click end change cursor
function butReEnable(){
	zone.style.cursor = 'auto'
	for (const but of button) {
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
		for (const but of button) {
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
			timer = calcTimer(botMem.length)
			console.log(1000 - timer);
			
		},i*1000 - timer )
	}
	setTimeout(function () {
		butReEnable()
	}, 1000 * botMem.length - 500)

}

function calcTimer(x){
	return (x<10) ? x*60 : 600
}




// change the game mode by using the side arrows
for (i = 0; i < arrow.length; i++) {	
	
	arrow[i].addEventListener('click', function() {
		modeGame++
		if(modeGame%2 != 0){
			document.documentElement.setAttribute('data-theme', 'dark')
			changeTitleh1.style.display = 'none'
			changeTitleh2.style.display = 'none'
			changeTitleh3.style.display = 'block'
			changeTitleh4.style.display = 'block'
			text1.textContent = 'Testez votre memoire en reproduisant la sequence'
			playBut.textContent = 'JOUER'
			text2.textContent = ''
			playBut.style.display = 'block'
			varAccent1 = varAccent1Dark
			varPrimaryColor = varPrimaryColorDark
			animateColor.setAttribute('values', varAccent1 + ';' + varPrimaryColor + ';' + varAccent1);
			animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent1 + ';' + varPrimaryColor);
			for (const but of button) {
				but.style.pointerEvents = 'none'
			}
			if(keyboardMode%2 != 0){
				dot.style.color = varAccent1
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
			varAccent1 = varAccent1Light
			varPrimaryColor = varPrimaryColorLight
			animateColor.setAttribute('values', varAccent1 + ';' + varPrimaryColor + ';' + varAccent1);
			animateColor1.setAttribute('values', varPrimaryColor + ';' + varAccent1 + ';' + varPrimaryColor);
			if(keyboardMode%2 != 0){
				dot.style.color = varAccent1
			}
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
		dot.style.display = 'none'
		deep.style.display = 'none'
	} else {
		for (i = 0; i < changeKeys.length; i++) {
			mem.push (changeKeys[i].textContent)
			changeKeys[i].textContent = mem[i]
			changeKeys[i].style.fontSize =  ''
			text1.style.fontSize = '16px'
		}
		dot.style.display = 'flex'
		deep.style.display = 'flex'
}}
