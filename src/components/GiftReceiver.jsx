import React, { useEffect, useState } from 'react';

function GiftReceiver() {
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('Anonymous'); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data'); 

    if (encodedData) {
      const decodedData = atob(encodedData); 
      const parsedData = JSON.parse(decodedData); 

      setRecipientName(parsedData.recipientName);
      setMessage(decodeURIComponent(parsedData.message)); 
      setSenderName(parsedData.senderName || 'Anonymous'); 
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-green-600 font-custom mb-6 text-center">Merry Christmas, {recipientName}! </h2>
      <p className="text-lg font-light italic">Message: {message}</p>
      <a href="/" className='text-center'>
      <p className="text-lg font-semibold mt-4">{senderName} sent you this gift. </p> 
      <p className="text-md font-normal leading-3">Click here to send them one too</p> 
      </a>
    </div>
  );
}

export default GiftReceiver;
