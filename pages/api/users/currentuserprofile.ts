import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "../../../firebase";

type Data = {
  data?: any;
  message?: string;
  description?: string;
  userImg?: string;
  creationDate?: string;
  username?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const uid = getAuth().currentUser?.uid!;
  if (req.method === "GET") {
    const ref = doc(db, "users", uid);
    const userData = await getDoc(ref);
    if (!userData.exists) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { username, description, userImg, creationDate } = userData.data()!;
    res.status(200).json({ userImg, username, description, creationDate });
    return;
  } else if (req.method === "POST") {
    const docRef = doc(db, "users", uid);
    const { description, userImg } = req.body;
    if (!userImg) {
      if (description.trim().length < 5 || description.trim().length > 1000) {
        res.status(404).json({
          message:
            "Invalid description! Must be at least 5 characters long and maximum 1000 charachters length ",
        });
        return;
      }
      await updateDoc(docRef, {
        description: description,
      });
      res
        .status(200)
        .json({ message: "Description updated successfully", description: description });
      return;
    } else if (userImg) {
      await updateDoc(docRef, {
        userImg,
      });
      res.status(200).json({ message: "Profile picture updated successfully" });
    }
  }
  res.status(422).json({ message: "Access denied!" });
}
