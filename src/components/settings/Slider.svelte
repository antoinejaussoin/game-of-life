<script lang="ts">
  import Slider from "@bulatdashiev/svelte-slider";
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;
  export let label = "";
  export let format = (value: number) => value.toString();
  let clazz = "";
  export { clazz as class };
  let range = [value];
  $: {
    value = range[0];
  }
</script>

<div class={clazz}>
  <Slider {min} {max} step={1} bind:value={range} range={false} />
  <div class="flex justify-between">
    <div>{label}</div>
    <div>{format(value)}</div>
  </div>
</div>
