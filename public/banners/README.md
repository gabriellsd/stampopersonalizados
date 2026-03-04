# Banners do hero (carrossel)

Coloque aqui as imagens que aparecem no banner principal da página inicial.

## Tamanho ideal

| Uso        | Dimensões      | Proporção | Observação                          |
|-----------|----------------|-----------|-------------------------------------|
| **Recomendado** | **1920 × 640 px** | 3:1       | Boa nitidez em telas grandes        |
| Alternativa | 1920 × 800 px | 2,4:1     | Um pouco mais alto                  |
| Mínimo    | 1200 × 400 px  | 3:1       | Evite menor que isso para não pixelar |

- **Largura:** 1920 px cobre a maioria dos monitores (Full HD). Não precisa passar de 2560 px.
- **Altura:** o hero do site usa ~50% da altura da tela (70vh). Entre 600 e 800 px de altura costuma preencher bem.
- **Formato:** JPG para fotos (menor tamanho de arquivo), PNG se precisar de transparência.
- **Peso:** procure deixar cada banner com **menos de 500 KB** (comprima no TinyPNG, Squoosh ou no editor) para carregar rápido.

## Como usar

1. Salve as imagens nesta pasta (`public/banners/`).
2. No arquivo **`src/data/banners.js`**, preencha o array **`bannerImages`** com o nome de cada arquivo, na ordem desejada.

Exemplo: se você adicionar `verao.jpg` e `colecao.jpg`, em `banners.js` use:

```js
export const bannerImages = ['verao.jpg', 'colecao.jpg'];
```

## Dicas

- Use imagens em **paisagem** (veja tabela acima).
- No hero há um overlay escuro (40%) sobre a imagem; fundos mais claros ou com contraste ajudam.
- Se colocar só uma imagem, ela fica fixa (sem passar pro lado).
- Com várias imagens, o carrossel troca automaticamente a cada 5 segundos; o visitante também pode usar as setas e os pontos para navegar.
