export interface FilterPageTitleProps {
  userType: string;
  handleShownUserType: (value: string) => void;
  route_name: string;
}

export interface ChartsUpperLegendProps {
  chart_type: string;
  dot1_title: string;
  dot2_title: string;
}