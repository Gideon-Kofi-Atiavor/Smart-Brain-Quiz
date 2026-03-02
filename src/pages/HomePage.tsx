import React, { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Trophy, Clock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QRModal from "../components/QRModal";

const HomePage: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  const quizId = 1;

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-purple-100">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome to SmartBrai Quiz 🎯
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-gray-600 mb-8"
        >
          Scan a QR code and instantly take interactive quizzes for school,
          events, training sessions, or competitions.
          Fast. Simple. Smart.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl shadow-lg"
          onClick={() => setShowQR(true)}
        >
          Scan QR To Start Quiz
        </motion.button>

        {/* Feature Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-14 w-full max-w-5xl">
          <Feature
            icon={<QrCode size={30} />}
            title="Scan & Start"
            text="Scan QR and begin quiz instantly without login."
          />
          <Feature
            icon={<Clock size={30} />}
            title="Timed Challenge"
            text="Exciting countdown timer for real competition."
          />
          <Feature
            icon={<Trophy size={30} />}
            title="Instant Results"
            text="Get score immediately and retry anytime."
          />
        </div>
      </main>

      <Footer />

      <QRModal
        visible={showQR}
        quizId={quizId}
        onClose={() => setShowQR(false)}
      />
    </div>
  );
};

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
    <div className="flex justify-center mb-4 text-blue-500">
      {icon}
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

export default HomePage;