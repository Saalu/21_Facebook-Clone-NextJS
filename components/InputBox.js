import { CameraIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";

function InputBox() {
  const [session] = useSession();
  const sendPost = (e) => {
    e.preventDefault();
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

        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 
          flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" className="" onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>

      {/* next */}
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500 " />
          <p className="text-xs sm:tex-sm xl:text-base">Live Video</p>
        </div>

        <div className="inputIcon">
          <CameraIcon className="h-7 text-green-500 " />
          <p className="text-xs sm:tex-sm xl:text-base">Photo/Video</p>
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
