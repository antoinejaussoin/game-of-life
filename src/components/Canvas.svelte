<script lang="typescript">
  import { classic } from "../engines/variations";
  import WebGlColorEngine from "../engines/webgl/webgl-color-engine";
  import { onMount } from "svelte";

  let board: HTMLCanvasElement;
  const engine = new WebGlColorEngine(128, 20, classic);

  onMount(() => {
    engine.register(board);
    engine.initToRandom();
    engine.draw();

    const next = () => {
      const speed = 1; // param
      if (true) {
        // running this.props.running) {
        for (let i = 0; i < speed; i++) {
          engine.play();
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

<canvas
  class="board"
  bind:this={board}
  style="pixelated': 'auto', display: 'block'"
/>

<style>
  .board {
    width: 1000px;
    height: 1000px;
    border: 3px solid red;
  }
</style>
