import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default App;