import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const CollaborationTools = () => {
    const [content, setContent] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleAddComment = () => {
        setComments([...comments, comment]);
        setComment('');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Collaboration Tools</Typography>
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
                            label="Add Comment"
                            variant="outlined"
                            fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleAddComment}>
                            Add Comment
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Comments:</Typography>
                        <List>
                            {comments.map((comment, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={comment} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Container>
        );
    };
    
    export default CollaborationTools;
