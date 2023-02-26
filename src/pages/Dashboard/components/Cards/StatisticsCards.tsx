import { Liquid } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import React from 'react';
import usePage from '../../hooks/usePage';

const { Statistic, Divider } = StatisticCard;

interface IStatisticsCardsProps {
  statistics: API.Balance | undefined;
}

export const StatisticsCards: React.FC<IStatisticsCardsProps> = ({ statistics }) => {
  const { setResponsive, pieRemaining, piePayments, piePrincipal, pieInterest } = usePage();

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
      <ProCard split="vertical">
        <StatisticCard.Group direction="row" style={{ marginBlockStart: 8 }} gutter={[16, 16]}>
          <StatisticCard
            statistic={{
              title: 'Total loans',
              value: statistics?.loansAmount.toFixed(2),
              prefix: '$',
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Total Remaining',
              value: ((statistics?.loansAmount ?? 0) - (statistics?.amountPaid ?? 0)).toFixed(2),
              prefix: '$',
            }}
            chart={pieRemaining && <Liquid {...pieRemaining} />}
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: 'Active Loans',
              value: statistics?.activeBorrowers,
            }}
          />
        </StatisticCard.Group>
        <StatisticCard.Group direction="row" style={{ marginBlockStart: 8 }} gutter={[16, 16]}>
          <StatisticCard
            statistic={{
              title: 'Total Payments',
              value: statistics?.amountPaid.toFixed(2),
              prefix: '$',
            }}
            chart={piePayments && <Liquid {...piePayments} />}
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: 'Total to Principal',
              value: statistics?.amountToPrincipal.toFixed(2),
              prefix: '$',
            }}
            chart={piePrincipal && <Liquid {...piePrincipal} />}
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: 'Total to Interest',
              value: statistics?.amountToInterest.toFixed(2),
              prefix: '$',
            }}
            chart={pieInterest && <Liquid {...pieInterest} />}
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};
