<script lang="ts">
  import shapes from "../../engines/shapes";
  import Shape from "./Shape.svelte";
</script>

<section class="flex-col flex gap-2 p-4 bg-slate-50">
  {#each shapes as shape}
    <Shape {shape} />
  {/each}
</section>
