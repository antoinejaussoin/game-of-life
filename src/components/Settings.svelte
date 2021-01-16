<script lang="typescript">
  import Toggle from "./Toggle.svelte";
  let pixaleted = false;
</script>

<div>
  <Toggle label="Pixelated" bind:value={pixaleted} />
</div>
