export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    console.log("executed");
    state.loadedPosts = posts;
  }
};

export const actions = {
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
};
