import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CityCard from "../components/CityCard";
import apiClient from "../services/apiService";
import { City } from "../types/type";

export default function BrowseCityWrapper({ title }) {
  const [cities, setcities] = useState<City[]>([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get("/cities")
      .then((response) => {
        setcities(response.data.data);
        setloading(false);
      })
      .catch((error) => {
        seterror(error);
        setloading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <section id="Cities" className="flex flex-col gap-[30px] mt-[100px]">
      <div className="w-full max-w-[1130px] mx-auto flex items-center justify-between">
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap">
          {title}
        </h2>
        <a
          href="#"
          className="rounded-full rounded-full py-3 px-5 bg-white font-bold"
        >
          Explore All City
        </a>
      </div>
      <div className="swiper w-full">
        <div className="swiper-wrapper">
          <Swiper
            direction="horizontal"
            spaceBetween={30}
            slidesPerView="auto"
            slidesOffsetAfter={30}
            slidesOffsetBefore={30}
          >
            {cities.map((city) => (
              <SwiperSlide
                key={city.id}
                className="!w-fit first-of-type:pl-[calc((100%-1130px-60px)/2)] last-of-type:pr-[calc((100%-1130px-60px)/2)]"
              >
                <Link to={`/city/${city.slug}`}>
                  <CityCard city={city} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
