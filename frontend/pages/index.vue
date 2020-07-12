<template>
  <div>
    <div class="hero-image" v-if="hero_image">
      <ImageSingle target="hero_image" />
    </div>
    <div class="horizontal-section-wrapper">
      <div class="section" v-if="blogSeries" >
        <h2>Blog Series</h2>
        <BlogSeriess :blogSeriess="blogSeries"></BlogSeriess>
      </div>
      <div class="section">
        <h2>Posts</h2>
        <BlogPosts v-if="blogPosts" :blogPosts="blogPosts.filter(bp => !bp.show_in_series_only)"></BlogPosts>
        <div v-else>
          <p>You need to create your first blog post in the admin, at <a href="http://localhost:1337/admin/" target="_blank">http://localhost:1337/admin/</a><p>
          <p>Then you can create a hero image for this page by making an Image with a target of here_image.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "~/layouts/Footer";
import blogPostsQuery from '~/apollo/queries/blogPost/blogPosts'
import blogSeriessQuery from '~/apollo/queries/blogSeries/blogSeriess'
import BlogPosts from '~/components/BlogPosts'
import BlogSeriess from '~/components/BlogSeriess'
import ImageSingle from '~/components/ImageSingle'

export default {
  data () {
    return {
      blogPosts: [],
      blogSeries: []
    }
  },
  components: {
    BlogPosts,
    BlogSeriess,
    ImageSingle
  },
  apollo: {
    blogPosts: {
      prefetch: true,
      query: blogPostsQuery
    },
    blogSeries: {
      prefetch: true,
      query: blogSeriessQuery
    }
  },
  head () {
    return {
      title:'Home / My Personal Blog',
      meta: [
        { hid: 'description', name: 'description', content: 'My Personal Blog are the musings of me.' }
      ]
    }
  }
}
</script>
