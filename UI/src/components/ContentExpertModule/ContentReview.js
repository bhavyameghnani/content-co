import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import { spellCheck, readabilityCheck } from "../api";

const ContentReview = () => {
  const [content, setContent] = useState("");
  const [spellCheckResult, setSpellCheckResult] = useState("");
  const [readabilityScore, setReadabilityScore] = useState(null);

  const handleSpellCheck = async () => {
    const response = await spellCheck(content);
    setSpellCheckResult(response.data.corrections.join(", "));
  };

  const handleReadabilityCheck = async () => {
    const response = await readabilityCheck(content);
    setReadabilityScore(response.data.readability_score);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Content Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Content"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSpellCheck}
          >
            Check Spelling and Grammar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReadabilityCheck}
            style={{ marginLeft: "10px" }}
          >
            Check Readability
          </Button>
        </Grid>
        <Grid item xs={12}>
          {spellCheckResult && (
            <Typography variant="body1">
              Spell Check Result: {spellCheckResult}
            </Typography>
          )}
          {readabilityScore !== null && (
            <Typography variant="body1">
              Readability Score: {readabilityScore}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentReview;
