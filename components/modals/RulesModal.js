import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import scoob from "../../images/scoob.gif";
export default function RulesModal(props) {
  const [rulesModal, setRulesModal] = useState(false);

  const toggleModal = () => {
    setRulesModal(!rulesModal);
  };
  let _ud = localStorage.getItem("user_data");
  let ud = JSON.parse(_ud);
  let lastName = ud ? ud.lastName : null;

  return (
    <>
      <button className={props.classes} onClick={toggleModal}>
        Rules
      </button>

      {rulesModal && (
        <div className="overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50">
          <div
            onClick={toggleModal}
            className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70"
          ></div>
          <div className="absolute top-[30%] left-[49.5%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-zinc-800 px-4 sm:px-16 py-8 rounded-md w-5/6 max-w-4xl text-pr-white text-sm md:text-lg lg:text-xl">
            {/* <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
              Rules
            </h2> */}
            <p className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-yellow font-bold">
              Welcome Agent{ud ? ` ${lastName}` : ""}!
            </p>
            <p className="text-center text-base text-pr-white font-medium mt-5">
              Use your specialized skill set to guess the movie rating out of
              100.
            </p>
            <p className="text-center text-base text-pr-white font-medium ">
              Your file will include the movie poster, plot, actors, cast, and
              how much money it earned in the box office.
            </p>
            <p className="text-center text-base text-pr-white font-medium ">
              The closer you are to the movie rating, the more points you score.
            </p>
            <p className="text-center text-base text-pr-white font-medium ">
              Good Luck Agent!
            </p>
            <img
              className="w-32 absolute top-[-96px] right-[15px] block"
              src={scoob}
              alt="scooby-doo pic"
            />
            <XMarkIcon
              className="absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
