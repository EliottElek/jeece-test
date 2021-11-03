import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function DotsMobileStepper({
  handleNext,
  handleBack,
  activeStep,
  disabled,
}) {
  const theme = useTheme();

  return (
    <MobileStepper
      variant="dots"
      steps={4}
      position="static"
      activeStep={activeStep}
      sx={{ flexGrow: 1 }}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === 3 || disabled}
        >
          suivant
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          précecent
        </Button>
      }
    />
  );
}
