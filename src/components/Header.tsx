import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-linear-to-r from-purple-600 via-blue-500 to-indigo-700 text-white p-6 text-center font-extrabold text-2xl shadow-lg rounded-b-lg">
      SmartBrain Quiz
      <div className="h-1 w-24 bg-yellow-400 mx-auto mt-2 rounded-full animate-pulse"></div>
    </header>
  );
};

export default Header;