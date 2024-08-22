// @ts-nocheck
import { useState } from "react";

import Form from "../../components/Form";
import Button from "@components/Button";
import Input from "@components/Input";

const FinishingUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [errorSh, setErrorSh] = useState("");

  const handleSignIn = async () => {
    if (!emailInput) {
      setErrorMessage("* please enter a valid email");
      return;
    }
    setErrorMessage("");
  };

  return (
    <div>
      <div>
        <h1>Whoops!</h1>
        <h2>
          Maybe you have opened the email link on a different browser or window,
          please re-enter the email you've received invitation {errorSh}
        </h2>
        <Form id="sign-in-form" onSubmit={handleSignIn}>
          <Input
            label="EMAIL"
            value={emailInput}
            onChange={(email) => {
              setEmailInput(email);
              setErrorMessage("");
              setErrorSh("asd");
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
          target="blank"
          rel="noopener"
        >
          <img src={youtubeImg} alt="youtube-white" />
        </a>
        <div>Welcome to your digital platform for design Collaboration</div>
      </div>
    </div>
  );
};

export default FinishingUp;
