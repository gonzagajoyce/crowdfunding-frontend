import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/useFundraiser-id";
import { useAuth } from "../hooks/use-auth";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);
    const { auth } = useAuth();

    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: "",
    });

    
    useEffect(() => {
        if (fundraiser) {
            setEditData({
                title: fundraiser.title,
                description: fundraiser.description,
                goal: fundraiser.goal,
                image: fundraiser.image || "",
            });
        }
    }, [fundraiser]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (!fundraiser) return <p>Fundraiser not found.</p>;

    // --- HANDLE PLEDGE ---
    const handlePledgeSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/pledges/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${auth?.token}`,
                },
                body: JSON.stringify({
                    amount: Number(amount),
                    fundraiser: fundraiser.id,
                    anonymous: isAnonymous,
                    comment,
                }),
            });
            if (!res.ok) throw new Error("Failed to create pledge");
            const newPledge = await res.json();
            
            fundraiser.pledges = [...(fundraiser.pledges || []), newPledge];
            setAmount("");
            setComment("");
            setIsAnonymous(false);
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // --- HANDLE UPDATE ---
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${fundraiser.id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${auth.token}`,
                },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error("Failed to update fundraiser");
            const updated = await res.json();
            // Atualiza localmente
            fundraiser.title = updated.title;
            fundraiser.description = updated.description;
            fundraiser.goal = updated.goal;
            fundraiser.image = updated.image;
            setIsEditing(false);
        } catch (err) {
            alert(err.message);
        }
    };

    // --- HANDLE DELETE ---
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this fundraiser?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${fundraiser.id}/`, {
                method: "DELETE",
                headers: { "Authorization": `Token ${auth.token}` },
            });
            if (!res.ok) throw new Error("Failed to delete fundraiser");
            alert("Fundraiser deleted!");
            window.location.href = "/";
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>{fundraiser.title}</h2>
            <h3>Created at: {fundraiser.date_created}</h3>
            <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>
            {fundraiser.image && <img src={fundraiser.image} alt={fundraiser.title} width="300" />}
            <h3>Description:</h3>
            <p>{fundraiser.description}</p>
            <h3>Goal: ${fundraiser.goal}</h3>

            {/* BOTÕES EDIT / DELETE */}
            <div>
                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                <button onClick={handleDelete} style={{ color: "red" }}>Delete</button>
            </div>

            {/* FORM EDIT */}
            {isEditing && (
                <form onSubmit={handleUpdate} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
                    <input
                        name="title"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        required
                    />
                    <textarea
                        name="description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        name="goal"
                        value={editData.goal}
                        onChange={(e) => setEditData({ ...editData, goal: Number(e.target.value) })}
                        required
                    />
                    <input
                        name="image"
                        value={editData.image}
                        onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            {/* PLEDGES */}
            <h3>Pledges:</h3>
            {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
                <ul>
                    {fundraiser.pledges.map((pledge, index) => (
                        <li key={index}>
                            ${pledge.amount}
                            {pledge.anonymous ? " (Anonymous)" : ""}
                            {pledge.comment ? ` - "${pledge.comment}"` : ""}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pledges yet. Be the first to pledge!</p>
            )}

            {/* FORM PLEDGE */}
            <h3>Make a Pledge</h3>
            <form onSubmit={handlePledgeSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "300px" }}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Comment (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                    /> Pledge anonymously
                </label>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Pledge"}
                </button>
            </form>
        </div>
    );
}

export default FundraiserPage;
