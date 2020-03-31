<template>
  <div>
    <client-only>
      <div class="uk-section">
        <div class="uk-container uk-container-large">
          <h1>{{ blogPostCategory.name }}</h1>

          <BlogPosts :blogPosts="blogPostCategory.blog_posts || []" v-if="blogPostCategory.blog_posts && blogPostCategory.blog_posts.length"></BlogPosts>
          <div v-else>
            <h2>No posts in this category.</h2>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
  import blogPostQuery from "~/apollo/queries/blogPost/blogPosts-blogPostCategories.gql";
  import BlogPosts from "~/components/BlogPosts";

  export default {
    data() {
      return {
        blogPostCategory: {}
      };
    },
    components: {
      BlogPosts
    },
    apollo: {
      blogPostCategory: {
        prefetch: true,
        query: blogPostQuery,
        variables() {
          return { id: parseInt(this.$route.params.id) };
        }
      }
    }
  };
</script>