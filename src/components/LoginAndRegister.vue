<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab === 'register'"
      lazy-rules
      :rules="[ val => val && val.length > 3 || 'The name should have at least 3 minimum charters']"
      v-model="formData.name"
      class="q-mb-xs"
      outlined
      label="Name"/>
    <q-input
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
      v-model="formData.email"
      class="q-mb-xs"
      type="email"
      outlined
      label="Email"/>

    <q-input
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
      v-model="formData.password"
      class="q-mb-xs"
      :type="isPwd ? 'password' : 'text'"
      outlined
      label="Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div class="row">
      <q-btn type="submit"
             color="primary"
             :label="tab"/>
    </div>

  </q-form>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "LoginAndRegister",
  props: ['tab'],
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
      },
      isPwd: true,
      password:''
    }
  },
  methods: {
    ...mapActions('store', ['registerUser','loginUser']),
    submitForm() {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    }
  }
}
</script>

<style scoped>

</style>
