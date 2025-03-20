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
    case err.includes("firstName"):
      error.firstName = "Please enter a first name";
      return error.firstName;
    default:
      return;
  }
  // if (err.includes("firstName")) {
  //   error.firstName = "Please enter a first name";
  //   return error.firstName;
  // }
  // error.password = "Minimum of 6 characters required";
  // return error.password;
  //   }

  //   if (err.includes("duplicate key")) {
  //     return "This account is already registered";
  //   }
};
