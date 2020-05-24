const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // hacemos una consulta para obtener todos los posts y páginas de wordpress
  const result = await graphql(`
    query {
      allWordpressPage {
        edges {
          node {
            id
            title
            excerpt
            slug
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            title
            excerpt
            slug
          }
        }
      }
    }
  `)

  // componente de plantilla para detalles de páginas
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  // nodo de página. Solo usaremos el Slug de WordPress para el slug.
  // Queremos crear una página detallada para cada
  const pages = result.data.allWordpressPage.edges
  pages.forEach((edge, index) => {
    const previous = index === pages.length - 1 ? null : pages[index + 1].node
    const next = index === 0 ? null : pages[index - 1].node
    // Los complementos y sitios pueden usar funciones como "createPage"
    // para interactuar con Gatsby.
    // Gatsby usa Redux para administrar su estado interno.
    createPage({
      // Se requiere que cada página tenga una 'path' también
      // como un componente de plantilla. El `contexto` es
      // opcional pero a menudo es necesario para que la plantilla
      // puede consultar datos específicos de cada página.
      path: `/${edge.node.slug}/`,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id,
        previous,
        next,
      },
    })
  })

  // Ahora ahoremos lo mismo pero para los post aunque con una 
  // diferencia de que la url empezará por /blog/slug-del-post

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const posts = result.data.allWordpressPost.edges

  result.data.allWordpressPost.edges.forEach((edge, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: `/blog/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
        previous,
        next,
      },
    })
  })
}