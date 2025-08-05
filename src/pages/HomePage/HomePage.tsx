import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import TodaysDate from "../../components/Home/TodaysDate";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import HomeCard from "../../components/Home/HomeCard/HomeCard";
import AverageContent from "../../components/Home/AverageContent/AverageContent";
import TrendsGraph from "../../components/Home/TrendsGraph/TrendsGraph";
import type { logData } from "../../App";
import { useState } from "react";
import LogMoodForm from "../../components/Home/LogMood/LogMoodForm/LogMoodForm";

const dataLogs: logData[] = [
  {
    date: "March 31",
    hours: "5-6",
    mood: "Sad",
  },
  {
    date: "April 02",
    hours: "7-8",
    mood: "Happy",
  },
  {
    date: "April 04",
    hours: "3-4",
    mood: "Very Sad",
  },
  {
    date: "April 06",
    hours: "5-6",
    mood: "Neutral",
  },
  {
    date: "April 07",
    hours: "7-8",
    mood: "Happy",
  },
  {
    date: "April 09",
    hours: "9+",
    mood: "Very Happy",
  },
  {
    date: "April 10",
    hours: "3-4",
    mood: "Sad",
  },
  {
    date: "April 12",
    hours: "7-8",
    mood: "Neutral",
  },
  {
    date: "April 13",
    hours: "7-8",
    mood: "Happy",
  },
  {
    date: "April 14",
    hours: "3-4",
    mood: "Very Sad",
  },
  {
    date: "April 15",
    hours: "9+",
    mood: "Very Happy",
  },
];

const HomePage = () => {
  const [isLogMoodOpen, setIsLogMoodOpen] = useState(false);

  return (
    <>
      <div id="home-wrapper">
        <header id="home-header">
          <Navbar />
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
          <PrimaryButton
            logButton={true}
            homeButton={true}
            onClick={() => setIsLogMoodOpen(true)}
          >
            Log today's mood
          </PrimaryButton>
        </header>
        <main id="home-main">
          <section>
            <HomeCard variant="averages">
              <AverageContent variant="mood" dataLogs={dataLogs} />
              <AverageContent variant="sleep" dataLogs={dataLogs} />
            </HomeCard>
          </section>
          <section>
            <HomeCard variant="trends">
              <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
                Mood and sleep trends
              </h3>
              <TrendsGraph dataLogs={dataLogs} />
            </HomeCard>
          </section>
        </main>
      </div>
      {isLogMoodOpen && <LogMoodForm onClose={() => setIsLogMoodOpen(false)} />}
    </>
  );
};

export default HomePage;
