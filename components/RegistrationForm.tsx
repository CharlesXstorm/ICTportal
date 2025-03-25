"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { programs, registerData } from "@/data";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Photo from "./ui/Photo";
import Date from "./ui/Date";
import { upload_img } from "@/scripts";
import { useStore } from "@/store";
import axios from "axios";
import Loading from "./ui/Loading";
import Dropdown from "./ui/Dropdown";

const RegistrationForm = () => {
  const [data, setData] = useState<{ [key: string]: any }>({ ...registerData });
  const [btnSubmit, setBtnSubmit] = useState(false);
  const { userInfo, userData, disabled, setDisabled } = useStore();

  const submitHandler = async () => {
    setBtnSubmit(true);
    const publicID = `${userInfo?._id.slice(0, 5)}_${
      userInfo?.firstName
    }${userInfo?._id.slice(9)}_`;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH;

    try {
      const img_url = await upload_img(data.photo, publicID);

      if (!img_url) {
        setBtnSubmit(false);
        toast.error("Please upload an image");
        return;
      }

      //create form data here
      const regInfo = new FormData();
      // Append all fields from the `data` state to the FormData object
      Object.keys(data).forEach((key) => {
        regInfo.append(key, data[key]);
      });

      regInfo.set("photo", img_url); //reset the photo

      // Send the FormData object to the API via POST request
      const response = await axios.post(`${API_URL}/user/createData`, regInfo, {
        headers: {
          authorization: `Bearer ${API_AUTH}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response) {
        throw new Error("error: data not summited");
      }
      toast.success("submitted successfully!");
      setBtnSubmit(false);
      setDisabled(true);
    } catch (err: any) {
      // setBtnSigningUp((prev) => !prev);
      setBtnSubmit(false);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (userData) {
      //setData with userData
      Object.keys(userData).forEach((el) => {
        if (el != "user" && el != "__v" && el != "_id") {
          if (!(typeof userData[el] === "object")) {
            setData((prev) => {
              return { ...prev, [el]: userData[el] };
            });
          } else {
            Object.keys(userData[el]).forEach((subEl: any) => {
              setData((prev) => {
                return { ...prev, [subEl]: userData[el][subEl] };
              });
              return;
            });
          }
        }
      });
    } else {
      return;
      // console.log("no user data", userData);
    }
  }, [userData]);

  return (
    <form className="register__form">
      <div className="signup__form__photo">
        <div className="signup__form__photo__content">
          <p className="text-sm">
            Upload a clear passport photo.
            <br />
            It should not be more than 200kb in size.
            <br />
            Accepted files are JPG, JPEG & PNG
          </p>
          <Photo
            type="file"
            name="photo"
            accept="image/png, image/jpg, image/jpeg"
            maxSize={200}
            photoUrl={data.photo}
            setData={setData}
          />
        </div>
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="lastName"
          className="input__reg"
          placeholder="Last name*"
          value={data.lastName}
          setData={setData}
          autoComplete="family-name"
          disabled={disabled}
        />
        <Input
          type="text"
          name="firstName"
          className="input__reg"
          placeholder="First name*"
          value={data.firstName}
          setData={setData}
          autoComplete="given-name"
          disabled={disabled}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="otherName"
          className="input__reg"
          placeholder="Other name"
          value={data.otherName}
          setData={setData}
          autoComplete="additional-name"
          disabled={disabled}
        />
        <Dropdown
          id="gender"
          name="gender"
          setData={setData}
          data={data.gender}
          options={["Gender", "Male", "Female"]}
          disabled={disabled}
          searchable={false}
        />
      </div>

      <div className="signup__form__group">
        <Date
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth*"
          value={data.dateOfBirth}
          setData={setData}
          autoComplete="bday"
          disabled={disabled}
        />
        <Input
          type="text"
          name="mobileNumber"
          className="input__reg"
          placeholder="Mobile number*"
          value={data.mobileNumber}
          setData={setData}
          autoComplete="tel"
          disabled={disabled}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="nationality"
          className="input__reg"
          placeholder="Nationality*"
          value={data.nationality}
          setData={setData}
          autoComplete="country-name"
          disabled={disabled}
        />
        <Input
          type="text"
          name="stateOfOrigin"
          className="input__reg"
          placeholder="State of Origin*"
          value={data.stateOfOrigin}
          setData={setData}
          autoComplete="state"
          disabled={disabled}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="localGovArea"
          className="input__reg"
          placeholder="L.G.A*"
          value={data.localGovArea}
          setData={setData}
          disabled={disabled}
        />
        <Input
          type="text"
          name="town"
          className="input__reg"
          placeholder="Town*"
          value={data.town}
          setData={setData}
          disabled={disabled}
        />
      </div>

      <p className="signup__form__title">OTHER INFORMATIONS</p>

      <Input
        type="email"
        name="email"
        className="input__reg"
        placeholder="Email*"
        value={data.email}
        setData={setData}
        autoComplete="email"
        disabled={disabled}
      />
      <Input
        type="text"
        name="resAddress"
        className="input__reg"
        placeholder="Residential address*"
        value={data.resAddress}
        setData={setData}
        autoComplete="street-address"
        disabled={disabled}
      />

      <div className="signup__form__item">
        <Dropdown
          id="maritalStatus"
          name="maritalStatus"
          setData={setData}
          data={data.maritalStatus}
          options={["Marital Status", "Single", "Married"]}
          disabled={disabled}
          searchable={false}
        />
      </div>

      <p className="signup__form__title">PROGRAM INFORMATION</p>
      <div className="signup__form__item">
        <Dropdown
          id="progInfo"
          name="progInfo"
          setData={setData}
          data={data.progInfo}
          options={programs}
          disabled={disabled}
          searchable={true}
        />
      </div>

      <p className="signup__form__title">EDUCATIONAL BACKGROUND</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="qualification"
          className="input__reg"
          placeholder="Highest Qualification*"
          value={data.qualification}
          setData={setData}
          disabled={disabled}
        />
      </div>

      <p className="signup__form__title">REFEREES</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="name1"
          className="input__reg"
          placeholder="Referee Name 1*"
          value={data.name1}
          setData={setData}
          disabled={disabled}
        />
        <Input
          type="text"
          name="phoneNumber1"
          className="input__reg"
          placeholder="Referee Phone number 1*"
          value={data.phoneNumber1}
          setData={setData}
          disabled={disabled}
        />
      </div>
      <div className="signup__form__item">
        <Input
          type="text"
          name="relationship1"
          className="input__reg"
          placeholder="Relationship*"
          value={data.relationship1}
          setData={setData}
          disabled={disabled}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="name2"
          className="input__reg"
          placeholder="Referee Name 2*"
          value={data.name2}
          setData={setData}
          disabled={disabled}
        />
        <Input
          type="text"
          name="phoneNumber2"
          className="input__reg"
          placeholder="Referee Phone number 2*"
          value={data.phoneNumber2}
          setData={setData}
          disabled={disabled}
        />
      </div>
      <div className="signup__form__item">
        <Input
          type="text"
          name="relationship2"
          className="input__reg"
          placeholder="Relationship*"
          value={data.relationship2}
          setData={setData}
          disabled={disabled}
        />
      </div>

      <p className="signup__form__text text-sm">
        By clicking submit, I hereby attest that all information provided in
        this form is true and I hereby agree that to any extent any of the
        information so provided is found to be false, I shall be disqualified
        from this training. I also hereby agree to all rules and regulations of
        this Center as it concerns this training program.
      </p>

      <Button onClick={submitHandler} disabled={disabled}>
        {btnSubmit && (
          <Loading
            height="h-full"
            animHeight="h-[80%]"
            animWidth="w-[40px]"
            className={[btnSubmit ? "opacity-100" : "opacity-[0]", "absolute"]
              .filter(Boolean)
              .join(" ")}
          />
        )}
        {disabled ? "Already submitted!" : "Submit"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
