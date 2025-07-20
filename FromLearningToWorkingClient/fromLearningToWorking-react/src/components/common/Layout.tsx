import Box from "@mui/material/Box";
import React from "react";


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ 
      minHeight: '100vh',
      minWidth: '100vw',
      width: '100%',
      backgroundColor: '#ffffff'
    }}>
      {children}
    </Box>
  );
  export default PageLayout;