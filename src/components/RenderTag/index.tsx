import React from "react";
import { LoadingButton } from "@mui/lab";
import ChipTag from "../ChipTag";

export default function RenderTag(props: any) {
  const { option, handleOperatorClick, index, handleTagClick, onDeleteTag } =
    props;

  if (option?.operator) {
    return (
      <div className="mx-2">
        <LoadingButton
          color="info"
          variant="contained"
          onClick={() => handleOperatorClick(index)}
        >
          {option.label}
        </LoadingButton>
      </div>
    );
  }
  if (option?.parentheses) {
    return <></>;
  }

  return (
    <ChipTag
      option={option}
      // getTagProps={getTagProps({ index })}
      sx={{ marginX: 1 }}
      handleTagClick={() => handleTagClick(index)}
      onDeleteTag={() => onDeleteTag(index)}
    />
  );
}
