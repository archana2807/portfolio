'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Divider,
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { fetchProfile } from '@/lib/api';

export default function AboutSection() {
  const [profile, setProfile] = useState({
    about: {},
    education: [],
    experience: [],
  });

  useEffect(() => {
    (async () => {
      const data = await fetchProfile();
      setProfile(data);
    })();
  }, []);

  const { about, education, experience } = profile;

  return (
    <Box id="about" sx={{ py: { xs: 5, md: 6 } }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
            About Me
          </Typography>
        </Box>

        <Grid container spacing={3}>

          {/* LEFT */}
          <Grid item xs={12} md={4}>

            {/* SUMMARY */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                Summary
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {about?.summary || 'Loading...'}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, opacity: 0.15 }} />

            {/* EDUCATION (DYNAMIC) */}
            {education.map((edu) => (
              <Box key={edu.id} sx={{ mb: 2 }}>

                <Stack direction="row" spacing={1} alignItems="center">
                  <SchoolIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography fontWeight={700} fontSize={14}>
                    {edu.degree}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {edu.university} · {edu.period}
                </Typography>

                {edu.cgpa && (
                  <Typography variant="caption" color="primary.main">
                    CGPA: {edu.cgpa}
                  </Typography>
                )}

              </Box>
            ))}

          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={8}>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <WorkIcon sx={{ color: 'primary.main', fontSize: 18 }} />
              <Typography fontWeight={700}>
                Work Experience
              </Typography>
            </Stack>

            <Box sx={{ position: 'relative', pl: 3 }}>

              {/* LINE */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'linear-gradient(to bottom, #6C5CE7, transparent)',
                  opacity: 0.3,
                }}
              />

              <Stack spacing={3}>

                {experience.map((exp) => (
                  <Box key={exp.id} sx={{ position: 'relative' }}>

                    {/* DOT */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -3,
                        top: 6,
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: 'primary.main',
                      }}
                    />

                    <Box sx={{ pl: 2 }}>

                      <Typography fontWeight={700} fontSize={14}>
                        {exp.role}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {exp.company}
                      </Typography>

                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mt: 0.5,
                          px: 1,
                          py: 0.2,
                          borderRadius: 2,
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontSize: 11,
                        }}
                      >
                        <CalendarTodayIcon sx={{ fontSize: 12 }} />
                        {exp.period}
                      </Box>

                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {(exp.points || []).map((p, i) => (
                          <Typography
                            key={i}
                            component="li"
                            variant="body2"
                            sx={{ color: 'text.secondary', fontSize: 13 }}
                          >
                            {p}
                          </Typography>
                        ))}
                      </Box>

                    </Box>
                  </Box>
                ))}

              </Stack>

            </Box>

          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}