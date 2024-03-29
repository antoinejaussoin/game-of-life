<script lang="ts">
  import { onMount } from "svelte";
  import {
    pixelated,
    speed,
    playing,
    generation,
    engine,
    pixelPerSecond,
    scenario,
    currentShape,
  } from "../stores/store";
  import { relMouseCoords } from "./utils";
  import numeral from "numeral";
  import ShapeSelector from "./shapes/ShapeSelector.svelte";

  let boardWebGl: HTMLCanvasElement;
  let board2d: HTMLCanvasElement;

  engine.subscribe((eng) => {
    if (eng.type === "webgl" && boardWebGl) {
      eng.register(boardWebGl);
      $scenario.init(eng);
      eng.draw();
    }
    if (eng.type === "2d" && board2d) {
      eng.register(board2d);
      $scenario.init(eng);
      eng.draw();
    }
  });

  scenario.subscribe((s) => {
    if ($engine) {
      s.init($engine);
      $engine.draw();
    }
  });

  function handleCanvasClick(e: MouseEvent) {
    const coords = relMouseCoords(
      e,
      $engine.type === "webgl" ? boardWebGl : board2d
    );
    $engine.inject(
      coords.x,
      coords.y,
      $currentShape ? $currentShape.shape : [[1]]
    );
    $engine.draw();
  }

  onMount(() => {
    $engine.register($engine.type === "webgl" ? boardWebGl : board2d);
    $scenario.init($engine);
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

<div class="flex flex-col h-full justify-center">
  <div class="flex">
    <div class="flex-1">
      <ShapeSelector />
    </div>
    <div class="">
      <div class="self-center m-4 mb-7 text-3xl">
        <div class="font-mono">
          <span class="font-bold">Generation</span>: {$generation}<span
            class="px-5">|</span
          >{numeral($pixelPerSecond).format("0.0a")}&nbsp;<span
            class="font-bold">pixel/second</span
          >
        </div>
      </div>
      <canvas
        class="self-center h-screen"
        bind:this={boardWebGl}
        class:pixelated={$pixelated}
        class:hidden={$engine.type !== "webgl"}
        on:click={handleCanvasClick}
      />
      <canvas
        class="self-center h-screen"
        bind:this={board2d}
        class:pixelated={$pixelated}
        class:hidden={$engine.type !== "2d"}
        on:click={handleCanvasClick}
      />
    </div>
    <div class="flex-1" />
  </div>
</div>

<style>
  .pixelated {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }

  .hidden {
    visibility: hidden;
  }
</style>
