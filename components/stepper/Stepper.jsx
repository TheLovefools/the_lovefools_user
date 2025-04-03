'use client'
import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import TableRowsIcon from '@mui/icons-material/TableRows';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  ...(theme.palette.mode === "dark" && {
    color: theme.palette.grey[700],
  }),
  ...(ownerState.active && {
    color: "#784af4",
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...(theme.palette.mode === "dark" && {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(theme.palette.mode === "dark" && {
    backgroundColor: theme.palette.grey[700],
  }),
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <QueryBuilderIcon />,
    2: <TableRowsIcon />,
    3: <DinnerDiningIcon />,
    4: <PermPhoneMsgIcon />,
    5: <CurrencyRupeeIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function CustomizedSteppers({activeTab}) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeTab}
        connector={<ColorlibConnector />}
      >
        {Array.from({length:5}).map((_,index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={ColorlibStepIcon} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
