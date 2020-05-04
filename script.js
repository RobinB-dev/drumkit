// document.querySelector('.frou').addEventListener('click', function() {
//     this.classList.toggle('active');
//     console.log('pizza');
    
//   });


const button = document.querySelectorAll('.but');
for (let but of button) {
	ggfunct(but)
}

let trim = {}

function ggfunct(but){
	
	but.onclick = function() {
		const dataKey = but.getAttribute('data-key')
		soundFunct(dataKey)
	}
}

window.addEventListener('keydown', keySelect )
function keySelect(event){
	const dataKey = event.keyCode
	soundFunct(dataKey)
}


function soundFunct(dataKey) {	
	const audio = document.querySelector(`audio[data-key='${dataKey}']`)
	const trim = document.querySelector(`.but[data-key='${dataKey}']`)

	// console.log(audio);
	
	if(!audio) {
		return;
    }
	const nameAudio = audio.getAttribute('data-id')
	
    document.querySelector(".textTest").innerHTML = nameAudio;

	// textDisplay.textContent = nameAudio
	console.log(nameAudio);
	
	
	audio.currentTime = 0
    audio.play()
	trim.classList.add('active')
	setTimeout( function () { trim.classList.remove('active'); }, 200);
}





const mediaChange = window.matchMedia('(max-width: 600px)')
changeKeys(mediaChange) // Call listener function at run time
mediaChange.addListener(changeKeys) // Attach listener function on state changes


function changeKeys(mediaChange) {
	
	// i really did everything i could but i didn't find a way to get the characters automatically and save them
	const mem = ['A', 'Z', 'E', 'R', 'T', 'Y', 'Q', 'S', 'D', 'F', 'G', 'H', 'W', 'X', 'C', 'V', 'B', 'N']
	const y = document.querySelectorAll('.frou');
	
	if (mediaChange.matches) { // If media query matches
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].innerHTML = '•';
			y[i].style.fontSize =  '50px';
		}
	} else {
		for (i = 0; i < y.length; i++) {
			mem.push (y[i].innerHTML);
			y[i].innerHTML = mem[i];
			y[i].style.fontSize =  '';
		}
		
}}


