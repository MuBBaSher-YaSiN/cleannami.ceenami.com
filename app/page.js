import Image from "next/image";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function Home() {
  return (
    <div>
      <Navbar />

      <h1 className='font-bold text-3xl text-center'>Book a Cleaning or Turnover with CleanNami</h1>
      <Main />
    </div>
  );
}
