import React from "react";
import Image from "next/image";
import space_x from "../../public/space_x.jpeg";
import logo_white from "../../public/logo_white.svg";
import Link from "next/link";

function Hero() {
  return (
    <div className="h-[100dvh] w-full min-h-[830px] relative ">
      <Image
        src={space_x}
        alt="image of Rocket at Space X station"
        className="object-cover"
        fill
      />
      <div className="absolute h-[100dvh] w-full min-h-[830px] ">
        <div className="h-20 w-full flex flex-row justify-between items-center py-5 px-16">
          <div className="relative h-full w-[324px]">
            <Image src={logo_white} alt="logo of space X" fill />
          </div>
          <div className="gap-[44px] font-medium text-lg text-white flex flex-row justify-between ">
            <Link href="https://spacex.com">About</Link>
            <Link href="https://spacex.com">Rockets</Link>
            <Link href="https://spacex.com">Launch Pads</Link>
            <Link href="https://spacex.com">Capsules</Link>
          </div>
        </div>
        <div className="container absolute inset-0 h-full items-center  text-white grid grid-cols-2  ">
          <div> </div>
          <div className="flex flex-col justify-between gap-12">
            <span className="text-6xl font-bold w-[412px] flex tracking-[2.88px] ">
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
