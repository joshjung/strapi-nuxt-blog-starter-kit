<template>
  <div>
    <div v-if="blogPost.image_header || blogPost.background_color"
         id="blog-post-banner"
         class="uk-flex uk-flex-center uk-flex-middle"
         :style="{ 'background-color': blogPost.background_color || '#ccc' }"
         :data-src="blogPost.image_header ? imageBaseUri + blogPost.image_header.url : undefined"
         uk-img>
      <div class="text-float title-and-description blog-series-title-description" v-if="!!thisBlogSeries">
        <h1>{{ thisBlogSeries.title }}</h1>
        <div class="description" v-html="$md.render(thisBlogSeries.description)"/>
        <div class="uk-flex uk-flex-right view-all" v-if="thisBlogSeries.blog_posts.length > 3">
          <router-link class="uk-link" :to="{ name: 'blogSeries-id', params: {id: thisBlogSeries.id} }">
            View All {{ thisBlogSeries.blog_posts.length }} Posts
          </router-link>
        </div>
      </div>
      <div class="text-float title-and-description blog-post-description" v-else-if="blogPost.description && blogPost.show_description">
        <div class="description" v-html="$md.render(blogPost.description)"/>
      </div>
      <div class="blog-post-series-navigator" v-if="!!thisBlogSeries">
        <div v-for="bp in blogPostsInSeriesWindow" :key="bp.id"
             :class="{'text-float': true, 'no-bottom-margin': true, 'selected': bp.id == blogPost.id, 'unselected': bp.id != blogPost.id}">
          <router-link class="uk-link" :to="{ name: 'blogPosts-id', params: {id: bp.id} }">
            {{ bp.title }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="uk-section blog-title-section">
      <div class="uk-container uk-container-small">
        <h1>{{ blogPost.title }}</h1>
        <h2 v-if="publishedAtFormatted">{{ publishedAtFormatted }}</h2>
      </div>
    </div>
    <div class="uk-section blog-content-section">
      <div class="uk-container uk-container-small">
        <div v-if="blogPost.content" id="editor" v-html="$md.render(blogPost.content)"></div>
      </div>
      <div class="uk-container uk-container-medium blog-post-series-next-prev border-top" v-if="!!thisBlogSeries">
        <router-link class="uk-link previous-post"
                      v-if="prevPostInSeries"
                      :to="{ name: 'blogPosts-id', params: {id: prevPostInSeries.id} }">
          Previous Post: {{ prevPostInSeries.title }}
        </router-link>
        <router-link class="uk-link next-post"
                      v-if="nextPostInSeries"
                      :to="{ name: 'blogPosts-id', params: {id: nextPostInSeries.id} }">
          Next Post: {{ nextPostInSeries.title }}
        </router-link>
      </div>
      <div class="uk-container uk-container-medium blog-post-footer" v-if="blogPost.links && blogPost.links.length">
        <h3>My Recommended Links</h3>
        <div class="related-links">
          <Link :id="link.id" v-for="link in blogPost.links" :key="link.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogPostQuery from "~/apollo/queries/blogPost/blogPost";
  import Link from "~/components/Link";
  import blogSeriessQuery from '~/apollo/queries/blogSeries/blogSeriess'
  import Prism from 'prismjs';

  var moment = require("moment");

  export default {
    data() {
      return {
        blogPost: {},
        blogSeries: [],
        moment: moment,
        imageBaseUri: process.env.IMAGE_BASE_URI || ''
      };
    },
    components: {
      Link
    },
    updated: function() {
      Prism.highlightAll();
    },
    computed: {
      blogPostId() {
        return parseInt(this.$route.params.id);
      },
      blogPostsInSeriesWindow() {
        if (this.thisBlogSeriesBlogPosts.length <= 3) {
          return this.thisBlogSeriesBlogPosts;
        }

        var startIndex = Math.max(this.thisBlogSeriesPostIndex-1, 0);
        var endIndex = startIndex + 3;

        if (endIndex > this.thisBlogSeriesBlogPosts.length) {
          startIndex = this.thisBlogSeriesBlogPosts.length - 3;
          endIndex = startIndex + 3
        }
        return this.thisBlogSeriesBlogPosts.filter(bp => bp.public).slice(startIndex, startIndex + 3)
      },
      thisBlogSeriesBlogPosts() {
        if (this.cachedSortedBlogPosts) return this.cachedSortedBlogPosts;
        if (!this.thisBlogSeries) return [];

        const sortFunction = (a, b) => a.blog_series_order > b.blog_series_order ? 1 : -1;

        return this.cachedSortedBlogPosts = this.thisBlogSeries.blog_posts.sort(sortFunction);
      },
      thisBlogSeries() {
        return this.blogSeries.find(blogSery => blogSery.blog_posts.find(blogPost => blogPost.id == this.blogPostId ));
      },
      thisBlogSeriesPostIndex() {
        return this.thisBlogSeriesBlogPosts.findIndex(blogPost => blogPost.id == this.blogPostId);
      },
      nextPostInSeries() {
        if (this.thisBlogSeriesPostIndex === this.thisBlogSeriesBlogPosts.length - 1) return undefined;
        return this.thisBlogSeriesBlogPosts[this.thisBlogSeriesPostIndex + 1];
      },
      prevPostInSeries() {
        if (this.thisBlogSeriesPostIndex === 0) return undefined;
        return this.thisBlogSeriesBlogPosts[this.thisBlogSeriesPostIndex - 1];
      },
      publishedAtFormatted() {
        if (!this.blogPost.published_at) {
          return '';
        }

        return moment(this.blogPost.published_at).format('MMMM Do YYYY');
      }
    },
    apollo: {
      blogPost: {
        prefetch: true,
        query: blogPostQuery,
        variables() {
          return { id: parseInt(this.$route.params.id) };
        }
      },
      blogSeries: {
        prefetch: true,
        query: blogSeriessQuery
      }
    },
    head () {
      const title = this.blogPost.title ? this.blogPost.title + ' / My Personal Blog' : 'My Personal Blog';

      return {
        title: title,
        meta: [
          { hid: 'description', name: 'description', content: this.blogPost.description },
          { hid: 'og:title', name: 'og:title', content: title },
          { hid: 'og:image', name: 'og:image', content: this.blogPost.image_header ? this.imageBaseUri + this.blogPost.image_header.url : '' },
          { hid: 'og:description', name: 'og:description', content: this.blogPost.description },
          { hid: 'og:url', name: 'og:url', content: window.location.href },
        ]
      }
    }
  };
</script>