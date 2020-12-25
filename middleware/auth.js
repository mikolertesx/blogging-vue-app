export default function(context) {
  console.log("[Middleware] Just auth");
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}
