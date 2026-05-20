'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { sendContactMessage } from '@/lib/api';

const CONTACT_INFO = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: 'patelac2807@gmail.com',
    href: 'mailto:patelac2807@gmail.com',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: '+91-8989450720',
    href: 'tel:+918989450720',
  },
  {
    Icon: LocationOnIcon,
    label: 'Location',
    value: 'Ahmedabad, Gujarat, India',
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/archana-patel-37ab49118',
    href: 'https://www.linkedin.com/in/archana-patel-37ab49118',
  },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendContactMessage(form);

      setSnack({
        open: true,
        message: res.ok ? 'Message sent successfully' : 'Failed to send',
        severity: res.ok ? 'success' : 'error',
      });

      if (res.ok) setForm(INITIAL_FORM);
    } catch {
      setSnack({
        open: true,
        message: 'Server error',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: 5 }}>
      <Container maxWidth="md">

        {/* TITLE */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700 }}>
            Contact Me
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Let’s work together
          </Typography>
        </Box>

        <Grid container spacing={2}>

          {/* LEFT INFO */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5}>
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <Box
                  key={label}
                  component={href ? 'a' : 'div'}
                  href={href || undefined}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    py: 1,
                    px: 1,
                    borderRadius: 1,
                    textDecoration: 'none',
                    cursor: href ? 'pointer' : 'default',
                    transition: '0.2s',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.04)',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT FORM */}
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSubmit}>

              <Grid container spacing={1.5}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={16} />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{ py: 1 }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>

              </Grid>
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}