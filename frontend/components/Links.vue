<template>
  <ul class="links">
    <li v-for="link in links" :key="link.id">
      <a class="uk-link-reset" :href="link.url" :target="link.target">
        <img class="icon" :src="imageBaseUri + link.icon.url" v-if="!!link.icon" />
        <span>
          {{ link.title }}
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
  import linksQuery from "~/apollo/queries/link/links.gql";

  export default {
    props: {
      linkKey: String,
      imageBaseUri: process.env.IMAGE_BASE_URI + ''
    },
    apollo: {
      links: {
        prefetch: true,
        query: linksQuery,
        variables() {
          return { key: this.linkKey };
        }
      }
    }
  };
</script>
