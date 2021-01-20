<script lang="typescript">
  import noop from "lodash/noop";

  export let onClick: () => void = noop;
  export let icon: string = "stop";
  let clazz: string = "";
  export { clazz as class };
</script>

<div
  class={`${clazz} material-icons rounded-full h-10 w-10 border-pink-600 bg-pink-50 flex items-center justify-center text-pink-900 text-3xl cursor-pointer hover:bg-pink-900 hover:text-pink-50`}
  on:click={onClick}
>
  {icon}
</div>

<style>
</style>
