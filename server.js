// external import
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

// internal import
const rootResolver = require('./graphql/resolver/rootResolver');
const { schemas } = require('./graphql/schema');



const app = express();
app.use(cors());
app.use(express.json());

//setup graphql middleware
app.use('/graphql', graphqlHTTP({
  schema: schemas,
  rootValue: rootResolver,

  graphiql: true
}));


//connect to the mongo
const connectMongoose = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@jobayer.eggfq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
}
connectMongoose()
  .then(res => console.log('db connected'))
  .catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('look mom i am using graphql server')
});


app.listen(process.env.PORT || 5000, () => console.log('server is running'));