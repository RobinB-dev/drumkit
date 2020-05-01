// document.querySelector('.frou').addEventListener("click", function() {
//     this.classList.toggle("active");
//     console.log('pizza');
    
//   });

const button = document.querySelectorAll('.but');

for (let but of button) {
	but.onclick = () => but.classList.toggle('active');
}