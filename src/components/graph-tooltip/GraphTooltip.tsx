import "./graph-tooltip.scss";

const GraphTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="graph-tooltip">
        <div>Date: {payload[0].payload.t.substring(0, 10)}</div>
        <div>Close price: ${payload[0].payload.c}</div>
      </div>
    );
  }
  return null;
};

export default GraphTooltip;
