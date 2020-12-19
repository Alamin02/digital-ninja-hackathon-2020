# Hotel Management

### Dependencies:

- NodeJS 12+
- Yarn package manager

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
