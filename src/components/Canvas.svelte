<script lang="typescript">
  import { classic } from "../engines/variations";
  import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
  import { onMount } from "svelte";
  import { pixelated, size, fill, speed, playing } from "../stores/store";

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
      if ($playing) {
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

<div class="flex flex-col h-full">
  <span>{generation}</span>
  <canvas
    class="flex-1 object-contain mb-3"
    bind:this={board}
    class:pixelated={$pixelated}
  />
</div>

<style>
  .pixelated {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
</style>
