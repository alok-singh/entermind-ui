import Empty from '../../components/empty';
import ExpendableCard from '../../components/expendable-card';

const CostBreakdownSection = (props) => {
  return (
    <div className="mt-6">
      {props.breakdownList.map((item) => {
        return <ExpendableCard {...item} className="mt-2" />;
      })}
      {props.breakdownList.length === 0 ? <Empty title="No data yet" className="p-10" description="Upload data to see results" /> : null}
    </div>
  );
};

export default CostBreakdownSection;
