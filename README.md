# Node Assesment - Discussion Board

## Setup (Linux, localhost)

Download this repository to your machine's home directory:

`cd ~`
`git clone https://github.com/biomiller/Node_assessment.git`
`cd Node_assessment`

Initialise containers using docker-compose:

`docker-compose up -d`

In a new terminal:

Check server container is running:

`curl http://localhost:5000/user/test`

`curl http://localhost:5000/item/test`

_Both commands should return 'This is a test!'_

Create a test user:

`curl -i -X POST -H "Content-Type: application/json" -d "{\"username\":\"testUser\", \"email\":\"test@mail.com\", \"password\":\"password\",\"password2\":\"password\"}" http://localhost:5000/user/register`

Create a test item for testUser:

`curl -i -X POST -H "Content-Type: application/json" -d "{\"username\":\"testUser\", \"password\":\"password\",\"title\":\"testTitle\", \"content\":\"testContent\"}" http://localhost:5000/item/createItem`
