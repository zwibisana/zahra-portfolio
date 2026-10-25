import Nav from "./components/Nav.tsx";
import CursorDot from "./components/CursorDot.tsx";
import Hero from "./components/Hero.tsx";
import Intro from "./components/Intro.tsx";
import About from "./components/About.tsx";
import Work from "./components/Work.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main className="flex flex-col gap-4 md:gap-8">
        <Intro />
        <About />
        <Work />
      </main>
      <Footer />
      <CursorDot />
    </>
  );
}
