'use client';
import { Authenticator } from '@aws-amplify/ui-react';
// import { CarbonProjectCreateForm } from '../../../../ui-components'; // Amplify generates this
import CarbonProjectCreateForm from "../../../../ui-components/CarbonProjectCreateForm";

export default function CreateProject() {
  return (
    <Authenticator>
      {() => (
        <div className="p-8">
          <h1 className="text-xl mb-4 font-semibold">Create a New Carbon Project</h1>
          <CarbonProjectCreateForm
            onSuccess={() => alert('Project created!')}
            onError={(e) => console.error('Failed to create', e)}
          />
        </div>
      )}
    </Authenticator>
  );
}