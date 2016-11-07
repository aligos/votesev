const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { printSchema } = require('graphql/utilities/schemaPrinter');

const { subscriptionManager } = require('./data/subscriptions');
const schema = require('./data/schema');

// dodol
const graphQLServer = express().use('*', cors());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.listen(8080);

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(8090);

// eslint-disable-next-line
new SubscriptionServer(
  { subscriptionManager },
  websocketServer
);
