"use client";

import React, { useMemo, useState } from "react";
import {
  parenthesesOptions,
  getNestedValue,
  getUpdatedValue,
  operatorOptions,
  addClosingParanthesis,
  getValueAfterComparatorChange,
  getValueAfterDeleting,
  getNextOperator,
  getNextComparator,
  colors,
  comparatorOptions,
  evaluateInfix,
  Op,
} from "./helper";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close,
  Done,
  PriorityHigh,
  Search,
  Settings,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import cloneDeep from "lodash/cloneDeep";
import RenderTag from "./components/RenderTag";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  PopperComponent,
  StyledInput,
  StyledPopper,
} from "./styled-autocomplete";
import Autocomplete, {
  AutocompleteCloseReason,
} from "@mui/material/Autocomplete";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton } from "@mui/material";

export default function Query(props: any) {
  const { optionsList, onSubmit, categoryList } = props;

  // const searchOptions = optionsList.map((ol: any) => ({
  //   ...ol,
  //   comparator: comparatorOptions[0],
  //   isTag: true,
  // }));

  const searchOptions = categoryList
    .map((cat: any) => [
      cat.tags.map((tag: any) => ({
        ...tag,
        categoryName: cat.categoryName,
        categoryColor: cat.categoryColor,
        categoryId: cat.categoryId,
        comparator: comparatorOptions[0],
        isTag: true,
      })),
    ])
    .flat(2)
    .sort((a: any, b: any) => {
      if (a.categoryId === b.categoryId) {
        if (a.tagName > b.tagName) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.categoryName > b.categoryName) {
          return 1;
        } else return -1;
      }
    });

  const [value, setValue] = useState<any[] | any>([
    // [
    //   comparatorOptions[0],
    //   searchOptions[0],
    //   operatorOptions[1],
    //   searchOptions[1],
    //   operatorOptions[0],
    //   [
    //     comparatorOptions[1],
    //     searchOptions[2],
    //     operatorOptions[0],
    //     searchOptions[3],
    //   ],
    //   operatorOptions[0],
    //   [
    //     comparatorOptions[0],
    //     searchOptions[2],
    //     operatorOptions[1],
    //     searchOptions[3],
    //   ],
    // ],
    [parenthesesOptions[0]],
  ]);

  const [querying, setQuerying] = useState(false);

  const handleOnChange = (selectedValue: any, curValue: any, level: any) => {
    // console.log(selectedValue, curValue, level);

    if (!selectedValue) {
      return;
    }

    const nestedValue = getNestedValue(value, level);

    if (selectedValue?.parentheses) {
      if (
        nestedValue.filter((nv: any) => nv?.parentheses !== true).length === 0
      ) {
        setValue(
          getUpdatedValue(
            curValue,
            [...nestedValue, [parenthesesOptions[0]]],
            level
          )
        );
      } else {
        setValue(
          getUpdatedValue(
            curValue,
            [...nestedValue, operatorOptions[0], [parenthesesOptions[0]]],
            level
          )
        );
      }
      return;
    }

    if (
      nestedValue.findIndex((val: any) => val.tagId === selectedValue.tagId) >
      -1
    ) {
      // handle delete operation
      return;
    }
    if (
      nestedValue.filter((nv: any) => nv?.parentheses !== true).length === 0
    ) {
      setValue(
        getUpdatedValue(
          curValue,
          [...getNestedValue(value, level), selectedValue],
          level
        )
      );
    } else {
      setValue(
        getUpdatedValue(
          curValue,
          [...getNestedValue(value, level), operatorOptions[0], selectedValue],
          level
        )
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row border-2 p-2 rounded-md justify-between border-cyan-600 bg-white">
        <div className="p-2 max-w-fit">
          <QueryBuilder
            searchOptions={searchOptions}
            value={value}
            setValue={setValue}
            level={[0]}
            handleOnChange={handleOnChange}
          />
        </div>
        <LoadingButton
          color="info"
          // fullWidth
          loading={querying}
          onClick={async () => {
            try {
              setQuerying(true);
              const deepCloneValue = cloneDeep(value[0]);
              deepCloneValue.forEach((val: any) => {
                if (Array.isArray(val) && val.length === 1) {
                  throw new Error(
                    "Please add at least one filter within every paranthesis!"
                  );
                }
              });
              addClosingParanthesis(deepCloneValue);
              const flatQuery = deepCloneValue.flat(Infinity);
              // console.log({ flatQuery });
              if (flatQuery?.length <= 2) {
                throw new Error("Please add at least one filter!");
              }
              const formatedQuery = flatQuery.map((q: any) => {
                if (q?.isTag && q.comparator.id === "!=") {
                  return { ...q, queryValue: { [Op.not]: q.tagId } };
                } else {
                  return { ...q, queryValue: q.tagId };
                }
              });
              const where = evaluateInfix(formatedQuery);
              onSubmit(flatQuery, where);
              setQuerying(false);
            } catch (e: any) {
              setQuerying(false);
            }
          }}
          size="small"
          sx={{}}
          variant="text"
        >
          <Search />
        </LoadingButton>
      </div>
    </div>
  );
}

export function QueryBuilder(props: any) {
  const { searchOptions, value, setValue, level, handleOnChange, index } =
    props;
  //   console.log(searchOptions);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [currentValue, setCurrentValue] = React.useState<any[] | null>(null);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-query" + level.join("-") : undefined;

  return (
    <div className="flex flex-col items-center max-w-max">
      <div className="flex w-full flex-wrap gap-2 items-center">
        {getNestedValue(value, level).map((option: any, index: number) =>
          Array.isArray(option) ? (
            <div className="flex gap-2 items-center" key={option[0].tagId}>
              <LoadingButton
                variant="text"
                // className="font-bold text-3xl px-2 mb-2"
                size="large"
                onClick={() => {
                  const newValue = getValueAfterComparatorChange(
                    value,
                    level,
                    index
                  );
                  setValue(newValue);
                }}
              >
                {option[0].parentheses === true &&
                option[0].comparator.id === "!=" ? (
                  <PriorityHigh color="info" />
                ) : (
                  <></>
                )}
                <ArrowBackIosNew
                  sx={{ color: colors[level.length % colors.length] }}
                />
              </LoadingButton>
              <QueryBuilder
                searchOptions={searchOptions}
                value={value}
                setValue={setValue}
                level={[...level, index]}
                handleOnChange={handleOnChange}
              />
              <LoadingButton
                variant="text"
                // className="font-bold text-3xl px-2 mb-2"
                size="large"
                onClick={() => {
                  const nestedValue = getNestedValue(value, level);
                  setValue(
                    getUpdatedValue(
                      value,
                      getValueAfterDeleting(nestedValue, index),
                      level
                    )
                  );
                }}
              >
                <ArrowForwardIos
                  sx={{ color: colors[level.length % colors.length] }}
                />
                {/* <Close /> */}
              </LoadingButton>
            </div>
          ) : (
            <div className="flex gap-2" key={option.tagId}>
              <RenderTag
                option={option}
                handleOperatorClick={(index: number) => {
                  if (index < 0) {
                    return;
                  }
                  const nestedValue = getNestedValue(value, level);
                  const nextOp = getNextOperator(nestedValue, index);

                  const newValue = getUpdatedValue(
                    value,
                    nestedValue.map((nv: any, i: number) =>
                      i === index ? nextOp : nv
                    ),
                    level
                  );
                  setValue(newValue);
                }}
                index={index}
                handleTagClick={(index: number) => {
                  if (index < 0) {
                    return;
                  }
                  const nestedValue = getNestedValue(value, level);
                  const nextComp = getNextComparator(nestedValue, index);
                  const newValue = getUpdatedValue(
                    value,
                    nestedValue.map((nv: any, i: number) =>
                      i === index ? { ...nv, comparator: nextComp } : nv
                    ),
                    level
                  );
                  setValue(newValue);
                }}
                onDeleteTag={(index: number) => {
                  const nestedValue = getNestedValue(value, level);
                  setValue(
                    getUpdatedValue(
                      value,
                      getValueAfterDeleting(nestedValue, index),
                      level
                    )
                  );
                }}
              />
            </div>
          )
        )}
        <IconButton onClick={handleClick} size="small">
          <Settings fontSize="small" />
        </IconButton>
      </div>

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              style={{
                borderBottom: `1px solid ${
                  theme.palette.mode === "light" ? "#eaecef" : "#30363d"
                }`,
                padding: "8px 10px",
                fontWeight: 600,
              }}
            >
              Search for your tags...
            </Box>
            <Autocomplete
              open
              //   multiple
              autoHighlight={true}
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={currentValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === "keydown" &&
                  ((event as React.KeyboardEvent).key === "Backspace" ||
                    (event as React.KeyboardEvent).key === "Delete") &&
                  reason === "removeOption"
                ) {
                  return;
                }
                // setCurrentValue(newValue);
                handleOnChange(newValue, value, level);
                handleClose();
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No tags"
              renderOption={(props, option, { inputValue }: any) => {
                const selected =
                  getNestedValue(value, level).findIndex(
                    (val: any) => val.tagId === option.tagId
                  ) > -1;
                const matches = match(`${option.tagName}`, inputValue, {
                  insideWords: true,
                });
                const parts = parse(`${option.tagName}`, matches);
                return (
                  <li {...props}>
                    <Box
                      component={Done}
                      sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                      style={{
                        visibility: selected ? "visible" : "hidden",
                      }}
                    />
                    <Box
                      component="span"
                      sx={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        borderRadius: "3px",
                        mr: 1,
                        mt: "2px",
                      }}
                      style={{ backgroundColor: option.categoryColor }}
                    />
                    <Box
                      sx={{
                        flexGrow: 1,
                        "& span": {
                          color:
                            theme.palette.mode === "light"
                              ? "#586069"
                              : "#8b949e",
                        },
                      }}
                    >
                      <span>{option.categoryName}</span>
                      <br />
                      <div>
                        #
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </Box>
                    <Box
                      component={Close}
                      sx={{ opacity: 0.6, width: 18, height: 18 }}
                      style={{
                        visibility: selected ? "visible" : "hidden",
                      }}
                    />
                  </li>
                );
              }}
              //   options={[
              //     ...[...searchOptions].sort((a, b) => {
              //       // Display the selected labels first.
              //       let ai = value.indexOf(a);
              //       ai = ai === -1 ? value.length + searchOptions.indexOf(a) : ai;
              //       let bi = value.indexOf(b);
              //       bi = bi === -1 ? value.length + searchOptions.indexOf(b) : bi;
              //       return ai - bi;
              //     }),
              //     ...parenthesesOptions,
              //   ]}
              options={[...searchOptions, ...parenthesesOptions]}
              getOptionLabel={(option: any) =>
                `${option.categoryName} : #${option.tagName}`
              }
              isOptionEqualToValue={(option: any, value: any) =>
                option.tagId === value.tagId
              }
              groupBy={(option: any) => option.categoryName}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter tags"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </div>
  );
}
