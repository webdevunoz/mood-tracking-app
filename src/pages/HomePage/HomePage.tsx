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
import LoggedFeeling from "../../components/Home/LoggedFeeling/LoggedFeeling";
import LoggedSleep from "../../components/Home/LoggedSleep/LoggedSleep";
import LoggedReflection from "../../components/Home/LoggedReflection/LoggedReflection";

const dataLogs: logData[] = [
  {
    date: "March 31",
    mood: "Sad",
    hours: "5-6",
    reflection: "Did not sleep well and was drowsy.",
    tags: ["Down", "Lonely", "Tired"],
  },
  {
    date: "April 02",
    mood: "Happy",
    hours: "7-8",
    reflection: "Had a productive day coding",
    tags: ["Excited", "Hopeful"],
  },
  {
    date: "April 04",
    hours: "3-4",
    mood: "Very Sad",
    reflection: "Woke up on the wrong side of the bed.",
    tags: ["Irritable", "Tired", "Disappointed"],
  },
  {
    date: "April 06",
    mood: "Neutral",
    hours: "5-6",
    reflection: "Neither felt good nor bad the whole day.",
    tags: ["Calm", "Content"],
  },
  {
    date: "April 07",
    mood: "Happy",
    hours: "7-8",
    reflection: "Enjoyed getting things done.",
    tags: ["Hopeful", "Grateful", "Content"],
  },
  {
    date: "April 09",
    mood: "Very Happy",
    hours: "9+",
    reflection: "Slept well and woke up ready to tackle new challenges.",
    tags: ["Joyful", "Excited", "Grateful"],
  },
  {
    date: "April 10",
    mood: "Sad",
    hours: "3-4",
    reflection: "Not in a good mood today, had trouble focusing.",
    tags: ["Frustrated", "Restless", "Overwhelmed"],
  },
  {
    date: "April 12",
    mood: "Neutral",
    hours: "7-8",
    reflection: "Was able to get chores and work done.",
    tags: ["Content", "Optimistic", "Peaceful"],
  },
  {
    date: "April 13",
    mood: "Happy",
    hours: "7-8",
    reflection: "Slept well, got alot done, but tired.",
    tags: ["Optimistic", "Hopeful", "Tired"],
  },
  {
    date: "April 14",
    mood: "Very Sad",
    hours: "3-4",
    reflection: "Did not feel well today, had alot of project anxiety.",
    tags: ["Anxious", "Stressed", "Restless"],
  },
  {
    date: "April 15",
    mood: "Very Happy",
    hours: "9+",
    reflection: "Woke up early and finally tackled a big project!",
    tags: ["Grateful", "Optimistic"],
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
          <section id="section-mood-logged">
            <HomeCard variant="feeling">
              <LoggedFeeling />
            </HomeCard>
            <div id="sleep-reflection-container">
              <HomeCard variant="sleep">
                <LoggedSleep />
              </HomeCard>
              <HomeCard variant="reflection">
                <LoggedReflection />
              </HomeCard>
            </div>
          </section>
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
