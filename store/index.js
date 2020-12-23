export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  }
};

export const actions = {
  nuxtServerInit(vuexContext) {
    return new Promise(resolve =>
      setTimeout(() => {
        vuexContext.commit("setPosts", [
          {
            id: "1",
            title: "First Post",
            previewText: "This is our first post!",
            thumbnail:
              "https://i.pinimg.com/originals/fc/15/a4/fc15a49a4534abd7ad07973550af3226.png"
          },
          {
            id: "2",
            title: "Second Post",
            previewText: "This is our second post!",
            thumbnail:
              "https://i.pinimg.com/236x/59/83/f5/5983f54e3917e773dbd2a6c414ada035.jpg"
          }
        ]);

        resolve();
      }, 5000)
    );
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
