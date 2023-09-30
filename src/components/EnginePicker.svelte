<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import type { EngineMetadata } from "src/types";
  import { engines } from "../engines/engines";

  export let engine: EngineMetadata;
</script>

<Button
  >{engine.name}<ChevronDownSolid
    class="w-3 h-3 ml-2 text-white dark:text-white"
  /></Button
>
<Dropdown>
  {#each engines as e}
    <DropdownItem
      on:click={() => {
        engine = e;
      }}
    >
      <span class="font-bold">{e.name}</span>
      <span class="ms-8 space-x-1 text-gray-400">{e.description}</span>
    </DropdownItem>
  {/each}
</Dropdown>
