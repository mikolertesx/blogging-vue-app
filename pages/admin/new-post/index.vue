<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  methods: {
    onSubmitted(postData) {
      axios
        .post(`https://free-reality.firebaseio.com/posts.json`, {
          ...postData,
          updatedDate: new Date(),
        })
        .then((result) => {
          this.$router.push('/admin');
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>