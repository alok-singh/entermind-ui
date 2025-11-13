import { CHART_COLOR_LIST } from "../config/vars";
import { averagePercentageIncrease, convertNumberToString } from "../utils/parse.util";

const getQuarterFromMonth = (month) => {
  return month <= 3 ? 1 : month <= 6 ? 1 : month <= 9 ? 3 : 4;
};

const calculateSumOfKeyValue = (data, key = 'annualizedCost') => {
  const sum = data?.reduce?.((sum, item) => sum + item[key], 0);
  return sum || 0;
}

const getIconFromCategory = (category) => {
  const matchString = category.toLowerCase();
  if (matchString.indexOf('license') !== -1) {
    return 'fileText';
  }
  if (matchString.indexOf('human') !== -1 || matchString.indexOf('professional') !== -1) {
    return 'users';
  }
  if (matchString.indexOf('network') !== -1) {
    return 'network';
  }
  if (matchString.indexOf('data') !== -1 || matchString.indexOf('storage') !== -1) {
    return 'database';
  }
  if (matchString.indexOf('compute') !== -1) {
    return 'cpu';
  }
  if (matchString.indexOf('observability') !== -1) {
    return 'cloud'
  }
  if (matchString.indexOf('api') !== -1) {
    return 'layers'
  }
  if (matchString.indexOf('ai') !== -1) {
    return 'brain';
  }

  return 'webhook';

}

const groupByOnKey = (array, key) => {
  return array.reduce((acc, item) => {
    acc[item[key]] = acc[item[key]] ? acc[item[key]] : [];
    acc[item[key]].push(item);
    return acc;
  }, {});
}

const checkArrayTrend = (list, key) => {
  if (!Array.isArray(list) || list.length < 2) {
    return "stable"; // Single element or invalid input treated as stable
  }

  const arr = key ? list.map(item => item[key]) : list;

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      isDecreasing = false;
    } else if (arr[i] < arr[i - 1]) {
      isIncreasing = false;
    }
  }

  if (isIncreasing && !isDecreasing) return "increasing";
  if (!isIncreasing && isDecreasing) return "decreasing";
  return "stable";
}

/**
* Determines the trend of values over time.
* @param {Array<{ annualizedCost: number, startDate: Date, endDate: Date }>} data
* @returns {'increasing' | 'decreasing' | 'stable'}
*/
const extractIntervalCosts = (data, key = 'annualizedCost') => {
  if (!Array.isArray(data) || data.length < 2) {
    return 'stable'; // Not enough data to determine trend
  }

  const allDates = data.flatMap(item => {
    return [
      { date: item.startDate, cost: item[key] },
      { date: item.endDate, cost: (-1) * item[key] },
    ]
  }).sort((a, b) => {
    return (new Date(a.date)).getTime() - (new Date(b.date)).getTime() > 0 ? 1 : -1;
  });

  const list = [0];
  let currentDate = allDates[0].date;
  for (let index = 0; index < allDates.length; index++) {
    if (currentDate === allDates[index].date) {
      list[list.length - 1] = list[list.length - 1] + allDates[index].cost;
    } else if ((new Date(allDates[index].date)).getTime() >= Date.now()) {
      break;
    } else {
      currentDate = allDates[index].date;
      list.push(list[list.length - 1] + allDates[index].cost);
    }
  }

  return list;
}

const getCostBreakdownChart = (costData) => {
  const costMap = groupByOnKey(costData, 'category');
  const plotList = Object.keys(costMap).map((category) => {
    return {
      label: category,
      value: costMap[category]?.reduce?.((sum, item) => sum + item.annualizedCost, 0)
    }
  }).sort((a, b) => b.value - a.value).slice(0, 10);
  return {
    id: "categoryBreakdown",
    title: "Category Breakdown",
    type: "bar",
    data: {
      labels: plotList.map(item => item.label),
      datasets: [
        {
          label: "Yearly Cost",
          data: plotList.map(item => item.value),
          backgroundColor: '#06f',
          borderRadius: 5
        }
      ]
    },
    options: {
      scales: {
        y: { // Y-axis
          ticks: {
            callback: (value, index, ticks) => {
              // Custom formatting for Y-axis labels
              return convertNumberToString(value);
            }
          }
        },
        x: {
          ticks: {
            font: { size: 10 },
          }
        },
      }
    }
  }
}

