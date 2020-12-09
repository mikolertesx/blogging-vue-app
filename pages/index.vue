<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
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
  </div>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  components: {
    PostPreview: PostPreview,
  },
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>