import { loanProjection, loanStatement } from '@/services/api/loans/api';
import { useEffect, useState } from 'react';

type CurrentEntity = API.CurrentProjection;

const getProjection = async (loanId: string): Promise<CurrentEntity[]> => {
  const companies = await loanProjection({ id: loanId });
  if (companies) {
    return companies;
  }
  return [];
};

type Props = {
  loan: API.CurrentLoan | undefined;
};
const useProjection = ({ loan }: Props) => {
  const [projectionList, setProjectionList] = useState<CurrentEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const proyection = await getProjection(loan?.id ?? '');
      setProjectionList(proyection);
    };
    if (loan) {
      fetchData();
    }
  }, [loan]);

  const _handleDownload = async (currentRow: CurrentEntity) => {
    if (currentRow) {
      const result = await loanStatement({ id: loan?.id ?? '', date: currentRow.date });
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = `${loan?.borrower1.lastName} - ${currentRow.date}`;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(result);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        //navigator.msSaveBlob(result, 'test');
      }
    }
    return true;
  };

  return {
    projectionList,
    _handleDownload,
  };
};

export default useProjection;
