export default {
  head: {
    title: "Mikolertesx's Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My Cool Web Development Blog"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      }
    ]
  },
  loading: {
    color: "#fa923f",
    height: "5px",
    failedColor: "red",
    duration: 5000
  },
  loadingIndicator: {
    name: "circle",
    color: "#fa923f"
  },
  css: ["~assets/styles/main.css"],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [],
  build: {},
  env: {
    baseUrl: process.env.SERVER
  },
  pageTransition: {
    name: "fade",
    mode: "out-in"
  }
};
