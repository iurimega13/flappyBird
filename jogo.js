console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34.24,
    altura: 24,
    x: 10,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Localização do sprite dentro do arquivo
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, // Local onde vai  ser dezenhado o sprite
            flappyBird.largura, flappyBird.altura, // Tamanho que vai ser dezenhado no canvas
        );
    }
}

function loop() {
    flappyBird.desenha();
    requestAnimationFrame(loop);
}

loop();