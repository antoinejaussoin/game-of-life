# The Game of Life

If you don't know what the Game of Life is yet, please look at the [Wikipedia article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

[Try it now!](http://gol.jaussoin.com).

This version is using Svelte + Vite + TypeScript, but you can also find a React version in previous commits.

![gol.jaussoin.com](/medias/screenshot.png?raw=true 'Game of Life')

## Run on your machine

- Clone this repo
- `npm i`
- `npm start`

## Build

- Clone this repo
- `npm i`
- `npm run build`

## Run with Docker in one command

`docker run -p 8080:80 antoinejaussoin/game-of-life:latest` then open your browser at [localhost:8080](http://localhost:8080)

## Interesting links

http://kaytdek.trevorshp.com/projects/computer/neuralNetworks/gameOfLife2.htm

http://nullprogram.com/webgl-game-of-life/

http://www.radicaleye.com/lifepage/picgloss/picgloss.html

# Changelog

## 3.3.0

- Ability to select shapes and draw them on the grid

## 3.2.0

- Ability to choose a starting scenario

## 3.1.0

- Ability to choose the engine (WebGL or 2D Canvas)
- Finished the migration to TypeScript

## 3.0.0

- Migration to Svelte 4
- Migration to Vite (from Snowpack)