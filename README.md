# Controle de Saldo de Contratos — Front-end

Interface do sistema de controle de saldo de contratos. Permite acompanhar o consumo de cada contrato, cadastrar contratos, registrar, editar e estornar lançamentos, e visualizar a evolução mensal.

A API correspondente está no repositório [controle-saldo-api](https://github.com/gladyson30/controle-saldo-api).

## Tecnologias

- React 19 com TypeScript
- Vite
- Recharts para o gráfico de evolução mensal
- CSS Modules, com tokens de cor e espaçamento globais

## Pré-requisitos

- Node.js 20 ou superior
- npm
- A API em execução em `http://localhost:8080`

## Como executar

### 1. Configurar o ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

O arquivo define a URL da API:

```
VITE_API_URL=http://localhost:8080
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Subir a aplicação

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`. A porta 5173 é a única liberada no CORS da API, então outra porta vai bloquear as requisições.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera a versão de produção |
| `npm run lint` | Executa o ESLint |

## Telas

- **Painel**: totais consolidados (contratado, lançado e saldo disponível) e um card por contrato, com o alerta e a barra de consumo.
- **Novo contrato**: cadastro com nome, valor e data de início. A data de fim é calculada pela API.
- **Detalhe do contrato**: ao clicar em um card, mostra o histórico de lançamentos, o formulário de registro e a evolução mensal.
- **Edição e estorno**: cada lançamento ativo tem os botões de editar e estornar. O estorno pede confirmação antes de ser enviado.

## Alertas

Cada contrato recebe um alerta, calculado pela API:

| Alerta | Cor | Significado |
|---|---|---|
| Saudável (`NORMAL`) | Verde | Consumo dentro do esperado |
| Próximo do limite (`PROXIMO_DO_LIMITE`) | Vermelho | Consumo igual ou acima de 80% do valor contratado |
| Baixo consumo (`BAIXO_CONSUMO`) | Amarelo | Menos de 20% consumido, com 50% ou mais da vigência decorrida |

## Estrutura do projeto

```
src/
├── api/            (cliente HTTP e chamadas à API, por recurso)
├── components/     (componentes reutilizáveis, cada um com seu CSS Modules)
├── pages/          (DashboardPage e ContratoPage)
├── styles/         (tokens de cor e estilos globais)
├── types/          (tipos espelhando os DTOs da API)
└── utils/          (formatação de moeda e percentual)
```

## Decisões de projeto

- **Sem roteamento**: a navegação entre o painel e o contrato é feita por estado na tela, o que mantém a aplicação simples. Como o enunciado não pede URLs próprias, essa escolha não impacta o uso.
- **Tipos espelhando a API**: os nomes dos campos em `types/` são os mesmos do JSON que a API devolve, para não haver conversão.
- **Valores monetários**: exibidos com formatação em real (`pt-BR`), a partir de números vindos da API.
- **Erros da API**: mostrados na tela com a mensagem do campo `detail` da resposta, no formato `ProblemDetail` do Spring.

## Fora do escopo

Conforme o enunciado, a aplicação não tem tela de login.
