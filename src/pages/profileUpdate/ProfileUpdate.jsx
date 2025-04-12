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
    <div className="login h-screen flex flex-col items-center justify-center bg-gray-purple-shading-dark py-6 overflow-y-hidden">
      <div className="logo">
        <img src={assets.logo} alt="logo" className="max-w-[20rem] max-h-[3rem] absolute top-6 left-6" />
      </div>

      <div className="bg-[url(/background.png)] bg-center h-full w-full aspect-square bg-contain bg-no-repeat mx-14 my-12 flex items-center justify-center rounded-3xl">
        <div className="profile-container bg-[#dbbeec1c] bg-opacity-80 backdrop-blur-xs flex flex-col items-center justify-center min-w-2xl rounded-lg ">
          <h3 className="font-semibold text-light-gray text-2xl text-center mt-4">Profile Details</h3>

          <div className="flex items-center justify-center gap-5 flex-wrap">
            <label
              htmlFor="avatar"
              className="flex flex-col items-center gap-5 text-light-gray cursor-pointer"
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
                      : assets.avatar_icon1
                }
                alt=""
                className="w-28 aspect-square rounded-full"
              />
              Edit Profile Image
            </label>

            <form
              action=""
              onSubmit={profileUpdate}
              className="flex flex-col gap-5 p-10 "
            >


              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="p-2 min-w-80 border outline bg-[#efe8f1ef] border-gray-400 outline-chat-purple placeholder:text-light-gray-text rounded-sm"
                required
              />
              <textarea
                name="your-bio"
                id="bio"
                placeholder="Tell others about yourself...."
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="p-4 pt-2 pl-2 min-w-80 border outline bg-[#efe8f1ef] border-gray-400 outline-chat-purple placeholder:text-light-gray-text rounded-sm"
              ></textarea>

              <button
                type="submit"
                className="text-chat-purple bg-gray-purple-shading-dark p-2 cursor-pointer rounded-sm"
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
