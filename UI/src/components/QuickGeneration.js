import React, { useState } from "react";
import {
  TextField,
  Container,
  Grid,
  Button,
  Box,
  Typography,
  Autocomplete,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Download as DownloadIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  TextFields as TextFieldsIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";

import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    minHeight: "100vh",
    padding: theme.spacing(4),
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
    marginBottom: theme.spacing(2),
  },
  output: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    borderRadius: "4px",
    minHeight: "60vh",
    marginBottom: theme.spacing(2),
    overflowY: "auto",
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    marginTop: theme.spacing(2),
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  card: {
    marginBottom: theme.spacing(4),
  },
  exportOptions: {
    marginTop: theme.spacing(2),
  },
}));

const QuickGeneration = () => {
  const classes = useStyles();
  const [output, setOutput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState("");
  const [details, setDetails] = useState("");
  const [keywords, setKeywords] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [postDetails, setPostDetails] = useState("");

  const handleExport = (format) => {
    const content = output; // assuming output is HTML or text

    if (format === "Email") {
      window.location.href = `mailto:?subject=Exported Content&body=${encodeURIComponent(
        content
      )}`;
    } else if (format === "PDF") {
      const doc = new jsPDF();
      doc.text(content, 10, 10);
      doc.save("content.pdf");
    } else if (format === "DOCX") {
      const blob = htmlDocx.asBlob(content);
      saveAs(blob, "content.docx");
    } else if (format === "HTML") {
      const blob = new Blob([content], { type: "text/html" });
      saveAs(blob, "content.html");
    }
  };

  const handleGenerate = (endpoint) => {
    axios
      .post(`http://localhost:5000/${endpoint}`, {
        theme,
        details,
        keywords,
        briefDescription,
        postDetails,
      })
      .then((response) => {
        console.log(response.data);
        setOutput((prevOutput) => `${prevOutput}\n${response.data.output}`);
      })
      .catch((error) => {
        console.error(`Error generating ${endpoint}:`, error);
      });
  };

  const handleGenerateHeadline = (endpoint) => {
    axios
      .post(`http://localhost:5000/${endpoint}`, {
        keywords,
      })
      .then((response) => {
        const generatedHeadline = response.data.output;
        const formattedHeadline = `<h2>${generatedHeadline}</h2>`;
        setOutput((prevOutput) => prevOutput + formattedHeadline);
      })
      .catch((error) => {
        console.error("Error generating headline:", error);
      });
  };

  const handleSEOOptimize = () => {
    axios
      .post("http://localhost:5000/optimize-seo", {
        content: output,
      })
      .then((response) => {
        setOutput((prevOutput) => `${prevOutput}\n${response.data.output}`);
      })
      .catch((error) => {
        console.error("Error optimizing for SEO:", error);
      });
  };

  const handleImageGenerate = () => {
    axios
      .post("http://localhost:5000/generate-image")
      .then((response) => {
        setSelectedImage(response.data.output);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.sectionTitle}>
              Text Generation
            </Typography>
            <br />
            <TextField
              label="Enter Details"
              multiline
              rows={4}
              variant="outlined"
              className={classes.input}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <br />
            <br />
            <Autocomplete
              options={["Option 1", "Option 2"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Theme"
                  variant="outlined"
                  className={classes.input}
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              )}
            />
            <br />

            {/* <Button
              className={classes.actionButton}
              onClick={() => handleGenerate("generate-text")}
            >
              Generate
            </Button> */}

            <Typography variant="h6" className={classes.sectionTitle}>
              Headline Generation
            </Typography>
            <br />
            <TextField
              label="Enter Keywords"
              variant="outlined"
              className={classes.input}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <Button
              className={classes.actionButton}
              onClick={() => handleGenerateHeadline("generate-headline")}
            >
              Generate Headlines
            </Button>

            <Typography variant="h6" className={classes.sectionTitle}>
              Body Text Generation
            </Typography>
            <br />
            <TextField
              label="Enter Brief Description"
              multiline
              rows={4}
              variant="outlined"
              className={classes.input}
              value={briefDescription}
              onChange={(e) => setBriefDescription(e.target.value)}
            />
            <Button
              className={classes.actionButton}
              onClick={() => handleGenerate("generate-body-text")}
            >
              Generate Body Text
            </Button>

            <Typography variant="h6" className={classes.sectionTitle}>
              Social Media Posts
            </Typography>
            <br />
            <TextField
              label="Enter Post Details"
              multiline
              rows={4}
              variant="outlined"
              className={classes.input}
              value={postDetails}
              onChange={(e) => setPostDetails(e.target.value)}
            />
            <Button
              className={classes.actionButton}
              onClick={() => handleGenerate("generate-social-post")}
            >
              Generate Social Media Posts
            </Button>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.sectionTitle}>
              SEO Optimization
            </Typography>
            <Button
              className={classes.actionButton}
              startIcon={<TextFieldsIcon />}
              onClick={handleSEOOptimize}
            >
              Optimize for SEO
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.output} elevation={3}>
          <Typography variant="h6">Output</Typography>
          <ReactQuill
            theme="snow"
            value={output}
            onChange={setOutput}
            className={classes.input}
            style={{ minHeight: "40vh" }}
          />
        </Paper>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.sectionTitle}>
              Image Generation
            </Typography>
            <Button
              className={classes.actionButton}
              startIcon={<AddPhotoAlternateIcon />}
              onClick={handleImageGenerate}
            >
              Generate Image
            </Button>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button
                className={classes.actionButton}
                startIcon={<ImageIcon />}
                component="span"
              >
                Upload Custom Image
              </Button>
            </label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Generated"
                className={classes.imagePreview}
              />
            )}
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={2} className={classes.exportOptions}>
              <Grid item xs={6} sm={3}>
                <Button
                  className={classes.actionButton}
                  startIcon={<EmailIcon />}
                  onClick={() => handleExport("Email")}
                >
                  Export via Email
                </Button>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Button
                  className={classes.actionButton}
                  startIcon={<DescriptionIcon />}
                  onClick={() => handleExport("DOCX")}
                >
                  Export as DOCX
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  className={classes.actionButton}
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => handleExport("PDF")}
                >
                  Export as PDF Format
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  className={classes.actionButton}
                  startIcon={<CodeIcon />}
                  onClick={() => handleExport("HTML")}
                >
                  Export as HTML
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default QuickGeneration;
