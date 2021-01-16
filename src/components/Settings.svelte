<script lang="typescript">
  import Toggle from "./Toggle.svelte";
  import { pixelated } from "../stores/store";
</script>

<div>
  <Toggle label="Pixelated" bind:value={$pixelated} />
</div>
