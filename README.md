# Vibecode Experience — GO Games

Site público da oficina de 60 minutos sobre implementação de aplicativos com IA generativa.

- Site principal: https://vibecode-experience-go-games.vercel.app
- GitHub Pages: https://andrei7x.github.io/vibecode-experience-go-games/
- Repositório: https://github.com/andrei7x/vibecode-experience-go-games

## Experiência

- Catálogo de seis possibilidades, com filtros, detalhes e prompts.
- Laboratório que monta um prompt a partir de escolhas do visitante.
- Minigame Neon Dodge, com controles por teclado e toque, dificuldade, pausa, escudo e recorde local.
- Modo palco com navegação por seções e atalhos PageUp/PageDown.
- Conteúdo sobre IA na construção e IA dentro do produto, roteiro da oficina e materiais para continuar.

O laboratório é um gerador de templates local, identificado como tal. Não há chamada a modelo generativo em tempo real, simulação de resposta de IA nem consumo de API de modelos neste site.

## Executar

Requer Node.js. Não há dependências de execução ou instalação obrigatória.

```sh
npm run dev
```

Abra http://127.0.0.1:4173. Para verificação de sintaxe: `npm run check`.

## Publicação

`dist/` contém todo o site. A Vercel usa `vercel.json`. GitHub Pages serve uma cópia exata de `dist/` na branch `gh-pages`. Links de arquivos são relativos para funcionar também no caminho do repositório.

A publicação inicial na Vercel foi feita pela CLI. A conexão automática com GitHub não ficou disponível na conta durante a configuração. Portanto, um push em `main` sozinho não publica na Vercel: execute `vercel deploy --prod` no diretório do projeto, com a conta autenticada, ou conecte o repositório nas configurações do projeto da Vercel. GitHub Pages publica os pushes em `gh-pages`.

Depois de alterar o site, valide, faça commit em `main`, publique na Vercel e atualize a branch de Pages:

```sh
git subtree split --prefix dist -b pages-release
git push origin pages-release:gh-pages
git branch -D pages-release
```

A branch temporária deve ter um nome livre. O comando final remove somente a branch local temporária. A publicação inicial de Pages usa `gh-pages` na raiz.

## Supabase

O projeto usa uma tabela própria: `public.vibecode_catalog`. O schema está em `database/schema.sql`, e o conteúdo inicial em `database/seed.sql`. O navegador consulta apenas linhas publicadas, ordenadas por `sort_order`.

`dist/config.js` contém a URL e uma chave **publishable**, destinada ao navegador. Ela não é chave secreta nem service role. A proteção vem de RLS e permissões SQL: `anon` e `authenticated` podem somente ler linhas com `published = true`. Não podem inserir, alterar ou apagar conteúdo. Nenhuma tabela preexistente foi alterada.

Para atualizar o catálogo, edite a tabela no painel do Supabase com acesso administrativo. Não execute novamente `schema.sql` em um banco onde a tabela já existe. Atualize também `dist/catalog.json`, a cópia de apoio exibida com aviso se a consulta ao banco falhar. Alterar somente o JSON não substitui as linhas no banco quando ele está disponível.

O site não coleta cadastros, dados pessoais nem prompts. O recorde do jogo permanece no navegador. Para manter acesso após o evento, preserve o repositório, o projeto da Vercel e o projeto do Supabase ativos. A cópia local do catálogo ajuda na indisponibilidade do banco.

## Arte e fontes

Arte de capa criada com ImageGen para a oficina, incorporada em `dist/assets/hero.png`. Tipografia: Space Grotesk e DM Sans via Google Fonts, com fallback local em Arial.

## Referências

- Codex e fluxos de construção: https://developers.openai.com/codex/
- Segurança da Data API: https://supabase.com/docs/guides/api/securing-your-api
- Publicação de sites na Vercel: https://vercel.com/docs/deployments/overview

As ideias, os prompts e a organização da oficina são conteúdo didático. Não representam promessa de resultado automático ou programação oficial do evento.


## Neon Strike — jogo de nave

Use ←/→ ou A/D para mover, ↑ para atirar, P para pausar e Espaço para ativar o escudo opcional. Os botões na tela permitem jogar no celular. Asteroides e naves são destrutíveis; naves inimigas disparam projéteis. Velocidade, frequência de aparição e cadência inimiga aumentam gradativamente, com limites, e um chefe aparece após 30 segundos de cada fase. O recorde de sobrevivência é local e separado do jogo anterior.

Verificação da simulação: `node scripts/test-space.mjs`. A interface também foi verificada em navegador desktop e viewport móvel para movimento, disparos, pausa, derrota e reinício.


### Fases, chefes e áudio

Naves blindadas têm 4 a 8 pontos de resistência; chefes começam com 45 e ganham 10 por fase. Derrotar o chefe libera a próxima fase. Três cenários espaciais se alternam: Órbita Violeta, Planeta Glacial e Fronteira Solar. Velocidade e pressão aumentam com tempo e fase, respeitando limites. Música arcade original e efeitos são sintetizados com Web Audio após iniciar o jogo; o botão Som permite silenciar, e a pausa interrompe o áudio.


### Ondas, destroços, poderes e invasão

Explosões produzem uma ondulação visual no cenário. A preferência do sistema por movimento reduzido desativa a distorção, mantendo os anéis de choque. Naves blindadas e chefes liberam seis destroços perigosos. Os power-ups aparecem em rotação: raio (turbo de movimento e cadência), seta circular (spin com disparo em leque e interceptação de tiros/destroços próximos) e escudo (invulnerabilidade). São coletados por contato, duram 7 segundos e podem coexistir.

Pressione E perto de uma nave inimiga comum ou blindada para abrir o minigame 2D de invasão do reator. Acerte três sincronizações na zona verde em 12 segundos; cada erro desconta 1 segundo. O combate e os poderes ficam congelados durante a interação. Sucesso destrói a nave; falha retorna ao combate, sem dano automático. Ambas as saídas dão 2 segundos de proteção. Cada nave admite uma tentativa. O botão na tela também permite sincronizar no celular.
