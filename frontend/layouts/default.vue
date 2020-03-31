<template>
  <div>
    <Header></Header>
    <div class="body">
    <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
  import blogPostCategoriesQuery from "~/apollo/queries/category/blogPostCategories";
  import Header from "~/layouts/Header";
  import Footer from "~/layouts/Footer";

  export default {
    data() {
      return {
        postCategories: []
      };
    },
    components: {
      Header,
      Footer
    },
    apollo: {
      blogPostCategories: {
        prefetch: true,
        query: blogPostCategoriesQuery
      }
    }
  };
</script>
