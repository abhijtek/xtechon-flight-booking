import Navbar from "../components/Navbar";
import BookingBox from "../components/BookingBox";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[75vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Text */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
          <h2 className="text-white text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            The best flight offers from anywhere,
            <br />
            to everywhere
          </h2>

          {/* Booking Box */}
          <div className="mt-12">
            <BookingBox />
          </div>
        </div>
      </div>
    </div>
  );
}
