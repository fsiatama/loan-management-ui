import { Col, Progress, Row, Space } from 'antd';
import React from 'react';

interface StatisticsCardProps {
  name: string;
  value: number;
  prevValue: number;
  color: string;
  unit: string;
}

const StatisticCard: React.FC<StatisticsCardProps> = ({ name, value, prevValue, color, unit }) => {
  return (
    <Row wrap={false} gutter={[5, 0]}>
      <Col flex={1}>
        <Row justify="space-between" align="middle" wrap={false}>
          <Col>
            <Space direction="vertical" size={6}>
              {name}
              {value}
              {prevValue}
            </Space>
          </Col>

          <Col>
            <Progress
              type="circle"
              width={50}
              strokeColor={color}
              trailColor="transparent"
              percent={value}
              format={(percent) => (
                <>
                  {percent}
                  <br />
                  {unit}
                </>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StatisticCard;
