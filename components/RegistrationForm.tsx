"use client";

import React, { useState } from "react";
// import { toast } from "react-toastify";
import { registerData } from "@/data";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Photo from "./ui/Photo";

const RegistrationForm = () => {
  const [data, setData] = useState<{ [key: string]: any }>({ ...registerData });

  const submitHandler = () => {
    console.log("submitData", data)
  };

  return (
    <form className="signup__form">
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
            setData={setData}
          />
        </div>
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="lastName"
          placeholder="Last name*"
          value={data.lastName}
          setData={setData}
          autoComplete="family-name"
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First name*"
          value={data.firstName}
          setData={setData}
          autoComplete="given-name"
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="otherName"
          placeholder="Other name"
          value={data.otherName}
          setData={setData}
          autoComplete="additional-name"
        />
        <Select
          className="w-[50%]"
          name="gender"
          options={["Male", "Female"]}
          setData={setData}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth*"
          setData={setData}
          autoComplete="bday"
        />
        <Input
          type="text"
          name="mobileNumber"
          placeholder="Mobile number*"
          value={data.mobileNumber}
          setData={setData}
          autoComplete="tel"
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="nationality"
          placeholder="Nationality*"
          value={data.nationality}
          setData={setData}
          autoComplete="country-name"
        />
        <Input
          type="text"
          name="stateOfOrigin"
          placeholder="State of Origin*"
          value={data.stateOfOrigin}
          setData={setData}
          autoComplete="state"
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="localGovArea"
          placeholder="L.G.A*"
          value={data.localGovArea}
          setData={setData}
        />
        <Input
          type="text"
          name="town"
          placeholder="Town*"
          value={data.town}
          setData={setData}
        />
      </div>

      <p className="signup__form__title">OTHER INFORMATIONS</p>

      <Input
        type="email"
        name="email"
        placeholder="Email*"
        value={data.email}
        setData={setData}
        autoComplete="email"
      />
      <Input
        type="text"
        name="resAddress"
        placeholder="Residential address*"
        value={data.resAddress}
        setData={setData}
        autoComplete="street-address"
      />

      <div className="signup__form__item">
        <Select
          className="w-[50%]"
          name="maritalStatus"
          options={["Single", "Married"]}
          setData={setData}
        />
      </div>

      <p className="signup__form__title">PROGRAM INFORMATION</p>
      <div className="signup__form__item">
        <Input
          type="text"
          name="choice"
          placeholder="Choice of program*"
          value={data.choice}
          setData={setData}
        />
      </div>

      <p className="signup__form__title">DURATION OF PROGRAM</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="startDate"
          placeholder="Date of commencement*"
          value={data.startDate}
          setData={setData}
        />
        <Input
          type="text"
          name="endDate"
          placeholder="Expected date of graduation*"
          value={data.endDate}
          setData={setData}
        />
      </div>

      <p className="signup__form__title">EDUCATIONAL BACKGROUND</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="background1"
          placeholder="Background 1*"
          value={data.background1}
          setData={setData}
        />
        <Input
          type="text"
          name="background2"
          placeholder="Background 2*"
          value={data.background2}
          setData={setData}
        />
      </div>

      <p className="signup__form__title">TWO REFEREES</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="name1"
          placeholder="Referee Name 1*"
          value={data.name1}
          setData={setData}
        />
        <Input
          type="text"
          name="phoneNumber1"
          placeholder="Referee Phone number 1*"
          value={data.phoneNumber1}
          setData={setData}
        />
      </div>
      <div className="signup__form__item">
        <Input
          type="text"
          name="relationship1"
          placeholder="Relationship*"
          value={data.relationship1}
          setData={setData}
        />
      </div>

      <div className="signup__form__group">
        <Input
          type="text"
          name="name2"
          placeholder="Referee Name 2*"
          value={data.name2}
          setData={setData}
        />
        <Input
          type="text"
          name="phoneNumber2"
          placeholder="Referee Phone number 2*"
          value={data.phoneNumber2}
          setData={setData}
        />
      </div>
      <div className="signup__form__item">
        <Input
          type="text"
          name="relationship2"
          placeholder="Relationship*"
          value={data.relationship2}
          setData={setData}
        />
      </div>

      <p className="signup__form__text text-sm">
        By clicking submit, I hereby attest that all information provided in
        this form is true and I hereby agree that to any extent any of the
        information so provided is found to be false, I shall be disqualified
        from this training. I also hereby agree to all rules and regulations of
        this Center as it concerns this training program.
      </p>

      <Button onClick={submitHandler} className="bg-[rgb(109,84,181)]">
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
