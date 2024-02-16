import { useState, FormEvent } from "react";

import Form from "../../components/Form";
import Button from "@components/Button";
import Input from "@components/Input";

const FinishingUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMessage] = useState("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(emailInput)) {
      setErrorMessage("* Please enter a valid email");
      return;
    }
    setErrorMessage("");
    // Proceed with sign-in logic here
  };

  return (
    <div>
      <div>
        <h1>Whoops!</h1>
        <h2>
          Maybe you have opened the email link on a different browser or window,
          please re-enter the email you've received invitation
        </h2>
        <Form id="sign-in-form" onSubmit={handleSignIn}>
          <Input
            label="EMAIL"
            type="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setErrorMessage("");
            }}
            errorMessage={errorMsg}
            placeholder="your@email.com"
          />
          <Button type="submit" form="sign-in-form" className={`btn btn-flat`}>
            Confirm
          </Button>
        </Form>
      </div>
      <div>
        <a
          href="https://www.youtube.com/watch?v=gGeSZ4fzPcA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="path/to/youtubeImg.png" alt="youtube-icon" />
        </a>
        <div>Welcome to your digital platform for design Collaboration</div>
      </div>
    </div>
  );
};

export default FinishingUp;