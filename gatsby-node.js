const Promise = require("bluebird")
const path = require("path")

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulMerchandisingPage {
            edges {
              node {
								id
								node_locale
								slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulMerchandisingPage.edges

        pages.forEach((page, index) => {
					const locale = page.node.node_locale;
					const slug = page.node.slug;

          createPage({
            path: locale + "/" + slug, 
            component: path.resolve("./src/templates/merchandising-page.js"),
            context: {
              id: page.node.id
            },
          })
        })
      })
    )
  })
}
