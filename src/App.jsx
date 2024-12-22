import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GiftSender from './components/GiftSender';
import GiftReceiver from './components/GiftReceiver';
import logo from './assets/logo.png'
import Snowflakes from 'magic-snowflakes';
const snowflakes = new Snowflakes();

function App() {
  snowflakes.start();

  return (
    <Router>
    <div className="app-container bg-green-100 min-h-screen p-5 flex flex-col items-center justify-between">
      <div className='flex flex-col mb-8 items-center'>
        <img src={logo} alt="" />
      </div>
      <Routes>
        <Route path="/" element={<GiftSender />} />
        <Route path="/upack" element={<GiftReceiver />} />
      </Routes>

      <div className="flex flex-col items-center leading-tight mt-8 mb-4">
        <h2 className='font-custom'>Developer by <span className="text-red-500">@rocristoi</span></h2>
        <a href="https://github.com/rocristoi/unpackIt">
          <h2 className="bg-gradient-to-r from-[#2da44e]  to-[#0366d6] text-transparent bg-clip-text font-bold">
            Contribute to this project on Github
          </h2>
        </a>
      </div>
    </div>
  </Router>
  );
}

export default App;