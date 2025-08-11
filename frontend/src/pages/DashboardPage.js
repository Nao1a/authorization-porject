import React, { useEffect, useState } from 'react';
import contactService from '../services/contactService';
import {
    Container,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Alert,
    Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContactForm from '../components/ContactForm';

const DashboardPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await contactService.getContacts();
            setContacts(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch contacts.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (contact = null) => {
        setSelectedContact(contact);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedContact(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await contactService.deleteContact(id);
                fetchContacts();
            } catch (err) {
                setError('Failed to delete contact.');
            }
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
                <Typography variant="h4" component="h1">
                    Contacts Dashboard
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                >
                    Add Contact
                </Button>
            </Box>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {!loading && !error && contacts.length === 0 && (
                <Typography>No contacts found. Add one to get started!</Typography>
            )}

            {!loading && !error && contacts.length > 0 && (
                <Paper>
                    <List>
                        {contacts.map((contact) => (
                            <ListItem
                                key={contact._id}
                                divider
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(contact)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(contact._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={contact.name}
                                    secondary={<>{contact.email}<br />{contact.phone}</>}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

            <ContactForm
                open={open}
                onClose={handleClose}
                onSave={() => {
                    handleClose();
                    fetchContacts();
                }}
                contact={selectedContact}
            />
        </Container>
    );
};

export default DashboardPage;
