import { Chart as ChartJS } from 'chart.js/auto';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { Chart, Bar, Line, Pie } from 'react-chartjs-2';
import Card from '../card';
import Badge from '../badge';

ChartJS.register(TreemapController, TreemapElement);

const CombinedChart = (props) => {
  return (
    <Card className="bg-white border border-[#e2e8f0] min-h-[400px]">
      <div className="p-[7px]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15.75px] font-semibold mb-3">{props.title}</h3>
            {props.description && <div className="text-[12.25px]">{props.description}</div>}
          </div>
          {props.badgeText && <Badge className="border border-[#e2e8f0]" text={props.badgeText} />}
        </div>
        {props.type === 'bar' && <Bar data={props.data} options={props.options} />}
        {props.type === 'line' && <Line data={props.data} options={props.options} />}
        {props.type === 'pie' && <Pie data={props.data} options={props.options} />}
        {props.type === 'treemap' && <Chart type="treemap" data={props.data} options={props.options} />}
      </div>
    </Card>
  );
};

export default CombinedChart;
