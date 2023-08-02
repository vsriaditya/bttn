import React from 'react';
import withAuth from './withAuth';
import LogoutButton from './LogoutButton';

const ProtectedPage = () => {
  return (
    <div>
      <h1>Securely Logged In</h1>
      <p>This page is protected and only accessible to authenticated users.</p>
      <LogoutButton />
    </div>
  );
};

export default withAuth(ProtectedPage);
