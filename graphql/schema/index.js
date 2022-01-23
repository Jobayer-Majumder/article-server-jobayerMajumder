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

  type Token {
    token: String!
  }

  input LoginInput {
    email: String!
    password: String
  }

  scalar Date

  type Comment {
    userName: String!
    comment: String!
    createdAt: Date!
  }

  type Notify {
    successMessage: String!
    errorMessage: String!
  }


  input CommentInput {
    articleId: String!
    userName: String!
    comment: String!
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    tags: [String]!
    comments: [Comment]!
    authorName: String!
    authorEmail: String!
    updatedAt: Date!
    createdAt: Date!
  }
  
  input ArticleInput {
    title: String!
    description: String!
    tags: [String]!
    authorName: String!
    authorEmail: String!
  }
  
  type RootQuery {
    findUser(id: String!): [User]!
    articles: [Article]!
    findArticle(id: String!): [Article]!
    deleteArticle(id: String!): Notify!
    userArticle(email: String!): [Article]!
  }
  
  
    type RootMutation {
      createUser(input: UserInput): Token!
      loginUser(input: LoginInput): Token!
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