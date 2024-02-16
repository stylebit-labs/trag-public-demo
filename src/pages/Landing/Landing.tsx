// @ts-nocheck
import { useState } from "react";
import "./styles/Landing.scss";
import { updateWaitlist } from "@api/profile";
import toast from "react-hot-toast";
import Form from "../../components/Form";

function Landing() {
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
    <div className="App homepage">
      <main className="main">
        <section className="waitlist hide">
          <img
            src={joinStar}
            alt="star"
            aria-hidden="true"
            className="star bottom-left"
          />
          <div className="container middle-aligned">
            <div className="join-content">
              <h6 className="section-title fz14 fw700 c-yellow letter-s">
                WAITLIST
              </h6>
              <h6 className="section-subtitle fz48 fw700 c-white">
                Join the waitlist
              </h6>
              <p className="fz18 lh14 fw400 c-black06 os">
                Beta version is coming later this year, join to the early access
                program, to be one of the first to try out Stylebit.
              </p>
            </div>
            <div className="formWrapper">
              <div className="form">
                <Form className="group" onSubmit={handleJoin}>
                  <label htmlFor="email" className="label fz16 fw600 c-white">
                    Email address
                  </label>
                  <input
                    type="text"
                    value={email}
                    id="email"
                    className="input"
                    onChange={(e: { target: { value: any } }) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Email address"
                  />
                  <button
                    type="submit"
                    className="btn btn-gradient c-white submit-btn fz14 fw600"
                  >
                    Join up
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Landing;
