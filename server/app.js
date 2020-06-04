const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/Event');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type Event {
      _id: String!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(res => res)
          .catch(e => console.log(e));
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then(res => res)
          .catch(e => {
            console.log(e);
            throw e;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect('mongodb://localhost:27017/event_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected..');
    app.listen(3000, () => console.log('Server is running...'));
  })
  .catch(e => console.log(e));
