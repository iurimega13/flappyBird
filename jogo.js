console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function loop() {
    contexto.drawImage(
        sprites,
        0, 0, // Localização do sprite dentro do arquivo
        34.24, 24,// Tamanho do recorte na sprite
        10, 50, // Local onde vai  ser dezenhado o sprite
        34.24, 24,// Tamanho que vai ser dezenhado no canvas 
    );
    
    requestAnimationFrame(loop); 
}

loop();