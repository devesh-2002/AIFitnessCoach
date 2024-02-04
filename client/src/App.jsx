import React, { useState } from 'react';
import ReactLoading from 'react-loading';

function App() {
  const [formData, setFormData] = useState({
    level: '',
    bmi: '',
    days: '',
  });
  const [responseText, setResponseText] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const postUrl = 'http://localhost:3001/submit-form';
      const postHeaders = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(postUrl, {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      setResponseText(formatBotResponse(responseData.responseText));
      setIsButtonClicked(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBotResponse = (rawResponse) => {
    const paragraphs = rawResponse.split('\n');

    const formattedResponse = paragraphs.map((paragraph, index) => (
      <p key={index}>
        {paragraph.split('**').map((text, innerIndex) => (
          innerIndex % 2 === 0 ? (
            <span key={`non-bold-${innerIndex}`}>{text}</span>
          ) : (
            <strong key={`bold-${innerIndex}`}>{text}</strong>
          )
        ))}
      </p>
    ));

    return formattedResponse;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/06/06/54/92/360_F_606549277_BMzgu4QoNfqHDkmUgngJrFHuxZXvkS7d.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div className={`w-full mx-5 my-10 lg:w-1/2 ${responseText ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800' : 'bg-gray-800'} p-8 rounded-md shadow-lg overflow-y-auto max-h-97`}>
        <h2 className="text-3xl text-center font-bold mb-4" style={{ fontFamily: 'Helvetica, sans-serif' }}>Fitness Details</h2>
        <form className="space-y-4">
          <div className="mb-4 flex flex-col gap-3 mb-1">
            <label htmlFor="level" className={`block text-md font-bold ${formData.level && 'text-green-500'}`} style={{ fontFamily: 'Verdana, sans-serif' }}>
              Fitness Level
            </label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Beginner, Moderate, Advanced"
              style={{ fontFamily: 'Calibri' }}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2 mb-1">
            <label htmlFor="bmi" className={`block text-md font-bold ${formData.bmi && 'text-green-500'}`} style={{ fontFamily: 'Georgia, serif' }}>
              BMI
            </label>
            <input
              type="text"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder="BMI"
              style={{ fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif' }}
            />
          </div>
          <div className="mb-4 flex flex-col gap-3 mb-1">
            <label htmlFor="days" className={`block text-md font-bold ${formData.days && 'text-green-500'}`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Total Number of Days
            </label>
            <input
              type="text"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Total Number of Days"
              style={{ fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif' }}
            />
          </div>
          <button
            className={`align-middle select-none bg-green-500 font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none`}
            type="button"
            onClick={submitForm}
            disabled={loading}
          >
            {loading ? (
              <ReactLoading type="spin" color="white" height={20} width={20} />
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
      {responseText && (
        <div className="w-full max-h-96 lg:w-2/3 mx-10 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md">
          <div className="text-lg text-white max-h-96 overflow-y-auto">
            {responseText}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
