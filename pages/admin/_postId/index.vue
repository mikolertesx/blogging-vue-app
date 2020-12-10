<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>
<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm,
  },
  data() {
    return {
      loadedPost: {
        author: "Maximilian",
        title: "My awesome post",
        content: "Super amazing, thanks for that!",
        thumbnailLink:
          "https://steamuserimages-a.akamaihd.net/ugc/913550211586682151/383DE3EAB05DAEA383A8D818965E8E2F8B33E658/?imw=1024&imh=631&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      },
    };
  },
};
</script>
<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>