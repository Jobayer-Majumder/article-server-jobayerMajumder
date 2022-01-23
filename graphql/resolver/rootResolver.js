const articleResolver = require("./articleResolver");
const userResolvers = require("./userResolvers");



const rootResolver = {
    ...userResolvers,
    ...articleResolver
}


module.exports = rootResolver;