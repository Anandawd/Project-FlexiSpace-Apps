import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white w-full">
      <div className="max-w-[1130px] mx-auto">
        <div className="grid grid-cols-2 gap-10 py-10">
          {/* About Us */}
          <div className="">
            <img
              className="mb-5 w-[60px]"
              src="/assets/images/logos/logo-2.svg"
              alt="logo"
            />
            <h4 className="text-xl font-bold mb-5">Flexi Space</h4>
            <p className="w-[392px] text-sm leading-[24px] text-gray-300 mt-[10px] ">
              We are a trusted platform connecting you with the best office
              spaces across various cities. Find your ideal workspace with ease.
            </p>
          </div>
          <div className="grid grid-cols-2">
            {/* Quick Links */}
            <div className="ml-">
              <h4 className="text-lg font-bold mb-5">Quick Links</h4>
              <ul className="flex flex-col gap-5 text-sm leading-[24px] text-gray-300">
                <li>
                  <Link to="/" className="hover:text-white">
                    Browse Offices
                  </Link>
                </li>
                <li>
                  <Link to="/popular" className="hover:text-white">
                    Popular Offices
                  </Link>
                </li>
                <li>
                  <Link to="/cities" className="hover:text-white">
                    Explore Cities
                  </Link>
                </li>
                <li>
                  <Link to="/my-booking" className="hover:text-white">
                    My Booking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-bold mb-5">Contact Us</h4>
              <ul className="flex flex-col gap-5 text-sm leading-[24px] text-gray-300">
                <li>Email: support@officerent.com</li>
                <li>Phone: +62 812-3456-7890</li>
                <li>Jl. Sudirman No.45, Jakarta, Indonesia</li>
                <li>Mon-Fri, 09:00 - 17:00 WIB</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full p-10 flex flex-row justify-center items-center text-sm ">
          <p className="text-gray-300">
            © 2025 Flexi Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
