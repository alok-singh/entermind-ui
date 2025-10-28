import { ArrowUpRight, Zap } from "lucide-react";
import Card from "../../components/card";
import Badge from "../../components/badge";

const colorMap = {
  critical: "bg-[rgb(255,51,102)]",
  high: "bg-[rgb(0,102,255)]",
};

const TitleSection = (props) => {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <div className="text-[17.5px] font-medium">{props.sectionTitle}</div>
      <div className="text-[10.5px] bg-[#f7f9fc] p-[1.75px] rounded-lg">
        {props.count} Active
      </div>
    </div>
  );
};

const CardsSection = (props) => {
  return (
    <div className="grid gap-3.5 grid-cols-3">
      {props.cards.map((item) => {
        return (
          <Card className="bg-white cursor-pointer group">
            <div className="flex items-center justify-between mb-3.5">
              <div className="w-[35px] h-[35px] bg-[linear-gradient(to_right_bottom,oklch(0.98_0.016_73.684)_0%,oklch(0.987_0.022_95.277)_100%)] flex items-center justify-center rounded-[9px] ">
                <Zap
                  color="#f54a00"
                  style={{ width: "17.5px", height: "17.5px" }}
                />
              </div>
              <Badge className={`text-white ${colorMap[item.type]}`} text={item.type} />
            </div>
            <div className="text-[14px] font-semibold mb-2 group-hover:text-[#007AFF]">
              {item.title}
            </div>
            <div className="mb-[13px] text-[12.25px] text-[#4a5565]">
              {item.description}
            </div>
            <div className="flex items-center justify-between">
              <div className="bottom-left">
                <div className="text-[#00a63e] text-[21px] font-semibold">
                  {item.amount}
                </div>
                <div className="text-[#6a7282] text-[10.5px]">
                  {item.savingDuration}
                </div>
              </div>
              <div className="bottom-right">
                <ArrowUpRight
                  color="rgb(0, 102, 255)"
                  style={{ width: "17.5px", height: "17.5px" }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const OpportunitySection = (props) => {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <TitleSection
        sectionTitle={props.sectionTitle}
        count={props.cards.length}
      />
      <CardsSection cards={props.cards} />
    </div>
  );
};

export default OpportunitySection;
