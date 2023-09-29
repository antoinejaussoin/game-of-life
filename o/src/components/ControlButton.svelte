<script lang="typescript">
  import noop from "lodash/noop";

  export let onClick: () => void = noop;
  export let icon: string = "stop";
  export let disabled: boolean = false;
  let clazz: string = "";
  export { clazz as class };
</script>

<div
  class={`${clazz} material-icons rounded-full h-10 w-10 border-pink-600  flex items-center justify-center ${
    disabled
      ? "bg-gray-50 text-gray-400"
      : "bg-pink-50 text-pink-900 hover:bg-pink-900 hover:text-pink-50 cursor-pointer"
  } text-3xl`}
  on:click={disabled ? noop : onClick}
>
  {icon}
</div>

<style>
</style>
