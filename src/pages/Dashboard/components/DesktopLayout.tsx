import { Col, Row } from 'antd';
import React from 'react';
import { StatisticsCards } from './Cards/StatisticsCards';

const DesktopLayout: React.FC = () => {
  return (
    <Row>
      <Row gutter={[30, 30]}>
        <Col span={24}>
          <Row gutter={[30, 30]}>
            <StatisticsCards />
          </Row>
        </Col>

        {/* <Col id="activity" xl={24} xxl={12}>
          <ActivityCard />
        </Col>

        <Col id="health" xl={24} xxl={12}>
          <HealthCard />
        </Col> */}
      </Row>
    </Row>
  );
};

export default DesktopLayout;
