import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QRModal from "../components/QrModal";

const HomePage: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  const quizId = 2; 

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl font-bold mb-4">Welcome to SmartBrain Quiz!</h1>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded"
          onClick={() => setShowQR(true)}
        >
          Click To Enter Quiz Mode
        </button>
      </main>

      <Footer />

      <QRModal visible={showQR} quizId={quizId} onClose={() => setShowQR(false)} />

    </div>
  );
};

export default HomePage;