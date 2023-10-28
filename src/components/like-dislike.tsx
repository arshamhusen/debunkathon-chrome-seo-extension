import React from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { motion } from "framer-motion";

type Props = {
  factsFetched: boolean;
  dummyFacts: {
    fact: string;
    link: string;
    verdict?: boolean;
  }[];
};

export default function LikeDislike({ factsFetched, dummyFacts }: Props) {
  return (
    <div className="flex  pt-5 pb-2 flex-col justify-start space-y-2 items-start w-full">
      {/* true false bar */}
      <div className="flex relative mt-10  justify-start items-start w-full">
        {/* thumbs up */}
        <div className="absolute flex flex-row space-x-3 left-0 -top-10">
          <FiThumbsUp className="h-5 w-5" />
          <h1 className="text-xs font-medium">
            {factsFetched && dummyFacts.filter((fact) => fact.verdict).length}
          </h1>
        </div>
        {/* thumbs down */}
        <div className="absolute flex flex-row space-x-3 right-0 -top-10">
          <FiThumbsDown className="h-5 w-5" />
          <h1 className="text-xs font-medium">
            {factsFetched && dummyFacts.filter((fact) => !fact.verdict).length}
          </h1>
        </div>

        {/* true red */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: `${
              factsFetched &&
              dummyFacts.filter((fact) => !fact.verdict).length * 100
            }%`,
          }}
          transition={{ duration: 1 }}
          className={` h-2 bg-red-500`}
        ></motion.div>
        {/* false green */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: `${
              factsFetched &&
              dummyFacts.filter((fact) => fact.verdict).length * 100
            }%`,
          }}
          transition={{ duration: 2 }}
          className={`
              h-2 bg-green-500
            `}
        ></motion.div>
      </div>
      {factsFetched &&
      dummyFacts.filter((fact) => fact.verdict).length >
        dummyFacts.filter((fact) => !fact.verdict).length ? (
        <h1 className="text-xl font-medium">The new is likely True</h1>
      ) : (
        <h1 className="text-xl font-medium">The new is likely False</h1>
      )}
    </div>
  );
}
