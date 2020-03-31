<template>
  <div>
    <div v-if="blogSery.image_header || blogSery.background_color"
         id="blog-series-banner"
         class="uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
         :style="{ 'background-color': blogSery.background_color }"
         :data-src="blogSery.image_header ? imageBaseUri + blogSery.image_header.url : undefined"
         uk-img>
      <div class="text-float title-and-description">
        <h1>{{ blogSery.title }}</h1>
        <h2>{{ publishedAtFormatted }}</h2>
        <div class="description" v-html="$md.render(blogSery.description)"/>
      </div>
    </div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <BlogPosts :blogPosts="blogPostsSorted" v-if="blogSery.blog_posts && blogSery.blog_posts.length"></BlogPosts>
        <div v-else>
          <h2>No public posts in this series yet.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogSeriesQuery from "~/apollo/queries/blogSeries/blogSeries.gql";
  import BlogPosts from "~/components/BlogPosts";

  export default {
    data() {
      return {
        blogSery: {},
        imageBaseUri: process.env.IMAGE_BASE_URI || ''
      };
    },
    components: {
      BlogPosts
    },
    computed: {
      blogPostsSorted() {
        if (!this.blogSery) return [];
        if (this.cachedBlogPostsSorted) return this.cachedBlogPostsSorted;

        return this.cachedBlogPostsSorted = (this.blogSery.blog_posts ? this.blogSery.blog_posts.sort((a, b) => a.blog_series_order > b.blog_series_order ? -1 : 1) : []);
      },
      publishedAtFormatted() {
        if (!this.blogSery.published_at) {
          return '';
        }

        return moment(this.blogSery.published_at).format('MMMM Do YYYY');
      }
    },
    apollo: {
      blogSery: {
        prefetch: true,
        query: blogSeriesQuery,
        variables() {
          return { id: parseInt(this.$route.params.id) };
        }
      }
    }
  };
</script>