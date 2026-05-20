'use client';

import { useState, useEffect } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useScrollTrigger, Slide, Container
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';

import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setDrawerOpen(false);

    if (href === '/' || href === '/about' || href === '/contact') {
      router.push(href);
      return;
    }

    if (href.includes('#')) {
      const id = href.split('#')[1];

      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 250);
        return;
      }

      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: scrolled ? 'rgba(6,11,20,0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(0,229,255,0.12)' : 'none',
            transition: '0.25s ease',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: 64 }}>

              {/* LOGO */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexGrow: 1 }}>

                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    background: 'linear-gradient(135deg, #00E5FF, #0099CC)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CodeIcon sx={{ color: '#000', fontSize: 20 }} />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 18,
                    letterSpacing: 0.3,
                  }}
                >
                  Archana Patel
                </Typography>

              </Box>

              {/* DESKTOP MENU */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.8, alignItems: 'center' }}>

                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.label}
                    onClick={() => handleClick(link.href)}
                    sx={{
                      fontSize: 14,   // 🔥 increased
                      fontWeight: 500,
                      color: 'text.secondary',
                      px: 1.8,
                      py: 0.6,
                      '&:hover': {
                        color: 'primary.main',
                        background: 'rgba(0,229,255,0.06)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}

                <Button
                  variant="contained"
                  href="mailto:patelac2807@gmail.com"
                  sx={{
                    ml: 1,
                    py: 0.8,
                    px: 2,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Hire Me
                </Button>

              </Box>

              {/* MOBILE */}
              <IconButton
                sx={{ display: { md: 'none' }, color: 'primary.main' }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon fontSize="medium" />
              </IconButton>

            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: '#0D1626',
            borderLeft: '1px solid rgba(0,229,255,0.12)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'primary.main' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton onClick={() => handleClick(link.href)}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}