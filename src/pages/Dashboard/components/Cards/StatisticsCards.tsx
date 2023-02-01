import { Pie } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import React from 'react';
import usePage from '../../hooks/usePage';

const { Statistic, Divider } = StatisticCard;

export const StatisticsCards: React.FC = () => {
  const { configArea, configPie, responsive, setResponsive } = usePage();

  /*const statisticsCards = useMemo(
    () =>
      statistics.map((st, index) => {
        const currentStatistic = configStatistics.find((el) => el.id === st.id);

        return currentStatistic ? (
          <Col
            key={st.id}
            id={currentStatistic.name}
            xs={12}
            md={index === statistics.length - 1 ? 0 : 8}
            order={index + 1 || 0}
          >
            <StatisticCard
              name={currentStatistic.title}
              value={st.value}
              prevValue={st.prevValue}
              color={currentStatistic.color}
              unit={st.unit}
            />
          </Col>
        ) : null;
      }),
    [statistics],
  );*/

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 800);
      }}
    >
      <ProCard title="Blue Phoenix" extra="February 2023 " split={'vertical'}>
        <ProCard split="vertical">
          <StatisticCard
            statistic={{
              title: 'Total Borrowers',
              value: 234,
              description: <Statistic title="" value="8.04%" trend="down" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Total Remaining',
              value: 156000,
              prefix: '$',
              description: <Statistic title="USD" value="8.04%" trend="up" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Total Payments',
              value: 256000,
              prefix: '$',
              description: <Statistic title="USD" value="8.04%" trend="up" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Late Payments count',
              value: '134',
            }}
          />
        </ProCard>
      </ProCard>
      <StatisticCard title="Borrowers" chart={<Pie {...configPie} />} />
    </RcResizeObserver>
  );
};
