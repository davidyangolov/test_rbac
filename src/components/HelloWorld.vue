<template>
  <div class="wrap">
    <div class="users" v-for="(item, key) in courses" :key="key">
      {{ item }}
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  name: 'HomePage',
  computed: {
    ...mapState('coursesdata',['courses']),
  },
  methods:{
    ...mapActions('coursesdata', ['GET_COURSES']),
  },
  async mounted() {
  try {
    await this.GET_COURSES();
  } catch (error) {
    console.error(error);
  }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
