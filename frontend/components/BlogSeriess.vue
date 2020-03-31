<template>
  <div class="blog-posts">
    <router-link class="uk-card post-card blog-series-post-card"
                  :to="{ name: 'blogSeries-id', params: {id: blogSeries.id} }"
                  v-for="blogSeries in blogSeriess"
                  :style="{'background-color': blogSeries.background_color}"
                  :key="blogSeries.id">
      <div class="image-container">
        <img :src="imageBaseUri + blogSeries.image_header.url" alt="" height="100" v-if="blogSeries.image_header">
      </div>
      <div class="content">
        <div class="text-float"><div class="blog-post-card-title">{{ blogSeries.title }}</div></div>
      </div>
      <div class="description" v-if="blogSeries.description">
        {{ blogSeries.description }}
      </div>
    </router-link>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        imageBaseUri: process.env.IMAGE_BASE_URI || ''
      }
    },
    props: {
      blogSeriess: Array
    }
  };
</script>
