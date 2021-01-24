import Vue from 'vue'
import {firebaseAuth, firebaseDb} from "boot/firebase";
import {Notify} from "quasar";
import {Dialog} from "quasar";

let messagesRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  clearMessages(state) {
    state.messages = {}
  }
}

const actions = {
  registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
      console.log(res)
      let userId = firebaseAuth.currentUser.uid
      firebaseDb.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email,
        online: true
      })
    }).catch(err => {

      console.log(err.message)
    })
  },

  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(res => {
      console.log(res)
    }).catch(err => {
      Dialog.create({
        dark: true,
        title: 'Error!',
        message: 'Email Address or Password incorrect'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

      console.error(err.message)
    })
  },
  logOutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChanged({commit, dispatch, state}) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/').catch(err => {
        })
      } else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth').catch(err => {
        })
      }
    })
  },
  firebaseUpdateUser({}, payload) {
    if (payload.userId) {
      firebaseDb.ref('users/' + payload.userId).update(payload.updates)
    }
  },
  firebaseGetUsers({commit}) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
  firebaseGetMessages({commit, state}, userId) {
    let currentUserId = state.userDetails.userId
    messagesRef = firebaseDb.ref('chats/' + currentUserId + '/' + userId)
    messagesRef.on('child_added',
      snapshot => {
        let messageDetails = snapshot.val()
        let messageId = snapshot.key
        commit('addMessage', {
          messageId,
          messageDetails
        })
      })
  },
  firebaseStopGettingMessages({commit}) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)

    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
  }
}

const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
