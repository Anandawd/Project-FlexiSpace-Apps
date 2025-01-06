import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfficeCard from "../components/OfficeCard";
import apiClient from "../services/apiService";
import { Office } from "../types/type";

export default function BrowseOfficeWrapper({ title }) {
  const [offices, setoffices] = useState<Office[]>([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get("/offices")
      .then((response) => {
        setoffices(response.data.data);
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
    <section
      id="Fresh-Space"
      className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px]"
    >
      <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-[30px]">
        {offices.map((office) => (
          <Link key={office.id} to={`/office/${office.slug}`}>
            <OfficeCard office={office} />
          </Link>
        ))}
      </div>
    </section>
  );
}
