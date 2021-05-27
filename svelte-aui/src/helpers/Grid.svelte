<script>

  export let columns = 2;
  export let minimum = "10px"

  $: gridStyle = `grid-template-columns: repeat(${columns}, minmax(${minimum}, auto))`
</script>


<template>
  <div class="aui-grid" style={gridStyle} >
    <slot />
  </div>
</template>
