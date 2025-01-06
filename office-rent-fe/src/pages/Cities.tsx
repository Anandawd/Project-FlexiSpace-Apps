import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BrowseCityWrapper from "../wrappers/BrowseCityWrapper";

export default function Cities() {
  return (
    <>
      <Navbar />
      <section
        id="Fresh-Space"
        className="flex flex-col w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px]"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center">
          Explore the Best Cities for Your
          <br></br>
          Perfect Workspace!
        </h2>
        <div>
          <BrowseCityWrapper title={"Trending Cities"} />
          <BrowseCityWrapper title={"Budget-Friendly Cities"} />
          <BrowseCityWrapper title={"Premium Cities"} />
          <BrowseCityWrapper title={"Hidden Gems"} />
          <BrowseCityWrapper title={"Cities for Startup"} />
          <BrowseCityWrapper title={"Most Reviewed Cities"} />
          <BrowseCityWrapper title={"Cities with Best Views"} />
        </div>
      </section>
      <Footer />
    </>
  );
}
