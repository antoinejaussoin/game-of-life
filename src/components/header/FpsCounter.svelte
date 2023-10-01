<script lang="ts">
  import { fps } from "../../stores/store";
  let times: number[] = [];

  function refreshLoop() {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      times = times;
      fps.set(times.length);
      refreshLoop();
    });
  }

  refreshLoop();
</script>

<div class="w-10">{times.length}</div>
