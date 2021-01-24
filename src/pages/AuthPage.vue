<template>
  <q-page class="flex q-pa-md  constrain-more">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login"
               label="Login"/>
        <q-tab name="register"
               label="Register"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel name="login">
          <LoginAndRegister :tab="tab"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <LoginAndRegister :tab="tab"/>

        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginAndRegister from "components/LoginAndRegister";
export default {
  name: 'AuthPage',
  components: {LoginAndRegister},
  data() {
    return {
      tab: 'login'
    }
  }
}
</script>
