import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import apiClient, {
  baseStorageUrl,
  isAxiosError,
} from "../services/apiService";
import { Office } from "../types/type";
import { bookingSchema } from "../types/validationBooking";

export default function BookOffice() {
  const { slug } = useParams<{ slug: string }>();

  const [office, setoffice] = useState<Office | null>(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<string | null>(null);

  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    phone_number: "",
    started_at: "",
    office_space_id: "",
    totalAmountWithUniqueCode: 0,
  });

  const [formErrors, setformErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const [uniqueCode, setuniqueCode] = useState<number>(0);
  const [totalAmountWithUniqueCode, settotalAmountWithUniqueCode] =
    useState<number>(0);

  useEffect(() => {
    apiClient
      .get(`/office/${slug}`)
      .then((response) => {
        setoffice(response.data.data);

        const officeSpaceId = response.data.data.id;
        const generateUniqueCode = Math.floor(100 + Math.random() * 900);
        const grandTotal = response.data.data.price - generateUniqueCode;

        setuniqueCode(generateUniqueCode);
        settotalAmountWithUniqueCode(grandTotal);

        setformData((prevData) => ({
          ...prevData,
          office_space_id: officeSpaceId,
          total_amount: grandTotal,
        }));

        setloading(false);
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          seterror(error.message);
        } else {
          seterror("Terjadi kesalahan yang tidak diketahui");
        }
        setloading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!office) {
    return <p>Data not found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Validation form data...");
    const validation = bookingSchema.safeParse(formData);

    if (!validation.success) {
      console.log("Validation errors: ", validation.error.issues);
      setformErrors(validation.error.issues);
      return;
    }

    console.log("Form data is valid. Submitting...", formData);
    setisLoading(true);

    try {
      const response = await apiClient.post("/booking-transaction", {
        ...formData,
      });

      console.log("Form submitted successfully: ", response.data);

      navigate("/success-booking", {
        state: {
          office,
          booking: response.data.data,
        },
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        seterror(error.message);
      } else {
        seterror("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setisLoading(false);
    }
  };

  const baseUrl = baseStorageUrl;

  return (
    <>
      <Navbar />
      <div
        id="Banner"
        className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]"
      >
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">
          Start Booking Your Office
        </h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img
          src="/assets/images/thumbnails/thumbnail-details-4.png"
          className="absolute w-full h-full object-cover object-top"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20"
      >
        <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <img
                src={`${baseUrl}/${office?.thumbnail}`}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">{office?.name}</p>
              <div className="flex items-center gap-[6px]">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold">{office?.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Complete The Details</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Full Name
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#4E91FC]">
                <img
                  src="/assets/images/icons/security-user-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  id="name"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your complete name"
                />
                {formErrors.find((error) => error.path.includes("name")) && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold">
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#4E91FC]">
                <img
                  src="/assets/images/icons/call-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="tel"
                  onChange={handleChange}
                  name="phone_number"
                  value={formData.phone_number}
                  id="phone_number"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your valid number"
                />
                {formErrors.find((error) =>
                  error.path.includes("phone_number")
                ) && <p className="text-red-500">phone_number is required</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-semibold">
                Started At
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#4E91FC] overflow-hidden">
                <img
                  src="/assets/images/icons/calendar-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="date"
                  onChange={handleChange}
                  name="started_at"
                  value={formData.started_at}
                  id="date"
                  className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                {formErrors.find((error) =>
                  error.path.includes("started_at")
                ) && <p className="text-red-500">started_at is required</p>}
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/icons/shield-tick.svg"
              className="w-[30px] h-[30px]"
              alt="icon"
            />
            <p className="font-semibold leading-[28px]">
              Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat
              fokus bekerja
            </p>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-bold">Bonus Packages For You</h2>
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/icons/coffee.svg"
                  className="w-[34px] h-[34px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">
                    Extra Snacks
                  </p>
                  <p className="text-sm leading-[21px]">Work-Life Balance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/icons/group.svg"
                  className="w-[34px] h-[34px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">Free Move</p>
                  <p className="text-sm leading-[21px]">Anytime 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <h2 className="font-bold">Your Order Details</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Duration</p>
              <p className="font-bold">{office?.duration} Days Working</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Sub Total</p>
              <p className="font-bold">
                Rp {office?.price.toLocaleString("id")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Unique Code</p>
              <p className="font-bold text-[#FF2D2D]">
                -Rp {uniqueCode.toLocaleString("id")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[22px] leading-[33px] text-[#4E91FC]">
                Rp{" "}
                {totalAmountWithUniqueCode.toLocaleString("id", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white">
              <img
                src="/assets/images/icons/Polygon 1.svg"
                className="absolute -top-[15px] right-[10px] "
                alt=""
              />
              <p className="font-semibold text-sm leading-[24px] z-10">
                Tolong perhatikan kode unik berikut ketika melakukan pembayaran
                kantor
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">Send Payment to</h2>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/bca.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">FlexiSpace Nanda</p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>8008129839</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/mandiri.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">FlexiSpace Nanda</p>
                  <img
                    src="/assets/images/icons/verify.svg"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>12379834983281</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#4E91FC] font-bold text-[#F7F7FD]"
          >
            <span>{isLoading ? "Loading..." : "I’ve Made The Payment"}</span>
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}
