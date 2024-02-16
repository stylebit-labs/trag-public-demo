// @ts-nocheck
import { useState } from "react";
import Input from "@components/Input";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { updateWaitlist } from "@api/profile";
import { toast } from "react-hot-toast";
import Form from "../../components/Form";

const Customize = () => {
  const [email, setEmail] = useState("");

  const handleJoin = async () => {
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    if (email) {
      await updateWaitlist(email);
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
                  type="text"
                  errorMessage={""}
                  onChange={(e) => setEmail(e)}
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
