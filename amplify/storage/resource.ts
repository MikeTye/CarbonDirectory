import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyCarbonWeb',
  access: (allow) => ({
    'project-pictures/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
  })
});