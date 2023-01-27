
# Documentation


## Launch Project

### RUN TEST :

 1. launch a local mongoDB instance :

    docker run -d -p 27017:27017  mongo:latest
    
 2. run tests
 
    npm test
 
### RUN PROJECT

1. copy .env.template in backend directory
2. rename in .env
3. run the docker container

	docker compose up 
	
4. you can use the postman collection given at the root of the project for testing the API

test technique.postman_collection.json

## API DOCUMENTATION

### USER
#### create

send a post request to the api : 

	post /users
	body : {"email":"valid@email.com", 
	"password": "123456"}

it will return

	{
		"email": "valid@email.com",
		"consents": [],
		"_id": "63d3656e3f79a37a9dbeff26",
		"createdAt": "2023-01-27T05:47:26.278Z",
		"updatedAt": "2023-01-27T05:47:26.278Z",
		"__v": 0
	}
or a 422 if email is invalid or if email doesnt exists

#### authentication 
for the following request you will need to give a jwt token in Authorisation header.
to get it you need to send : 
	
	post /authentication
	body : {
		"email":"valid@email.com", 
		"password": "123456", 
		"strategy": "local"
	}
	
it will return the token

#### get
to get a user object you will have to : 

     get /users/{id}
     Header : {
	     Authorization : "Bearer "+ token
     }

it will return 

	{
		"_id": "63d36062d09632c45bd7f38d",
		"email": "rofdbidddn3@2ffd.gg",
		"consents": [
			{
				"type": "email_notifications",
				"enabled": false,
				"_id": "63d3676e3f79a37a9dbeff35"
			}
		],
		"createdAt": "2023-01-27T05:25:54.276Z",
		"updatedAt": "2023-01-27T05:55:58.979Z",
		"__v": 0
	}

### EVENTS

#### create
to create an event

	/post /events
	 Header : {
	     Authorization : "Bearer "+ token
     }
     body : {
	     type:'changeConsent',
		 changeConsent: {
			type:  'email_notifications', //or 'sms_notifications']
			enabled: true
		}
	}

it will return the user event object: 

	{
		"type": "changeConsent",
		"changeConsent": {
			"type": "email_notifications",
			"enabled": true,
			"_id": "63d36e7600626c04ce15e9b6"
		},
		"user_id": "63d36062d09632c45bd7f38d",
		"_id": "63d36e7600626c04ce15e9b5",
		"createdAt": "2023-01-27T06:25:58.341Z",
		"updatedAt": "2023-01-27T06:25:58.341Z",
		"__v": 0
	}

and that will have the effect of changing the consent level of the user : 

	{
	"_id": "63d36062d09632c45bd7f38d",
	"email": "rofdbidddn3@2ffd.gg",
	"consents": [
		{
		"type": "email_notifications",
		"enabled": true,
		"_id": "63d36e7600626c04ce15e9b9"
		}
	],
	"createdAt": "2023-01-27T05:25:54.276Z",
	"updatedAt": "2023-01-27T06:25:58.345Z",
	"__v": 0
	}
if event isn't well formated it will throw a 422 error.
#### edit
not allowed, will throw a 405 error