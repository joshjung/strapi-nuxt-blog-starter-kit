<template>
  <div class="blog-posts">
    <div v-for="blogPost in blogPostsSorted" class="uk-card post-card"
         :style="{'background-color': blogPost.background_color}"
         :key="blogPost.id">
      <router-link class="uk-link-reset" :to="{ name: 'blogPosts-id', params: {id: blogPost.id} }">
          <div class="image-container">
            <img :src="imageBaseUri + images[0].image.url" alt="Default background" height="100" v-if="!blogPost.image_header && blogPost.use_default_post_background && images.length">
            <img :src="imageBaseUri + blogPost.image_header.url" alt="" height="100" v-if="blogPost.image_header">
          </div>
          <div class="content">
            <div v-if="blogPost.postCategory" class="uk-text-uppercase">{{ blogPost.postCategory.name }}</div>
            <div class="text-float">
              <div class="blog-post-card-title">{{ blogPost.title }}</div>
              <div class="blog-post-card-date" v-if="blogPost.published_date">{{ publishedAtFormatted(blogPost.published_date) }}</div>
            </div>
          </div>
          <div class="description" v-if="blogPost.show_description && blogPost.description" :style="{ 'color': blogPost.foreground_color }">
            {{ blogPost.description }}
          </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import imagesQuery from "~/apollo/queries/image/images.gql";

  export default {
    data: function() {
      return {
        images: [],
        imageBaseUri: process.env.IMAGE_BASE_URI || ''
      }
    },
    methods: {
      publishedAtFormatted(published_date) {
        if (!published_date) {
          return '';
        }

        return moment(published_date).format('MMMM Do YYYY');
      }
    },
    computed: {
      
      blogPostsSorted() {
        return this.blogPosts.sort((a, b) => {
          if (a.published_date && b.published_date) {
            return new Date(a.published_date).getTime() > new Date(b.published_date).getTime() ? -1 : 1;
          } else if (a.published_date) {
            return 1;
          }
          return -1;
        });
      }
    },
    props: {
      blogPosts: Array
    },
    apollo: {
      images: {
        prefetch: true,
        query: imagesQuery,
        variables() {
          return { target: 'default_blog_post_background' };
        }
      }
    }
  };
</script>
