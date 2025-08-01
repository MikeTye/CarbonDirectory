'use client';
import { useRouter } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();

  return (
    <Authenticator
        components={{
            Header() {
            return <h1 className="text-2xl font-bold text-center mt-4">Welcome to Carbon Admin</h1>;
            },
            Footer() {
            return <p className="text-center text-xs text-gray-400">© 2025 Your Org</p>;
            },
        }}
        formFields={{
            signIn: {
            username: {
                label: 'Email',
                placeholder: 'you@example.com',
                isRequired: true,
            },
            },
            signUp: {
            email: {
                label: 'Email Address',
                placeholder: 'you@example.com',
                isRequired: true,
            },
            password: {
                label: 'Password',
                placeholder: 'At least 8 characters',
                isRequired: true,
            },
            },
        }}
        >
        {({ user }) => {
            useEffect(() => {
            router.push('/dashboard/new');
            }, []);
            return <></>;
        }}
    </Authenticator>
  );
}