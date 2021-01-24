<template>
  <q-page
    ref="chatPage"
    class="chat-page flex column constrain-more">

    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-9 text-center fixed-top constrain-more">
      <b>{{ otherUserDetails.name }}</b> is currently Offline
    </q-banner>

    <div
      :class="{ 'invisible' : !showMessages }"
      class="q-pa-md column col justify-end ">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'light-green-3' : 'white'"
      />

    </div>
    <q-footer elevated>
      <q-toolbar class="constrain">
        <q-form @submit="sendMessage"
                class="full-width ">
          <q-input
            bg-color="white"
            ref="newMessage"
            outlined
            rounded
            v-model="newMessage"
            label="Write A Message.."
            dense
          >
            <template v-slot:after>
              <q-btn
                rounded
                dense
                flat
                color="white"
                type="submit"
                @click="sendMessage"
                icon="send"/>
            </template>
          </q-input>

        </q-form>

      </q-toolbar>
    </q-footer>

  </q-page>
</template>

<script>
import {mapActions, mapState} from "vuex";
import mixinOtherDetails from '../../src/mixins/mixin-other-user-details'

export default {
  name: 'ChatPage',
  mixins: [mixinOtherDetails],
  data() {
    return {
      newMessage: '',
      showMessages: false
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails']),
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.userId
      })
      this.clearMessage()
    },
    clearMessage(){
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom() {
      let chatPage = this.$refs.chatPage.$el
      setTimeout(()=>{
        window.scrollTo(0, chatPage.scrollHeight)
      },20)
    }
  },
  watch: {
    messages: function(val){
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(()=>{
          this.showMessages = true
        },200)
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.userId)
  },
  destroyed() {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="stylus">
.chat-page
  background #e3e3e3

.q-banner
    top 50px
    z-index 2
    opacity 0.8
    .q-message
      z-index 1
</style>
