<script lang="ts">
  // https://tailwindcomponents.com/component/toggle
  export let value = false;
  export let label = "";
  let clazz: string;
  export { clazz as class };

  function handleClick() {
    value = !value;
  }

  let customClasses: string;
  $: customClasses = value
    ? "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-pink-700 transform translate-x-full"
    : "absolute block w-4 h-4 mt-1 ml-1 bg-pink-300 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";
</script>

<label
  for={`toggle-${label}`}
  class="mt-3 inline-flex items-center cursor-pointer"
>
  <span class="relative">
    <span class="block w-10 h-6 bg-pink-200 rounded-full shadow-inner" />
    <span class={customClasses}>
      <input
        id={`toggle-${label}`}
        type="checkbox"
        class={`absolute opacity-0 w-0 h-0 ${clazz || ""}`}
        bind:checked={value}
      />
    </span>
  </span>
  <span class="ml-3 text-sm">{label}</span>
</label>
