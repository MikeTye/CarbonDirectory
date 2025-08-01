'use client';
import { Authenticator } from '@aws-amplify/ui-react';

export default function Dashboard() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="flex h-screen">
          <aside className="w-64 bg-gray-100 p-4">
            <h2 className="font-bold mb-4">Menu</h2>
            <ul>
              <li><a href="/dashboard">Home</a></li>
              <li><a href="/dashboard/new">Create Project</a></li>
              <li><button onClick={signOut}>Sign Out</button></li>
            </ul>
          </aside>
          <main className="flex-1 p-8">
            <h1>Welcome back, {user?.username}</h1>
          </main>
        </div>
      )}
    </Authenticator>
  );
}