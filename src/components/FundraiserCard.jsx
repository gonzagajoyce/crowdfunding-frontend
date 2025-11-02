import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard({ fundraiserData }) {
    const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
                {fundraiserData.image && (
                    <img
                        src={fundraiserData.image}
                        alt={fundraiserData.title}
                        className="fundraiser-image"
                    />
                )}
                <h3>{fundraiserData.title}</h3>
            </Link>
        </div>
    );
}

export default FundraiserCard;

