// document.querySelector('.frou').addEventListener("click", function() {
//     this.classList.toggle("active");
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
	if(!audio) {
		console.log('pizza');
		return;
    }
	audio.currentTime = 0
    audio.play()
	trim.classList.add('active')
	setTimeout( function () { trim.classList.remove('active'); }, 200);
}





var x = window.matchMedia("(max-width: 600px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


function myFunction(x) {
	
	// console.log(e);
	// if (e === undefined) {
	// 	console.log('fromage');
		
	// 	e = 0;
	// 	return e
	//   } 

	const y = document.querySelectorAll(".frou");
	const mem = []
	
	if (x.matches) { // If media query matches
		var i;
		for (i = 0; i < y.length; i++) {
			mem.push (y[i].innerHTML);
			console.log(y[i]);
			
			y[i].innerHTML = '•';
			y[i].style.fontSize =  "50px";
		}
		// y.innerHTML = '•' 
		// console.log(y);
		
	} else if (x.matches && e == 1){
		console.log('raclette');
		
	} else {
		e = 0
		// console.log('pizza');
		for (i = 0; i < y.length; i++) {
			mem.push (y[i].innerHTML);
			y[i].innerHTML = mem[i];
		}
		
}}

