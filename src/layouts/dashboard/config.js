import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ChatBubble from "@heroicons/react/24/solid/ChatBubbleBottomCenterIcon";
import Bolt from "@heroicons/react/24/solid/BoltIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Account & Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Keywords Ranking",
    path: "/keywords-ranking",
    icon: (
      <SvgIcon fontSize="small">
        <Bolt />
      </SvgIcon>
    ),
  },
  {
    title: "Projects & Reports",
    path: "/projects-and-reports",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Referral Code",
    path: "/referral-code",
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubble />
      </SvgIcon>
    ),
  },
];
