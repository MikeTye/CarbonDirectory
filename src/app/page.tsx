import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Discover from "@/components/Discover";
import CTAColumns from "@/components/CTAColumns";
import Signals from "@/components/Signals";
import Ecosystem from "@/components/Ecosystem";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="overflow-hidden">
        <Hero />
        <Discover />
        <CTAColumns />
        <Signals />
        <Ecosystem />
      </main>
      <Footer />
    </>
  );
}