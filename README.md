# Hotel Management

### Dependencies:

- NodeJS v12+
- Yarn v1.22.5

### How to run:

- Clone the repository
- Install required packages using `yarn install`
- Create a `.env` file like one in `example.env` and set a secret key for JWT
- Start the server using `yarn start`

### Testing the API:

- Exported postman file is in the root folder in the name `postman.json`
- Add the `token` returned in the `/api/v1/users/login` endpoint to access the authentication protected endpoints
- Add the token as authorization header `Authorization: Bearer YOUR_TOKEN`


### Swagger

- Swagger documentation can be found at `/docs` endpoint, however this is not fully completed


### Workflow

- POST `/api/v1/users/register` endpoint register an agent user
- POST `/api/v1/users/login` endpoint returns a bearer token
- POST `/api/v1//room` endpoint creates new rooms
- POST `/api/v1//booking` endpoint creates a new booking record
- GET `/api/v1//booking` lists all bookings (pagination not implemented)
- POST `/api/v1//payment` creates a payment record for a booking
