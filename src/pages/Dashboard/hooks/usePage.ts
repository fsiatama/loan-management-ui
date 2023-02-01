import { getStatistics } from '@/services/api/loans/api';
import { useEffect, useState } from 'react';

type CurrentEntity = API.CurrentLoan;

const usePage = () => {
  const [responsive, setResponsive] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<API.ComparativeStatistic[]>([]);
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    getStatistics().then((res) => setStatistics(res));
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setAreaData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const configArea = {
    data: areaData,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  const pieData = [
    {
      type: 'A',
      value: 27,
    },
    {
      type: 'B',
      value: 25,
    },
    {
      type: 'C',
      value: 18,
    },
    {
      type: 'D',
      value: 15,
    },
    {
      type: 'E',
      value: 10,
    },
    {
      type: 'F',
      value: 5,
    },
  ];

  const configPie = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Borrowers',
      },
    },
  };

  return {
    configPie,
    configArea,
    statistics,
    responsive,
    setResponsive,
  };
};

export default usePage;
