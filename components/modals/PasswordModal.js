import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import scoob from "../../images/scoob.gif";
export default function PasswordModal(props) {
  const [passwordModal, setPasswordModal] = useState(false);
  const emailRef = useRef();
  useEffect(() => {
    setPasswordModal(props.value);
  }, [props.value]);

  const toggleModal = () => {
    setPasswordModal(false);
    props.closePasswordModal();
  };

  return (
    <>
      {passwordModal && (
        <div className="overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50">
          <div
            onClick={toggleModal}
            className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70"
          ></div>
          <div className="absolute top-[30%] left-[49.5%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-zinc-800 px-4 sm:px-16 py-8 rounded-md w-1/4 max-w-4xl text-pr-white text-sm md:text-lg lg:text-xl">
            {/* <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
              Rules
            </h2> */}
            <p className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-yellow font-bold">
              Reset Password
            </p>
            <div className="relative">
              <input
                className="peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent"
                id="username"
                ref={emailRef}
                type="text"
                placeholder="a"
              ></input>
              <label
                className="absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md "
                htmlFor="username"
              >
                Login
              </label>
            </div>
            <img
              className="w-32 absolute top-[-96px] right-[15px] block"
              src={scoob}
              alt="scooby-doo pic"
            />
            <XMarkIcon
              className="absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleModal}
            >
              Close
            </XMarkIcon>
          </div>
        </div>
      )}
    </>
  );
}
