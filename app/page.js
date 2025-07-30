import Image from "next/image";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function Home() {
  return (
    <div>
      <Navbar />

      <h1 className='font-bold text-xl md:text-2xl lg:text-3xl text-center mt-32'>Book a Cleaning or Turnover with <span style={{ fontFamily: 'Arkhip' }}> CleanNami</span></h1>
      <Main />
    </div>
  );
}
