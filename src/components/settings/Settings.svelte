<script lang="ts">
  import Toggle from "./Toggle.svelte";
  import Slider from "./Slider.svelte";
  import {
    pixelated,
    sizePower,
    fill,
    speed,
    playing,
    engine,
    generation,
    engineType,
    variation,
    scenario,
  } from "../../stores/store";
  import ControlButton from "./ControlButton.svelte";
  import EnginePicker from "./EnginePicker.svelte";
  import VariationPicker from "./VariationPicker.svelte";
  import ScenarioPicker from "./ScenarioPicker.svelte";

  function handleClear() {
    if ($engine) {
      $engine.initToBlank();
      $engine.draw();
    }
  }

  function handleStep() {
    if ($engine) {
      $engine.play();
      $engine.draw();
      generation.set($engine.generation);
    }
  }

  function handleReset() {
    if ($engine) {
      $scenario.init($engine);
      $engine.draw();
      generation.set(0);
    }
  }
</script>

<div class="flex md-5 border-1 shadow-lg mb-2 space-x-5 p-5 items-center">
  <EnginePicker bind:engine={$engineType} />
  <VariationPicker bind:variation={$variation} />
  <ScenarioPicker bind:scenario={$scenario} />
  {#if $playing}
    <ControlButton onClick={() => playing.set(false)} icon="pause" />
  {:else}
    <ControlButton onClick={() => playing.set(true)} icon="play_arrow" />
  {/if}
  <ControlButton onClick={handleClear} icon="clear" />
  <ControlButton onClick={handleStep} icon="plus_one" disabled={$playing} />
  <ControlButton onClick={handleReset} icon="replay" />
  <Toggle class="flex-1" label="Pixelated" bind:value={$pixelated} />
  <Slider
    class="flex-1 mt-5 mx-6"
    min={0}
    max={$engine.maxTextureSize}
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
