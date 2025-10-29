import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import Card from "../card";
import Badge from "../badge";

const Chart = (props) => {
  return (
    <Card className="bg-white border border-[#e2e8f0]">
      <div className="p-[7px]"></div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15.75px] font-semibold mb-[3.5px]">
            {props.title}
          </h3>
          {props.description ? (
            <div className="text-[12.25px]">{props.description}</div>
          ) : null}
        </div>
        {props.badgeText ? (
          <Badge className="border border-[#e2e8f0]" text={props.badgeText} />
        ) : null}
      </div>
      {props.type === "bar" ? <Bar data={props.data} options={props.options} /> : null}
      {props.type === "line" ? <Line data={props.data} options={props.options} /> : null}
      {props.type === "pie" ? (
        <Pie
          style={{ maxHeight: props.height }}
          data={props.data}
          options={props.options}
        />
      ) : null}
    </Card>
  );
};

export default Chart;
