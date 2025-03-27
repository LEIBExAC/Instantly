import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

function ProfileUpdate() {
  const navigate = useNavigate();

  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [imageId, setImageId] = useState("");
  const { setUserData } = useContext(AppContext);

  const profileUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!prevImage && !image) {
        toast.error("Upload Profile Picture");
        return;
      }

      const docRef = doc(db, "users", uid);

      if (image) {
        await upload(image, async ({ imageUrl, imageId }) => {
          // console.log(imageUrl);
          // console.log(imageId);
          setImageId(imageId);
          setPrevImage(imageUrl);

          await updateDoc(docRef, {
            avatar: imageUrl,
            imageId: imageId,
            bio: bio,
            name: name,
          });

          toast.success("Profile updated successfully!");
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
        toast.success("Profile updated successfully!");
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }

        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }

        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="profile min-h-dvh bg-[url(/background.png)] bg-no-repeat flex items-center justify-center bg-cover">
      <div className="profile-container bg-white flex items-center justify-center min-w-3xl rounded-lg">
        <form
          action=""
          onSubmit={profileUpdate}
          className="flex flex-col gap-5 p-10 "
        >
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
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage
                  ? prevImage
                  : assets.avatar_icon
              }
              alt=""
              className="w-16 aspect-square rounded-full"
            />
            Edit Profile Image
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
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : assets.logo_icon
          }
          alt=""
          className="profile-pic aspect-square max-w-40 rounded-full mx-5 "
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
