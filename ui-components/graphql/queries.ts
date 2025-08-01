/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCarbonProject = /* GraphQL */ `
  query GetCarbonProject($id: ID!) {
    getCarbonProject(id: $id) {
      address
      auditors
      businessOwner
      carbonDevelopers
      city
      coordinates
      country
      createdAt
      creditIssuanceDate
      creditsRetired
      currentCreditHolders
      estAnnualMitigations
      geographicalRegion
      googleMapLink
      id
      mediaFiles
      methodology
      projectDescFileLink
      projectDuration
      projectInsights
      projectName
      projectOwners
      projectStatus
      projectType
      registry
      reviewReportFileLink
      scale
      sdgs
      sector
      supportingPartners
      sustainableCert
      totalCreditsIssued
      updatedAt
      validationBody
      validationCriteria
      validationPlanFileLink
      validationReportFileLink
      verficationBody
      verificationCriteria
      __typename
    }
  }
`;
export const listCarbonProjects = /* GraphQL */ `
  query ListCarbonProjects(
    $filter: ModelCarbonProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarbonProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        address
        auditors
        businessOwner
        carbonDevelopers
        city
        coordinates
        country
        createdAt
        creditIssuanceDate
        creditsRetired
        currentCreditHolders
        estAnnualMitigations
        geographicalRegion
        googleMapLink
        id
        mediaFiles
        methodology
        projectDescFileLink
        projectDuration
        projectInsights
        projectName
        projectOwners
        projectStatus
        projectType
        registry
        reviewReportFileLink
        scale
        sdgs
        sector
        supportingPartners
        sustainableCert
        totalCreditsIssued
        updatedAt
        validationBody
        validationCriteria
        validationPlanFileLink
        validationReportFileLink
        verficationBody
        verificationCriteria
        __typename
      }
      nextToken
      __typename
    }
  }
`;
