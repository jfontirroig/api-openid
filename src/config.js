import winston from 'winston'
import fs from 'fs'

const configDefaults = {
    winstonConsoleTransport: {
        level: 'info',
        handleExceptions: false,
        timestamp: true,
        stringify: true,
        colorize: true,
        json: false
    },
    domainName: 'api-openid.id',
    port: 3090,
    minBatchSize: 1,
    keycloak_url: 'http://190.113.12.16:8080',
    keycloak_realm: 'paradigma',
    keycloak_client: 'crosscheck',
    keycloak_client_secret: 'edc34f71-985c-4a76-8e92-5a1c19a9dd3b',
    keycloak_client_admin: 'admin-cli',
    keycloak_client_admin_secret: '100c718e-9733-4f6e-b694-1b6bd5f35617'
  }


export function getConfig() {
    let config = Object.assign({}, configDefaults)
    if (process.env.API_OPENID_DEVELOP) {
        config = Object.assign({}, configDevelopDefaults)
        config.development = true
    }

    if (process.env.API_OPENID_CONFIG) {
        const configFile = process.env.API_OPENID_CONFIG
        Object.assign(config, JSON.parse(fs.readFileSync(configFile)))
    }

    config.winstonConfig = {
        transports: [
            new winston.transports.Console(config.winstonConsoleTransport),
            new winston.transports.File({
                maxsize: 5120000,
                maxFiles: 10,
                filename: `${__dirname}/../logs/api_openid.log`,
                level: 'debug',
                handleExceptions: false,
                timestamp: true,
                stringify: true,
                colorize: false,
                json: false
            })
        ]
    }

    return config
}
