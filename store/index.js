import axios from "axios";

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
  addPost(vuexContext, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    };
    return axios
      .post(`https://free-reality.firebaseio.com/posts.json`, createdPost)
      .then(result => {
        vuexContext.commit("addPost", { ...createdPost, id: result.data.name });
      })
      .catch(error => console.error(error));
  },
  editPost(vuexContext, editedPost) {
    return axios
      .put(
        `https://free-reality.firebaseio.com/posts/${editedPost.id}.json`,
        editedPost
      )
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
