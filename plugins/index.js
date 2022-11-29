module.exports = {
  onPreBuild({ netlifyConfig }) {

    netlifyConfig.redirects.push({
      from: "/api/*",
      to: "https://uw-nexus-backend.onrender.com/api/:splat",
      status: 200
    });
  },
};