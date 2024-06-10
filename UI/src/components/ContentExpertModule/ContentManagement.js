import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const ContentManagement = () => {
    const [content, setContent] = useState('');
    const [versionLabel, setVersionLabel] = useState('');
    const [versions, setVersions] = useState([]);

    const handleSaveVersion = () => {
        setVersions([...versions, { label: versionLabel, content }]);
        setVersionLabel('');
        setContent('');
    };

    const handleSelectVersion = (version) => {
        setContent(version.content);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Content Management</Typography>
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
                    <TextField
                        label="Version Label"
                        variant="outlined"
                        fullWidth
                        value={versionLabel}
                        onChange={(e) => setVersionLabel(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSaveVersion}>
                        Save Version
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Saved Versions:</Typography>
                    <List>
                        {versions.map((version, index) => (
                            <ListItem button key={index} onClick={() => handleSelectVersion(version)}>
                                <ListItemText primary={version.label} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContentManagement;
