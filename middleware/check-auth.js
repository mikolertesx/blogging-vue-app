export default function(context) {
  console.log("[Middleware] Check auth");
  if (process.client) {
    context.store.dispatch("initAuth");
  }
}
