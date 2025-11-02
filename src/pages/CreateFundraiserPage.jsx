import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

function CreateFundraiserPage() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${auth?.token || ""}`
                },
                body: JSON.stringify({
                    ...formData,
                    goal: Number(formData.goal)
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || "Failed to create fundraiser");
            }

            const newFundraiser = await res.json();
            alert("🎉 Fundraiser created successfully!");

            // Redireciona para a página do fundraiser recém-criado
            navigate(`/fundraisers/${newFundraiser.id}`);
        } catch (err) {
            alert(err.message);
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Create a New Fundraiser</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    name="goal"
                    type="number"
                    placeholder="Goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                />
                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        name="is_open"
                        checked={formData.is_open}
                        onChange={handleChange}
                    /> Open
                </label>
                <button type="submit">Create Fundraiser</button>
            </form>
        </div>
    );
}

export default CreateFundraiserPage;
