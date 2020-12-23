<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadedPost.updatedDate }}
        </div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p>Content of the post</p>
    </section>
    <section class="post-feedback">
      <p class="post-content">
        Let me know what you think about the post, send a mail to
        <a href="mailto:feedback@my-awesome-domain.com">my page</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    ).catch((e) => {
      context.error(new Error("Couldn't load"));
    });
    return {
      loadedPost: {
        id: "1",
        title: `First Post (ID: ${context.params.id})`,
        previewText: "This is our first post!",
        author: "Mike",
        updatedDate: new Date(),
        content: "Some dummy text",
        thumbnail:
          "https://i.pinimg.com/originals/fc/15/a4/fc15a49a4534abd7ad07973550af3226.png",
      },
    };
  },
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}
.post {
  width: 100%;
}
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
  .post-details {
    flex-direction: row;
  }
}
.post-title {
  margin: 0;
}
.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
}
.update-form {
  width: 500px;
}
</style>