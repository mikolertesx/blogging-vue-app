<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">Title of the Post</h1>
      <div class="post-details">
        <div class="post-title">Last updated on</div>
        <div class="post-title">Written by NAME</div>
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