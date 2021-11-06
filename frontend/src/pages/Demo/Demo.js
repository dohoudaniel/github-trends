import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, SvgInline } from '../../components';

import { BACKEND_URL } from '../../constants';
import { sleep } from '../../utils';

const DemoScreen = () => {
  const [userName, setUserName] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [loading, setLoading] = useState(false);

  let userNameInput;

  useEffect(() => {
    userNameInput.focus();
  }, [userNameInput]);

  const handleSubmit = async () => {
    setLoading(true);
    await sleep(100);
    setSelectedUserName(userName);
    setLoading(false);
  };

  const firstCardUrl =
    selectedUserName.length > 0
      ? `${BACKEND_URL}/user/svg/${selectedUserName}/langs?demo=true`
      : `${BACKEND_URL}/user/svg/demo?card=langs`;

  const secondCardUrl =
    selectedUserName.length > 0
      ? `${BACKEND_URL}/user/svg/${selectedUserName}/repos?demo=true`
      : `${BACKEND_URL}/user/svg/demo?card=repos`;

  return (
    <div className="h-full py-8 flex flex-col lg:flex-row justify-center items-center">
      <div className="h-full w-full px-5 pb-5 lg:w-1/3 lg:pl-8 lg:pr-0 lg:pb-0">
        <div className="h-full w-full bg-gray-50 rounded-xl p-4 shadow">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            GitHub Trends Demo
          </h1>
          <p className="text-center text-sm text-gray-600">
            This is a demo of the GitHub Trends API. Enter your GitHub username
            to see statistics about your top languages and repositories from the
            past month.
          </p>
          <div className="form-control my-8">
            <p>Enter your GitHub username to get started!</p>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                ref={(input) => {
                  userNameInput = input;
                }}
                placeholder="Enter Username"
                className="bg-white text-gray-700 w-full input input-bordered"
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={async (e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white"
                onClick={handleSubmit}
              >
                Go
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-red-500">
            This demo uses a public access token that is heavily rate limited.
            For full customization, private contributions, and a personal access
            token, create an account instead!
          </p>
          <div className="flex justify-center mt-8">
            <Button className="text-white bg-blue-500 hover:bg-blue-600">
              <Link to="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full w-full lg:w-2/3 px-5 lg:px-8">
        <div className="h-full w-full bg-gray-50 rounded-xl p-4 shadow">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            {selectedUserName === ''
              ? 'Enter a Username'
              : `Example Cards for ${selectedUserName}`}
          </h1>
          <div className="w-full flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2">
              <SvgInline
                className="w-full h-full"
                url={firstCardUrl}
                forceLoading={loading}
              />
            </div>
            <div className="w-full lg:w-1/2 p-2">
              <SvgInline
                className="w-full h-full"
                url={secondCardUrl}
                forceLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoScreen;