export type StatisticColor = 'primary' | 'error' | 'secondary' | 'success';

interface ConfigStatistic {
  id: number;
  name: string;
  title: string;
  color: StatisticColor;
}

export const statistics: ConfigStatistic[] = [
  {
    id: 1,
    name: 'protein',
    title: 'medical-dashboard.protein',
    color: 'success',
  },
  {
    id: 2,
    name: 'fat',
    title: 'medical-dashboard.fat',
    color: 'error',
  },
  {
    id: 3,
    name: 'bones',
    title: 'medical-dashboard.bones',
    color: 'primary',
  },
  {
    id: 4,
    name: 'water',
    title: 'medical-dashboard.water',
    color: 'secondary',
  },
];
