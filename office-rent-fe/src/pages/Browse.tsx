import BrowseBenefit from "../components/BrowseBenefit";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import BrowseCityWrapper from "../wrappers/BrowseCityWrapper";
import BrowseOfficeWrapper from "../wrappers/BrowseOfficeWrapper";

export default function Browse() {
  return (
    <>
      <Navbar />
      <Hero />
      <BrowseCityWrapper
        title={
          <>
            You Can Choose <br />
            Our Favorite Cities
          </>
        }
      />
      <BrowseBenefit />
      <BrowseOfficeWrapper
        title={
          <>
            Browse Our Fresh Space.
            <br />
            For Your Better Productivity.
          </>
        }
      />
      <Footer />
    </>
  );
}
