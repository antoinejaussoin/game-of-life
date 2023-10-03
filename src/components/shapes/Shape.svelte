<script lang="ts">
  import type { ShapePreset } from "src/types";
  import { currentShape } from "../../stores/store";

  export let shape: ShapePreset;
</script>

<button
  on:click={() => ($currentShape = shape)}
  class="shadow-lg p-4 bg-white"
  class:selected={$currentShape === shape}
>
  <header class="text-pink-700 font-thin relative -top-2">
    {shape.name}
  </header>
  <main class="content-center">
    <div class="shape">
      {#each shape.shape as row}
        <div class="row">
          {#each row as cell}
            <div
              class="cell border border-gray-300 bg-white"
              class:alive={cell === 1}
            />
          {/each}
        </div>
      {/each}
    </div>
  </main>
</button>

<style>
  .shape {
    display: flex;
    flex-direction: column;
  }

  .shape .row {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .shape .row .cell {
    max-width: 24px;
    flex: 1;
    aspect-ratio: 1 / 1;
  }

  .alive {
    background-color: black;
  }

  .selected {
    background-color: #fdf2f8;
  }
</style>
