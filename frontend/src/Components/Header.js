import "../CSS/home-content.css";
import "../CSS/Header.css";
import MainNavbar from "./Main-Navbar";
import { Carousel } from "./carousel";

export default function HeaderSection() {
  return (
    <header className="header-styles">
      <MainNavbar />
      <section className="lp-header-container">
        <h1 className="lp-text">
          <div className="lp-text-primary">Find your</div> <span>Doctor!</span>
        </h1>
        <input
          type="text"
          className="lp-searchbox"
          placeholder="Search your doctor!"
        />
        <div className="lp-popular-lists">
          <h1>
            Here some popular <span>Quotes</span> below.
          </h1>
          {/* CARD ANIMATION */}
          <Carousel />
          {/* CARD ANIMATION - END */}
        </div>
      </section>
    </header>
  );
}
