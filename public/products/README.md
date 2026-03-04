# Imagens dos produtos

As fotos ficam organizadas **por categoria**, em pastas dentro de `public/products/`:

| Pasta         | Categoria no site |
|---------------|-------------------|
| `oversized/`  | Oversized         |

O **placeholder** (`placeholder.svg`) permanece na raiz de `products/` e é usado quando uma imagem não carrega.

## Como usar

1. **Salve a imagem** na pasta da categoria (ex: `public/products/oversized/9.jpg`).
2. No **`src/data/products.js`**, no produto correspondente, preencha o campo **`image`** só com o nome do arquivo (ex: `'oxford-branca.jpg'`). O site usa o `category` do produto para montar o caminho: `/products/<categoria>/<image>`.

## Tamanho das imagens

O site exibe as fotos em **proporção 3:4** (largura : altura). Use o mesmo ratio para não cortar nada.

| Uso | Dimensões | Proporção |
|-----|-----------|-----------|
| **Recomendado** | **800 × 1067 px** | 3:4 |
| Menor (mais leve) | 600 × 800 px | 3:4 |
| Maior (telas retina) | 1200 × 1600 px | 3:4 |

- **Proporção:** sempre **3:4** para caber certinho no card e no modal.
- **Formatos:** `.jpg`, `.jpeg`, `.png`, `.webp`.
- Se a imagem tiver outra proporção, o site corta (centralizado) para preencher o espaço.

## Dicas

- Use nomes curtos e sem espaços (ex: `camisa-oxford-branca.jpg`).
- "Linhas Stampô" é um filtro do site; as imagens ficam na pasta da categoria do produto (ex.: `oversized/`).
