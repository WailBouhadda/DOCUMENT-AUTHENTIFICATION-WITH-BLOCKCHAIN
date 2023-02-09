import React from "react";
import image from "./assets/bg3-transformed-removebg-preview.png";
import NavBar from "./Navbar/Navbar";

const Main = () => {
  return (
    <>
        <NavBar />
      <section className="relative w-full h-[600px] flex flex-row justify-center items-start">
        {/* <div class="absolute  top-[8rem] -left-0 w-80 h-80 bg-[#9b5de5]  rounded-full mix-blend-multiply filter blur-xl  animate-blob"></div> */}
        <div class="absolute  top-[6rem] left-[15rem] w-[200px] h-[200px] bg-[#fee440] rounded-full mix-blend-multiply filter blur-xl  animate-blob animation-delay-2000"></div>
        <div class="absolute  top-20 left-20 w-72 h-72 bg-[#00bbf9]  rounded-full rounded-tr-3xd mix-blend-multiply filter blur-xl  animate-blob animation-delay-4000"></div>
        {/* left */}
        <div className="w-1/2 h-full flex-grow-0 flex flex-col justify-center items-start ml-3">
          <div className="h-[350px] px-4 pr-[30px] bg-gradient-to-b from-white/60 to-white/30 text-[#1c0708] backdrop-blur-[.5em] border-[1px] border-solid border-white border-opacity-10 rounded-2xl overflow-hidden shadow-xl  hover:backdrop-blur-[1em] transition">
            <div class="">
              <h1 class="text-5xl py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-400">
                Diploma Verification with Blockchain Technology
              </h1>
              <p className="text-lg text-slate-900 font-semibold capitalize mt-3">
                Verify your diploma with blockchain for a secure and efficient
                process. Benefit from a tamper-proof decentralized ledger,
                increased security, accurate information, and instant access to
                your credentials
              </p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 h-full flex-grow-0 flex flex-col justify-center items-center">
          <img src={image} className="animate-img" />
        </div>
      </section>
    </>
  );
};

export default Main;
