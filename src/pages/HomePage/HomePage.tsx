import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import TodaysDate from "../../components/Home/TodaysDate";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import HomeCard from "../../components/Home/HomeCard/HomeCard";
import AverageContent from "../../components/Home/AverageContent/AverageContent";
import TrendsGraph from "../../components/Home/TrendsGraph/TrendsGraph";
import { useEffect, useState } from "react";
import LogMoodForm from "../../components/Home/LogMood/LogMoodForm/LogMoodForm";
import LoggedFeeling from "../../components/Home/LoggedFeeling/LoggedFeeling";
import LoggedSleep from "../../components/Home/LoggedSleep/LoggedSleep";
import LoggedReflection from "../../components/Home/LoggedReflection/LoggedReflection";
import { useAuth } from "../../context/AuthContext";
import { useMoodData, type MoodData } from "../../CustomHooks/useMoodData";

const HomePage = () => {
  const [isLogMoodOpen, setIsLogMoodOpen] = useState(false);
  const [loggedTodaysMood, setLoggedTodaysMood] = useState(false);
  const [moodData, setMoodData] = useState<MoodData[]>();
  const { getMoodData, error, loading } = useMoodData();
  const { user, authReady } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user?.name) setFirstName(user?.name.split(" ")[0]);
  }, [user?.name]);

  useEffect(() => {
    const fetchMoodData = async () => {
      console.log(loading, error);
      if (!loading && !error) {
        const data = (await getMoodData()) ?? [];
        setMoodData(data.moodData);
      }
    };
    if (user && authReady && user._id) fetchMoodData();
  }, [user, authReady]);

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
              Hello, {firstName}!
            </h3>
            <h1 className="text-preset-1-mobile md:text-preset-1 text-neutral-900">
              How are you feeling today?
            </h1>
            <TodaysDate />
          </section>
          {!loggedTodaysMood && (
            <PrimaryButton
              logButton={true}
              homeButton={true}
              onClick={() => setIsLogMoodOpen(true)}
            >
              Log today's mood
            </PrimaryButton>
          )}
          {loggedTodaysMood && (
            <section id="section-mood-logged">
              {/* <HomeCard variant="feeling">
                <LoggedFeeling data={moodData.mood} />
              </HomeCard> */}
              <div id="sleep-reflection-container">
                {/* <HomeCard variant="sleep">
                  <LoggedSleep data={loggedTodayData} />
                </HomeCard>
                <HomeCard variant="reflection">
                  <LoggedReflection data={loggedTodayData} />
                </HomeCard> */}
              </div>
            </section>
          )}
        </header>
        <main id="home-main">
          <section>
            <HomeCard variant="averages">
              <AverageContent variant="mood" moodData={moodData} />
              <AverageContent variant="sleep" moodData={moodData} />
            </HomeCard>
          </section>
          <section>
            <HomeCard variant="trends">
              <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
                Mood and sleep trends
              </h3>
              <TrendsGraph moodData={moodData} />
            </HomeCard>
          </section>
        </main>
      </div>
      {isLogMoodOpen && <LogMoodForm onClose={() => setIsLogMoodOpen(false)} />}
    </>
  );
};

export default HomePage;
