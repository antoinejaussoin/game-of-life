<script lang="typescript">
  import { classic } from "../engines/variations";
  import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
  import { onMount } from "svelte";
  import { pixelated, size, fill, speed } from "../stores/store";

  let board: HTMLCanvasElement;
  let engine: WebGlColorEngine;
  let generation: number = 0;

  $: {
    engine = new WebGlColorEngine($size, $fill, classic);
    if (board) {
      engine.register(board);
      engine.initToRandom();
      engine.draw();
    }
  }

  onMount(() => {
    engine.register(board);
    engine.initToRandom();
    engine.draw();

    const next = () => {
      if (true) {
        // running this.props.running) {
        for (let i = 0; i < $speed; i++) {
          engine.play();
          generation = engine.generation;
        }
        engine.draw();
      }
      window.requestAnimationFrame(next);
    };

    next();

    return () => {
      // clearInterval(interval);
    };
  });
</script>

<span>{generation}</span>
<canvas class="board" bind:this={board} class:pixelated={$pixelated} />

<style>
  .board {
    width: 1000px;
    height: 1000px;
    border: 3px solid red;
  }

  .pixelated {
    image-rendering: pixelated;
  }
</style>
