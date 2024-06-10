import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ContentReview from "./ContentExpertModule/ContentReview";
import ContentComparison from "./ContentExpertModule/ContentComparison";
import ContentManagement from "./ContentExpertModule/ContentManagement";
import ContentEnrichment from "./ContentExpertModule/ContentEnrichment";
import CollaborationTools from "./ContentExpertModule/CollaborationTools";
import ContentStorage from "./ContentExpertModule/ContentStorage";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: "100vh",
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    width: "100%",
    backgroundColor: "#e60028", // Nomu red
    color: "#fff",
    "&:hover": {
      backgroundColor: "#a3001f",
    },
  },
  output: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    borderRadius: "4px",
  },
}));

const ContentExpert = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} className={classes.fullHeight}>
        <Grid item xs={6}>
          <ContentReview />
        </Grid>
        <Grid item xs={6}>
          <ContentComparison />
        </Grid>
        <Grid item xs={6}>
          <ContentManagement />
        </Grid>
        <Grid item xs={6}>
          <ContentEnrichment />
        </Grid>
        <Grid item xs={6}>
          <CollaborationTools />
        </Grid>
        <Grid item xs={6}>
          <ContentStorage />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentExpert;
