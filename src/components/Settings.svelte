<script lang="typescript">
  import Toggle from "./Toggle.svelte";
  import { pixelated, size, sizePower, fill, speed } from "../stores/store";
  import Slider from "@fouita/slider";
  import FpsCounter from "./FpsCounter.svelte";
</script>

<div class="flex md-5 border-1 p-2 pb-5">
  <Toggle class="flex-1" label="Pixelated" bind:value={$pixelated} />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={14}
    tooltip
    bind:value={$sizePower}
    label="Size"
  />
  {$size}
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={100}
    bind:value={$fill}
    label="Fill"
  />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={1}
    max={100}
    bind:value={$speed}
    label="Speed"
  />
  <FpsCounter />
</div>
