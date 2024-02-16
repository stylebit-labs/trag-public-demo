import styles from "./Profile.module.scss";
import EditorSidebar from "@components/EditorSidebar";
import Tooltip from "../../components/Tooltip";
import { useAppSelector } from "@state/index";
import { useDispatch } from "react-redux";
import { openModal } from "@state/reducers/utils";
import ProfileHeader from "@components/EditorHeader/ProfileHeader";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

const EmailLabel = () => {
  const { t } = useTranslation();
  return (
    <>
      {t("profile.email")}{" "}
      <Tooltip content={t("tooltips.profile.emailHelp")}>
        <QuestionMarkCircledIcon className={styles.questionMark} />
      </Tooltip>
    </>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((s) => s.auth.sbUser);
  const { t } = useTranslation();

  return (
    <main>
      <EditorSidebar />
      <ProfileHeader title={t("profile.myProfile")} />
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
              {t("profile.deleteAccountWarning")}
            </p>
            <button
              className={styles.deleteBtn}
              onClick={() => dispatch(openModal("deleteAccountModal"))}
            >
              <img src={trashIcon} alt={t("alt.trash")} />
              {t("profile.deleteAccount")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;