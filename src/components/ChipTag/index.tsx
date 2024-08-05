import React from "react";

import Chip from "@mui/material/Chip";

export default function ChipTag(props: any) {
  const { option, getTagProps = {}, handleTagClick, onDeleteTag } = props;
  let categoryColor = "default";
  let colorSx = {};
  if (option?.categoryColor?.startsWith("#")) {
    colorSx = {
      color: option.categoryColor,
      borderColor: option.categoryColor,
    };
  } else {
    categoryColor = option.categoryColor;
  }
  const component = (
    <div className="flex text-lg text-gray-900">
      {option.categoryName} {option.comparator.label}
      <div className={`font-bold ml-1`}>#{option.tagName}</div>
    </div>
  );
  return (
    <Chip
      color={categoryColor}
      //   component={component}
      //   label={`${option.categoryName} : #${option.tagName}`}
      label={component}
      key={option.tagName}
      size="large"
      {...getTagProps}
      sx={{ ...colorSx, borderRadius: 1, paddingY: 2 }}
      variant="outlined"
      onClick={handleTagClick}
      onDelete={onDeleteTag}
    />
  );
}
