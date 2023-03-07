import React from 'react';
import DesktopLayout from './components/DesktopLayout';
import usePage from './hooks/usePage';

const Dashboard: React.FC = () => {
  const { report, statistics, loansReport } = usePage();
  return <DesktopLayout report={report} statistics={statistics} loansReport={loansReport} />;
};

export default Dashboard;
