import ExpendableCard from "../../components/expendableCard";

const CostBreakdownSection = (props) => {
  return (
    <div className="mt-6">
      {props.breakdownList.map((item) => {
        return <ExpendableCard {...item} className="mt-2" />;
      })}
    </div>
  );
};

export default CostBreakdownSection;
