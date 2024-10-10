<p align="center">
    <img src="https://oficinabrasil.com.br/icon.png?bfa92263dd1da9fe" width="300"/>
</p>

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" width="120" />
    <img src="https://media.graphassets.com/auto_image/compress/cache=expiry:max/resize=width:640/STChhjrScumkWbmwsni2" width="100" />
</p>

# Dashboard Interativo v1.0.0

Interface responsável por realizar a exibição do [dashboard-interativo](https://github.com/guimarcel/dashboardinterative) utilizando as api's:

- [OpenWeatherMap API](https://openweathermap.org/api)
- [New York Times API](https://developer.nytimes.com)
- [CoinGecko API](https://www.coingecko.com/en/api)

# Documentos de referência

- [Documentação CoinGecko](https://docs.coingecko.com/reference/introduction)
- [Documentação New York Times](https://developer.nytimes.com/apis)
- [Documentação OpenWeatherMap](https://openweathermap.org/api)

## Funcionalidades implementadas

- Consulta de criptomoedas diversas.
- Filtro por períodos de tempo selecionados.
- Consulta clima atual de diferentes regiões.
- Consulta previsão do tempo para 5 dias de diferentes regiões.
- Visualização das mais recentes notícias com fácil acesso a matéria.

## Pré-requisitos

Para execução da aplicação é necessário ter instalado no ambiente os softwares abaixo nas versões descritas ou
superiores:

- Node 20.11.0
- Npm 10.2.4

## Principais dependências

- React v18
- React Redux v9.1.2
- React Redux Toolkit v2.2.7
- Chart JS v4.4.4
- Next v14.2
- React Select 5.8
- Axios v1.7
- TypeScript v5

## Environment Variables

O projeto se utiliza de variáveis de ambiente que podem ser defindas nos arquivos.env.development ou .env.production
ou na tag **environment** quando se é utilizado o Docker.
Utilizar como exemplo o arquivo .env.example

## Instalação e execução local

Para instalar dependências e subir o ambiente de forma local, execute os comandos npm abaixo

#### Instalar dependências

```bash
    npm install
    #### ou ####
    yarn install
```

#### Start(Modo de Desenvolvimento)

```bash
    npm run dev
```

#### Build (Gerar a "dist" para produção)

```bash
    npm run build
```

## Desenvolvedores

- Guilherme Marcel - gui.marcel@icloud.com
