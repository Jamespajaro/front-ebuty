<template>
  <div class="row">
    <div class="col s10 m6 l4 offset-s1 offset-m3 offset-l4 bg-white card">
      <div class="padding-msg">
        <div class="row" v-if="message.emails !== undefined">
          <div class="col s12">
            <div class="flex j-mt-xl j-mb-xl">
              <div class="circle">
                <i class="material-icons margin-auto fs-80">done</i>
              </div>
            </div>
            <div class="text-center fs-24 grey-color">Your email has been sent</div>
            <div class="line"></div>
          </div>
          <div class="col s12">
            <div class="subject">{{ message.subject }}</div>
            <p class="emails" v-if="message.emails.length !== 0">
              to
              <a>{{message.emails.join()}}</a>
            </p>
            <p class="emails" v-if="message.cc.length !== 0">
              cc:
              <a>{{message.cc.join()}}</a>
            </p>
            <div class="j-mt-lg" v-html="message.message"></div>
          </div>
          <div class="col s12">
            <loadImages class="j-mt-lg" :images="message.images"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import loadImages from "../components/load-images.vue";
import router from "../route";

const components = {
  loadImages
};

const computed = {
  ...mapState({
    message: state => state.messages.message
  })
};

const created = function created() {
  if (!this.message.subject) {
    router.push("/");
  }
};

export default { computed, components, created };
</script>

<style scope>
.circle {
  margin: auto;
  height: 100px;
  display: flex;
  width: 100px;
  border-radius: 50%;
  background: #4ed998;
  color: white;
}
.line {
  border-bottom: 1px solid #ccc;
  height: 1;
  margin: 32px 0;
}
.subject {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 3px;
}
.emails {
  font-size: 12px;
}
.emails > a {
  color: #13dcf2;
}

.padding-msg {
  padding: 32px 15%;
}
</style>
