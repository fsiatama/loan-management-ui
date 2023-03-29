import React from 'react';
import * as WebDataRocks from 'react-webdatarocks';
import 'webdatarocks/webdatarocks.css';

interface IPivotTableProps {
  report: any;
}

const PivotTable: React.FC<IPivotTableProps> = ({ report }) => {
  const ref: React.RefObject<WebDataRocks.Pivot> = React.useRef<WebDataRocks.Pivot>(null);

  const onReportComplete = () => {
    if (ref.current) {
      ref.current.webdatarocks.off('reportcomplete');
      //console.log(ref.current.webdatarocks);
    }
  };

  return (
    <>
      {' '}
      {report && (
        <WebDataRocks.Pivot
          ref={ref}
          width="100%"
          height={630}
          toolbar={false}
          reportcomplete={() => onReportComplete()}
          report={report}
          global={{
            options: {
              configuratorButton: false,
              showDrillThroughConfigurator: false,
              showEmptyData: false,
              grid: {
                showTotals: 'off',
                type: 'compact',
                showFilter: true,
              },
            },
          }}
        ></WebDataRocks.Pivot>
      )}
    </>
  );
};

export default PivotTable;
