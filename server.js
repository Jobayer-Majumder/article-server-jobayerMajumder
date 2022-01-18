const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');



const app = express();
app.use(cors())
app.use(express.json());


app.use('/graphql', graphqlHTTP({
//   schema: schemas,
//   rootValue: rootResolver,

  graphiql: true
}))


app.get('/', (req, res) => {
  res.send('look mom i am using graphql server')
})


app.listen(5000, () => console.log('server is running'))