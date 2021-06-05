import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function Stepper({ step }) {
  return (
    <div className="flex">
      {step === 0 ? (
        <Step label="confirmed" />
      ) : (
        <Step label="confirmed" isCompleted />
      )}
      {step <= 1 ? (
        <>
          {" "}
          <Line /> <Step label="out for delivery" />{" "}
        </>
      ) : (
        <>
          {" "}
          <ActiveLine /> <Step label="out for delivery" isCompleted />{" "}
        </>
      )}
      {step <= 2 ? (
        <>
          {" "}
          <Line /> <Step label="delivered" />{" "}
        </>
      ) : (
        <>
          {" "}
          <ActiveLine /> <Step label="delivered" isCompleted />{" "}
        </>
      )}
    </div>
  );
}

const Step = ({ label, isCompleted }) => {
  return (
    <div className="flex flex-col items-center">
      {isCompleted ? <Completed /> : <Left />}
      <span className="mt-3 w-20 text-center text-gray-400 font-bold text-lg leading-5">
        {label}
      </span>
    </div>
  );
};

const Completed = () => {
  return <CheckCircleIcon className="h-20 text-green-500" />;
};

const Active = () => {
  return (
    <div className="m-2 h-16 w-16 border-8 rounded-full border-green-500 flex justify-center items-center">
      <div className="h-5 w-5 rounded-full bg-green-500"></div>
    </div>
  );
};

const Left = () => {
  return (
    <div className="m-2 h-16 w-16 border-8 rounded-full border-gray-400 flex justify-center items-center"></div>
  );
};

const ActiveLine = () => {
  return (
    <div className="md:w-36 w-16 mt-9 h-3 rounded-full bg-green-500"></div>
  );
};

const Line = () => {
  return <div className="md:w-36 w-16 mt-9 h-3 rounded-full bg-gray-400"></div>;
};
