"use client"

import StatCard from '@/app/components/CardComponent/StatCard'
import { getUsers } from '@/app/services/UserService'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { manageConfig } from '../../config/ListConfig'

const Manage = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [count, setCount] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    roles: { admin: 0, teacher: 0, student: 0 },
  });

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await getUsers();
      setUserDetails(res);
      setCount(getCount(res));
    };
    getAllUsers();
  }, []);

  const getCount = (result) => {
    const counts = {
      total: result.length,
      active: 0,
      inactive: 0,
      roles: { admin: 0, teacher: 0, student: 0 },
    };

    result.forEach((user) => {
      if (user.isActive) counts.active++;
      else counts.inactive++;
      if (user.role && counts.roles.hasOwnProperty(user.role)) {
        counts.roles[user.role]++;
      }
    });

    return counts;
  };

  return (
    <Box sx={{ px: { xs: 2, lg: 3.5 }, py: 4, gap: 4 }}>
      <Box mb={3}>
        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.6rem",
              md: "1.7rem",
              lg: "1.8rem",
            },
            fontWeight: "bold",
          }}
        >
          {manageConfig.header.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {manageConfig.header.subtitle}
        </Typography>
      </Box>
      <div className="flex items-center gap-4">
        {manageConfig.sections[0].items.map((item, index) => (
          <StatCard
            key={index}
            label={item.label}
            value={item?.isRole ? count.roles[item.name] || 0 : count[item.name] || 0}
          />
        ))}
      </div>
    </Box>
  );
};

export default Manage;
