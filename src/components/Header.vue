<template>
  <div>
    <Toggle :mode="mode" @toggle="$emit('toggle')" />
  </div>
  
    
  
</template>

<script>
import Toggle from '@/components/Toggle'
export default {
  props: ['mode'],
  components: {
    Toggle
  }
}
</script>


