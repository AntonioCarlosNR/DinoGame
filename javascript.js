const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJump = false;
let position = 0;

function handleKeyUp (event) {
	if(event.keyCode || event.whitch == 32){
		console.log('in handleKeyUp')		
		if(!isJump)
		jump();
		console.log( 'pulou')
	}
}

function jump() {
	
	let upInterval = setInterval(() => {
		if(position >= 150){
			clearInterval(upInterval);

			//descendo
			let downInterval = setInterval(()=> {
				if(position <= 0) {
					clearInterval(downInterval);
					isJump = false;
				} else{
					position -= 20;
					dino.style.bottom = position + 'px';
				}
			}, 20);
		} else{
			//Subindo
			position += 20;
			dino.style.bottom = position + 'px';
		}
	}, 20);
}

function creatCactus() {
	const cactus = document.createElement("div");
	let cactusPosition = 2000;
	let ramdomTime = Math.random()*4000;

	cactus.classList.add('cactus');
	cactus.style.left = 2000 + 'px';
	background.appendChild(cactus);

	let leftInterval = setInterval(()=>{
		cactusPosition -= 10;
		cactus.style.left = cactusPosition + 'px';

		if (cactusPosition < -60){
			clearInterval(leftInterval);
			background.removeChild(cactus);
		} else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			//Gameover
			clearInterval(leftInterval);
			document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'

		} else{
			cactusPosition -= 10;
			cactus.style.left= cactusPosition +'px';
		}
	},20);

	setTimeout(creatCactus, ramdomTime);
}

creatCactus();
document.addEventListener('keyup', handleKeyUp);