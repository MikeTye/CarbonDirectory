/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCarbonProject } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function CarbonProjectCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    projectName: "",
    projectType: "",
    estAnnualMitigations: "",
    projectStatus: "",
    scale: "",
    country: "",
    businessOwner: "",
    projectOwners: [],
    carbonDevelopers: [],
    supportingPartners: [],
    auditors: [],
    sdgs: [],
    creditIssuanceDate: "",
    totalCreditsIssued: "",
    sector: "",
    methodology: "",
    sustainableCert: "",
    validationBody: "",
    verficationBody: "",
    projectDuration: "",
    registry: "",
    validationCriteria: [],
    verificationCriteria: [],
    city: "",
    address: "",
    geographicalRegion: "",
    coordinates: "",
    googleMapLink: "",
    creditsRetired: "",
    currentCreditHolders: [],
    projectInsights: "",
    projectDescFileLink: "",
    reviewReportFileLink: "",
    validationPlanFileLink: "",
    validationReportFileLink: "",
    mediaFiles: [],
  };
  const [projectName, setProjectName] = React.useState(
    initialValues.projectName
  );
  const [projectType, setProjectType] = React.useState(
    initialValues.projectType
  );
  const [estAnnualMitigations, setEstAnnualMitigations] = React.useState(
    initialValues.estAnnualMitigations
  );
  const [projectStatus, setProjectStatus] = React.useState(
    initialValues.projectStatus
  );
  const [scale, setScale] = React.useState(initialValues.scale);
  const [country, setCountry] = React.useState(initialValues.country);
  const [businessOwner, setBusinessOwner] = React.useState(
    initialValues.businessOwner
  );
  const [projectOwners, setProjectOwners] = React.useState(
    initialValues.projectOwners
  );
  const [carbonDevelopers, setCarbonDevelopers] = React.useState(
    initialValues.carbonDevelopers
  );
  const [supportingPartners, setSupportingPartners] = React.useState(
    initialValues.supportingPartners
  );
  const [auditors, setAuditors] = React.useState(initialValues.auditors);
  const [sdgs, setSdgs] = React.useState(initialValues.sdgs);
  const [creditIssuanceDate, setCreditIssuanceDate] = React.useState(
    initialValues.creditIssuanceDate
  );
  const [totalCreditsIssued, setTotalCreditsIssued] = React.useState(
    initialValues.totalCreditsIssued
  );
  const [sector, setSector] = React.useState(initialValues.sector);
  const [methodology, setMethodology] = React.useState(
    initialValues.methodology
  );
  const [sustainableCert, setSustainableCert] = React.useState(
    initialValues.sustainableCert
  );
  const [validationBody, setValidationBody] = React.useState(
    initialValues.validationBody
  );
  const [verficationBody, setVerficationBody] = React.useState(
    initialValues.verficationBody
  );
  const [projectDuration, setProjectDuration] = React.useState(
    initialValues.projectDuration
  );
  const [registry, setRegistry] = React.useState(initialValues.registry);
  const [validationCriteria, setValidationCriteria] = React.useState(
    initialValues.validationCriteria
  );
  const [verificationCriteria, setVerificationCriteria] = React.useState(
    initialValues.verificationCriteria
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [address, setAddress] = React.useState(initialValues.address);
  const [geographicalRegion, setGeographicalRegion] = React.useState(
    initialValues.geographicalRegion
  );
  const [coordinates, setCoordinates] = React.useState(
    initialValues.coordinates
  );
  const [googleMapLink, setGoogleMapLink] = React.useState(
    initialValues.googleMapLink
  );
  const [creditsRetired, setCreditsRetired] = React.useState(
    initialValues.creditsRetired
  );
  const [currentCreditHolders, setCurrentCreditHolders] = React.useState(
    initialValues.currentCreditHolders
  );
  const [projectInsights, setProjectInsights] = React.useState(
    initialValues.projectInsights
  );
  const [projectDescFileLink, setProjectDescFileLink] = React.useState(
    initialValues.projectDescFileLink
  );
  const [reviewReportFileLink, setReviewReportFileLink] = React.useState(
    initialValues.reviewReportFileLink
  );
  const [validationPlanFileLink, setValidationPlanFileLink] = React.useState(
    initialValues.validationPlanFileLink
  );
  const [validationReportFileLink, setValidationReportFileLink] =
    React.useState(initialValues.validationReportFileLink);
  const [mediaFiles, setMediaFiles] = React.useState(initialValues.mediaFiles);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setProjectName(initialValues.projectName);
    setProjectType(initialValues.projectType);
    setEstAnnualMitigations(initialValues.estAnnualMitigations);
    setProjectStatus(initialValues.projectStatus);
    setScale(initialValues.scale);
    setCountry(initialValues.country);
    setBusinessOwner(initialValues.businessOwner);
    setProjectOwners(initialValues.projectOwners);
    setCurrentProjectOwnersValue("");
    setCarbonDevelopers(initialValues.carbonDevelopers);
    setCurrentCarbonDevelopersValue("");
    setSupportingPartners(initialValues.supportingPartners);
    setCurrentSupportingPartnersValue("");
    setAuditors(initialValues.auditors);
    setCurrentAuditorsValue("");
    setSdgs(initialValues.sdgs);
    setCurrentSdgsValue("");
    setCreditIssuanceDate(initialValues.creditIssuanceDate);
    setTotalCreditsIssued(initialValues.totalCreditsIssued);
    setSector(initialValues.sector);
    setMethodology(initialValues.methodology);
    setSustainableCert(initialValues.sustainableCert);
    setValidationBody(initialValues.validationBody);
    setVerficationBody(initialValues.verficationBody);
    setProjectDuration(initialValues.projectDuration);
    setRegistry(initialValues.registry);
    setValidationCriteria(initialValues.validationCriteria);
    setCurrentValidationCriteriaValue("");
    setVerificationCriteria(initialValues.verificationCriteria);
    setCurrentVerificationCriteriaValue("");
    setCity(initialValues.city);
    setAddress(initialValues.address);
    setGeographicalRegion(initialValues.geographicalRegion);
    setCoordinates(initialValues.coordinates);
    setGoogleMapLink(initialValues.googleMapLink);
    setCreditsRetired(initialValues.creditsRetired);
    setCurrentCreditHolders(initialValues.currentCreditHolders);
    setCurrentCurrentCreditHoldersValue("");
    setProjectInsights(initialValues.projectInsights);
    setProjectDescFileLink(initialValues.projectDescFileLink);
    setReviewReportFileLink(initialValues.reviewReportFileLink);
    setValidationPlanFileLink(initialValues.validationPlanFileLink);
    setValidationReportFileLink(initialValues.validationReportFileLink);
    setMediaFiles(initialValues.mediaFiles);
    setCurrentMediaFilesValue("");
    setErrors({});
  };
  const [currentProjectOwnersValue, setCurrentProjectOwnersValue] =
    React.useState("");
  const projectOwnersRef = React.createRef();
  const [currentCarbonDevelopersValue, setCurrentCarbonDevelopersValue] =
    React.useState("");
  const carbonDevelopersRef = React.createRef();
  const [currentSupportingPartnersValue, setCurrentSupportingPartnersValue] =
    React.useState("");
  const supportingPartnersRef = React.createRef();
  const [currentAuditorsValue, setCurrentAuditorsValue] = React.useState("");
  const auditorsRef = React.createRef();
  const [currentSdgsValue, setCurrentSdgsValue] = React.useState("");
  const sdgsRef = React.createRef();
  const [currentValidationCriteriaValue, setCurrentValidationCriteriaValue] =
    React.useState("");
  const validationCriteriaRef = React.createRef();
  const [
    currentVerificationCriteriaValue,
    setCurrentVerificationCriteriaValue,
  ] = React.useState("");
  const verificationCriteriaRef = React.createRef();
  const [
    currentCurrentCreditHoldersValue,
    setCurrentCurrentCreditHoldersValue,
  ] = React.useState("");
  const currentCreditHoldersRef = React.createRef();
  const [currentMediaFilesValue, setCurrentMediaFilesValue] =
    React.useState("");
  const mediaFilesRef = React.createRef();
  const validations = {
    projectName: [{ type: "Required" }],
    projectType: [],
    estAnnualMitigations: [],
    projectStatus: [{ type: "Required" }],
    scale: [],
    country: [],
    businessOwner: [],
    projectOwners: [],
    carbonDevelopers: [],
    supportingPartners: [],
    auditors: [],
    sdgs: [],
    creditIssuanceDate: [],
    totalCreditsIssued: [],
    sector: [],
    methodology: [],
    sustainableCert: [],
    validationBody: [],
    verficationBody: [],
    projectDuration: [],
    registry: [{ type: "URL" }],
    validationCriteria: [],
    verificationCriteria: [],
    city: [],
    address: [],
    geographicalRegion: [],
    coordinates: [],
    googleMapLink: [{ type: "URL" }],
    creditsRetired: [],
    currentCreditHolders: [],
    projectInsights: [],
    projectDescFileLink: [{ type: "URL" }],
    reviewReportFileLink: [{ type: "URL" }],
    validationPlanFileLink: [{ type: "URL" }],
    validationReportFileLink: [{ type: "URL" }],
    mediaFiles: [{ type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          projectName,
          projectType,
          estAnnualMitigations,
          projectStatus,
          scale,
          country,
          businessOwner,
          projectOwners,
          carbonDevelopers,
          supportingPartners,
          auditors,
          sdgs,
          creditIssuanceDate,
          totalCreditsIssued,
          sector,
          methodology,
          sustainableCert,
          validationBody,
          verficationBody,
          projectDuration,
          registry,
          validationCriteria,
          verificationCriteria,
          city,
          address,
          geographicalRegion,
          coordinates,
          googleMapLink,
          creditsRetired,
          currentCreditHolders,
          projectInsights,
          projectDescFileLink,
          reviewReportFileLink,
          validationPlanFileLink,
          validationReportFileLink,
          mediaFiles,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createCarbonProject.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CarbonProjectCreateForm")}
      {...rest}
    >
      <TextField
        label="Project name"
        isRequired={true}
        isReadOnly={false}
        value={projectName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName: value,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectName ?? value;
          }
          if (errors.projectName?.hasError) {
            runValidationTasks("projectName", value);
          }
          setProjectName(value);
        }}
        onBlur={() => runValidationTasks("projectName", projectName)}
        errorMessage={errors.projectName?.errorMessage}
        hasError={errors.projectName?.hasError}
        {...getOverrideProps(overrides, "projectName")}
      ></TextField>
      <TextField
        label="Project type"
        isRequired={false}
        isReadOnly={false}
        value={projectType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType: value,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectType ?? value;
          }
          if (errors.projectType?.hasError) {
            runValidationTasks("projectType", value);
          }
          setProjectType(value);
        }}
        onBlur={() => runValidationTasks("projectType", projectType)}
        errorMessage={errors.projectType?.errorMessage}
        hasError={errors.projectType?.hasError}
        {...getOverrideProps(overrides, "projectType")}
      ></TextField>
      <TextField
        label="Est annual mitigations"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estAnnualMitigations}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations: value,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.estAnnualMitigations ?? value;
          }
          if (errors.estAnnualMitigations?.hasError) {
            runValidationTasks("estAnnualMitigations", value);
          }
          setEstAnnualMitigations(value);
        }}
        onBlur={() =>
          runValidationTasks("estAnnualMitigations", estAnnualMitigations)
        }
        errorMessage={errors.estAnnualMitigations?.errorMessage}
        hasError={errors.estAnnualMitigations?.hasError}
        {...getOverrideProps(overrides, "estAnnualMitigations")}
      ></TextField>
      <TextField
        label="Project status"
        isRequired={true}
        isReadOnly={false}
        value={projectStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus: value,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectStatus ?? value;
          }
          if (errors.projectStatus?.hasError) {
            runValidationTasks("projectStatus", value);
          }
          setProjectStatus(value);
        }}
        onBlur={() => runValidationTasks("projectStatus", projectStatus)}
        errorMessage={errors.projectStatus?.errorMessage}
        hasError={errors.projectStatus?.hasError}
        {...getOverrideProps(overrides, "projectStatus")}
      ></TextField>
      <TextField
        label="Scale"
        isRequired={false}
        isReadOnly={false}
        value={scale}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale: value,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.scale ?? value;
          }
          if (errors.scale?.hasError) {
            runValidationTasks("scale", value);
          }
          setScale(value);
        }}
        onBlur={() => runValidationTasks("scale", scale)}
        errorMessage={errors.scale?.errorMessage}
        hasError={errors.scale?.hasError}
        {...getOverrideProps(overrides, "scale")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country: value,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Business owner"
        isRequired={false}
        isReadOnly={false}
        value={businessOwner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner: value,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.businessOwner ?? value;
          }
          if (errors.businessOwner?.hasError) {
            runValidationTasks("businessOwner", value);
          }
          setBusinessOwner(value);
        }}
        onBlur={() => runValidationTasks("businessOwner", businessOwner)}
        errorMessage={errors.businessOwner?.errorMessage}
        hasError={errors.businessOwner?.hasError}
        {...getOverrideProps(overrides, "businessOwner")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners: values,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.projectOwners ?? values;
          }
          setProjectOwners(values);
          setCurrentProjectOwnersValue("");
        }}
        currentFieldValue={currentProjectOwnersValue}
        label={"Project owners"}
        items={projectOwners}
        hasError={errors?.projectOwners?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("projectOwners", currentProjectOwnersValue)
        }
        errorMessage={errors?.projectOwners?.errorMessage}
        setFieldValue={setCurrentProjectOwnersValue}
        inputFieldRef={projectOwnersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Project owners"
          isRequired={false}
          isReadOnly={false}
          value={currentProjectOwnersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.projectOwners?.hasError) {
              runValidationTasks("projectOwners", value);
            }
            setCurrentProjectOwnersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("projectOwners", currentProjectOwnersValue)
          }
          errorMessage={errors.projectOwners?.errorMessage}
          hasError={errors.projectOwners?.hasError}
          ref={projectOwnersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "projectOwners")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers: values,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.carbonDevelopers ?? values;
          }
          setCarbonDevelopers(values);
          setCurrentCarbonDevelopersValue("");
        }}
        currentFieldValue={currentCarbonDevelopersValue}
        label={"Carbon developers"}
        items={carbonDevelopers}
        hasError={errors?.carbonDevelopers?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "carbonDevelopers",
            currentCarbonDevelopersValue
          )
        }
        errorMessage={errors?.carbonDevelopers?.errorMessage}
        setFieldValue={setCurrentCarbonDevelopersValue}
        inputFieldRef={carbonDevelopersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Carbon developers"
          isRequired={false}
          isReadOnly={false}
          value={currentCarbonDevelopersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.carbonDevelopers?.hasError) {
              runValidationTasks("carbonDevelopers", value);
            }
            setCurrentCarbonDevelopersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("carbonDevelopers", currentCarbonDevelopersValue)
          }
          errorMessage={errors.carbonDevelopers?.errorMessage}
          hasError={errors.carbonDevelopers?.hasError}
          ref={carbonDevelopersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "carbonDevelopers")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners: values,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.supportingPartners ?? values;
          }
          setSupportingPartners(values);
          setCurrentSupportingPartnersValue("");
        }}
        currentFieldValue={currentSupportingPartnersValue}
        label={"Supporting partners"}
        items={supportingPartners}
        hasError={errors?.supportingPartners?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "supportingPartners",
            currentSupportingPartnersValue
          )
        }
        errorMessage={errors?.supportingPartners?.errorMessage}
        setFieldValue={setCurrentSupportingPartnersValue}
        inputFieldRef={supportingPartnersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Supporting partners"
          isRequired={false}
          isReadOnly={false}
          value={currentSupportingPartnersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.supportingPartners?.hasError) {
              runValidationTasks("supportingPartners", value);
            }
            setCurrentSupportingPartnersValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "supportingPartners",
              currentSupportingPartnersValue
            )
          }
          errorMessage={errors.supportingPartners?.errorMessage}
          hasError={errors.supportingPartners?.hasError}
          ref={supportingPartnersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "supportingPartners")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors: values,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.auditors ?? values;
          }
          setAuditors(values);
          setCurrentAuditorsValue("");
        }}
        currentFieldValue={currentAuditorsValue}
        label={"Auditors"}
        items={auditors}
        hasError={errors?.auditors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("auditors", currentAuditorsValue)
        }
        errorMessage={errors?.auditors?.errorMessage}
        setFieldValue={setCurrentAuditorsValue}
        inputFieldRef={auditorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Auditors"
          isRequired={false}
          isReadOnly={false}
          value={currentAuditorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.auditors?.hasError) {
              runValidationTasks("auditors", value);
            }
            setCurrentAuditorsValue(value);
          }}
          onBlur={() => runValidationTasks("auditors", currentAuditorsValue)}
          errorMessage={errors.auditors?.errorMessage}
          hasError={errors.auditors?.hasError}
          ref={auditorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "auditors")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs: values,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.sdgs ?? values;
          }
          setSdgs(values);
          setCurrentSdgsValue("");
        }}
        currentFieldValue={currentSdgsValue}
        label={"Sdgs"}
        items={sdgs}
        hasError={errors?.sdgs?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sdgs", currentSdgsValue)
        }
        errorMessage={errors?.sdgs?.errorMessage}
        setFieldValue={setCurrentSdgsValue}
        inputFieldRef={sdgsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sdgs"
          isRequired={false}
          isReadOnly={false}
          value={currentSdgsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sdgs?.hasError) {
              runValidationTasks("sdgs", value);
            }
            setCurrentSdgsValue(value);
          }}
          onBlur={() => runValidationTasks("sdgs", currentSdgsValue)}
          errorMessage={errors.sdgs?.errorMessage}
          hasError={errors.sdgs?.hasError}
          ref={sdgsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sdgs")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Credit issuance date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={creditIssuanceDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate: value,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.creditIssuanceDate ?? value;
          }
          if (errors.creditIssuanceDate?.hasError) {
            runValidationTasks("creditIssuanceDate", value);
          }
          setCreditIssuanceDate(value);
        }}
        onBlur={() =>
          runValidationTasks("creditIssuanceDate", creditIssuanceDate)
        }
        errorMessage={errors.creditIssuanceDate?.errorMessage}
        hasError={errors.creditIssuanceDate?.hasError}
        {...getOverrideProps(overrides, "creditIssuanceDate")}
      ></TextField>
      <TextField
        label="Total credits issued"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalCreditsIssued}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued: value,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.totalCreditsIssued ?? value;
          }
          if (errors.totalCreditsIssued?.hasError) {
            runValidationTasks("totalCreditsIssued", value);
          }
          setTotalCreditsIssued(value);
        }}
        onBlur={() =>
          runValidationTasks("totalCreditsIssued", totalCreditsIssued)
        }
        errorMessage={errors.totalCreditsIssued?.errorMessage}
        hasError={errors.totalCreditsIssued?.hasError}
        {...getOverrideProps(overrides, "totalCreditsIssued")}
      ></TextField>
      <TextField
        label="Sector"
        isRequired={false}
        isReadOnly={false}
        value={sector}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector: value,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.sector ?? value;
          }
          if (errors.sector?.hasError) {
            runValidationTasks("sector", value);
          }
          setSector(value);
        }}
        onBlur={() => runValidationTasks("sector", sector)}
        errorMessage={errors.sector?.errorMessage}
        hasError={errors.sector?.hasError}
        {...getOverrideProps(overrides, "sector")}
      ></TextField>
      <TextField
        label="Methodology"
        isRequired={false}
        isReadOnly={false}
        value={methodology}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology: value,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.methodology ?? value;
          }
          if (errors.methodology?.hasError) {
            runValidationTasks("methodology", value);
          }
          setMethodology(value);
        }}
        onBlur={() => runValidationTasks("methodology", methodology)}
        errorMessage={errors.methodology?.errorMessage}
        hasError={errors.methodology?.hasError}
        {...getOverrideProps(overrides, "methodology")}
      ></TextField>
      <TextField
        label="Sustainable cert"
        isRequired={false}
        isReadOnly={false}
        value={sustainableCert}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert: value,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.sustainableCert ?? value;
          }
          if (errors.sustainableCert?.hasError) {
            runValidationTasks("sustainableCert", value);
          }
          setSustainableCert(value);
        }}
        onBlur={() => runValidationTasks("sustainableCert", sustainableCert)}
        errorMessage={errors.sustainableCert?.errorMessage}
        hasError={errors.sustainableCert?.hasError}
        {...getOverrideProps(overrides, "sustainableCert")}
      ></TextField>
      <TextField
        label="Validation body"
        isRequired={false}
        isReadOnly={false}
        value={validationBody}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody: value,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.validationBody ?? value;
          }
          if (errors.validationBody?.hasError) {
            runValidationTasks("validationBody", value);
          }
          setValidationBody(value);
        }}
        onBlur={() => runValidationTasks("validationBody", validationBody)}
        errorMessage={errors.validationBody?.errorMessage}
        hasError={errors.validationBody?.hasError}
        {...getOverrideProps(overrides, "validationBody")}
      ></TextField>
      <TextField
        label="Verfication body"
        isRequired={false}
        isReadOnly={false}
        value={verficationBody}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody: value,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.verficationBody ?? value;
          }
          if (errors.verficationBody?.hasError) {
            runValidationTasks("verficationBody", value);
          }
          setVerficationBody(value);
        }}
        onBlur={() => runValidationTasks("verficationBody", verficationBody)}
        errorMessage={errors.verficationBody?.errorMessage}
        hasError={errors.verficationBody?.hasError}
        {...getOverrideProps(overrides, "verficationBody")}
      ></TextField>
      <TextField
        label="Project duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={projectDuration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration: value,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectDuration ?? value;
          }
          if (errors.projectDuration?.hasError) {
            runValidationTasks("projectDuration", value);
          }
          setProjectDuration(value);
        }}
        onBlur={() => runValidationTasks("projectDuration", projectDuration)}
        errorMessage={errors.projectDuration?.errorMessage}
        hasError={errors.projectDuration?.hasError}
        {...getOverrideProps(overrides, "projectDuration")}
      ></TextField>
      <TextField
        label="Registry"
        isRequired={false}
        isReadOnly={false}
        value={registry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry: value,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.registry ?? value;
          }
          if (errors.registry?.hasError) {
            runValidationTasks("registry", value);
          }
          setRegistry(value);
        }}
        onBlur={() => runValidationTasks("registry", registry)}
        errorMessage={errors.registry?.errorMessage}
        hasError={errors.registry?.hasError}
        {...getOverrideProps(overrides, "registry")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria: values,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.validationCriteria ?? values;
          }
          setValidationCriteria(values);
          setCurrentValidationCriteriaValue("");
        }}
        currentFieldValue={currentValidationCriteriaValue}
        label={"Validation criteria"}
        items={validationCriteria}
        hasError={errors?.validationCriteria?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "validationCriteria",
            currentValidationCriteriaValue
          )
        }
        errorMessage={errors?.validationCriteria?.errorMessage}
        setFieldValue={setCurrentValidationCriteriaValue}
        inputFieldRef={validationCriteriaRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Validation criteria"
          isRequired={false}
          isReadOnly={false}
          value={currentValidationCriteriaValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.validationCriteria?.hasError) {
              runValidationTasks("validationCriteria", value);
            }
            setCurrentValidationCriteriaValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "validationCriteria",
              currentValidationCriteriaValue
            )
          }
          errorMessage={errors.validationCriteria?.errorMessage}
          hasError={errors.validationCriteria?.hasError}
          ref={validationCriteriaRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "validationCriteria")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria: values,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.verificationCriteria ?? values;
          }
          setVerificationCriteria(values);
          setCurrentVerificationCriteriaValue("");
        }}
        currentFieldValue={currentVerificationCriteriaValue}
        label={"Verification criteria"}
        items={verificationCriteria}
        hasError={errors?.verificationCriteria?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "verificationCriteria",
            currentVerificationCriteriaValue
          )
        }
        errorMessage={errors?.verificationCriteria?.errorMessage}
        setFieldValue={setCurrentVerificationCriteriaValue}
        inputFieldRef={verificationCriteriaRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Verification criteria"
          isRequired={false}
          isReadOnly={false}
          value={currentVerificationCriteriaValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.verificationCriteria?.hasError) {
              runValidationTasks("verificationCriteria", value);
            }
            setCurrentVerificationCriteriaValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "verificationCriteria",
              currentVerificationCriteriaValue
            )
          }
          errorMessage={errors.verificationCriteria?.errorMessage}
          hasError={errors.verificationCriteria?.hasError}
          ref={verificationCriteriaRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "verificationCriteria")}
        ></TextField>
      </ArrayField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city: value,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address: value,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Geographical region"
        isRequired={false}
        isReadOnly={false}
        value={geographicalRegion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion: value,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.geographicalRegion ?? value;
          }
          if (errors.geographicalRegion?.hasError) {
            runValidationTasks("geographicalRegion", value);
          }
          setGeographicalRegion(value);
        }}
        onBlur={() =>
          runValidationTasks("geographicalRegion", geographicalRegion)
        }
        errorMessage={errors.geographicalRegion?.errorMessage}
        hasError={errors.geographicalRegion?.hasError}
        {...getOverrideProps(overrides, "geographicalRegion")}
      ></TextField>
      <TextField
        label="Coordinates"
        isRequired={false}
        isReadOnly={false}
        value={coordinates}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates: value,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.coordinates ?? value;
          }
          if (errors.coordinates?.hasError) {
            runValidationTasks("coordinates", value);
          }
          setCoordinates(value);
        }}
        onBlur={() => runValidationTasks("coordinates", coordinates)}
        errorMessage={errors.coordinates?.errorMessage}
        hasError={errors.coordinates?.hasError}
        {...getOverrideProps(overrides, "coordinates")}
      ></TextField>
      <TextField
        label="Google map link"
        isRequired={false}
        isReadOnly={false}
        value={googleMapLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink: value,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.googleMapLink ?? value;
          }
          if (errors.googleMapLink?.hasError) {
            runValidationTasks("googleMapLink", value);
          }
          setGoogleMapLink(value);
        }}
        onBlur={() => runValidationTasks("googleMapLink", googleMapLink)}
        errorMessage={errors.googleMapLink?.errorMessage}
        hasError={errors.googleMapLink?.hasError}
        {...getOverrideProps(overrides, "googleMapLink")}
      ></TextField>
      <TextField
        label="Credits retired"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={creditsRetired}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired: value,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.creditsRetired ?? value;
          }
          if (errors.creditsRetired?.hasError) {
            runValidationTasks("creditsRetired", value);
          }
          setCreditsRetired(value);
        }}
        onBlur={() => runValidationTasks("creditsRetired", creditsRetired)}
        errorMessage={errors.creditsRetired?.errorMessage}
        hasError={errors.creditsRetired?.hasError}
        {...getOverrideProps(overrides, "creditsRetired")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders: values,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            values = result?.currentCreditHolders ?? values;
          }
          setCurrentCreditHolders(values);
          setCurrentCurrentCreditHoldersValue("");
        }}
        currentFieldValue={currentCurrentCreditHoldersValue}
        label={"Current credit holders"}
        items={currentCreditHolders}
        hasError={errors?.currentCreditHolders?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "currentCreditHolders",
            currentCurrentCreditHoldersValue
          )
        }
        errorMessage={errors?.currentCreditHolders?.errorMessage}
        setFieldValue={setCurrentCurrentCreditHoldersValue}
        inputFieldRef={currentCreditHoldersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Current credit holders"
          isRequired={false}
          isReadOnly={false}
          value={currentCurrentCreditHoldersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.currentCreditHolders?.hasError) {
              runValidationTasks("currentCreditHolders", value);
            }
            setCurrentCurrentCreditHoldersValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "currentCreditHolders",
              currentCurrentCreditHoldersValue
            )
          }
          errorMessage={errors.currentCreditHolders?.errorMessage}
          hasError={errors.currentCreditHolders?.hasError}
          ref={currentCreditHoldersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "currentCreditHolders")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Project insights"
        isRequired={false}
        isReadOnly={false}
        value={projectInsights}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights: value,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectInsights ?? value;
          }
          if (errors.projectInsights?.hasError) {
            runValidationTasks("projectInsights", value);
          }
          setProjectInsights(value);
        }}
        onBlur={() => runValidationTasks("projectInsights", projectInsights)}
        errorMessage={errors.projectInsights?.errorMessage}
        hasError={errors.projectInsights?.hasError}
        {...getOverrideProps(overrides, "projectInsights")}
      ></TextField>
      <TextField
        label="Project desc file link"
        isRequired={false}
        isReadOnly={false}
        value={projectDescFileLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink: value,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.projectDescFileLink ?? value;
          }
          if (errors.projectDescFileLink?.hasError) {
            runValidationTasks("projectDescFileLink", value);
          }
          setProjectDescFileLink(value);
        }}
        onBlur={() =>
          runValidationTasks("projectDescFileLink", projectDescFileLink)
        }
        errorMessage={errors.projectDescFileLink?.errorMessage}
        hasError={errors.projectDescFileLink?.hasError}
        {...getOverrideProps(overrides, "projectDescFileLink")}
      ></TextField>
      <TextField
        label="Review report file link"
        isRequired={false}
        isReadOnly={false}
        value={reviewReportFileLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink: value,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.reviewReportFileLink ?? value;
          }
          if (errors.reviewReportFileLink?.hasError) {
            runValidationTasks("reviewReportFileLink", value);
          }
          setReviewReportFileLink(value);
        }}
        onBlur={() =>
          runValidationTasks("reviewReportFileLink", reviewReportFileLink)
        }
        errorMessage={errors.reviewReportFileLink?.errorMessage}
        hasError={errors.reviewReportFileLink?.hasError}
        {...getOverrideProps(overrides, "reviewReportFileLink")}
      ></TextField>
      <TextField
        label="Validation plan file link"
        isRequired={false}
        isReadOnly={false}
        value={validationPlanFileLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink: value,
              validationReportFileLink,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.validationPlanFileLink ?? value;
          }
          if (errors.validationPlanFileLink?.hasError) {
            runValidationTasks("validationPlanFileLink", value);
          }
          setValidationPlanFileLink(value);
        }}
        onBlur={() =>
          runValidationTasks("validationPlanFileLink", validationPlanFileLink)
        }
        errorMessage={errors.validationPlanFileLink?.errorMessage}
        hasError={errors.validationPlanFileLink?.hasError}
        {...getOverrideProps(overrides, "validationPlanFileLink")}
      ></TextField>
      <TextField
        label="Validation report file link"
        isRequired={false}
        isReadOnly={false}
        value={validationReportFileLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink: value,
              mediaFiles,
            };
            const result = onChange(modelFields);
            value = result?.validationReportFileLink ?? value;
          }
          if (errors.validationReportFileLink?.hasError) {
            runValidationTasks("validationReportFileLink", value);
          }
          setValidationReportFileLink(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "validationReportFileLink",
            validationReportFileLink
          )
        }
        errorMessage={errors.validationReportFileLink?.errorMessage}
        hasError={errors.validationReportFileLink?.hasError}
        {...getOverrideProps(overrides, "validationReportFileLink")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              projectName,
              projectType,
              estAnnualMitigations,
              projectStatus,
              scale,
              country,
              businessOwner,
              projectOwners,
              carbonDevelopers,
              supportingPartners,
              auditors,
              sdgs,
              creditIssuanceDate,
              totalCreditsIssued,
              sector,
              methodology,
              sustainableCert,
              validationBody,
              verficationBody,
              projectDuration,
              registry,
              validationCriteria,
              verificationCriteria,
              city,
              address,
              geographicalRegion,
              coordinates,
              googleMapLink,
              creditsRetired,
              currentCreditHolders,
              projectInsights,
              projectDescFileLink,
              reviewReportFileLink,
              validationPlanFileLink,
              validationReportFileLink,
              mediaFiles: values,
            };
            const result = onChange(modelFields);
            values = result?.mediaFiles ?? values;
          }
          setMediaFiles(values);
          setCurrentMediaFilesValue("");
        }}
        currentFieldValue={currentMediaFilesValue}
        label={"Media files"}
        items={mediaFiles}
        hasError={errors?.mediaFiles?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("mediaFiles", currentMediaFilesValue)
        }
        errorMessage={errors?.mediaFiles?.errorMessage}
        setFieldValue={setCurrentMediaFilesValue}
        inputFieldRef={mediaFilesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Media files"
          isRequired={false}
          isReadOnly={false}
          value={currentMediaFilesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.mediaFiles?.hasError) {
              runValidationTasks("mediaFiles", value);
            }
            setCurrentMediaFilesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("mediaFiles", currentMediaFilesValue)
          }
          errorMessage={errors.mediaFiles?.errorMessage}
          hasError={errors.mediaFiles?.hasError}
          ref={mediaFilesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "mediaFiles")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
