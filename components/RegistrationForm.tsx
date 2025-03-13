import React from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import File from "./ui/File";

const RegistrationForm = () => {
  return (
    <form className="signup__form">
      <div className="signup__form__photo">
        <div className="signup__form__photo__content">
          <p className="text-sm">
            Upload a clear passport photo.
            <br />
            <br/>
            Accepted files are JPG, JPEG & PNG
          </p>
          <File name="photo" />
        </div>
      </div>

      <div className="signup__form__group">
        <Input type="text" name="lastname" placeholder="Last name" />
        <Input type="text" name="firstname" placeholder="First name" />
      </div>

      <div className="signup__form__group">
        <Input type="text" name="othername" placeholder="Other name" />
        <Select className="w-[50%]" name="gender" options={["Male", "Female"]} />
      </div>

      <div className="signup__form__group">
        <Input type="date" name="dob" placeholder="Date of Birth" />
        <Input type="text" name="mobile" placeholder="Mobile number" />
      </div>

      <div className="signup__form__group">
        <Input type="text" name="nationality" placeholder="Nationality" />
        <Input type="text" name="state" placeholder="State of Origin" />
      </div>

      <div className="signup__form__group">
        <Input type="text" name="lga" placeholder="L.G.A" />
        <Input type="text" name="town" placeholder="Town" />
      </div>

      <p className="signup__form__title">OTHER INFORMATIONS</p>

      <Input type="email" name="email" placeholder="Email" />
      <Input type="text" name="address" placeholder="Residential address" />

      <div className="signup__form__item">
        <Select className="w-[50%]" name="marital" options={["Single", "Married"]} />
      </div>

      <p className="signup__form__title">PROGRAM INFORMATION</p>
      <div className="signup__form__item">
        <Input type="text" name="choice" placeholder="Choice of program" />
      </div>

      <p className="signup__form__title">DURATION OF PROGRAM</p>
      <div className="signup__form__group">
        <Input
          type="text"
          name="startdate"
          placeholder="Date of commencement"
        />
        <Input
          type="text"
          name="finishdate"
          placeholder="Expected date of graduation"
        />
      </div>

      <p className="signup__form__title">EDUCATIONAL BACKGROUND</p>
      <div className="signup__form__group">
        <Input type="text" name="background1" placeholder="Background 1" />
        <Input type="text" name="background2" placeholder="Background 2" />
      </div>

      <p className="signup__form__title">TWO REFEREES</p>
      <div className="signup__form__group">
        <Input type="text" name="refereename1" placeholder="Referee Name 1" />
        <Input
          type="text"
          name="refereenumber1"
          placeholder="Referee Phone number 1"
        />
      </div>
      <div className="signup__form__item">
        <Input type="text" name="relationship1" placeholder="Relationship" />
      </div>

      <div className="signup__form__group">
        <Input type="text" name="refereename2" placeholder="Referee Name 2" />
        <Input
          type="text"
          name="refereenumber2"
          placeholder="Referee Phone number 2"
        />
      </div>
      <div className="signup__form__item">
        <Input type="text" name="relationship2" placeholder="Relationship" />
      </div>

      <p className="signup__form__text text-sm">
        By clicking submit, I hereby attest that all information provided in
        this form is true and I hereby agree that to any extent any of the
        information so provided is found to be false, I shall be disqualified
        from this training. I also hereby agree to all rules and regulations of
        this Center as it concerns this training program.
      </p>

      <Button className="bg-[rgb(109,84,181)]">Submit</Button>
    </form>
  );
};

export default RegistrationForm;
