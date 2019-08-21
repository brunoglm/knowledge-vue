<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button
        v-show="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >Carregar mais Artigos</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "@/components/template/PageTitle";
import ArticleItem from "@/components/article/ArticleItem";

export default {
  name: "ArticlesByCategory",
  props: ["id"],
  components: { PageTitle, ArticleItem },
  data() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true
    };
  },
  mounted() {
    this.getCategory();
    this.getArticles();
  },
  watch: {
    $route() {
      this.category.id = this.id;
      this.articles = [];
      this.page = 1;
      this.loadMore = true;

      this.getCategory();
      this.getArticles();
    }
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.id}`;
      axios.get(url).then(res => (this.category = res.data));
    },
    getArticles() {
      const url = `${baseApiUrl}/categories/${this.id}/articles`;
      axios
        .get(url, {
          params: {
            page: this.page
          }
        })
        .then(res => {
          this.articles = this.articles.concat(res.data);
          this.page++;

          if (res.data.length === 0) this.loadMore = false;
        });
    }
  }
};
</script>

<style>
.articles-by-category ul {
  list-style-type: none;
  padding: 0;
}

.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>