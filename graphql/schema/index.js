const { buildSchema } = require('graphql');



const schemas = buildSchema(`
  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
    updatedAt: String!
    createdAt: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Comment {
    userId: String!
    comment: String!
    createdAt: String!
  }

  type Notify {
    successMessage: String!
    errorMessage: String!
  }


  input CommentInput {
    articleId: String!
    userId: String!
    comment: String!
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    tags: [String]!
    comments: [Comment]!
    authorEmail: String!
    updatedAt: String!
    createdAt: String!
  }
  
  input ArticleInput {
    title: String!
    description: String!
    tags: [String]!
  }
  
  type RootQuery {
    findUser(id: String!): [User]!
    articles: [Article]!
    findArticle(id: String!): [Article]!
  }
  
  
    type RootMutation {
      createUser(input: UserInput): [User]!
      createArticle(input: ArticleInput): [Article]!
      insertComment(input: CommentInput): Notify!
    }
  
  
    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);

module.exports = {
  schemas
}