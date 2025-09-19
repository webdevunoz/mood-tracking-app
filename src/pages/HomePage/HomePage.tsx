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
  const [hasLoggedTodaysMood, setHasLoggedTodaysMood] = useState(false);
  const [moodData, setMoodData] = useState<MoodData[]>();
  const { getMoodData, error, loading } = useMoodData();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user?.name) setFirstName(user?.name.split(" ")[0]);
  }, [user?.name]);

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!loading && !error) {
        const data = (await getMoodData()) ?? [];
        setMoodData(data.moodData);
      }
    };
    if (user) {
      fetchMoodData();
    }
  }, [user]);

  useEffect(() => {
    const loggedMoodToday = (moodData: MoodData[]): boolean => {
      if (!Array.isArray(moodData) || moodData.length === 0) return false;

      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      const lastEntry = moodData[moodData.length - 1];
      const entryDate = new Date(lastEntry.moodTimestamp);

      return (
        entryDate.getFullYear() === todayYear &&
        entryDate.getMonth() === todayMonth &&
        entryDate.getDate() === todayDate
      );
    };

    if (!hasLoggedTodaysMood && moodData && moodData?.length > 0)
      setHasLoggedTodaysMood(loggedMoodToday(moodData));
  }, [moodData]);

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
          {!hasLoggedTodaysMood && (
            <PrimaryButton
              logButton={true}
              homeButton={true}
              onClick={() => setIsLogMoodOpen(true)}
            >
              Log today's mood
            </PrimaryButton>
          )}
          {hasLoggedTodaysMood && moodData && (
            <section id="section-mood-logged">
              <HomeCard variant="feeling">
                <LoggedFeeling todayData={moodData[moodData.length - 1]} />
              </HomeCard>
              <div id="sleep-reflection-container">
                <HomeCard variant="sleep">
                  <LoggedSleep todayData={moodData[moodData.length - 1]} />
                </HomeCard>
                <HomeCard variant="reflection">
                  <LoggedReflection todayData={moodData[moodData.length - 1]} />
                </HomeCard>
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
