import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const DeleteModal = ({ open, onClose, onConfirm, data }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="delete-modal-title">
            <Box sx={style}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    {data.label}
                </Typography>

                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                    Are you sure you want to delete?
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.8rem', color: "red", fontWeight: 'bold' }}>
                    This action cannot be undone.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', margin: '1rem 0' }}>

                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={onConfirm} color="error" variant="contained">Proceed</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
