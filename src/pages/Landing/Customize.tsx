import { useState } from "react";
import Input from "@components/Input";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { updateWaitlist } from "@api/profile";
import { toast } from "react-hot-toast";
import Form from "../../components/Form";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
);

const Customize = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!validEmailRegex.test(email)) {
      setEmailError("Email is not valid");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      await updateWaitlist(email);
      toast.success("Success");
    } else {
      toast.error(emailError);
    }
  };

  return (
    <section className="customize">
      <div className="landing-container">
        <h4 className="title">Upcoming features</h4>
      </div>
      <div className="landing-container">
        <div className="browser-container">
          <div className="tryNow">
            <div className="joinWrap">
              <Form className="inputWrap" onSubmit={handleJoin}>
                <Input
                  label=""
                  value={email}
                  type="email"
                  errorMessage={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="joinCustomize"
                  aria-label="join "
                >
                  <CaretRightIcon />
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customize;