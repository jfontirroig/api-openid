/* @flow */
import logger from 'winston'
import axios from 'axios'
import qs from 'qs'

export class ApiServer {

    constructor(config) {
        this.config = config;
    }

    async initializeServer() {
    }

    async retrievetoken(
        username: string,
        password: string,
        grant_type: string,
        client_id: string,
        client_secret: string
    ): Promise < void > {
      let respuesta = ''
      let data = qs.stringify({
        username: username,
        password: password,
        grant_type: grant_type,
        client_id: client_id,
        client_secret: client_secret
      });
      let configAxios = {
        method: 'post',
        url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}/protocol/openid-connect/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache'
        },
        data : data
      };
      try {
          const response = await axios(configAxios);
          const accessToken = JSON.stringify(response.data);
          respuesta = accessToken
      } catch (error) {
          respuesta = JSON.stringify(error)
      }
      return respuesta
    }

    async adminAccessTokenClientCredentialsGrant(
        grant_type: string,
        client_id: string,
        client_secret: string
    ): Promise < void > {
        let respuesta = ''
        let data = qs.stringify({
          grant_type: grant_type,
          client_id: client_id,
          client_secret: client_secret
        });
        let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/realms/master/protocol/openid-connect/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        try {
            const response = await axios(configAxios);
            const accessToken = JSON.stringify(response.data);
            respuesta = accessToken
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async obtainAccessTokenForUser(
        username: string,
        password: string,
        grant_type: string,
        client_id: string,
        client_secret: string
    ): Promise < void > {
        let respuesta = ''
        let data = qs.stringify({
          username: username,
          password: password,
          grant_type: grant_type,
          client_id: client_id,
          client_secret: client_secret
        });
        let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}/protocol/openid-connect/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        try {
            const response = await axios(configAxios);
            const accessToken = JSON.stringify(response.data);
            respuesta = accessToken
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async protocolToken(
        username: string,
        password: string,
        grant_type: string,
        client_id: string,
        client_secret: string
    ): Promise < void > {
        let respuesta = ''
        let data = qs.stringify({
          username: username,
          password: password,
          grant_type: grant_type,
          client_id: client_id,
          client_secret: client_secret
        });
        let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}/protocol/openid-connect/token`,
          headers: {},
          data : data
        };
        try {
            const response = await axios(configAxios);
            const accessToken = JSON.stringify(response.data);
            respuesta = accessToken
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async createNewUser(
        data: string,
        authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': authorization
        };
      let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users`,
          headers: headers,
          data : data
        };
        try {
            const response = await axios(configAxios);
            const accessToken = JSON.stringify(response.data);
            respuesta = accessToken
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async userAccountLogin(
        data: string,
        authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': authorization
        };
      let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/account`,
          headers: headers,
          data : data
        };
        try {
            const response = await axios(configAxios);
            const accessToken = JSON.stringify(response.data);
            respuesta = accessToken
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async configuration(
    ): Promise < void > {
        let respuesta = ''
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}/.well-known/openid-configuration`,
          headers: {}
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
                //logger.info('ApiServer - configuration --> error' + JSON.stringify(error))
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async userInfo(
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}/protocol/openid-connect/userinfo`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async getRealmsInfo(
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/realms/${this.config.keycloak_realm}`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async adminUsers(
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async getUsers(
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async getRepresentationUser(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async updateUser(
       id: string,
       data: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': authorization
        };
        let configAxios = {
          method: 'PUT',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}`,
          headers: headers,
          data: data
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async deleteUser(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'DELETE',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async getCredentials(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'GET',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}/credentials`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async logoutUser(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'POST',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}/logout`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async sendUpdateAccountEmailUser(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'PUT',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}/execute-actions-email`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async resetPassword(
       id: string,
       data: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': authorization
        };
        let configAxios = {
          method: 'PUT',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}/reset-password`,
          headers: headers,
          data: data
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data
        } catch (error) {
            respuesta = JSON.stringify(error)
        }
        return respuesta
    }

    async sendVerifyEmail(
       id: string,
       authorization: string
    ): Promise < void > {
        let respuesta = ''
        let headers = {
          'Authorization': authorization
        };
        let configAxios = {
          method: 'PUT',
          url: `${this.config.keycloak_url}/auth/admin/realms/${this.config.keycloak_realm}/users/${id}/send-verify-email`,
          headers: headers
        };
        try {
            const response = await axios(configAxios);
            const data = JSON.stringify(response.data);
            respuesta = data

            logger.info('ApiServer - sendUpdateAccountEmailUser --> error' + JSON.stringify(response))
            logger.info('ApiServer - sendUpdateAccountEmailUser --> error' + JSON.stringify(response.data))

        } catch (error) {
            respuesta = JSON.stringify(error)
            logger.info('ApiServer - sendUpdateAccountEmailUser --> error' + JSON.stringify(error))
        }
        return respuesta
    }

    shutdown() {
    }
}
