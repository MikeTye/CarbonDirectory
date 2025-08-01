'use client';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function SignIn() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Welcome {user?.username}</h1>
          <button onClick={signOut}>Sign Out</button>
        </main>
      )}
    </Authenticator>
  );
}