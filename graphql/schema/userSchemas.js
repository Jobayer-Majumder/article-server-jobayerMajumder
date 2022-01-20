

const userTypes = `
    type user {
        name: String!
        userName: String!
        email: String!
        password: String!
        updatedAt: String
        createdAt: String
    }

`

const userQueries = `
    users: [user]!
`


const userMutations = `
    findUser(email: String!): [user]!

`

module.exports = {
    userTypes,
    userQueries,
    userMutations
}