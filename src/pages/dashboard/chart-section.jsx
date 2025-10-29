import Chart from "../../components/chart";

const ChartSection = (props) => {
  return (
    <div className="max-w-[1400px] mx-auto p-8 grid gap-3.5 grid-cols-2">
      {props.chartList.map((chart) => {
        return <Chart key={chart.id} {...chart} />;
      })}
    </div>
  );
};

export default ChartSection;
