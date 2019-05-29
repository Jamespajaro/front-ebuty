<template>
  <div class="row">
    <div class="col s10 m8 l6 offset-s1 offset-m2 offset-l3 bg-white card">
      <div class="row">
        <div class="col s12 cabecera">
          <div class="j-pa-md">Inbox</div>
        </div>
        <div class="col s12">
          <div class="j-pl-xl j-pr-xl j-pt-md">
            <ul class="collection scroll-area" v-if="messages.length !== 0">
              <li class="collection-item avatar" v-for="(message, id) in messages" :key="id">
                <div class="circle" :class="getColorRadom()">
                  <div class="flex full">
                    <div class="margin-auto">{{ getLetterCap(message.emails) }}</div>
                  </div>
                </div>
                <span class="title">{{ message.subject }}</span>
                <br>
                <span>{{ getJoin(message.emails) }}</span>
                <i
                  class="mca-action material-icons right"
                  v-show="message.images ? message.images.length !== 0 : false"
                >attach_file</i>
                <i
                  class="mca-action material-icons right cursor-pointer"
                  @click="tryDelete(message)"
                >delete</i>
                <i
                  class="mca-action material-icons right cursor-pointer"
                  @click="goToMessage(message)"
                >mail</i>
              </li>
            </ul>
            <div v-else>
              <div>Don't have any message.</div>
              <router-link to="/make-email">Try to create one here...</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { forEach, split, random } from "lodash";
import router from "../route";

const mounted = function mounted() {
  this.getAllMessages();
};

const tryDelete = async function tryDelete(message) {
  await this.deleteMessage(message);
  this.getAllMessages();
};

const getEmails = function getEmails(emails) {
  let array = [];
  forEach(emails, email => {
    array.push(split(email, "@")[0]);
  });
  return array.join();
};

const goToMessage = function goToMessage(message) {
  this.setMessage(message);
  router.push("/email-preview");
};

const getColorRadom = () => {
  switch (random(0, 6)) {
    case 0:
      return "orange";
    case 1:
      return "indigo";
    case 2:
      return "pink";
    case 3:
      return "purple";
    case 4:
      return "green";
    case 5:
      return "brown";
    case 6:
      return "cyan";
  }
};

const getLetterCap = function getLetterCap(email) {
  return email ? email[0].substr(0, 1).toUpperCase() : "";
};

const getJoin = message => {
  return message ? message.join() : "";
};

const methods = {
  getEmails,
  goToMessage,
  getColorRadom,
  getLetterCap,
  getJoin,
  tryDelete,
  ...mapActions("messages", ["getAllMessages", "setMessage", "deleteMessage"])
};

const computed = {
  ...mapState({
    messages: state => state.messages.messages
  })
};

export default { mounted, methods, computed };
</script>

<style scope>
.scroll-area {
  overflow-y: auto !important;
  max-height: 70vh;
}
</style>
