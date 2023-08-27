"use client";
import React, { useState } from "react";
import Image from "next/image";
import space_x from "../../public/space_x.jpeg";
import logo_white from "../../public/logo_white.svg";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function Hero() {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <div className="h-[100dvh] w-full min-h-[830px] relative ">
      <div className="w-full h-full absolute bg-black sm:opacity-10  opacity-50 inset-0 z-10"></div>
      <Image
        src={space_x}
        alt="image of Rocket at Space X station"
        className="object-cover"
        fill
      />
      <div className="absolute h-[100dvh] w-full min-h-[830px] z-20 ">
        <div className="h-20 w-full flex flex-row justify-between items-center py-5 px-16">
          <div className="relative h-full lg:w-[324px] w-[230px]">
            <Image src={logo_white} alt="logo of space X" fill />
          </div>
          <div className="lg:gap-[44px] md:gap-[80px] font-medium text-lg text-white lg:flex hidden flex-row justify-between ">
            <Link href="https://spacex.com">About</Link>
            <Link href="https://spacex.com">Rockets</Link>
            <Link href="https://spacex.com">Launch Pads</Link>
            <Link href="https://spacex.com">Capsules</Link>
          </div>
          <div className="z-30 fixed lg:hidden p-2 bg-spaceblue text-white rounded-md text-3xl md:text-5xl top-4 right-4">
            {" "}
            <BiMenu onClick={toggleNav} />{" "}
          </div>
          <div
            className={`w-full h-full fixed top-0 left-0 bg-spaceblue z-30 transform transition-all ease-in-out duration-300 lg:hidden ${
              showNav ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-center items-center h-full">
              <span className="absolute  top-0 right-0 text-3xl p-4">
                <FaTimes onClick={() => setShowNav(false)} />{" "}
              </span>
              <div className="flex flex-col justify-center items-center text-white gap-8 text-2xl">
                <Link href="https://spacex.com">About</Link>
                <Link href="https://spacex.com">Rockets</Link>
                <Link href="https://spacex.com">Launch Pads</Link>
                <Link href="https://spacex.com">Capsules</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container absolute inset-0 h-full sm:items-center items-end pb-56 sm:pb-0  text-white grid sm:grid-cols-2  ">
          <div className="hidden sm:flex"> </div>
          <div className="flex flex-col justify-between gap-12">
            <span className="text-6xl font-bold lg:w-[412px] flex tracking-[2.88px] ">
              {" "}
              We found &apos;x&apos; It&apos;s in Space
            </span>
            <span className="leading-[125%] text-3xl max-w-[500px] flex ">
              Explore the stars and all her beauty. Join spaceX in learning more
              of our world
            </span>
            <span>
              <Link
                className="bg-spaceblue rounded-2xl py-4 px-12 hover:bg-white hover:text-spaceblue"
                href="https://www.spacex.com/"
              >
                Learn More
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
