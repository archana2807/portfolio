// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// export async function fetchProjects(featured = false) {
//   const res = await fetch(`${API_URL}/projects${featured ? '?featured=true' : ''}`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) throw new Error('Failed to fetch projects');
//   const data = await res.json();
//   return data.data;
// }

// export async function fetchSkills() {
//   const res = await fetch(`${API_URL}/skills`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) throw new Error('Failed to fetch skills');
//   const data = await res.json();
//   return data.data;
// }

// export async function sendContactMessage(payload) {
//   const res = await fetch(`${API_URL}/contact`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   return { ok: res.ok, ...data };



// }

export async function fetchCertificates() {
  const res = await fetch('/api/certificates', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch certificates');

  return res.json();
}

export async function fetchSkills() {
  const res = await fetch('/api/skills', {
    cache: 'no-store',
  });

  if (!res.ok) return {};

  const data = await res.json();
  return data || {};
}


// lib/api.js

export async function fetchProjects() {
  try {
    const res = await fetch('/api/projects', {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();

    // always normalize to array
    return Array.isArray(data) ? data : data?.projects || [];
  } catch (error) {
    console.error('fetchProjects error:', error);
    return [];
  }
}


export async function fetchHero() {
  const res = await fetch('/api/hero', { cache: 'no-store' });
  if (!res.ok) return {};
  return res.json();
}

export async function fetchHeroStats() {
  const res = await fetch('/api/hero-stats', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchProfile() {
  const res = await fetch('/api/profile', {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      about: {},
      education: [],
      experience: [],
    };
  }

  return res.json();
}

export async function sendContactMessage(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    ...data,
  };
}