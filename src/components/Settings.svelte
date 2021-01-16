<script lang="typescript">
  import Toggle from "./Toggle.svelte";
  import { pixelated, size, fill, speed } from "../stores/store";
  // import Slider from "./Slider.svelte";
  import Slider from "@fouita/slider";
</script>

<div class="flex md-5 border-1 p-2 pb-5">
  <Toggle class="flex-1" label="Pixelated" bind:value={$pixelated} />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={1024}
    color="pink-600"
    tooltip
    bind:value={$size}
    label="Size"
  />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={100}
    color="pink-600"
    bind:value={$fill}
    label="Fill"
  />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={100}
    color="pink-600"
    bind:value={$speed}
    label="Speed"
  />
</div>
