# AIFitnessCoach
This is an AI Based Fitness Coach which recommends Fitness plans as per Fitness Level (Beginner, Medium, Advance), BMI, and Number of Days. This project also uses Knit AI API.
## Tech Stack
1. React.js
2. Express.js
3. Tailwind CSS

### Setup of Project
1. Fork and Clone the Repository.
2. In the client directory, install packages :
```
cd client
yarn
```
3. Run the frontend
```
yarn dev
```
4. Navigate to server directory and install packages :
```
cd ..
cd server
yarn
```
5. Make a .env file with variable ```AUTH_TOKEN```. Generate AUTH_TOKEN by Signing into [Knit AI]([url](https://www.getknit.ai/)) Website. 
6. Run the server :
```
nodemon index.js
```
