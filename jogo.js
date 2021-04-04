console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Localização do sprite dentro do arquivo
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            chao.x, chao.y, // Local onde vai  ser dezenhado o sprite
            chao.largura, chao.altura, // Tamanho que vai ser dezenhado no canvas
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Localização do sprite dentro do arquivo
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, // Local onde vai  ser dezenhado o sprite
            chao.largura, chao.altura, // Tamanho que vai ser dezenhado no canvas
        );
    }
}
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
    chao.desenha();
    flappyBird.desenha();
    requestAnimationFrame(loop);
}

loop();