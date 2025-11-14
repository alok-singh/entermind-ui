import { Chart as ChartJS } from 'chart.js/auto';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { Loader } from 'lucide-react';
import { Bar, Chart, Line, Pie } from 'react-chartjs-2';
import Badge from '../badge';
import Card from '../card';
import Empty from '../empty';

ChartJS.register(TreemapController, TreemapElement);

const CombinedChart = (props) => {
  return (
    <Card className="bg-white border border-[#e2e8f0] min-h-[400px]">
      <div className="p-[7px] flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15.75px] font-semibold mb-3">{props.title}</h3>
            {props.description && <div className="text-[12.25px]">{props.description}</div>}
          </div>
          {props.badgeText && <Badge className="border border-[#e2e8f0]" text={props.badgeText} />}
        </div>
        <div className="w-full flex items-center justify-center grow">
          {props.isLoading ? (
            <Loader className="animate-spin" />
          ) : props.isEmpty ? (
            <Empty title="No Data yet" />
          ) : props.type === 'bar' ? (
            <Bar data={props.data} options={props.options} />
          ) : props.type === 'line' ? (
            <Line data={props.data} options={props.options} />
          ) : props.type === 'pie' ? (
            <Pie data={props.data} options={props.options} />
          ) : props.type === 'treemap' ? (
            <Chart type="treemap" data={props.data} options={props.options} />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default CombinedChart;
