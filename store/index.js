import axios from "axios";

export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get("https://free-reality.firebaseio.com/posts.json")
      .then(res => {
        const postsArray = [];
        for (const key in res.data) {
          postsArray.push({
            ...res.data[key],
            id: key,
            thumbnail: res.data[key].thumbnailLink || res.data[key].thumbnail
          });
        }
        vuexContext.commit("setPosts", postsArray);
      })
      .catch(e => {
        context.error(e);
      });
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
