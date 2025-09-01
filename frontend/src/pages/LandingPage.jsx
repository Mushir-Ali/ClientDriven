import React from 'react';
import Form from '../components/Form';

const LandingPage = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Left side: Form */}
      <div className="w-full flex items-center justify-center lg:w-1/2 px-6">
        <Form />
      </div>

      {/* Right side: Illustration */}
      <div className="hidden relative lg:flex h-full w-1/2 flex-col items-center justify-start bg-gray-200 px-8">

        <div className="mt-16 text-center z-10">
          <h1 className="text-6xl font-bold text-violet-600 mb-4">
            ClientDriven
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Streamline Your Tasks Effortlessly
          </p>
          <p className="text-md text-gray-500 mb-8">
            Manage tasks with ease – create, read, update, and delete. Tailored for both users and admins!
          </p>
        </div>

        {/* circle portion */}
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-float-scale mt-auto mb-12 relative z-20" />

        {/* blur portion */}
        <div className="absolute bottom-0 w-full h-48 bg-white/50 backdrop-blur-3xl z-0 rounded-t-3xl" />

      </div>
    </div>
  );
};

export default LandingPage;
