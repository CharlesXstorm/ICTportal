import { registerData } from "@/data";

//error handling
export const handleErrors = (err: string | string[]) => {
  /////
  if (err.includes("user validation")) {
    const error = { email: "", password: "", lastName: "", firstName: "" };
    if (err.includes("email")) {
      error.email = "Please enter a valid email";
      return error.email;
    }
    if (err.includes("lastName")) {
      error.lastName = "Please enter a last name";
      return error.lastName;
    }
    if (err.includes("firstName")) {
      error.firstName = "Please enter a first name";
      return error.firstName;
    }
    error.password = "Minimum of 6 characters required";
    return error.password;
  }

  if (err.includes("duplicate key")) {
    return "This account is already registered";
  }
};

/////form errors
export const handleFormErrors = (err: string | string[]) => {
  ///////
  //   if (err.includes("data validation")) {
  const error = { ...registerData };
  switch (err.includes("data validation")) {
    case err.includes("lastName"):
      error.lastName = "Please enter a last name";
      return error.lastName;
    case err.includes("firstName"):
      error.firstName = "Please enter a first name";
      return error.firstName;
    case err.includes("gender"):
      error.gender = "Please select a gender";
      return error.gender;
    case err.includes("dateOfBirth"):
      error.dateOfBirth = "Please select a date of birth";
      return error.dateOfBirth;
    case err.includes("mobileNumber"):
      error.mobileNumber = "Please enter a mobile number";
      return error.mobileNumber;
    case err.includes("nationality"):
      error.nationality = "Please enter a nationality";
      return error.nationality;
    case err.includes("stateOfOrigin"):
      error.stateOfOrigin = "Please enter a state of origin";
      return error.stateOfOrigin;
    case err.includes("localGovArea"):
      error.localGovArea = "Please enter a local government area";
      return error.localGovArea;
    case err.includes("town"):
      error.town = "Please enter a town";
      return error.town;
    case err.includes("email"):
      error.email = "Please enter an email";
      return error.email;
    case err.includes("resAddress"):
      error.resAddress = "Please enter a residential address";
      return error.resAddress;
    case err.includes("maritalStatus"):
      error.maritalStatus = "Please select a marital status";
      return error.maritalStatus;
    case err.includes("choice"):
      error.choice = "Please select a choice";
      return error.choice;
    case err.includes("startDate"):
      error.startDate = "Please select a start date";
      return error.startDate;
    case err.includes("endDate"):
      error.endDate = "Please select an end date";
      return error.endDate;
    case err.includes("background1"):
      error.background1 = "Please enter your first educational background";
      return error.background1;
    case err.includes("background2"):
      error.background2 = "Please enter your second educational background";
      return error.background2;
    case err.includes("name1"):
      error.name1 = "Please enter your first referee's name";
      return error.name1;
    case err.includes("phoneNumber1"):
      error.phoneNumber1 = "Please enter your first referee's phone number";
      return error.phoneNumber1;
    case err.includes("relationship1"):
      error.relationship1 =
        "Please enter the relationship with your first referee";
      return error.relationship1;
    case err.includes("name2"):
      error.name2 = "Please enter your second referee's name";
      return error.name2;
    case err.includes("phoneNumber2"):
      error.phoneNumber2 = "Please enter your second referee's phone number";
      return error.phoneNumber2;
    case err.includes("relationship2"):
      error.relationship2 =
        "Please enter the relationship with your second referee";
      return error.relationship2;
    default:
      return;
  }
};
