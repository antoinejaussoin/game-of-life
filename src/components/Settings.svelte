<script lang="typescript">
  import Toggle from "./Toggle.svelte";
  import Slider from "./Slider.svelte";
  import {
    pixelated,
    sizePower,
    fill,
    speed,
    playing,
    engine,
  } from "../stores/store";
  import ControlButton from "./ControlButton.svelte";

  function handleClear() {
    if ($engine) {
      $engine.initToBlank();
      $engine.draw();
    }
  }
</script>

<div class="flex md-5 border-1 shadow-lg mb-8 space-x-5 p-5 items-center">
  {#if $playing}
    <ControlButton onClick={() => playing.set(false)} icon="pause" />
  {:else}
    <ControlButton onClick={() => playing.set(true)} icon="play_arrow" />
  {/if}
  <ControlButton onClick={handleClear} icon="clear" />
  <Toggle class="flex-1" label="Pixelated" bind:value={$pixelated} />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={14}
    bind:value={$sizePower}
    label="Size"
    format={(size) => `${Math.pow(2, size)}px`}
  />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={100}
    bind:value={$fill}
    label="Fill"
    format={(fill) => `${fill}%`}
  />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={1}
    max={100}
    bind:value={$speed}
    label="Speed"
    format={(speed) => `${speed}x`}
  />
</div>
