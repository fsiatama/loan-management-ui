import { loanProjection } from '@/services/api/loans/api';
import { useEffect, useState } from 'react';

const getTransactions = async (loanId: string): Promise<API.CurrentProjection[]> => {
  const companies = await loanProjection({ id: loanId });
  if (companies) {
    return companies;
  }
  return [];
};

type Props = {
  loanId: string;
};
const useProjection = ({ loanId }: Props) => {
  const [projectionList, setProjectionList] = useState<API.CurrentProjection[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const proyection = await getTransactions(loanId);
      setProjectionList(proyection);
    };
    if (loanId) {
      fetchData();
    }
  }, [loanId]);

  return {
    projectionList,
  };
};

export default useProjection;
