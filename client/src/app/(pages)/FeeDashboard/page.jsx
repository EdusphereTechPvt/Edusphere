import FeeDashboard from './FeeDashboard';
import StatCard from './Cards';
import { Typography } from '@mui/material';

export default function page() {
    return (
        <div>
            <Typography variant="h4" fontWeight="bold" mb={3} className="p-6">
                Fee Status Overview
            </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    <StatCard title="Total Collection" value="$250,000" />
                    <StatCard title="Pending" value="$50,000" />
                    <StatCard title="Overdue" value="$10,000" color="text-red-500" />
                    <StatCard title="Collection Rate" value="83%" color="text-green-500" />
                </div>
            <FeeDashboard />
        </div>
    );
}

