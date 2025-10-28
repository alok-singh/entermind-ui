import { Download, FileCheck, Info } from "lucide-react";
import Badge from "../../components/badge";
import Card from "../../components/card";
import iconMap from "../../icons/lucid-icons";
import Button from "../../components/button";
import { downloadFile } from "../../utils/helper.util";

const DescriptionCard = (props) => {
  return (
    <Card className="bg-linear-to-br from-[#0066ff0d] to-transparent border-2 border-[#0066ff]/20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {iconMap[props.icon](props.iconProps)}
          <h4 className="text-[14px]">{props.title}</h4>
        </div>
        <Badge
          text={props.badgeText}
          className="text-[#06f] border border-[#0066ff1a]"
        />
      </div>
      <div className="mt-2 text-[#5c6370] text-[14px]">{props.description}</div>
    </Card>
  );
};

const GuidCard = (props) => {
  return (
    <Card className="border border-[#e2e8f0]">
      <div className="flex items-center gap-2 pt-2 pl-2 pr-2 pb-8">
        {iconMap[props.icon](props.iconProps)}
        <h4 className="text-[14px]">{props.sectionTitle}</h4>
      </div>
      <div className="pb-2 pl-2 pr-2 grid grid-cols-3 gap-6">
        {props.steps.map((step, index) => {
          return (
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#0066ff] to-[#00d68f] flex items-center justify-center text-white font-semibold shrink-0">
                {index + 1}
              </div>
              <div className="text">
                <div className="text-[14px] font-semibold mb-1">
                  {step.title}
                </div>
                <div className="text-[12px] text-[#5c6370] leading-relaxed">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const TemplateCard = (props) => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-[21px] mb-[21px]">
      {props.cards.map((card, index) => {
        return (
          <Card
            className="border border-[#e2e8f0]"
            key={`template-card-${index}`}
          >
            <div className="p-1.5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0066ff]/10 to-[#00d68f]/10 flex items-center justify-center">
                  {iconMap[card.icon](card.iconProps)}
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <Badge
                    className="border border-[#e2e8f0] inline-block"
                    text={card.badgeText}
                  />
                </div>
              </div>
              <p className="line-height-[21px] text-[14px] text-[#5c6370] mb-8">
                {card.description}
              </p>
              {card?.additionalParams?.map((param) => {
                return (
                  <div className="flex items-center justify-between mb-[7px]" key={`${param.key}-${index}`}>
                    <div className="text-[#5c6370] text-[12.25px]">
                      {param.key}
                    </div>
                    <div className="font-medium text-[12.25px]">
                      {param.value}
                    </div>
                  </div>
                );
              })}
              <div className="h-px bg-[#e2e8f0] mb-2.5"></div>
              <Button className="w-full text-white bg-[#06f] text-[12.25px] flex items-center justify-center gap-4 p-[7px] mb-[7px]" onClick={() => downloadFile(card.downloadFileLink)}>
                <Download width="14px" height="14px" color="#fff" />
                Download Empty Template
              </Button>
              <Button className="w-full text-[#0f1419] text-[12.25px] border border-[#e2e8f0] flex items-center justify-center gap-4 p-[7px] mb-[7px]">
                <FileCheck width="14px" height="14px" color="#0f1419" />
                Download with Sample Data
              </Button>
              <div className="bg-[#f7f9fb] text-[#5c6370] text-[10.5px] flex items-center justify-center gap-4 p-[7px]">
                <Info width="14px" height="14px" color="#5c6370" />
                Includes validation rules, examples, and field descriptions
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const TemplateSection = (props) => {
  return (
    <div className="mt-2">
      <DescriptionCard {...props.descriptionCard} />
      <TemplateCard cards={props.cardSection} />
      <GuidCard {...props.guideSection} />
    </div>
  );
};

export default TemplateSection;
