'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';

import { fetchSkills } from '@/lib/api';

/* =======================
   STAR UI
======================= */
function SkillStars({ name, level, color }) {
  return (
    <Box sx={{ mb: 1.2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 500 }}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.3 }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                color: i < level ? color : 'rgba(255,255,255,0.15)',
                fontSize: 12,
              }}
            >
              ★
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* =======================
   MAIN COMPONENT
======================= */
export default function SkillsSection() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then((data) => setSkills(data || {}))
      .catch(() => setSkills({}))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box id="skills" sx={{ py: { xs: 5, md: 6 } }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '1.9rem', fontWeight: 700 }}>
            Skills
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Technologies I work with
          </Typography>
        </Box>

        {/* LOADING */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={22} />
          </Box>
        ) : (
          <Grid container spacing={2}>

            {Object.entries(skills).map(([category, items]) => {
              const color =
                `hsl(${(category.length * 70) % 360}, 85%, 60%)`;

              return (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${color}33`,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        border: `1px solid ${color}66`,
                      },
                    }}
                  >

                    {/* CATEGORY */}
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color,
                        mb: 1.5,
                      }}
                    >
                      {category}
                    </Typography>

                    {/* SKILLS */}
                    {items?.map((s, i) => (
                      <SkillStars
                        key={i}
                        name={s.name}
                        level={s.level}
                        color={color}
                      />
                    ))}

                  </Box>
                </Grid>
              );
            })}

          </Grid>
        )}

      </Container>
    </Box>
  );
}