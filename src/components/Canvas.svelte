<script lang="typescript">
  import { onMount } from "svelte";
  import {
    pixelated,
    speed,
    playing,
    generation,
    engine,
    pixelPerSecond,
  } from "../stores/store";
  import { relMouseCoords } from "./utils";
  import numeral from "numeral";

  let board: HTMLCanvasElement;

  engine.subscribe((eng) => {
    if (board) {
      eng.register(board);
      eng.initToRandom();
      eng.draw();
    }
  });

  function handleCanvasClick(e: MouseEvent) {
    const coords = relMouseCoords(e, board);
    $engine.inject(coords.x, coords.y, [[1]]);
    $engine.draw();
  }

  onMount(() => {
    $engine.register(board);
    $engine.initToRandom();
    $engine.draw();

    const next = () => {
      if ($playing) {
        for (let i = 0; i < $speed; i++) {
          $engine.play();
          generation.set($engine.generation);
        }
        $engine.draw();
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
  <div class="self-center m-4 mb-7 text-3xl">
    <div class="font-mono">
      <span class="font-bold">Generation</span>: {$generation}<span class="px-5"
        >|</span
      >{numeral($pixelPerSecond).format("0.0a")}&nbsp;<span class="font-bold"
        >pixel/second</span
      >
    </div>
  </div>
  <canvas
    class="w-3/4"
    bind:this={board}
    class:pixelated={$pixelated}
    on:click={handleCanvasClick}
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
