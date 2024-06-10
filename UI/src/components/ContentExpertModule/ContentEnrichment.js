import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import api from "../api";

const ContentEnrichment = () => {
  const [content, setContent] = useState("");
  const [expandedContent, setExpandedContent] = useState("");

  const handleExpandContent = async () => {
    try {
      const response = await api.post("/expand", { content });
      setExpandedContent(response.data.expanded_content);
    } catch (error) {
      console.error("Error expanding content:", error);
      // Handle error
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Content Enrichment
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
            onClick={handleExpandContent}
          >
            Expand Content
          </Button>
        </Grid>
        <Grid item xs={12}>
          {expandedContent && (
            <Typography variant="body1">
              Expanded Content: {expandedContent}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentEnrichment;
