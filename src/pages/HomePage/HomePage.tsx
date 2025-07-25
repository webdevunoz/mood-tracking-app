import "./HomePage.css";
import NavbarComponent from "../../components/Navbar/Navbar";
import TodaysDate from "../../components/Home/TodaysDate";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import HomeCard from "../../components/Home/HomeCard/HomeCard";
import AverageContent from "../../components/Home/AverageContent/AverageContent";

const HomePage = () => {
  return (
    <div id="home-wrapper">
      <header id="home-header">
        <NavbarComponent />
        <section id="home-heading">
          <h3
            id="heading-greet"
            className="text-preset-3-mobile md:text-preset-3 text-blue-600"
          >
            Hello, Lisa!
          </h3>
          <h1 className="text-preset-1-mobile md:text-preset-1 text-neutral-900">
            How are you feeling today?
          </h1>
          <TodaysDate />
        </section>
        <PrimaryButton homeButton={true} onClick={() => null}>
          Log today's mood
        </PrimaryButton>
      </header>
      <main>
        <section>
          <HomeCard variant="averages">
            <AverageContent variant="mood" />
            <AverageContent variant="sleep" />
          </HomeCard>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
