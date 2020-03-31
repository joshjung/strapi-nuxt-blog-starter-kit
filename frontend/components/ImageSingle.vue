<template>
  <div class="image-container" v-if="images[0] && images[0].image">
    <img class="image" :src="imageBaseUri + images[0].image.url"  />
    <div class="description" v-if="!!images[0].description">{{ images[0].description }}</div>
  </div>
</template>

<script>
  import imagesQuery from "~/apollo/queries/image/images.gql";

  export default {
    data() {
      return {
        images: [],
        imageBaseUri: process.env.IMAGE_BASE_URI || ''
      }
    },
    props: {
      target: String
    },
    apollo: {
      images: {
        prefetch: true,
        query: imagesQuery,
        variables() {
          return { target: this.target };
        }
      }
    }
  };
</script>
