<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header :title="title" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Loading from "@/components/template/Loading";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  data() {
    return {
      title: "Cod3r - Base de Conhecimento",
      validatingToken: true
    };
  },
  mounted() {
    this.validateToken();
  },
  computed: {
    ...mapGetters(["isMenuVisible", "user"])
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.clearUser();

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.setUser(userData);
        if (this.$mq === "xs" || this.$mq === "sm") {
          this.toggleMenu(false);
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
    ...mapActions(["clearUser", "setUser", 'toggleMenu'])
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px; /*1fr significa que vai ocupar o máximo que der*/
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu  footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>