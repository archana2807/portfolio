import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(6,11,20,0.98)',
        borderTop: '1px solid rgba(0,229,255,0.08)',
        py: 2,
      }}
    >
      <Container maxWidth="lg">

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >

          {/* LEFT - BRAND */}
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Archana Patel
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              Full Stack Developer · Ahmedabad
            </Typography>
          </Box>

          {/* CENTER - ICONS */}
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://www.linkedin.com/in/archana-patel-37ab49118"
              target="_blank"
              sx={{ color: '#00E5FF', p: 0.5 }}
            >
              <LinkedInIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <IconButton
              href="mailto:patelac2807@gmail.com"
              sx={{ color: '#00E5FF', p: 0.5 }}
            >
              <EmailIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <IconButton
              href="tel:+918989450720"
              sx={{ color: '#00E5FF', p: 0.5 }}
            >
              <PhoneIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>

          {/* RIGHT - COPYRIGHT */}
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
            © {new Date().getFullYear()} All rights reserved
          </Typography>

        </Box>

      </Container>
    </Box>
  );
}