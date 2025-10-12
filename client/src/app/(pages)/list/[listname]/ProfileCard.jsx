"use client";
import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import { ProfileCardConfig } from "@/app/config/ListConfig";
import { useHandleAction } from "@/app/utils/HelperFunctions";
import DeleteModal from "@/app/components/Modal/DeleteModal";
import { handleDeleteData } from "@/app/services/ListService";
import LableChip from "@/app/components/LableChip/LableChip";

const ProfileCard = ({ role, data, updateFlag, setUpdateFlag }) => {
  const { header, fields = [], quickLinks = [] } = ProfileCardConfig[role];

  const { handleAction, modalProps, closeModal } = useHandleAction();

  const handleDelete = async() =>{
    const res = await handleDeleteData(modalProps.actionValue, modalProps.data.id)

    if(res){
      closeModal();
      setUpdateFlag(!updateFlag)
    }
  }

  const getAttendanceColor = (value) => {
    if (value < 40) return "var(--color-red)";
    if (value < 60) return "var(--color-yellow)";
    return "var(--color-green)";
  };

  const renderField = (field) => {
    const value = data[field.key];
    if (value === undefined || value === null) return null;

    switch (field.type) {
      case "progress":
        return (
          <Box key={field.key} mb={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  color: "text.secondary",
                  fontWeight: 500,
                  flexShrink: 0,
                  width: "40%",
                }}
              >
                {field.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 600,
                  color: getAttendanceColor(value),
                  whiteSpace: "nowrap",
                }}
              >
                {value}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                  flex: 1,
                  borderRadius: 5,
                  height: 8,
                  backgroundColor: "#eee",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getAttendanceColor(value),
                  },
                }}
              />
            </Box>
          </Box>
        );

      case "chip":
        return (
          <Box
            key={field.key}
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "text.secondary",
                fontWeight: 500,
                width: "40%",
              }}
            >
              {field.label}
            </Typography>
            <LableChip
            value={value}
            size="small"
            variant="outlined"
            />
          </Box>
        );

      default:
        return (
          <Box
            key={field.key}
            mb={2}
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {field.label}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {value}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <>
    {modalProps && (
      <DeleteModal
      open={!!modalProps}
      onClose={closeModal}
      onConfirm={handleDelete}
      data={modalProps.data}
      />
    )}
    <Card
    sx={{
      maxWidth: 450,
      borderRadius: 3,
      height: "100%",
      boxShadow: "none",
      border: "1px solid #D3D4D9",
    }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
          >
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
            >
            {header?.title}
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {data?.buttons?.map((btn, idx) => (
              btn.type === 'iconbutton' && 
              <Tooltip title={btn.label} key={idx} arrow>
                <Button
                  variant={btn.variant}
                  color={btn.color}
                  sx={{
                    ...btn.styles.elementStyles,
                    textTransform: "none",
                    minWidth: 0,
                  }}
                  onClick={() => {
                    handleAction(btn.action,btn.actionValue,btn.actionUse,{label: btn.label, id: data._id})
                  }}
                  >
                  <btn.icon
                    sx={{
                      fontSize: { sm: "0.9rem", md: "1rem", lg: "1.15rem" },
                    }}
                    />
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Avatar & Name */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={data?.avatar || ""}
            alt={name || ""}
            imgProps={{ loading: "lazy" }}
            sx={{
              width: { xs: 75, sm: 80, md: 85, lg: 90 },
              height: { xs: 75, sm: 80, md: 85, lg: 90 },
              mb: 1,
            }}
            />
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" } }}
            >
            {data.name}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              color: "text.secondary",
            }}
            >
            ID: {data.id}
          </Typography>

          {data.grade && (
            <Typography
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              color: "text.secondary",
            }}
            >
              Class: {data.grade}
            </Typography>
          )}
          {data.section && (
            <Typography
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              color: "text.secondary",
            }}
            >
              Section: {data.section}
            </Typography>
          )}
        </Box>

        {/* Dynamic Fields */}
        {fields.map((field) => renderField(field))}

        {/* Quick Links */}
        <Box mt={3}>
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" }, mb: 1 }}
            >
            Quick Links
          </Typography>
          {quickLinks.map((link, idx) => (
            <Button
              key={idx}
              fullWidth
              variant={idx === 0 ? "contained" : "outlined"}
              startIcon={link.icon}
              onClick={link.action}
              sx={{
                mb: 1,
                textTransform: "none",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                py: 1.3,
                fontWeight: 500,
                borderRadius: 1,
                color: idx !== 0 ? "#334155" : undefined,
                border: idx !== 0 ? "1px solid #9999" : undefined,
              }}
              >
              {link.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  </>
  );
};

export default ProfileCard;
