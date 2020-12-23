<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
export default {
  components: {
    PostList,
  },
  async asyncData() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 150)
    );
    return {
      loadedPosts: [
        {
          id: "1",
          title: "First Post",
          previewText: "This is our first post!",
          thumbnail:
            "https://i.pinimg.com/originals/fc/15/a4/fc15a49a4534abd7ad07973550af3226.png",
        },
        {
          id: "2",
          title: "Second Post",
          previewText: "This is our second post!",
          thumbnail:
            "https://i.pinimg.com/236x/59/83/f5/5983f54e3917e773dbd2a6c414ada035.jpg",
        },
      ],
    };
  },
  data() {
    return {
      loadedPosts: [],
    };
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
</style>