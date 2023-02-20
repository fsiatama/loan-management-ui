import { loanProjection, loanStatement } from '@/services/api/loans/api';
import { useState } from 'react';

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
  const [modalPDFOpen, setModalPDFOpen] = useState<boolean>(false);
  const [pdfSrc, setPdfSrc] = useState('');

  const _projectionRequest = async () => {
    const proyection = loan?.id ? await getProjection(loan.id) : [];
    return {
      data: proyection,
      // Please return true for success.
      // otherwise the table will stop parsing the data, even if there is data
      success: true,
      // not passed will use the length of the data, if it is paged you must pass
      total: proyection.length,
    };
  };

  const _handleDownload = async (currentRow: CurrentEntity) => {
    if (currentRow) {
      const result = await loanStatement({ id: loan?.id ?? '', date: currentRow.date });

      const pdfUrl = URL.createObjectURL(result);
      setPdfSrc(pdfUrl);
      setModalPDFOpen(true);

      /*if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = `${loan?.borrower1.lastName} - ${currentRow.date}`;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(result);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        //navigator.msSaveBlob(result, 'test');
      }*/
    }
    return true;
  };

  return {
    modalPDFOpen,
    setModalPDFOpen,
    pdfSrc,
    _projectionRequest,
    _handleDownload,
  };
};

export default useProjection;
