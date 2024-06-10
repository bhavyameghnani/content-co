import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import api from "../api";

const ContentComparison = () => {
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");

  const handleComparison = async () => {
    try {
      const response = await api.post("/compare", { content1, content2 });
      setComparisonResult(response.data.result);
    } catch (error) {
      console.error("Error comparing content:", error);
      // Handle error
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Content Comparison
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Content Version 1"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={content1}
            onChange={(e) => setContent1(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Content Version 2"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={content2}
            onChange={(e) => setContent2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleComparison}
          >
            Compare Versions
          </Button>
        </Grid>
        <Grid item xs={12}>
          {comparisonResult && (
            <Typography variant="body1">{comparisonResult}</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentComparison;
