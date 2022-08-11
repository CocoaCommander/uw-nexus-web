module.exports = {
  onPreBuild({ netlifyConfig }) {

    netlifyConfig.redirects.push({
      from: "/api/*",
      to: "https://uw-nexus-backend.herokuapp.com/api/:splat",
      status: 200
    });
  },
};