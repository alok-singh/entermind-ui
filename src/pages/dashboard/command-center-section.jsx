import {
  ArrowUpRight,
  ChartColumnStacked,
  Clock,
  DollarSign,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import Card from "../../components/card";

const CommandCenterCard = (props) => {
  return (
    <Card className={props.cardBackgroundClassName}>
      <div
        className={`${props.iconBackgroundClassName} w-[42px] h-[42px] flex items-center justify-center rounded-xl`}
      >
        {props.primaryIcon}
      </div>
      <div className="absolute right-4 top-4 text-[10.5px] border border-[rgb(226,232,240)] px-2.5 py-0.5 rounded-[7px]">
        {props.badgeText}
      </div>
      <div className="text-[32px] font-semibold">{props.highlight}</div>
      <div className="description-section">
        <div
          className={`${props.secondaryTextClassName} flex gap-[7px] text-[12px] items-center`}
        >
          {props.secondaryIcon} {props.message}
        </div>
        <div className="text-[10.5px] mt-[7px] text-[oklch(0.446_0.03_256.802)]">{props.description}</div>
        {props.progress ? (
          <div>
            <div className="flex items-center justify-between text-[12px] text-[oklch(0.446_0.03_256.802)] mb-1">
              <div className="text-[10px]">Progress</div>
              <div className="progress-value">
                {Math.floor(props.progress)}%
              </div>
            </div>
            <div className="h-1.5 bg-[#aaa] rounded-[10px] overflow-hidden">
              <div
                className="bg-[#ff6900] h-1.5"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const TitleSection = (props) => {
  return (
    <div className="flex items-baseline justify-between">
      <div className="mb-7">
        <div className="text-[32px] font-semibold mb-1">
          {props.sectionTitle}
        </div>
        <div className="text-[14px] text-[#4a5565]">
          {props.sectionDescription}
          {props.lastUpdateTime}
        </div>
      </div>
      <div className="p-3 rounded-full bg-white cursor-pointer">
        <RefreshCcw style={{ width: "16px", height: "16px" }} />
      </div>
    </div>
  );
};

const CommandCenterSection = (props) => {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <TitleSection {...props} />
      <div className="grid gap-6 grid-cols-4">
        <CommandCenterCard
          {...props.totalCost}
          cardBackgroundClassName="bg-gradient-to-br from-[oklab(0.623_-0.0378409_-0.210628/0.1)] to-[oklab(0.715_-0.116822_-0.0824726/0.05)]"
          iconBackgroundClassName="bg-gradient-to-br from-[#007AFF] to-[#0051D5]"
          secondaryTextClassName="text-[oklch(0.627_0.194_149.214)]"
          primaryIcon={<DollarSign color="#fff" />}
          secondaryIcon={
            <TrendingDown
              color="oklch(0.627 0.194 149.214)"
              style={{ width: "14px", height: "14px" }}
            />
          }
        />
        <CommandCenterCard
          {...props.target}
          cardBackgroundClassName="bg-gradient-to-br from-[oklab(0.723_-0.18885_0.110891/0.1)] to-[oklab(0.696_-0.162114_0.0511765/0.05)]"
          iconBackgroundClassName="bg-gradient-to-br from-[#34C759] to-[#28A745]"
          secondaryTextClassName="text-[oklch(0.446_0.03_256.802)]"
          primaryIcon={<TrendingUp color="#fff" />}
          secondaryIcon={<Target style={{ width: "14px", height: "14px" }} />}
        />
        <CommandCenterCard
          {...props.breakEven}
          cardBackgroundClassName="bg-gradient-to-br from-[oklab(0.627_0.147802_-0.219953/0.1)] to-[oklab(0.656_0.239812_-0.0239026/0.05)]"
          iconBackgroundClassName="bg-gradient-to-br from-[#AF52DE] to-[#8E44AD]"
          secondaryTextClassName="text-[oklch(0.446_0.03_256.802)]"
          primaryIcon={<Sparkles color="#fff" />}
          secondaryIcon={
            <ArrowUpRight
              color="rgb(0, 102, 255)"
              style={{ width: "14px", height: "14px" }}
            />
          }
        />
        <CommandCenterCard
          {...props.burnRate}
          cardBackgroundClassName="bg-gradient-to-br from-[oklab(0.705_0.143615_0.157301/0.1)] to-[oklab(0.769_0.0640531_0.176752/0.05)]"
          iconBackgroundClassName="bg-gradient-to-br from-[#FF9500] to-[#FF6B00]"
          secondaryTextClassName="text-[oklch(0.446_0.03_256.802)]"
          primaryIcon={<Clock color="#fff" />}
          secondaryIcon={
            <ChartColumnStacked style={{ width: "14px", height: "14px" }} />
          }
        />
      </div>
    </div>
  );
};

export default CommandCenterSection;
