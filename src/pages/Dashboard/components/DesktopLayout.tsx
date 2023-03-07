import PivotTable from '@/components/PivotTable';
import { Space } from 'antd';
import React from 'react';
import { StatisticsCards } from './Cards/StatisticsCards';

interface IPivotTableProps {
  report: API.PivotReport | undefined;
  statistics: API.Balance | undefined;
  loansReport: API.PivotReport | undefined;
}

const DesktopLayout: React.FC<IPivotTableProps> = ({ report, statistics, loansReport }) => {
  return (
    <Space direction="vertical" size="middle">
      <StatisticsCards statistics={statistics} />
      <PivotTable report={loansReport} />
      <PivotTable report={report} />
    </Space>
  );
};

export default DesktopLayout;
