import fastify from 'fastify'

const server = fastify()

const snoowrap = require('snoowrap');
require('dotenv').config()
const config = {
  username: process.env.username,
  password: process.env.password,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
}

function getUser() {
  const r = new snoowrap({
    userAgent: 'Whatever',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password,
  })
  return r.getMe();
}

server.get('/reddit', async (request, reply) => {
  return getUser();
});


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
