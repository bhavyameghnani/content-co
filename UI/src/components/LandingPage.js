import React, { useState } from "react";
import { Container, Box, Typography, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import QuickGeneration from "./QuickGeneration";
import ContentExpert from "./ContentExpert";
import SmartAnalytics from "./SmartAnalytics";
import { Typewriter } from "react-simple-typewriter"; // Import Typewriter component
import {
  Description as DescriptionIcon,
  Create as CreateIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";

const words = [
  "GenAI powered Marketing",
  "Your Marketing Co-Pilot",
  "Boost Your Campaigns",
  "Personalised Comms in few clicks ...",
  "GenAI を活用したマーケティング",
  "あなたのマーケティング副操縦士",
  "キャンペーンを強化する",
];

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(https://www.mambomedia.com/wp-content/uploads/2023/06/iStock-1413761223.jpg)", // Add linear gradient for opacity
    backgroundSize: "cover",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
  },
  tabs: {
    marginTop: theme.spacing(4),
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  tab: {
    minWidth: "auto",
    color: "#fff",
    "&.Mui-selected": {
      color: "#e60028", // Nomu red
    },
  },
  contentContainer: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = useState("quick-generation");

  const handleTabChange = (event, newValue) => {
    setSelectedSection(newValue);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "quick-generation":
        return <QuickGeneration />;
      case "content-expert":
        return <ContentExpert />;
      case "smart-analytics":
        return <SmartAnalytics />;
      default:
        return <QuickGeneration />;
    }
  };

  return (
    <div>
      <Box className={classes.banner}>
        <Typography variant="h3">
          {/* Use Typewriter component to display words with typewriter effect */}
          <Typewriter
            loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            words={words}
          />
        </Typography>
      </Box>
      <Container maxWidth="xl">
        <Tabs
          value={selectedSection}
          onChange={handleTabChange}
          className={classes.tabs}
        >
          <Tab
            value="quick-generation"
            icon={<DescriptionIcon />}
            label="Quick Generation"
            className={classes.tab}
          />
          <Tab
            value="content-expert"
            icon={<CreateIcon />}
            label="Content Expert"
            className={classes.tab}
          />
          <Tab
            value="smart-analytics"
            icon={<BarChartIcon />}
            label="Smart Analytics"
            className={classes.tab}
          />
        </Tabs>
        <Box className={classes.contentContainer}>{renderContent()}</Box>
      </Container>
    </div>
  );
};

export default LandingPage;
