import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="p-6 grid gap-6 max-w-4xl mx-auto">
      <motion.h1 className="text-4xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Stakeholder Engagement Lab
      </motion.h1>

      {/* Step 1: Stakeholder Input */}
      <Card>
        <CardContent className="p-4 grid gap-4">
          <h2 className="text-2xl font-semibold">Step 1: Define Your Stakeholder</h2>
          <Input placeholder="e.g., State Project Director for Teacher Training" />
        </CardContent>
      </Card>

      {/* Step 2: Empathy Map */}
      <Card>
        <CardContent className="p-4 grid gap-4">
          <h2 className="text-2xl font-semibold">Step 2: Empathy Map</h2>
          <div className="grid grid-cols-2 gap-4">
            <Textarea placeholder="SAYS: Direct quotes or demands from stakeholder..." value={says} onChange={(e) => setSays(e.target.value)} />
            <Textarea placeholder="THINKS: Hidden concerns or thoughts..." value={thinks} onChange={(e) => setThinks(e.target.value)} />
            <Textarea placeholder="FEELS: Emotions driving their response..." value={feels} onChange={(e) => setFeels(e.target.value)} />
            <Textarea placeholder="DOES: Observable actions or behaviors..." value={does} onChange={(e) => setDoes(e.target.value)} />
          </div>
          <Button className="mt-2 w-fit" onClick={generateInsights} disabled={loading}>
            {loading ? "Generating..." : "Generate Insights"}
          </Button>
        </CardContent>
      </Card>

      {/* Step 3: Iceberg Decoder */}
      {insights.length > 0 && (
        <Card>
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-2xl font-semibold">Step 3: Iceberg Behavior Decoder</h2>
            <p className="text-muted-foreground">AI-generated analysis of hidden beliefs, fears, motivations...</p>
            <ul className="list-disc pl-5">
              {insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Adaptive Strategy Coach */}
      {insights.length > 0 && (
        <Card>
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-2xl font-semibold">Step 4: Strategy Coach</h2>
            <ul className="list-disc pl-5">
              <li>Frame proposals as risk mitigation</li>
              <li>Identify internal champions to build trust</li>
              <li>Use outcome-aligned compliance metrics</li>
            </ul>
            <Button className="mt-2 w-fit">Download Engagement Toolkit</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
