<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{user.name}}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs"></i>Administração
      </router-link>
      <a @click.prevent="logout">
        <i class="fa fa-sign-out"></i>Sair
      </a>
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { mapGetters, mapActions } from "vuex";
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.clearUser();
      this.$router.push({ name: "auth" });
    },
    ...mapActions(["clearUser"])
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px; /*Deixando o elemento alinhado na direita*/
  background-color: #f9f9f9;
  min-width: 170px; /*Mesmo colocando texto pequeno, ele vai manter um tamanho minimo*/
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); /*Aplicar sombreamento entre os outros itens*/
  padding: 10px;
  z-index: 1; /*Para aparecer na frente de outros itens*/

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5 linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}
</style>