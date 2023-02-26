import React from 'react';
import DesktopLayout from './components/DesktopLayout';
import usePage from './hooks/usePage';

const Dashboard: React.FC = () => {
  const { report, statistics } = usePage();
  return <DesktopLayout report={report} statistics={statistics} />;
};

export default Dashboard;
