<script lang="ts">
  import Canvas from "./components/Canvas.svelte";
  import Header from "./components/Header.svelte";
  import Settings from "./components/Settings.svelte";
</script>

<Header />
<Settings />
<Canvas />

<style>
  :global(button, textarea, input, select, a, svg) {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
