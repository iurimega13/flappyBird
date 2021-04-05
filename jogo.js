console.log('Flappy Bird');

const somDeHit = new Audio();
somDeHit.src = './efeitos/hit.wav'

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

function criaChao() {
    // Chao
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
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
    return chao;
}

function fazColisao(flappyBird, chao) {
    if ((flappyBird.y + flappyBird.altura) >= chao.y) {
        return true;
    }
    return false;
}
function criaFlappyBird() {
    // Flappy bird
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34.24,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.5,
        velocidade: 0,
        gravidade: 0.25,
        atualiza() {
            if (fazColisao(flappyBird, chao)) {
                console.log("Fez colisão");
                somDeHit.play();
                setTimeout(() => {
                    mudaParaTela(telas.INICIO);
                }, 500);
                return;
            }

            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, // Localização do sprite dentro do arquivo
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y, // Local onde vai  ser dezenhado o sprite
                flappyBird.largura, flappyBird.altura, // Tamanho que vai ser dezenhado no canvas
            );
        }
    };
    return flappyBird;
}

/// [mensagemGetReady]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        );
    }
}

const globais = {};

let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
};

const telas = { // Telas do jogo
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird(); // Toda vez que inicia cria um novo flappyBird 
            globais.chao = criaChao(); // Toda vez que inicia cria um novo chão
        },
        desenha() {
            planoDeFundo.desenha(),
                globais.chao.desenha(),
                globais.flappyBird.desenha()
            mensagemGetReady.desenha()
        },
        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

telas.JOGO = {
    desenha() {
        planoDeFundo.desenha(),
            globais.chao.desenha(),
            globais.flappyBird.desenha()
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
}

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(telas.INICIO)
loop();