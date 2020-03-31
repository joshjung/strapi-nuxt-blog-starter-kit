<template>
  <div class="header">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="logo">
            <a href="/">My Personal Blog</a>
          </li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-for="blogPostCategory in blogPostCategories" v-bind:key="blogPostCategory.id" class="header-links">
            <router-link
              :to="{ name: 'blogPostCategories-id', params: { id: blogPostCategory.id }}"
              tag="a"
            >{{ blogPostCategory.name }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class=subheader>
      <Links linkKey="header" />
    </nav>
  </div>
</template>

<script>
  import blogPostCategoriesQuery from "~/apollo/queries/category/blogPostCategories";
  import Links from "~/components/Links";

  export default {
    data() {
      return {
        postCategories: []
      };
    },
    components: {
      Links
    },
    apollo: {
      blogPostCategories: {
        prefetch: true,
        query: blogPostCategoriesQuery
      }
    }
  };
</script>
