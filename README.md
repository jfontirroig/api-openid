# API-OPENID  SERVICE WITH NODEJS, EXPRESSJS AND KEYCLOAK (OPENID/AUTH RED-HAT) 

## Instalar PM2

```
sudo apt-get update
sudo npm install -g pm2
```

```
sudo pm2 list
sudo pm2 stop app_name_or_id    (según name de sudo pm2 list)
sudo pm2 start app_name_or_id   (según name de sudo pm2 list)
sudo pm2 monit
```

## Instalar Let's Encrypt

```
sudo apt-get update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d anydomain
```

### Renovación

```
sudo systemctl stop nginx
sudo certbot renew --force-renew
```

## Instalar Nginx

```
sudo apt-get update
sudo apt-get install nginx
sudo ufw allow 'Nginx Full'
```

### sudo nano /etc/nginx/sites-available/default
(Default server configuration)

```
server {
	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;
	server_name anydomain; # managed by Certbot
	
	location /api-openid {
	      proxy_pass https://anydomain:3000;
	      proxy_http_version 1.1;
	      proxy_set_header Upgrade $http_upgrade;
	      proxy_set_header Connection 'upgrade';
	      proxy_set_header Host $host;
	      proxy_cache_bypass $http_upgrade;
	}
	
	listen [::]:443 ssl ipv6only=on; # managed by Certbot
	listen 443 ssl; # managed by Certbot
	ssl_certificate /etc/letsencrypt/live/anydomain/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/anydomain/privkey.pem; # managed by Certbot
	include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```

```
server {
       if ($host = anydomain) {
          return 301 https://$host$request_uri;
       } # managed by Certbot

       listen 80 ;
       listen [::]:80 ;
       server_name anydomain;
       return 404; # managed by Certbot
}
```

```
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl stop nginx
sudo systemctl start nginx
```

## Instalar KEYCLOAK
Instalación en Ubuntu

```
ver https://cloudinfrastructureservices.co.uk/install-keycloak-sso-on-ubuntu-20-04/
```

## INSTALAR APP

```
cd /home/api-openid/
sudo npm run build
sudo pm2 delete api-openid
sudo API_CONFIG=/home/api-openid/config-api_openid.json pm2 start node lib/index.js --name "api-openid"
sudo pm2 save
sudo systemctl restart nginx
```
