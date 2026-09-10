# Vibecode Experience — GO Games

Oficina de 60 minutos com Codex.

## Preparação do facilitador

Ensaie os prompts no computador do evento. Deixe o Codex autenticado, a pasta do projeto e o navegador prontos. Salve uma versão inicial funcional e uma versão com melhoria para contingência. Se usar uma versão pronta, informe isso à plateia. Organize duplas e confirme conexão e acesso antes da oficina.

## Prompt inicial

Crie um minigame chamado Neon Dodge em um único arquivo index.html, com HTML, CSS e JavaScript, sem bibliotecas nem recursos externos. O jogador se move na horizontal com setas ou A/D e desvia de obstáculos que caem. A pontuação aumenta com o tempo. Uma colisão encerra a partida. Inclua tela inicial, instruções e botão de reiniciar que zera todo o estado. Use visual neon com bom contraste. Implemente na pasta atual, explique como abrir no navegador e verifique movimento, colisão e reinício. Relate o que conseguiu testar e qualquer limitação.

## Condução e prompts de continuação

### 01 — Vibecode Experience (1 min)

Abertura: “Quem aqui já imaginou um jogo e nunca conseguiu tirar a ideia da cabeça?” Convide iniciantes e pessoas que já programam. Explique que o objetivo da hora é construir e testar um protótipo pequeno com IA. Apresente-se verbalmente.

### 02 — Qual jogo você criaria? (2 min)

00:01–00:03. Peça duas respostas curtas da plateia. Aproveite uma referência de mecânica, sem deixar o escopo crescer. Diga que hoje o resultado será um jogo simples de desviar de obstáculos.

### 03 — A missão de hoje (2 min)

00:03–00:05. A meta é didática, não uma promessa de geração instantânea. Use o título Neon Dodge como nome do projeto da oficina. O protótipo terá movimento horizontal, obstáculos descendentes, pontuação por tempo e reinício.

### 04 — Roteiro de 60 minutos (2 min)

00:05–00:07. Oriente a dinâmica: quem tem computador pode acompanhar em dupla; quem está sem equipamento participa das decisões e testes. Os intervalos abaixo cobrem os 60 minutos completos.

### 05 — Vibe coding na oficina (2 min)

00:07–00:09. Definição operacional para esta oficina: criar software conversando com a IA e iterando sobre o resultado. Reforce que avaliar o comportamento e entender as decisões continua sendo trabalho humano. Não faça alegações sobre desempenho garantido.

### 06 — Você e o Codex (3 min)

00:09–00:12. Mostre o projeto no Codex. Explique que ele pode trabalhar com código e que o fluxo de criação de jogos inclui construção e teste. As ferramentas disponíveis e o acesso dependem do ambiente. Fonte oficial consultada: https://developers.openai.com/codex/use-cases?category=data&category=engineering&category=front-end&category=integrations&category=ios&category=macos&search=Automation&task_type=analysis&task_type=code&task_type=testing&team=engineering&team=operations&team=sales . Escolha do exercício e divisão de responsabilidades são orientações desta oficina.

### 07 — Preparação (2 min)

00:12–00:14. Antes do evento: deixe Codex instalado e autenticado, valide acesso e conexão, ensaie o prompt na máquina da apresentação. Prepare uma pasta exclusiva go-games e versões locais de contingência. Ao vivo: selecione a pasta de trabalho no Codex e deixe um navegador aberto. Não gaste o tempo da oficina instalando ferramentas em toda a plateia. Duplas podem compartilhar uma conta em um único computador sem compartilhar credenciais.

### 08 — Um prompt que orienta (2 min)

00:14–00:16. Compare “faça um jogo legal” com um pedido que especifica o que deve acontecer. Leia os quatro componentes em voz alta. Explique que um critério de teste permite avaliar se a IA entregou o pedido.

### 09 — Primeiro jogo ao vivo (9 min)

