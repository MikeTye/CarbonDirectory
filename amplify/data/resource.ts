import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization((allow) => [allow.guest()]),
// });

const schema = a
  .schema({
    CarbonProject: a
      .model({
        projectName: a.string().required(),
        projectType: a.string(),
        estAnnualMitigations: a.float(),
        projectStatus: a.string().required(),
        scale: a.string(),
        country: a.string(),
        businessOwner: a.string(),
        projectOwners: a.string().array(),
        carbonDevelopers: a.string().array(),
        supportingPartners: a.string().array(),
        auditors: a.string().array(),
        sdgs: a.string().array(),
        creditIssuanceDate: a.date(),
        totalCreditsIssued: a.integer(),
        sector: a.string(),
        methodology: a.string(),
        sustainableCert: a.string(),
        validationBody: a.string(),
        verficationBody: a.string(),
        projectDuration: a.integer(),
        registry: a.url(),
        validationCriteria: a.string().array(),
        verificationCriteria: a.string().array(),
        city: a.string(),
        address: a.string(),
        geographicalRegion: a.string(),
        coordinates: a.string(),
        googleMapLink: a.url(),
        creditsRetired: a.integer(),
        currentCreditHolders: a.string().array(),
        projectInsights: a.string(),
        projectDescFileLink: a.url(),
        reviewReportFileLink: a.url(),
        validationPlanFileLink: a.url(),
        validationReportFileLink: a.url(),
        mediaFiles: a.url().array(),
        projectImages: a.hasMany('ProjectImage', 'parentProjectId'),
      }),
      ProjectImage: a
      .model({
        parentProjectId: a.id(),
        carbonProject: a.belongsTo('CarbonProject', 'parentProjectId'),
        order: a.integer(),
        description: a.string(),
        s3url: a.url(),
      })
      .secondaryIndexes((index) => [
        index("parentProjectId")
          .queryField("listImage")
          .sortKeys(["order"]),
    ])
  })
  .authorization((allow) => [allow.publicApiKey()]);


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 7, // or whatever duration
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
