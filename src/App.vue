<template>
  <div>
    <div class="bg-global j-pa-xs full flex">
      <div class="margin-auto width-100">
        <router-view/>
      </div>
    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li v-show="getRoute === '/'">
          <a class="btn-floating red" @click="getAllMessages()">
            <i class="material-icons">refresh</i>
          </a>
        </li>
        <router-link to="/">
          <li v-show="getRoute !== '/'">
            <a class="btn-floating red">
              <i class="material-icons">arrow_back</i>
            </a>
          </li>
        </router-link>
        <li>
          <router-link to="/make-email">
            <a class="btn-floating red">
              <i class="material-icons">add</i>
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from "./route";
import { mapActions } from "vuex";

const mounted = function mounted() {
  // router.push("make-email");
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {});
};

const getRoute = function getRoute() {
  return this.$route.path;
};

const computed = {
  getRoute
};

export default {
  mounted,
  computed,
  methods: {
    ...mapActions("messages", ["getAllMessages"])
  }
};
</script>

<style lang="stylus">
@import './assets/style/index.styl';

.bg-global {
  background: linear-gradient(#00BEF0, #50D2DC);
}
</style>
