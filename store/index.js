export const state = () => ({
  loadedPosts: [],
  token: null
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
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
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

    console.log(vuexContext.state);

    return this.$axios
      .$post(
        `${process.env.baseUrl}/posts.json?auth=${vuexContext.state.token}`,
        createdPost
      )
      .then(data => {
        vuexContext.commit("addPost", { ...createdPost, id: data.name });
      })
      .catch(error => console.error(error));
  },
  editPost(vuexContext, editedPost) {
    return this.$axios
      .$put(
        `${process.env.baseUrl}/${editedPost.id}.json?auth=${vuexContext.state.token}`,
        editedPost
      )
      .then(result => {
        vuexContext.commit("editPost", editedPost);
      })
      .catch(e => console.error(e));
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit("setPosts", posts);
  },
  authenticateUser(vuexContext, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.key}`;
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.key}`;
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        vuexContext.commit("setToken", result.idToken);
        localStorage.setItem("token", result.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + +result.expiresIn * 1000
        );
        vuexContext.dispatch("setLogoutTimer", +result.expiresIn * 1000);
      })
      .catch(error => console.log(error));
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit("clearToken");
    }, duration);
  },
  initAuth(vuexContext) {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("tokenExpiration");
    if (new Date().getTime() > +expirationDate || !token) {
      return;
    }
    vuexContext.dispatch(
      "setLogoutTimer",
      +expirationDate - new Date().getTime()
    );
    vuexContext.commit("setToken", token);
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },
  isAuthenticated(state) {
    return state.token != null;
  }
};
