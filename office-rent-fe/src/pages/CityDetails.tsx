import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OfficeCard from "../components/OfficeCard";
import apiClient, { baseStorageUrl } from "../services/apiService";
import { City } from "../types/type";

export default function CityDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [city, setcity] = useState<City | null>(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(`/city/${slug}`)
      .then((response) => {
        setcity(response.data.data);
        setloading(false);
      })
      .catch((error) => {
        seterror(error);
        setloading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  const baseUrl = baseStorageUrl;

  return (
    <>
      <Navbar />
      <header className="flex flex-col w-full">
        <section id="Hero-Banner" className="relative flex h-[434px]">
          <div
            id="Hero-Text"
            className="relative flex flex-col w-full max-w-[650px] h-fit rounded-[30px] border border-[#E0DEF7] p-10 gap-[30px] bg-white mt-[70px] ml-[calc((100%-1130px)/2)] z-10"
          >
            <h1 className="font-extrabold text-[50px] leading-[60px]">
              Great Office in <br />{" "}
              <span className="text-[#4E91FC]">{city?.name} City</span>
            </h1>
            <p className="text-lg leading-8 text-[#FFBD14]">
              Kantor yang tepat dapat memberikan impact pekerjaan menjadi lebih
              baik dan sehat dalam tumbuhkan karir.
            </p>
          </div>
          <div
            id="Hero-Image"
            className="absolute right-0 w-[calc(100%-((100%-1130px)/2)-305px)] h-[434px] rounded-bl-[40px] overflow-hidden"
          >
            <img
              src={`${baseUrl}/${city?.photo}`}
              className="w-full h-full object-cover"
              alt="hero background"
            />
          </div>
        </section>
      </header>
      <section
        id="Fresh-Space"
        className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[70px] mb-[120px]"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap">
          Browse Offices
        </h2>
        <div className="grid grid-cols-3 gap-[30px]">
          {city?.officeSpaces.map((office) => (
            <Link key={office.id} to={`/office/${office.slug}`}>
              <OfficeCard office={office} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
