# Gerador de Dietas Backend

Este é o backend para o projeto Gerador de Dietas, uma API que cria planos de dieta semanais personalizados para os usuários com base em suas informações e objetivos individuais.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **Fastify**: Framework web para Node.js, conhecido por seu alto desempenho e baixa sobrecarga.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional.
- **OpenAI API**: Utilizada para gerar os planos de dieta com o modelo `gpt-4o-mini`.
- **Zod**: Biblioteca para validação de esquemas e tipos em TypeScript.
- **Vercel**: Plataforma de implantação para aplicações web.

## Começando

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/FabianoLaureano/api-gerador-de-dietas
   ```
2. Navegue até o diretório do backend:
   ```bash
   cd gerador-de-dietas/backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do diretório do backend e adicione sua chave da API da OpenAI:
   ```
   OPENAI_API_KEY=sua_chave_da_api_aqui
   ```

### Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## Referência da API

### POST /plan

Gera um novo plano de dieta com base nos dados do usuário.

**Corpo da Requisição** (`application/json`):

```json
{
  "nome": "string",
  "idade": "number",
  "altura_cm": "number",
  "peso_kg": "number",
  "sexo": "'masculino' | 'feminino'",
  "nivel_atividade": "'sedentario' | 'leve' | 'moderado' | 'ativo' | 'muito_ativo'",
  "objetivo": "'perder_peso' | 'manter_peso' | 'ganhar_massa_muscular' | 'melhorar_performance'"
}
```

**Resposta** (`text/event-stream`):

A API transmite a resposta como um fluxo de texto em formato markdown.

**Exemplo de Uso com cURL:**

```bash
curl -X POST http://localhost:3333/plan \
-H "Content-Type: application/json" \
-d '{
  "nome": "João",
  "idade": 30,
  "altura_cm": 180,
  "peso_kg": 80,
  "sexo": "masculino",
  "nivel_atividade": "ativo",
  "objetivo": "ganhar_massa_muscular"
}'
```

## Como Funciona

O backend utiliza a API da OpenAI para gerar planos de dieta personalizados. O processo é o seguinte:

1.  O cliente envia uma requisição `POST` para o endpoint `/plan` com os dados do usuário.
2.  O servidor valida os dados da requisição usando a biblioteca `Zod`.
3.  O servidor constrói um conjunto de prompts para a API da OpenAI:
    - **System Prompt**: Define o papel da IA como um nutricionista (`Nutri-AI`) e estabelece regras gerais para a geração da dieta.
    - **Docs System Prompt**: Fornece à IA um documento técnico com diretrizes sobre macronutrientes para diferentes objetivos (hipertrofia, emagrecimento, etc.), lido a partir do arquivo `knowledge/diretrizes.md`.
    - **User Prompt**: Contém as informações específicas do usuário (idade, peso, objetivo, etc.).
4.  A requisição é enviada para o modelo `gpt-4o-mini` da OpenAI com a opção de streaming ativada.
5.  A resposta da IA é transmitida em tempo real para o cliente como um fluxo de texto em formato markdown, proporcionando uma experiência de usuário mais rápida e interativa.
