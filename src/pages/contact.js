import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/mzbnvzvl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setEmailSent(true);
        setEmailError(false);
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Error submitting form:', response.statusText);
        setEmailError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setEmailError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <div className="max-w-lg mx-auto bg-transparent rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-white">Contact Me</h1>
        {emailSent && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Your email was sent successfully!
          </div>
        )}
        {emailError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            An error occurred while sending your email. Please try again.
          </div>
        )}
        {!emailSent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-white">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent text-white"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;