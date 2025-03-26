import React, { useEffect, useState } from "react";
import assets from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

function ProfileUpdate() {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = setDoc(docRef);
        if (docSnap) {
          setName(docSnap.name);
        }
      }
    });
  }, []);

  return (
    <div className="profile min-h-dvh bg-[url(/background.png)] bg-no-repeat flex items-center justify-center bg-cover">
      <div className="profile-container bg-white flex items-center justify-center min-w-3xl rounded-lg">
        <form action="" className="flex flex-col gap-5 p-10 ">
          <h3 className="font-semibold">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-5 text-gray-500 cursor-pointer"
          >
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
              className="w-16 aspect-square rounded-full"
            />
            Upload Profile Image
          </label>

          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="p-2 min-w-80 border border-[#c9c9c9] outline outline-[#077EFF] rounded-sm"
            required
          />
          <textarea
            name="your-bio"
            id="bio"
            placeholder="Tell others about yourself...."
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className="p-4 pt-2 pl-2 min-w-80 border border-[#c9c9c9] outline outline-[#077EFF] rounded-sm"
          ></textarea>
          <button
            type="submit"
            className="text-white bg-[#077EFF] p-2 cursor-pointer rounded-sm"
          >
            Save Details
          </button>
        </form>

        <img
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt=""
          className="profile-pic aspect-square max-w-40 rounded-full mx-5 "
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
