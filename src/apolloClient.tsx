import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || 'https://lol-maelstrom.herokuapp.com/',
});
