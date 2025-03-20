export const formatFormatData = (
  formData: FormData,
  user: { [key: string]: any }
) => {
  return {
    user,
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    otherName: formData.get("otherName"),
    photo: formData.get("photo"),
    gender: formData.get("gender"),
    dateOfBirth: formData.get("dateOfBirth"),
    mobileNumber: formData.get("mobileNumber"),
    nationality: formData.get("nationality"),
    stateOfOrigin: formData.get("stateOfOrigin"),
    localGovArea: formData.get("localGovArea"),
    town: formData.get("town"),

    otherInfo: {
      email: formData.get("email"),
      resAddress: formData.get("resAddress"),
      maritalStatus: formData.get("maritalStatus"),
    },
    progInfo: { choice: formData.get("choice") },

    progDruration: {
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    },

    eduBackground: {
      background1: formData.get("background1"),
      background2: formData.get("background2"),
    },

    referees: {
      name1: formData.get("name1"),
      phoneNumber1: formData.get("phoneNumber1"),
      relationship1: formData.get("relationship1"),
      name2: formData.get("name2"),
      phoneNumber2: formData.get("phoneNumber2"),
      relationship2: formData.get("relationship2"),
    },
  };
};
