const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Patientory File Manager',
      format: String,
      default: 'Patientory File Server'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
})

config.validate({ allowed: 'strict' })

module.exports = config
