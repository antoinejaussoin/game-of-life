<script lang="typescript">
  import Canvas from "./components/Canvas.svelte";
  import Header from "./components/Header.svelte";
</script>

<div class="App center border-indigo-900 border-8">
  <Header />
  <Canvas />
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
