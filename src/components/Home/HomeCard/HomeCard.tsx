import "./HomeCard.css";

interface HomeCardProps {
  variant: string;
  children: React.ReactNode;
}

const HomeCard = ({ variant, children }: HomeCardProps) => {
  const paddingAndGap = {
    averages: "card--averages",
    trends: "card--trends",
    feeling: "card--feeling",
    sleep: "card--sleep",
    reflection: "card--reflection",
  }[variant];
  return <div className={`home-card ${paddingAndGap}`}>{children}</div>;
};

export default HomeCard;