const getCostDistributionChart = (costData) => {
  const costMap = groupByOnKey(costData, 'category');
  const plotList = Object.keys(costMap).map((category) => {
    return {
      label: category,
      value: costMap[category]?.reduce?.((sum, item) => sum + item.annualizedCost, 0)
    }
  }).sort((a, b) => b.value - a.value).slice(0, 10);
  return {
    id: "costDistribution",
    title: "Cost by Category",
    type: "treemap",
    data: {
      labels: plotList.length ? plotList.map(item => item.label) : [],
      datasets: [
        {
          tree: plotList.length ? plotList.map(item => item.value) : [],
          labels: {
            display: true,
            formatter: (context) => {
              return plotList[context.index].label;
            },
            color: '#fff',
            font: {
              size: 10,
              weight: 'bold'
            }
          },
          backgroundColor(context) {
            return CHART_COLOR_LIST[context.dataIndex]
          },
          captions: {
            display: true,
            formatter(ctx) {
              return ctx.type === 'data' ? 'G: ' + ctx.raw.g : '';
            }
          },
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
};

const getCostBreakDown = (costData, anomalies) => {
  const totalCost = calculateSumOfKeyValue(costData);
  const categoryMap = groupByOnKey(costData, 'category');

  return {
    breakdownList: Object.keys(categoryMap).map(category => {
      const sum = calculateSumOfKeyValue(categoryMap[category]);
      const matchingAnomalies = anomalies.filter(anomaly => anomaly.category === category);
      const totalPotentialAdditionalCost = calculateSumOfKeyValue(matchingAnomalies, 'additionalMonthlyCost');
      const potentialSavingPercent = sum === 0 ? 0 : (totalPotentialAdditionalCost / sum);
      const subcategoryMap = groupByOnKey(categoryMap[category], 'subcategory');
      return {
        value: sum,
        icon: getIconFromCategory(category),
        iconProps: { className: 'text-[#06f] w-8 h-8 p-2 rounded-lg bg-[linear-gradient(to_right_bottom,#0066ff33_0%,#00d68f33_100%)]' },
        textLeftTop: category,
        textLeftBottom: `${convertNumberToString(sum)} annually • ${(100 * sum / totalCost).toFixed(2)}% of total`,
        textRightTop: `${convertNumberToString((sum * potentialSavingPercent).toFixed(2))} savings`,
        textRightBottom: `${(potentialSavingPercent * 100).toFixed(2)}% reduction possible`,
        details: Object.keys(subcategoryMap).map(subcategory => {
          const intervalCostList = extractIntervalCosts(subcategoryMap[subcategory], 'annualizedCost');
          return {
            name: subcategory,
            status: checkArrayTrend(intervalCostList),
            amount: convertNumberToString(calculateSumOfKeyValue(subcategoryMap[subcategory]))
          }
        })
      }
    }).sort((a, b) => b.value - a.value)
  };
};

const getTrend = (costData) => {
  const costDataMap = costData.reduce((acc, cost) => {
    const [year, month] = cost.startDate.split('-').slice(0, 2);
    const quarter = getQuarterFromMonth(month);

    const yearKey = year;
    const monthKey = `${year}${month}`;
    const quarterKey = `${year}${quarter}`;

    acc.yearly[yearKey] = acc.yearly[yearKey] ? acc.yearly[yearKey] + cost.annualizedCost : cost.annualizedCost;
    acc.quarterly[quarterKey] = acc.quarterly[quarterKey] ? acc.quarterly[quarterKey] + cost.monthlyCost : cost.monthlyCost;
    acc.monthly[monthKey] = acc.yearly[monthKey] ? acc.yearly[monthKey] + cost.monthlyCost : cost.monthlyCost;

    return acc;
  }, { yearly: {}, quarterly: {}, monthly: {} });

  return {
    yearly: averagePercentageIncrease(Object.keys(costDataMap.yearly).filter(key => costDataMap.yearly[key]).sort((a, b) => a - b).map(key => costDataMap.yearly[key])),
    quarterly: averagePercentageIncrease(Object.keys(costDataMap.quarterly).filter(key => costDataMap.quarterly[key]).sort((a, b) => a - b).map(key => costDataMap.quarterly[key])),
    monthly: averagePercentageIncrease(Object.keys(costDataMap.monthly).filter(key => costDataMap.monthly[key]).sort((a, b) => a - b).map(key => costDataMap.monthly[key])),
  }
}

/**
 * @param {{costData: Array, anomalies: Array}} state
 * @returns 
 */
export const getCostPageData = (state) => {
  const costTotal = calculateSumOfKeyValue(state.costData, 'annualizedCost');
  const totalAnomaliesAdditionalCost = calculateSumOfKeyValue(state.anomalies, 'additionalMonthlyCost');
  const highPriorityAnomalies = state.anomalies.filter(item => item.priority === 'high');
  const { yearly, quarterly, monthly } = getTrend(state.costData);
  return {
    metricSection: {
      icon: "dollar",
      iconProps: { height: "21px", width: "21px", color: "#06f" },
      sectionTitle: "Cost Intelligence",
      sectionDescription: "AI-Powered Total Cost of Ownership Analysis",
      badgeTitle: "Live Data Connected",
      badgeIcon: "activity",
      badgeIconProps: {
        color: "#00d68f",
        height: "10.5px",
        width: "10.5px"
      },
      buttons: [
        {
          className: "w-full flex items-center gap-[5px] border border-[#e2e8f0] px-2 py-1 text-[12px] rounded-[7px] hover:bg-[#00d68f] hover:text-white",
          text: "Refresh",
          icon: "refresh",
          iconProps: { width: "14px", height: "14px" }
        },
        {
          className: "w-full flex items-center gap-[5px] border border-[#e2e8f0] px-2 py-1 text-[12px] rounded-[7px] hover:bg-[#00d68f] hover:text-white",
          text: "Export",
          icon: "download",
          iconProps: { width: "14px", height: "14px" }
        }
      ],
      cards: {
        totalAnnualCost: {
          title: "Total Annual Cost",
          titleClassName: "text-xs text-[#5c6370]",
          cardClassName: "text-card-foreground flex flex-col rounded-xl border bg-gradient-to-br from-[#0066ff]/10 to-transparent border-[#0066ff]/20",
          value: convertNumberToString(costTotal),
          valueClassName: "text-2xl mt-[32px]",
          description: "2.3% vs last year",
          descriptionClassName: "text-[10.5px] text-[#5c6370] mt-2"
        },
        optimizationPotential: {
          title: "Optimization Potential",
          titleClassName: "text-xs text-[#5c6370]",
          value: convertNumberToString(totalAnomaliesAdditionalCost),
          description: `${(100 * totalAnomaliesAdditionalCost / costTotal).toFixed(2)}% total savings possible`,
          cardClassName: "text-card-foreground flex flex-col rounded-xl border bg-gradient-to-br from-[#00d68f]/10 to-transparent border-[#00d68f]/20",
          valueClassName: "text-2xl text-[#00d68f] mt-[32px]",
          descriptionClassName: "text-[10.5px] text-[#5c6370] mt-2"
        },
        activeAnomalies: {
          title: "Active Anomalies",
          titleClassName: "text-xs text-[#5c6370]",
          value: state.anomalies.length,
          description: `${highPriorityAnomalies.length} critical/high priority`,
          cardClassName: "text-card-foreground flex flex-col rounded-xl border bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20",
          valueClassName: "text-2xl mt-[32px]",
          descriptionClassName: "text-[10.5px] text-[#5c6370] mt-2"
        },
        aiRecommendations: {
          title: "AI Recommendations",
          titleClassName: "text-xs text-[#5c6370]",
          value: "3",
          description: "2 Quick Wins available",
          cardClassName: "text-card-foreground flex flex-col rounded-xl border bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20",
          valueClassName: "text-2xl mt-[32px]",
          descriptionClassName: "text-[10.5px] text-[#5c6370] mt-2"
        }
      }
    },
    tabsSection: [{ title: "TCO Overview" }, { title: "Category Breakdown" }, { title: "Anomalies" }, { title: "AI Recommendations" }],
    costOverview: {
      chartSection: {
        costDistribution: getCostDistributionChart(state.costData),
        categoryBreakdown: getCostBreakdownChart(state.costData)
      },
      costTrendSection: {
        trends: [
          { label: "Month-over-Month", value: monthly.toFixed(2) },
          { label: "Quarter-over-Quarter", value: quarterly.toFixed(2) },
          { label: "Year-over-Year", value: yearly.toFixed(2) }
        ]
      }
    },
    costBreakdown: getCostBreakDown(state.costData, state.anomalies),
    anomalySection: {
      alertCard: state.anomalies.map(item => item).sort((a, b) => {
        if (a.priority === 'high' && b.priority === 'info') {
          return -1;
        }
        if (a.priority === 'info' && b.priority === 'high') {
          return 1;
        }
        if (a.priority === 'high' && b.priority === 'high') {
          return a.additionalMonthlyCost - b.additionalMonthlyCost > 0 ? -1 : 1;
        }
        return 0;
      }).map(item => {
        return {
          headerIcons: "alertTriangle",
          headerIconProps: { color: "#f36", width: "17.5px", height: "17.5px" },
          title: item.category,
          severity: item.priority,
          detectedAt: item.startDate,
          description: item.title,
          subDescription: item.description,
          normalValue: convertNumberToString(item.normalValue),
          currentValue: convertNumberToString(item.actualValue),
          impact: `+${convertNumberToString(item.additionalMonthlyCost)} projected monthly overspend`,
          recommendation: item.recommendation
        }
      }).slice(0, 10)
    },
    recommendationSection: {
      recommendations: [
        {
          tags: ["Priority 1", "Quick Win"],
          status: "pending",
          title: "Implement Smart Model Routing (65% GPT-4 → GPT-4o)",
          description: "AI detected 65% of GPT-4 calls have complexity scores <0.6, suitable for GPT-4o with 50% cost savings.",
          annualSavings: "$345K",
          npv: "$925K",
          paybackPeriod: "0.2 months",
          confidence: "96%",
          duration: "2 days",
          cost: "$15K cost",
          effort: "Low effort",
          primaryColor: "blue-500",
          secondaryColor: "gray-800"
        },
        {
          tags: ["Priority 2", "Big bet"],
          status: "pending",
          title: "Deploy Semantic Caching (42% Redundancy Elimination)",
          description: "Pattern analysis shows 42% of embedding requests are duplicates within 7-day windows.",
          annualSavings: "$221K",
          npv: "$585K",
          paybackPeriod: "1.2 months",
          confidence: "93%",
          duration: "5 days",
          cost: "$45K cost",
          effort: "Medium effort",
          primaryColor: "blue-500",
          secondaryColor: "gray-800"
        },
        {
          tags: ["Priority 3", "Quick Win"],
          status: "in-progress",
          title: "Prompt Template Optimization (28% Token Reduction)",
          description: "AI analyzed 125K prompts and identified verbose patterns. Optimized templates maintain 99.2% quality.",
          annualSavings: "$180K",
          npv: "$475K",
          paybackPeriod: "0.8 months",
          confidence: "97%",
          duration: "3 days",
          cost: "$22K cost",
          effort: "Low effort",
          primaryColor: "blue-500",
          secondaryColor: "gray-800"
        }
      ]
    }
  }

}
