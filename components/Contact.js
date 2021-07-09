import Image from "next/image";

function Contact({ src, name }) {
  return (
    <div
      className="flex relative items-center space-x-3 mb-2  p-2
    hover:bg-gray-200 rounded-xl cursor-pointer"
    >
      <Image
        className="rounded-full "
        src={src}
        width={50}
        height={50}
        layout="fixed"
        objectFit="cover"
      />
      <p className="">{name}</p>
      <div
        className="absolute bottom-2 left-7 bg-green-400 h-3 w-3
       rounded-full animate-bounce"
      />
    </div>
  );
}

export default Contact;
