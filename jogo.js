console.log('Flappy Bird');

let frames = 0
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

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        ceu: {
            spriteX: 52,
            spriteY: 169
        },
        espaco: 80,
        desenha() {

            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 80;

                // Cano do Céu
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                )

                // Cano do Chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                ),
                    par.canoCeu = {
                        x: canoCeuX,
                        y: canos.altura + canoCeuY
                    }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })

        },
        pares: [{
        }],
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                })
            }


            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    console.log('Você perdeu!')
                    somDeHit.play();
                    setTimeout(() => {
                        mudaParaTela(telas.INICIO);
                    }, 0);
                    return;
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }


            })
        },
    }
    return canos;
}

// Chao
function criaChao() {
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
// Faz colisão com o chão
function fazColisao(flappyBird, chao) {
    if ((flappyBird.y + flappyBird.altura) >= globais.chao.y) {
        return true;
    }
    return false;
}
// Flappy bird
function criaFlappyBird() {
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
            if (fazColisao(flappyBird, globais.chao)) {
                console.log("Fez colisão");
                somDeHit.play();
                setTimeout(() => {
                    mudaParaTela(telas.INICIO);
                }, 300);
                return;
            }

            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            // console.log('passouOIntervalo', passouOIntervalo)

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }
            // console.log('[incremento]', incremento);
            // console.log('[baseRepeticao]',baseRepeticao);
            // console.log('[frame]', incremento % baseRepeticao);
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Localização do sprite dentro do arquivo
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
            globais.cano = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha(),
                globais.flappyBird.desenha(),
                globais.chao.desenha(),
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
            globais.cano.desenha()
        globais.chao.desenha(),
            globais.flappyBird.desenha()
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
        globais.cano.atualiza();
    }
}

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames++;

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
    document.body.onkeyup = function (e) {
        var key = event.which || event.keyCode;
        if (key === 32) {
            telaAtiva.click();
        }
    }
})

mudaParaTela(telas.INICIO)
loop();