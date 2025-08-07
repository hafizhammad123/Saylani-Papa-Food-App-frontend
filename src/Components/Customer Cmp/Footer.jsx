import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0D6EFD', color: '#fff', py: 6, mt: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" textAlign={{ xs: 'center', sm: 'left' }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Saylani Food App
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Delivering love through food. Trusted by thousands daily.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/restaurants" color="inherit" underline="hover">
                Restaurants
              </Link>
              <Link href="/order-history" color="inherit" underline="hover">
                Order History
              </Link>
              <Link href="/cart" color="inherit" underline="hover">
                Cart
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Email: support@saylanifood.com
              <br />
              Phone: +92 300 1234567
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ mt: 6 }}>
          © {new Date().getFullYear()} Saylani Food App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
