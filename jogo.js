console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage( // Completa parte faltando
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

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

        contexto.drawImage( // Completa parte faltando
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
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    flappyBird.y++
    requestAnimationFrame(loop);
}

loop();