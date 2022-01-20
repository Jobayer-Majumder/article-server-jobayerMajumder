

const articleTypes = `
    type article {
        title: String!
        description: String!
        tags: [String]!
        authorEmail: String
        updatedAt: String
        createdAt: String
    }

`

const articleQueries = `
    articles: [article]!
`


const articleMutations = `
    findArticle(id: String!): [article]!

`

module.exports = {
    articleTypes,
    articleQueries,
    articleMutations
}