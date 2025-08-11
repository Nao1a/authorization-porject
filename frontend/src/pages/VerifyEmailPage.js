import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import authService from '../services/authService';
import { Container, Typography, Box, Alert, CircularProgress, Button } from '@mui/material';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = searchParams.get('token');
        const code = searchParams.get('code');

        if (!token || !code) {
            setError('Invalid verification link. Token or code is missing.');
            setLoading(false);
            return;
        }

        const verify = async () => {
            try {
                const response = await authService.verifyEmail(token, code);
                setMessage(response.data.message || 'Email verified successfully! You can now log in.');
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred during email verification.');
                setMessage('');
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [searchParams]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Email Verification
                </Typography>
                {loading && <CircularProgress sx={{ mt: 4 }} />}
                {!loading && message && (
                    <Box>
                        <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>
                        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
                            Go to Login
                        </Button>
                    </Box>
                )}
                {!loading && error && (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                )}
            </Box>
        </Container>
    );
};

export default VerifyEmailPage;
