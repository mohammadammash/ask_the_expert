import { userType } from "../../hooks/UserContext";
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

export interface FilterPageTitleProps {
  textcolor_style: {
    color: string
  },
  cardbgcolor_style: {
    backgroundColor: string
  },
  shownUsersType: string,
  handleShownUsersType: (value: string) => void,
}

export interface UserCardProps {
  user: userType;
  key: number;
  reviews_average: number;
  bgcolor_style: { backgroundColor: string };
  textcolor_style: { color: string };
  handlePress: (user_id: string, firstName: string, isBanned: boolean) => void;
}