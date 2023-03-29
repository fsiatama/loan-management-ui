import { getStatistics as getLoansStatistics } from '@/services/api/loans/api';
import { getStatistics } from '@/services/api/transactions/api';
import { useEffect, useState } from 'react';

const usePage = () => {
  const [responsive, setResponsive] = useState<boolean>(false);
  const [report, setReport] = useState<API.PivotReport>();
  const [loansReport, setLoansReport] = useState<API.PivotReport>();
  const [statistics, setStatistics] = useState<API.Balance>();
  const [pieRemaining, setPieRemaining] = useState<any>();
  const [piePayments, setPiePayments] = useState<any>();
  const [piePrincipal, setPiePrincipal] = useState<any>();
  const [pieInterest, setPieInterest] = useState<any>();

  const pieConfig = {
    percent: 0.25,
    width: 69,
    height: 69,
    outline: {
      border: 4,
      distance: 1,
    },
    padding: 0,
    wave: {
      length: 113,
    },
    statistic: {
      content: {
        style: {
          fontSize: '12px',
          color: '#4B535E',
        },
      },
    },
  };

  useEffect(() => {
    getLoansStatistics().then((res) => {
      const { detailed } = res;
      setStatistics(res);
      setPieRemaining({
        ...pieConfig,
        percent: 1 - res.amountPaid / res.loansAmount,
        theme: {
          styleSheet: {
            brandColor: '#F4664A',
          },
        },
      });
      setPiePayments({
        ...pieConfig,
        percent: res.amountPaid / res.loansAmount,
      });
      setPiePrincipal({
        ...pieConfig,
        percent: res.amountToPrincipal / res.amountPaid,
        theme: {
          styleSheet: {
            brandColor: '#30BF78',
          },
        },
      });
      setPieInterest({
        ...pieConfig,
        percent: res.amountToInterest / res.amountPaid,
        theme: {
          styleSheet: {
            brandColor: '#FAAD14',
          },
        },
      });

      const loansRep = {
        dataSource: {
          data: detailed,
        },
        slice: {
          rows: [
            {
              uniqueName: 'BORROWER',
            },
            {
              uniqueName: 'LOAN ID',
            },
          ],
          columns: [],
          measures: [
            {
              uniqueName: 'LOAN AMOUNT',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
            {
              uniqueName: 'AMOUNT PAID',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
            {
              uniqueName: 'INTEREST',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
            {
              uniqueName: 'PRINCIPAL',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
            {
              uniqueName: 'BALANCE',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
          ],
        },
        formats: [
          {
            thousandsSeparator: ',',
            decimalSeparator: '.',
            decimalPlaces: 2,
            currencySymbol: '$',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
        ],
      };
      setLoansReport(loansRep);
    });
    getStatistics().then((res) => {
      const report = {
        dataSource: {
          data: res,
        },
        slice: {
          rows: [
            {
              uniqueName: 'concept',
            },
            {
              uniqueName: 'date.Year',
            },
          ],
          columns: [
            {
              uniqueName: 'date.Month',
            },
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'amount',
              aggregation: 'sum',
              format: '5dbga6vw',
            },
          ],
        },
        formats: [
          {
            thousandsSeparator: ',',
            decimalSeparator: '.',
            decimalPlaces: 2,
            currencySymbol: '$',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
        ],
      };
      setReport(report);
    });
  }, []);

  return {
    report,
    loansReport,
    statistics,
    pieRemaining,
    piePayments,
    piePrincipal,
    pieInterest,
    responsive,
    setResponsive,
  };
};

export default usePage;
