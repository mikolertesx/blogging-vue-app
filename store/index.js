export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post);
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    );
    if (postIndex < 0) {
      return;
    }
    state.loadedPosts[postIndex] = editedPost;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios
      .$get(`${process.env.SERVER}/posts.json`)
      .then(data => {
        const postsArray = [];
        for (const key in data) {
          postsArray.push({
            ...data[key],
            id: key,
            thumbnail: data[key].thumbnailLink || data[key].thumbnail
          });
        }
        vuexContext.commit("setPosts", postsArray);
      })
      .catch(e => {
        context.error(e);
      });
  },
  addPost(vuexContext, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    };
    return this.$axios
      .$post(`${process.env.baseUrl}/posts.json`, createdPost)
      .then(data => {
        vuexContext.commit("addPost", { ...createdPost, id: data.name });
      })
      .catch(error => console.error(error));
  },
  editPost(vuexContext, editedPost) {
    return this.$axios
      .$put(`${process.env.baseUrl}/${editedPost.id}.json`, editedPost)
      .then(result => {
        vuexContext.commit("editPost", editedPost);
      })
      .catch(e => console.error(e));
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
};
