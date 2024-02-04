import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 3001;

const url = 'https://api.getknit.ai/v1/router/run';

app.use(bodyParser.json());


const authToken = process.env.AUTH_TOKEN;
// console.log(authToken)

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/submit-form', async (req,res) => {
  try {
      const { level, bmi,days } = req.body;
      console.log(level, bmi,days);
      const postData = {
          messages: [
              {
                  role: 'system',
                  content: 'You are Fitness Coach. Give important text in separate lines please. Give a Fitness plan to user based on his Level, BMI and Days. Assume everytime that user has to go to Gym.',
              },
              {
                  role: 'user',
                  content: 'I want a personalized fitness plan. Give important text in separate lines please. I am a {{level}} excerciser. My BMI is {{bmi}}. Please generate a {{days}} days workout routine, including: Daily exercise routines based on my fitness level Weekly challenges to push my limits. Monthly assessments to track progress. Generate plan properly as the level, bmi, number of days.',
              },
          ],
          model: {
              name: 'openai/gpt-3.5-turbo',
          },
          variables: [
              {
                  name: 'level',
                  value: level,
              },
              {
                name : 'bmi',
                value :bmi,
              },
              {
                name : 'days',
                value : days
              }
          ],
      };

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': authToken,
          },
          body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log(data.responseText);

      return res.status(200).json(data);

  } catch (error) {
      throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
