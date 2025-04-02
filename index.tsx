import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function StakeholderEngagementLab() {
  const [says, setSays] = useState("");
  const [thinks, setThinks] = useState("");
  const [feels, setFeels] = useState("");
  const [does, setDoes] = useState("");
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-insights", {
        says,
        thinks,
        feels,
        does,
      });
      const parsed = response.data.insights;
      setInsights(parsed);
    } catch (error) {
      console.error("Error generating insights:", error);
      setInsights(["Error fetching insights. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <motion.h1 className="text-4xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Stakeholder Engagement Lab
      </motion.h1>

      {/* Step 1: Stakeholder Input */}
      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Step 1: Define Your Stakeholder</h2>
        <input
          type="text"
          placeholder="e.g., State Project Director for Teacher Training"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
      </section>

      {/* Step 2: Empathy Map */}
      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Step 2: Empathy Map</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <textarea placeholder="SAYS: Direct quotes or demands from stakeholder..." value={says} onChange={(e) => setSays(e.target.value)} style={{ width: "100%", height: "80px" }} />
          <textarea placeholder="THINKS: Hidden concerns or thoughts..." value={thinks} onChange={(e) => setThinks(e.target.value)} style={{ width: "100%", height: "80px" }} />
          <textarea placeholder="FEELS: Emotions driving their response..." value={feels} onChange={(e) => setFeels(e.target.value)} style={{ width: "100%", height: "80px" }} />
          <textarea placeholder="DOES: Observable actions or behaviors..." value={does} onChange={(e) => setDoes(e.target.value)} style={{ width: "100%", height: "80px" }} />
        </div>
        <button onClick={generateInsights} disabled={loading} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          {loading ? "Generating..." : "Generate Insights"}
        </button>
      </section>

      {/* Step 3: Iceberg Decoder */}
      {insights.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Step 3: Iceberg Behavior Decoder</h2>
          <p style={{ color: "#666" }}>AI-generated analysis of hidden beliefs, fears, motivations...</p>
          <ul style={{ paddingLeft: "1.5rem" }}>
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Step 4: Adaptive Strategy Coach */}
      {insights.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Step 4: Strategy Coach</h2>
          <ul style={{ paddingLeft: "1.5rem" }}>
            <li>Frame proposals as risk mitigation</li>
            <li>Identify internal champions to build trust</li>
            <li>Use outcome-aligned compliance metrics</li>
          </ul>
          <button style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>Download Engagement Toolkit</button>
        </section>
      )}
    </div>
  );
}