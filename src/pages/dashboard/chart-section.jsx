import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import Card from "../../components/card";
import Badge from "../../components/badge";

const Chart = (props) => {
  return (
    <Card className="bg-white">
      <div className="p-[7px]"></div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15.75px] font-semibold mb-[3.5px]">{props.title}</h3>
          <div className="text-[12.25px]">{props.description}</div>
        </div>
        <Badge className="border border-[#e2e8f0]" text={props.badgeText} />
      </div>
      {props.type === "bar" ? <Bar data={props.data} /> : null}
      {props.type === "line" ? <Line data={props.data} /> : null}
    </Card>
  );
};


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
