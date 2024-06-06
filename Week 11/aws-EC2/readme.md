
# Cloud Provider
The `cloud` refers to on-demand delivery of IT resources over the internet. Imagine it like electricity - you don't need to build your own power plant, you just pay for the electricity you use.

`Cloud providers` are companies that offer these IT resources like computing power, storage, databases and even software applications.

Few are:
- AWS
- Azure
- GCP
- Oracle cloud
- IBM cloud (kyndryl)
- DigitalOcean
- Vultr

### Can I use my own machine to deploy?
Because you don't have public `IP`. The  number of `IP` address are limited. That is why we rent a AWS machine and it has a `PUBLIC IP`.


## Why to use AWS when we use can Cloudflare?
- Use Cloudflare for content delivery, DDoS protection, and basic security.
- Use AWS for building and running complex applications, with features like databases, compute power, and machine learning.
- When we starting an appplication we usually use `serverless` like cloudflare and when application scale we need a our own `server` like AWS provide and you can increase or decrease your server size.
- Eventually you own your infastructure.

## How to deploy a website on AWS using EC2?
1. Create an account on AWS.

2. Go to `EC2` service.
> EC2 is a virtual server in the cloud. It stands for Elastic Compute Cloud.

3. Click on `Launch Instance`.
> An instance is a virtual server in the cloud.

4. Name your instance.
5. Choose an instance type. e.g- t2.micro (Free tier eligible)
6. choose OS. e.g- Ubuntu
7. create a new key pair.
8. configure network settings.
  - Allow all traffic. eg. Allow SSH, HTTP, HTTPS.
9. Click on `Launch Instance`.


10. Go to `Instances` and select instance.
11. Click on `Connect`. on the top right.
12. when connected to the instance, clone your repository.
13. If you have a `node` application, install `node` and `npm`.
14. If internet is not working, run following command:
```bash
sudo nano /etc/resolv.conf
```
15. Add the following line:
```
nameserver 8.8.8.8
```
16. Run the following command to install `node` and `npm`:
```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```
17. Run the following command to install `pm2`:
```bash
sudo npm install pm2 -g
```
18. Run the following command to start the server:
```bash
pm2 start app.js
```
19. Go to `Security Groups` and click on `Edit inbound rules`.
20. Add a new rule with `custom TCP` and `Anywhere`. for both `ip4` and `ip6`.
23. Install `nginx` to serve the website.
24. Run the following command to install `nginx`:
```bash
sudo apt-get install nginx
```
25. Run the following command to start `nginx`:
```bash
sudo rm sudo vi /etc/nginx/nginx.conf
sudo vi /etc/nginx/nginx.conf
```
26. Add the following line in the `http` block:
```
events {
    # Event directives...
}

http {
	server {
    listen 80;
    server_name be1.100xdevs.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```
27. Run the following command to restart `nginx`:
```bash
sudo service nginx restart
```
28. Now start the server using `pm2`:
```bash
pm2 start app.js
```





