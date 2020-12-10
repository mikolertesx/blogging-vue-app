<template>
  <section class="featured-posts">
    <PostPreview
      id="1"
      thumbnail="https://steamuserimages-a.akamaihd.net/ugc/913550211586682151/383DE3EAB05DAEA383A8D818965E8E2F8B33E658/?imw=1024&imh=631&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
      title="Hello there!"
      previewText="This is my first post!"
    />
    <PostPreview
      id="2"
      thumbnail="https://i.pinimg.com/originals/bf/0a/43/bf0a430202cf18bb37d256ed8fd28707.jpg"
      title="Hello there!"
      previewText="This is my first post!"
    />
    <PostPreview
      id="3"
      thumbnail="https://pm1.narvii.com/6980/277cb138cc5d3541a97aa7be0260d1e3aff37c0ar1-768-768v2_hq.jpg"
      title="Hello there!"
      previewText="This is my first post!"
    />
  </section>
</template>
<script>
import PostPreview from "@/components/POsts/PostPreview";
export default {
  PostPreview
}
</script>
<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>