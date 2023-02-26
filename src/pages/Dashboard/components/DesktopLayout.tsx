import PivotTable from '@/components/PivotTable';
import React from 'react';
import { StatisticsCards } from './Cards/StatisticsCards';

interface IPivotTableProps {
  report: API.PivotReport | undefined;
  statistics: API.Balance | undefined;
}

const DesktopLayout: React.FC<IPivotTableProps> = ({ report, statistics }) => {
  return (
    <>
      <StatisticsCards statistics={statistics} />
      <PivotTable report={report} />;
    </>
  );
};

export default DesktopLayout;
