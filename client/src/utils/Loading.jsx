import React, { useEffect, useState } from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[100vh] min-w-[100vw] justify-center flex-col items-center gap-10 ">
      <span className="loading loading-infinity loading-lg scale-[2] "></span>
      <div className="w-full p-10 flex flex-col items-center flex-wrap">
        <h1 className="text-lg ">
          To conserve energy and cut costs, we put our servers to sleep after 1
          hour of inactivity.
        </h1>
        <h1 className="text-2xl">
          Please wait while we spin up our servers for you within
          <TimerComponent />
        </h1>
      </div>
    </div>
  );
};

function TimerComponent() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(60);
    }
  }, [seconds]);

  return (
    <>
      <span>
        <b>{" " + seconds + " "}</b>
        seconds.
      </span>
    </>
  );
}

export default Loading;
