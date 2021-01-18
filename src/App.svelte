<script lang="typescript">
  import Canvas from "./components/Canvas.svelte";
  import Header from "./components/Header.svelte";
  import Settings from "./components/Settings.svelte";
</script>

<div class="flex flex-col h-screen">
  <Header />
  <Settings />
  <div class="flex-1">
    <Canvas />
  </div>
</div>

<style>
  :global(body) {
  }
</style>
