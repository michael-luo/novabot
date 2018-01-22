<template>
  <div class="dashboard">
    Yay you made it {{ user }}
  </div>
</template>

<script>
export default {
  props: ['user'],
  name: 'dashboard',
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
