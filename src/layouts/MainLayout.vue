<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          dense
          flat
          label="Back"
        >

        </q-btn>

        <q-toolbar-title class="absolute-center">
          {{ title.charAt(0).toUpperCase() + title.slice(1) }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          dense
          flat
          label="Login"></q-btn>
        <q-btn
          @click="logOutUser"
          v-else
          class="absolute-right q-pr-sm"
          no-caps
          icon="account_circle"
          dense
          flat>
          Logout
          <br>
          {{userDetails.name}}
        </q-btn>

        <div></div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import mixinOtherDetails from '../../src/mixins/mixin-other-user-details'

export default {
  name: 'MainLayout',
  mixins:[mixinOtherDetails],
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('store',['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if (currentPath === '/') return 'EY-Chat'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath === '/auth') return 'Login/Register'
    }
  },
  methods:{
    ...mapActions('store',['logOutUser'])
  }
}
</script>

<style lang="stylus">
.q-toolbar
  .q-btn
    line-height: 1.2
</style>