00:16–00:25. Cole o prompt completo a seguir no Codex. Enquanto ele trabalha, mostre à plateia a relação entre o pedido e os arquivos criados. Abra o index.html no navegador, jogue, provoque uma colisão e reinicie. Salve uma cópia da primeira versão que funciona. Se a geração ultrapassar o bloco, use uma versão previamente ensaiada e informe isso à plateia. Não diga que um jogo foi gerado ao vivo se abriu uma versão pronta.
PROMPT COMPLETO:
Crie um minigame chamado Neon Dodge em um único arquivo index.html, com HTML, CSS e JavaScript, sem bibliotecas nem recursos externos. O jogador se move na horizontal com setas ou A/D e desvia de obstáculos que caem. A pontuação aumenta com o tempo. Uma colisão encerra a partida. Inclua tela inicial, instruções e botão de reiniciar que zera todo o estado. Use visual neon com bom contraste. Implemente na pasta atual, explique como abrir no navegador e verifique movimento, colisão e reinício. Relate o que conseguiu testar e qualquer limitação.

### 10 — A plateia decide (2 min)

00:25–00:27. Faça votação por mãos levantadas. Escolha apenas uma melhoria para a demonstração coletiva. As outras podem virar variações nas duplas. Traduzir o desejo em comportamento observável é a parte central deste exercício.

### 11 — A melhoria ao vivo (5 min)

00:27–00:32. Se vencer escudo: “Adicione um escudo de uso único ativado com Espaço. Ele absorve a próxima colisão e desaparece. Mostre se está disponível ou consumido. Reiniciar recupera o escudo. Preserve os controles e teste colisão com e sem proteção.” Se vencer dificuldade: “Aumente gradualmente a velocidade dos obstáculos a cada 10 segundos, até um limite jogável. Mostre o nível atual. Reiniciar deve restaurar a velocidade inicial. Preserve o restante e teste.” Compare antes/depois no navegador, sem prometer um tempo fixo de execução.

### 12 — Prática em duplas (8 min)

00:32–00:40. Reserve 2 minutos para formular a mudança, 4 para implementar e 2 para testar. Quem já tem a versão inicial continua nela. Quem ficou para trás pode usar uma cópia local do protótipo de apoio preparada pelo facilitador. Sem computador, descreva a melhoria e use a demonstração coletiva. Circule e evite pedidos muito amplos.

### 13 — Investigação de erros (3 min)

00:40–00:43. Mostre como relatar um problema que realmente apareceu. Se não houver erro, use o exemplo como hipótese didática e diga isso. Inclua passos, resultado esperado e resultado observado. Peça que Codex investigue a causa antes de mudar o código.

### 14 — Rodada de testes (3 min)

00:43–00:46. Peça para a pessoa que não fez o último prompt assumir o teclado. Ela deve rodar os quatro testes. Se algo falhar, registre o caso e peça uma correção pequena. Não aceite só a frase “funcionou”: mostre o comportamento.

### 15 — Showcase da oficina (5 min)

00:46–00:51. Escolha duas ou três duplas. Dê cerca de 60 segundos para cada uma mostrar o jogo e explicar a mudança. Reserve o restante para troca entre telas e comentários. Se o público não estiver com máquinas, compare a versão inicial com a melhoria escolhida coletivamente. Valorize clareza da ideia e a evidência do teste.

### 16 — Depois do protótipo (3 min)

00:51–00:54. Explique que o resultado é um protótipo didático. Para compartilhar, confirme os testes em outros tamanhos de tela e dispositivos. Use apenas arte e áudio que possam ser utilizados. Mantenha cópia da versão funcional antes de novas mudanças. Nosso exercício não precisa de credenciais, pagamentos nem dados pessoais.

### 17 — Seu próximo projeto (3 min)

00:54–00:57. Convide cada participante a pensar em um projeto pequeno. Peça uma frase contendo usuário, ação principal e um teste que demonstre valor. Exemplos são propostas da oficina, não alegações de entrega automática. Reserve uma ou duas respostas para a plateia.

### 18 — Perguntas e encerramento (3 min)

00:57–01:00. Abra perguntas. Encerre pedindo que uma pessoa complete: “Meu próximo projeto será...”. Reforce o ciclo praticado: descrever o comportamento, implementar com ajuda da IA, observar e ajustar. Convide a plateia a continuar com um projeto pequeno.

## Arte

Capa incorporada ao PowerPoint e visível em Previa-Vibecode.png. Criada com ImageGen integrado. Prompt de arte: controle de videogame translúcido em vidro fumê se desfazendo em fragmentos voxel, iluminação violeta e verde-lima, fundo preto, espaço negativo à esquerda, sem texto ou marcas.
