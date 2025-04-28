import { useState } from "react";
import api from "../api"; // ✅ Using global API instance
import "../styles/WeddingCardGenerator.css"; // External CSS

const WeddingCardGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateImage = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt for the wedding card.");
            return;
        }

        setLoading(true);
        setImage(null); // Clear previous image
        setError("");

        try {
            const response = await api.post("/api/images/generate", { prompt }); // ✅ Updated endpoint
            if (response.data.image) {
                setImage(response.data.image);
            } else {
                throw new Error("Invalid image response from server");
            }
        } catch (err) {
            console.error("Error generating image:", err);
            setError("Failed to generate the wedding card. Please try again.");
        }

        setLoading(false);
    };

    const downloadImage = () => {
        if (!image) return;
        const link = document.createElement("a");
        link.href = image;
        link.download = "wedding_card.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="wedding-card-container">
            <h2>Create Your Wedding Card</h2>
            <input
                type="text"
                className="prompt-input"
                placeholder="Describe your wedding card..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="generate-btn" onClick={generateImage} disabled={loading}>
                {loading ? "Generating..." : "Generate Wedding Card"}
            </button>

            {loading && <p className="loading-text">Generating... Please wait.</p>}

            {error && <p className="error-text">{error}</p>}

            {image && (
                <div className="image-container">
                    <img src={image} alt="Wedding Card" className="generated-image" />
                    <button className="download-btn" onClick={downloadImage}>Download</button>
                </div>
            )}
        </div>
    );
};

export default WeddingCardGenerator;
