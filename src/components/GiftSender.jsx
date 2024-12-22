import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

function GiftSender() {
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [popupVisible, setPopupVisible] = useState([false]);
  const [copyText, setCopyText] = useState('Copy link');
  const [error, setError] = useState(false);
  


const shortenURL = async (url) => {
  try {
    const requestData = {
      url: url,
      "domain": "tinyurl.com",
      "description": "string"
    };

    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 40uxffi14s7OHhLAlRPO3EwPJnKC3DPSAhmBNADiGUcphEPQWUCnn2LY0xa6", 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return data.data.tiny_url;
    } else {
      throw new Error('Error in shortening URL');
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
  }
};

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleCopyClick = () => {
    setCopyText('Copied!');
    navigator.clipboard.writeText(popupVisible[1]);
    setTimeout(() => {
        setCopyText('Copy link');
      }, 2000); 
  };

  const handleReset = () => {
    setRecipientName('');
    setMessage('');
    setSenderName('');
    setPopupVisible([false]);
  };

  const handleGenerateLink = async () => {
    if (!recipientName || !message) {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
        return;
    }

    let senderEnabled = false;
    if (senderName !== '') {
        senderEnabled = true;
    }

    const data = {
        recipientName,
        message,
        senderName: senderEnabled ? senderName : 'Anonymous',
    };

    const encodedData = btoa(JSON.stringify(data));

    const link = `https://unpackit.cristoi.ro/upack?data=${encodedData}`;
    
    const shortenedLink = await shortenURL(link);

    setPopupVisible([true, shortenedLink]);
};

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg lg:max-w-m md:max-w-md  mx-auto sm:max-w-full sm:w-full">
      <AnimatePresence>
        {popupVisible[0] && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPopupVisible(false)}
              />
    
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-20"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={popupVariants}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-xs w-80">
                  <h2 className="text-2xl font-custom mb-3">Crafted 🎁</h2>
                  <p className="mb-6">Your gift is ready to be sent. Just click on the button below to copy the link.</p>
                  <div className='flex flex-col gap-2 items-center'>
                    <button
                      onClick={handleCopyClick}
                      className="bg-green-600 text-white px-5 py-2 rounded-md border border-green-500 w-full"
                    >
                      {copyText}
                    </button>
                    <button
                      onClick={handleReset}
                      className="text-green-600 px-4 py-2 rounded-md border border-green-500 w-full"
                    >
                      Craft Another
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
        )}
      </AnimatePresence>

      <h2 className="text-2xl font-custom text-green-600 mb-6">Craft Your Christmas Gift</h2>

      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Recipient's Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Sender's Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div className="mb-6 w-full">
        <textarea
          placeholder="Enter Your Christmas Gift Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 h-40"
        />
      </div>
      
      <button
        onClick={handleGenerateLink}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-colors font-custom w-full"
      >
        SEND
      </button>

      <span className='text-red-500 mt-2'>{error ? 'Please complete all fields before sending!' : ''}</span>
    </div>
  );
}

export default GiftSender;
