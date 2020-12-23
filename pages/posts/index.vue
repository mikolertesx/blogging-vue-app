<template>
  <div class="posts-page">
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
      }, 120)
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
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>