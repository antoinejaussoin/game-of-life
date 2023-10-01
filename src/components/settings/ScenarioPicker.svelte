<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import type { Scenario } from "../../types";
  import scenarios from "../../engines/scenarios";

  export let scenario: Scenario;
</script>

<Button
  >{scenario.name}<ChevronDownSolid
    class="w-3 h-3 ml-2 text-white dark:text-white"
  /></Button
>
<Dropdown>
  {#each scenarios as e}
    <DropdownItem
      on:click={() => {
        scenario = e;
      }}
    >
      <span class="font-bold">{e.name}</span>
      <span class="ms-8 space-x-1 text-gray-400">{e.description}</span>
    </DropdownItem>
  {/each}
</Dropdown>
