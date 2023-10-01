<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import { AllVariations } from "../../engines/variations";
  import type { Variation } from "../../types";

  export let variation: Variation;
</script>

<Button
  >{variation.name}<ChevronDownSolid
    class="w-3 h-3 ml-2 text-white dark:text-white"
  /></Button
>
<Dropdown>
  {#each AllVariations as e}
    <DropdownItem
      on:click={() => {
        variation = e;
      }}
    >
      <span class="font-bold">{e.name}</span>
      <span class="ms-8 space-x-1 text-gray-400">{e.description}</span>
    </DropdownItem>
  {/each}
</Dropdown>
