
## Overview


## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![loader.io](https://camo.githubusercontent.com/12cdf07d923fad8f5afa178514501925f43480c039f86dbc611b0cb34da91fd7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6f616465722e696f2d3435373942363f7374796c653d666f722d7468652d6261646765) ![k6](https://camo.githubusercontent.com/ea3df6ca6d37dee867a151ffe62e5d7780aa36d08b5cd2e9a8ed2f5b736f202f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4b362d3744363446463f7374796c653d666f722d7468652d6261646765266c6f676f3d6b36266c6f676f436f6c6f723d7768697465)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)



## Table of Contents

- [Description](#Description)
- [Usage](#usage)
- [Contributors](#Contributors)

## Description 

Redesigned a backend system for an preexisting e-commerce store front to support a minimum of at least 1,000 client requests per second under a 1% error rate for deployment.

This project required
- An ETL transfer of the companies previous dataset (The company wanted the database to look the same but for the backend to be more performant)
- Creation of API routes that efficiently query the database. Finding the most effective query to handle high stress load from our stress test
- Applying a load balancer or caching system to reach the goal of 1000rps with <1% error rate


Deployment
- For production, the backend was deployed on a AWS EC2 T2.MICRO instance w/ Redis. The client was able to receive the requirement of 1000 client request per second under 1% error rate.

Things to consider 
- I had to explain to the client that their will be a tradeoff between efficiency and cost. With redis alone, I was able to achieve the BMR. However, I had to speak with the client to see the importance in some datasets. The reason being is because since this is an ecommerce store, we should not be displaying outdated data back to the UI especially the price and availability of products. With that being said, we discussed to update the price and avaibility as a priority and expire the rest of the data everyday. The tradeoff between efficiecny and cost is that if we wanted to bypass this 1000 rps, we would have to run nginx load balancers between different instances. That would require more money because we are acquiring more hardware to relieve the stress.

- I wanted my client to have options. I created an option where I started 3 EC2 instances w/ a NGINX load balancer & redis. With this I was able to achieve 3000rps with an average of 39ms per request.


With redis 
![image](https://github.com/Prim-Tech/questions-answers/assets/110634988/7498f15d-42fa-422d-ae39-839fa7d87d2c)

With NGINX
![image](https://github.com/Prim-Tech/questions-answers/assets/110634988/29c3761e-1cf5-4379-925f-1e683c5ea8a7)


## Usage
This was used for the preexisting e-commerce web-site of our client.

## Contributors 
[Stanley Chu](https://www.linkedin.com/in/chustanleys/)

