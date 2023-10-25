import { HomeDisplay, BestSeller, Carousel } from "../../component";

const HomePage = () => {
  return (
    <div className="page">
      <Carousel />
      <HomeDisplay />
      <BestSeller />
    </div>
  );
};
export default HomePage;
