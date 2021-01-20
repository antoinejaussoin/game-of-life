<script lang="typescript">
  import { onMount } from "svelte";
  import { pixelated, speed, playing, engine } from "../stores/store";

  let board: HTMLCanvasElement;
  let generation: number = 0;

  engine.subscribe((x) => {
    if (board) {
      x.register(board);
      x.initToRandom();
      x.draw();
    }
  });

  onMount(() => {
    $engine.register(board);
    $engine.initToRandom();
    $engine.draw();

    const next = () => {
      if ($playing) {
        for (let i = 0; i < $speed; i++) {
          $engine.play();
          generation = $engine.generation;
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
  <span>Generation: {generation}</span>
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
