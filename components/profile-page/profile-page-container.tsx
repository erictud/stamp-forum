"use client";

import { useEffect, useState } from "react";
import ButtonRow from "./button-row";
import ChangeDescription from "./change-profile-info";
import ChangeUsername from "./change-username";
import styles from "./profile-page-container.module.css";

type ProfileStateType = "change-password" | "change-info";

export default function ProfilPageContainer() {
  const [profileState, changeProfileState] = useState<ProfileStateType>("change-password");

  const changeFn = (arg: ProfileStateType) => {
    changeProfileState(arg);
  };

  return (
    <main className={styles.container}>
      <ButtonRow state={profileState} changeStateFn={changeFn} />
      {profileState === "change-password" && <ChangeUsername />}
      {profileState === "change-info" && <ChangeDescription />}
    </main>
  );
}
