<template>
  <div>
    <div class="hero-image">
      <ImageSingle target="hero_image" />
    </div>
    <div class="horizontal-section-wrapper">
      <div class="section">
        <h2>Blog Series</h2>
        <BlogSeriess :blogSeriess="blogSeries"></BlogSeriess>
      </div>
      <div class="section">
        <h2>Posts</h2>
        <BlogPosts :blogPosts="blogPosts.filter(bp => !bp.show_in_series_only)"></BlogPosts>
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
