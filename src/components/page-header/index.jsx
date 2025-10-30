import { Activity } from 'lucide-react';
import iconMap from '../../icons/lucid-icons';
import Button from '../button';

const PageHeader = (props) => {
  return (
    <div className="flex items-start justify-between mb-[21px]">
      <div className="left-section">
        <div className="flex items-center gap-3 mb-2">
          {props.icon && (
            <div className="p-2.5 bg-linear-to-br from-[#0066ff]/20 to-[#00d68f]/20 rounded-xl backdrop-blur-sm border border-[#0066ff]/30">
              {iconMap[props.icon](props.iconProps)}
            </div>
          )}
          <div className="text-wrapper">
            <h1 className="text-[#0066ff] text-[14px]">{props.sectionTitle}</h1>
            <div className="text-sm text-muted-foreground mt-1">{props.sectionDescription}</div>
          </div>
        </div>
        {props.badgeTitle && (
          <div className="flex items-center gap-1 text-[#00d68f] border border-[#00d68f4d] w-fit px-2 text-[10.5px] rounded-[7px]">
            {props.badgeIcon && iconMap[props.badgeIcon](props.badgeIconProps)}
            <span>{props.badgeTitle}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {props.buttons &&
          props.buttons.map((button) => {
            return (
              <Button className={button.className}>
                {button.icon ? iconMap[button.icon](button.iconProps) : null} {button.text}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default PageHeader;
