// @ts-nocheck
import styles from "./Profile.module.scss";
import EditorSidebar from "@components/EditorSidebar";
import Tooltip from "../../components/Tooltip";
import { useAppSelector } from "@state/index";

import { useDispatch } from "react-redux";
import { openModal } from "@state/reducers/utils";
import ProfileHeader from "@components/EditorHeader/ProfileHeader";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const EmailLabel = () => {
  return (
    <>
      Email{" "}
      <Tooltip content="You can't update your email for now, if such issue occurred, please contact us at: support@stylebit.io">
        <QuestionMarkCircledIcon className={styles.questionMark} />
      </Tooltip>
    </>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((s) => s.auth.sbUser);

  return (
    <main>
      <EditorSidebar />
      <ProfileHeader title="My Profile" />
      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.footer}>
            <h2 className={styles.nameLastname}>{user.displayName}</h2>
          </div>
        </div>
        <div className={styles.col}>
          <Input
            isDisabled
            type="text"
            label={<EmailLabel />}
            placeholder={user.email}
          />
          <div className={styles.divider}></div>
          <div className={styles.deleteWrap}>
            <p className={styles.descr}>
              Deleting you account will remove all of your information from our
              servers, please remember to remove 3rd party account integrations
              directly from Figma or GitHub.
            </p>
            <button
              className={styles.deleteBtn}
              onClick={() => dispatch(openModal("deleteAccountModal"))}
            >
              <img src={trashIcon} alt="Trash" />
              Delete account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
