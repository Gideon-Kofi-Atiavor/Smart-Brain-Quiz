import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-r from-purple-600 via-blue-500 to-indigo-700 text-white shadow-lg p-6 mt-8 rounded-t-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} <span className="font-semibold">SmartBrain Quiz</span>. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-300 transition-colors text-sm md:text-base">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300 transition-colors text-sm md:text-base">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;