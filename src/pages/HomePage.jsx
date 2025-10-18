import FundraiserCard from "../components/FundraiserCard";  
import useFundraisers from "../hooks/use-fundraisers";
import "./HomePage.css";


function HomePage() {
    const { fundraisers } = useFundraisers();
    console.log(fundraisers);

    return (
        <div id="fundraiser-list">
            {fundraisers.map((fundraiserData, key) => {
                return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
            })}
        </div>      
        );
}

export default HomePage;