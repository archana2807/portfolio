'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Dialog,
} from '@mui/material';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import { fetchProjects } from '@/lib/api';

const FALLBACK_IMAGE = '/projects/default.png';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState({});
  const [openImage, setOpenImage] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProjects();
      setProjects(Array.isArray(data) ? data : []);
    })();
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const updated = { ...prev };

        projects.forEach((p) => {
          const images = Array.isArray(p.images) ? p.images : [];
          const len = images.length;

          const current = updated[p.id] || 0;
          updated[p.id] = len ? (current + 1) % len : 0;
        });

        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [projects]);

  return (
    <Box id="projects" sx={{ py: { xs: 5, md: 6 } }}>
      <Container maxWidth="lg">

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
            Projects
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Selected work & case studies
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {projects.map((project) => {
            const images = Array.isArray(project.images)
              ? project.images
              : [];

            const index = activeIndex[project.id] || 0;

            const image =
              images.length > 0
                ? images[index]
                : FALLBACK_IMAGE;

            return (
               <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'rgba(15, 23, 42, 0.55)',
                    backdropFilter: 'blur(10px)',
                  }}
                >

                  {/* IMAGE */}
                  <Box sx={{ position: 'relative', width: '100%', height: 190 }}>
                    <Image
                      src={image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      onClick={() => setOpenImage(image)}
                    />
                  </Box>

                  {/* CONTENT */}
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <WorkOutlineIcon sx={{ fontSize: 18 }} />
                      <Typography sx={{ fontWeight: 700 }}>
                        {project.title}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      {project.description}
                    </Typography>

                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {(project.tech_stack || []).map((t) => (
                        <Chip key={t} label={t} size="small" />
                      ))}
                    </Stack>

                    <Box sx={{ mt: 1.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        href={project.live_url}
                        target="_blank"
                        endIcon={<OpenInNewIcon />}
                      >
                        Live Demo
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* MODAL */}
        <Dialog open={!!openImage} onClose={() => setOpenImage(null)}>
          <Box sx={{ width: '80vw', height: '80vh', position: 'relative' }}>
            {openImage && (
              <Image
                src={openImage}
                alt="preview"
                fill
                style={{ objectFit: 'contain' }}
              />
            )}
          </Box>
        </Dialog>

      </Container>
    </Box>
  );
}