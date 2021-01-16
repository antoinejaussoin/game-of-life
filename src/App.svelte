<script lang="typescript">
  import Canvas from "./components/Canvas.svelte";
  import Header from "./components/Header.svelte";
  import Settings from "./components/Settings.svelte";
</script>

<div class="App center">
  <Header />
  <Settings />
  <Canvas />
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
