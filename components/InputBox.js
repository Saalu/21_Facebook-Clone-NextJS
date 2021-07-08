import Image from "next/image";
import { CameraIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const [session] = useSession();
  const [msg, setMsg] = useState("");
  // const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imgToPost, setImgToPost] = useState("");

  const sendPost = (e) => {
    e.preventDefault();

    // if (!inputRef.current.value) return;
    if (!msg) return;
    console.log(msg);

    db.collection("posts")
      .add({
        message: msg,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imgToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imgToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (err) => console.error(err),
            () => {
              //when upload completes
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    setMsg("");
    // inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImgToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImgToPost(null);
  };

  return (
    <div
      className="rounded-2xl shadow-md 
    text-gray-500 font-medium mt-6 p-2  bg-white"
    >
      <div className="flex space-x-4 items-center p-4 ">
        <Image
          className="rounded-full "
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />

        <form className="flex flex-1" onSubmit={sendPost}>
          <input
            className="rounded-full h-12 bg-gray-100 
          flex-grow px-5 focus:outline-none"
            // ref={useRef}
            // name='msg'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" className="">
            Submit
          </button>
        </form>

        {/* Preview Image for post */}

        {imgToPost && (
          <div
            className="flex flex-col hover:brightness-110 transition 
            duration-150 transform hover:scale-105 cursor-pointer"
            onClick={removeImage}
          >
            <img src={imgToPost} className="h-10 object-contain" alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      {/* next */}
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            type="file"
            hidden
            onChange={addImageToPost}
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500 " />
          <p className="text-xs sm:tex-sm xl:text-base">Feeling Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
