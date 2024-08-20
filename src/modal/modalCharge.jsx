import { Box, Modal, Backdrop} from '@mui/material';

import React from 'react'
import LoadingSpinner from '../loadingSpinner';

const ModalCharge = ({isLoading, onClose}) => {
  return (
    <Modal
        open={isLoading} // Usar open en lugar de isLoading
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
           
           
          }}
        >
          <LoadingSpinner />
          <Box
            sx={{
              marginTop:"90%",
              marginLeft:"22%",
              width: "fit-content",
              fontWeight: "bold",
              fontFamily: "monospace",
              whiteSpace: "pre",
              fontSize: "30px",
              lineHeight: "1.2em",
              height: "1.2em",
              overflow: "hidden",
              "&:before": {
                content: `"Loading...\\A⌰oading...\\A⌰⍜ading...\\A⌰⍜⏃ding...\\A⌰⍜⏃⎅ing...\\A⌰⍜⏃⎅⟟ng...\\A⌰⍜⏃⎅⟟⋏g...\\A⌰⍜⏃⎅⟟⋏☌...\\A⌰⍜⏃⎅⟟⋏☌⟒..\\A⌰⍜⏃⎅⟟⋏☌⟒⏁.\\A⌰⍜⏃⎅⟟⋏☌⟒⏁⋔"`,
                whiteSpace: "pre",
                display: "inline-block",
                animation: "l39 1s infinite steps(11) alternate",
                zIndex: 1500,
              },
              "@keyframes l39": {
                "100%": { transform: "translateY(-100%)" },
              },
            }}
          ></Box>
          
        </Box>
      </Modal>
  )
}
export default ModalCharge;
