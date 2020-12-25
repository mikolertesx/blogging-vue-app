import Cookie from "js-cookie";

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
        Cookie.set("jwt", result.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + +result.expiresIn * 1000
        );
      })
      .catch(error => console.log(error));
  },
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else {
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
      console.log(
        localStorage.getItem("token"),
        localStorage.getItem("tokenExpiration")
      );
    }
    if (new Date().getTime() > +expirationDate || !token) {
      vuexContext.commit("clearToken");
      return;
    }
    vuexContext.commit("setToken", token);
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
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
