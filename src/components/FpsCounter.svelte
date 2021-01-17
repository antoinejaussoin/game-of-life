<script lang="typescript">
  let times: number[] = [];
  let fps;

  function refreshLoop() {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;
      times = times;
      refreshLoop();
    });
  }

  refreshLoop();
</script>

<div>{times.length}</div>
