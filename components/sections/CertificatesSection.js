'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CircularProgress,
} from '@mui/material';

import { fetchCertificates } from '@/lib/api';

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates()
      .then(setCertificates)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box id="certificates" sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700 }}>
            Certificates
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Verified achievements
          </Typography>
        </Box>

        {/* LOADING */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={22} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {certificates.map((cert) => (
              <Grid item xs={12} sm={6} md={3} key={cert.id}>

                <Card
                  onClick={() => window.open(cert.image, '_blank')}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: 'rgba(13,22,38,0.85)',
                    border: '1px solid rgba(0,229,255,0.08)',
                    transition: '0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      border: '1px solid rgba(0,229,255,0.25)',
                    },
                  }}
                >

                  {/* IMAGE */}
                  <Box
                    component="img"
                    src={cert.image}
                    alt={cert.title}
                    sx={{
                      width: '100%',
                      height: 140,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* TITLE */}
                  <Box sx={{ p: 1.2, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      {cert.title}
                    </Typography>
                  </Box>

                </Card>

              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Box>
  );
}