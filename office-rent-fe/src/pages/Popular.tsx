import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BrowseOfficeWrapper from "../wrappers/BrowseOfficeWrapper";

export default function Popular() {
  return (
    <>
      <Navbar />
      <BrowseOfficeWrapper
        title={
          <>
            Discover the Most Popular
            <br></br>
            Offices for Your Needs!
          </>
        }
      />
      <Footer />
    </>
  );
}
