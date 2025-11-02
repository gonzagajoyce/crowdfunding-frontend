import FundraiserCard from "../components/FundraiserCard";
import useFundraisers from "../hooks/use-fundraisers";
import "./HomePage.css";
import projectImage from "../assets/English-for-hope.png";


function HomePage() {
    const { fundraisers } = useFundraisers();
    console.log(fundraisers);

    return (
        <div className="home-container">
            <div className="home-text">
                <h1>ENGLISH FOR HOPE</h1>
                <p>
                    It is more than just a fundraiser, it’s a movement to spark dreams and transform futures! 
                    Through campaigns, we give children from underprivileged communities in Brazil the chance to learn English, a skill that opens doors to brighter opportunities, global connections, and the confidence to dream bigger. 
                    Every donation is a step toward change, and donors can directly see the impact of their contributions, becoming part of an inspiring journey of growth and hope.!
                </p>
            </div>

            <div className="home-image">
                <img src={projectImage} alt="Projeto" />
            </div>

            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                })}
            </div>
        </div>
            );
}

            export default HomePage;