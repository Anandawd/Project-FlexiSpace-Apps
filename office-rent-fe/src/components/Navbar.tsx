import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between w-full max-w-[1130px] py-[22px] mx-auto">
        <Link to={`/`}>
          <img src="/assets/images/logos/logo.svg" alt="logo" />
        </Link>

        <ul className="flex items-center gap-[50px] w-fit">
          <Link to={`/`}>Browse</Link>
          <Link to={`/popular`}>Popular</Link>
          <Link to={`/cities`}>Cities</Link>
          <Link to={`/check-booking`}>My Booking</Link>
        </ul>
        <a
          href="#"
          className="flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5"
        >
          <img
            src="/assets/images/icons/call.svg"
            className="w-6 h-6"
            alt="icon"
          />
          <span className="font-semibold">Contact Us</span>
        </a>
      </div>
    </nav>
  );
}
