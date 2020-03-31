<template>
  <div class="footer">
    <ul>
      <Links linkKey="footer" />
    </ul>
    <div class="copyright">All Content Copyright (&copy;) Me, 2020</div>
  </div>
</template>

<script>
  import Links from "~/components/Links";
  import linksQuery from "~/apollo/queries/link/links.gql";

  export default {
    components: {
      Links
    }
  };
</script>
