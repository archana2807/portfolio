'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

import { fetchHero, fetchHeroStats } from '@/lib/api';

export default function HeroSection() {
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const [h, s] = await Promise.all([
        fetchHero(),
        fetchHeroStats(),
      ]);

      setHero(h);
      setStats(Array.isArray(s) ? s : []);
    })();
  }, []);

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >

          {/* LEFT */}
          <Box>

            {/* NAME */}
            <Typography
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 1.5,
              }}
            >
              Hi, I’m{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #00E5FF, #0099CC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {hero?.name || 'Developer'}
              </Box>
            </Typography>

            {/* TITLE (dynamic + animation fallback) */}
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              <TypeAnimation
                sequence={[
                  hero?.title || 'Full Stack Developer',
                  2000,
                  'React & Next.js Expert',
                  2000,
                  'Node.js Developer',
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </Typography>

            {/* SUMMARY */}
            <Typography sx={{ mb: 3, color: 'text.secondary', maxWidth: 520 }}>
              {hero?.summary}
            </Typography>

            {/* STATS (dynamic) */}
            <Stack direction="row" spacing={3}>
              {stats.map((s, i) => (
                <Box key={i}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', color: 'primary.main' }}>
                    {s.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

          </Box>

          {/* RIGHT IMAGE */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box
              sx={{
                width: 320,
                height: 380,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src="/archana-photo.png"
                alt="profile"
                width={400}
                height={400}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}