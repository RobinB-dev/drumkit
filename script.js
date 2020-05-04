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





const mediaChange = window.matchMedia('(max-width: 630px)')
changeKeys(mediaChange) // Call listener function at run time
mediaChange.addListener(changeKeys) // Attach listener function on state changes


function changeKeys(mediaChange) {
	
	// i really did everything i could but i didn't find a way to get the characters automatically and save them
	const mem = ['A', 'Z', 'E', 'R', 'T', 'Q', 'S', 'D', 'F', 'G', 'W', 'X', 'C', 'V', 'B']
	const y = document.querySelectorAll('.frou');
	
	if (mediaChange.matches) { // If media query matches
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].innerHTML = '•';
			y[i].style.fontSize =  '70px';
		}
	} else {
		for (i = 0; i < y.length; i++) {
			mem.push (y[i].innerHTML);
			y[i].innerHTML = mem[i];
			y[i].style.fontSize =  '';
		}
		
}}

let o = 0

const changeTitleh1 = document.querySelector('.h1')
const changeTitleh2 = document.querySelector('.h2')
const changeTitleh3 = document.querySelector('.h3')
const changeTitleh4 = document.querySelector('.h4')
const arrow = document.querySelectorAll(".arrowSpan")
for (i = 0; i < arrow.length; i++) {	
	
	arrow[i].addEventListener('click', function() {
		o++
		if(o%2 != 0)
		{
			document.documentElement.setAttribute('data-theme', 'dark');
			changeTitleh1.style.display = 'none'
			changeTitleh2.style.display = 'none'
			changeTitleh3.style.display = 'block'
			changeTitleh4.style.display = 'block'
		}
		else
		{
			document.documentElement.setAttribute('data-theme', 'light');
			changeTitleh1.style.display = 'block'
			changeTitleh2.style.display = 'block'
			changeTitleh3.style.display = 'none'
			changeTitleh4.style.display = 'none'
		}
  });
}


