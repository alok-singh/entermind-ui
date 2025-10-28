import { ArrowUpRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";

const PromotionalWidgetSection = (props) => {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <Card className="bg-[linear-gradient(to_right,oklch(0.546_0.245_262.881)_0%,oklch(0.558_0.288_302.321)_100%)] py-7 pr-7 pb-7 pl-[21px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[21px] text-white">
            <div className="p-[12.5px] rounded-full bg-[rgba(255,255,255,0.2)]">
              <Brain width="24px" height="24px" color="#fff" />
            </div>
            <div>
              <div className="text-[21px] font-semibold mb-1">
                {props.sectionTitle}
              </div>
              <div className="text-[14px] text-[#dbeafe] font-extralight">
                {props.sectionDescription}
              </div>
            </div>
          </div>
          <Link
            className="flex items-center justify-between text-white text-[12.25px] font-extralight py-[7px] px-[15px] bg-[rgba(255,255,255,0.2)] rounded-[7px] gap-3"
            to={props.link}
          >
            <div className="link-text">{props.linkText}</div>
            <ArrowUpRight width="14px" height="14px" />
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PromotionalWidgetSection;
