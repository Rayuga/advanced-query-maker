export const operatorOptions = [
  { id: "AND", label: "AND", precendeceValue: 1 },
  { id: "OR", label: "OR", precendeceValue: 0 },
  //   { id: "NOT", label: "NOT" },
].map((op: any) => ({
  ...op,
  operator: true,
  categoryName: "Operator",
  categoryColor: "#fef2c0",
  categoryId: -1,
  tagName: op.label,
  tagId: op.id,
}));

export const comparatorOptions = [
  {
    id: "=",
    label: "=",
    precendeceValue: 2,
  },
  {
    id: "!=",
    label: "!=",
    precendeceValue: 2,
  },
].map((comp: any) => ({
  ...comp,
  comparator: true,
  categoryName: "Comparator",
  categoryColor: "#006b75",
  categoryId: -3,
  tagName: comp.label,
  tagId: comp.id,
}));

export const parenthesesOptions = [
  { id: "(", label: "(", precendeceValue: -1 },
  { id: ")", label: ")" },
].map((op: any) => ({
  ...op,
  parentheses: true,
  categoryName: "Parentheses",
  categoryColor: "#d4c5f9",
  categoryId: -2,
  tagName: op.label,
  tagId: op.id,
  comparator: comparatorOptions[0],
}));

export const getNextOperator = (value: any, index: number) => {
  const curOpId = value[index].id;
  const opIdx = operatorOptions.findIndex((op: any) => op.id === curOpId);
  const nextOpIdx = (opIdx + 1) % operatorOptions.length;
  return operatorOptions[nextOpIdx];
};

export const getNextComparator = (value: any, index: number) => {
  const curComparatorId = value[index].comparator.id || value[index].id;
  const compIdx = comparatorOptions.findIndex(
    (comp: any) => comp.id === curComparatorId
  );
  const nextCompIdx = (compIdx + 1) % comparatorOptions.length;
  return comparatorOptions[nextCompIdx];
};

export const getNestedValue = (value: any, level: number[]) => {
  //   let nestedValue = JSON.parse(JSON.stringify(value));
  let nestedValue = value;
  level.forEach((l: number) => {
    nestedValue = nestedValue[l];
  });
  return nestedValue;
};

export const getUpdatedValue = (curValue: any, newValue: any, level: any) => {
  let deepClone = JSON.parse(JSON.stringify(curValue));
  let temp = deepClone;
  for (let i = 0; i < level.length - 1; i++) {
    temp = temp[level[i]];
  }
  temp[level[level.length - 1]] = newValue;

  return deepClone;
};

export const getValueAfterComparatorChange = (
  value: any,
  level: any,
  index: any
) => {
  const nestedValue = getNestedValue(value, level);
  const nextComp = getNextComparator(nestedValue[index], 0);
  const newValue = getUpdatedValue(
    value,
    nestedValue.map((nv: any, i: number) =>
      i === index
        ? nestedValue[index].map((nIndexVal: any, nIndex: number) =>
            nIndex === 0 ? { ...nIndexVal, comparator: nextComp } : nIndexVal
          )
        : nv
    ),
    level
  );
  return newValue;
};

export const getValueAfterDeleting = (nestedValue: any, index: any) =>
  nestedValue.filter((nv: any, ind: number) => {
    if (ind === index) {
      return false;
    }
    if (ind === index - 1) {
      if (nestedValue[ind]?.operator === true) {
        return false;
      }
    }
    if (ind === index + 1) {
      if (
        nestedValue[index - 1]?.parentheses === true &&
        nestedValue[ind]?.operator === true
      ) {
        return false;
      }
    }
    return true;
  });

export function addClosingParanthesis(el: any) {
  el.push(parenthesesOptions[1]);
  el.forEach((e: any) => {
    if (Array.isArray(e)) {
      addClosingParanthesis(e);
    }
  });
}

export const getEmployeeOptionLabel = (option: any) => {
  const name = option?.name || "",
    designation = option?.designation || "NA",
    username = option?.username || "NA",
    department = option?.department || "NA";

  return option ? `${name} [${designation}] [${username}] - ${department}` : "";
};

export const operatorWidth = 120;

export const QUERY_NAME = "query";

export const colors = [
  "#7057ff",
  "#008672",
  "#b60205",
  "#d93f0b",
  "#0e8a16",
  "#fbca04",
  "#fec1c1",
  "#215cea",
  "#cfd3d7",
  "#fef2c0",
  "#eeeeee",
  "#d73a4a",
  "#d4c5f9",
  "#006b75",
  "#84b6eb",
  "#3e4b9e",
  "#fbca04",
  "#d876e3",
];

export const Op = {
  and: Symbol("and"),
  or: Symbol("or"),
  not: Symbol("not"),
};

const doProcess = (operandStack: any[], operatorStack: any[]) => {
  let a = operandStack.pop();
  let b = operandStack.pop();
  let op = operatorStack.pop();

  let query = {};
  let aQueryValue = a.queryValue;
  let bQueryValue = b.queryValue;

  if (op.tagId === "AND") {
    query = { [Op.and]: [aQueryValue, bQueryValue] };
  }
  if (op.tagId === "OR") {
    query = { [Op.or]: [aQueryValue, bQueryValue] };
  }
  return query;
};

export const evaluateInfix = (query: any) => {
  const operatorStack: any[] = [];
  const operandStack: any[] = [];

  query.forEach((q: any, index: number) => {
    if (q?.isTag) {
      operandStack.push(q);
    } else {
      if (q.parentheses === true) {
        if (q.tagId === "(") {
          operatorStack.push(q);
        } else if (q.tagId === ")") {
          while (operatorStack[operatorStack.length - 1].tagId !== "(") {
            const op = doProcess(operandStack, operatorStack);
            operandStack.push({ queryValue: op });
          }
          if (operatorStack[operatorStack.length - 1].tagId === "(") {
            if (
              operatorStack[operatorStack.length - 1].comparator.tagId === "!="
            ) {
              const top = operandStack.pop();
              // logObject(top.queryValue);
              const negatedQueryValue = {
                [Op.not]: [{ tagId: top.queryValue }],
              };
              operandStack.push({ queryValue: negatedQueryValue });
            }
          }

          operatorStack.pop();
        }
      } else if (q.operator === true) {
        if (operatorStack.length === 0) {
          operatorStack.push(q);
        } else {
          if (
            q.precendeceValue >=
            operatorStack[operatorStack.length - 1].precendeceValue
          ) {
            operatorStack.push(q);
          } else {
            while (
              operatorStack.length !== 0 &&
              q.precendeceValue <
                operatorStack[operatorStack.length - 1].precendeceValue
            ) {
              const op = doProcess(operandStack, operatorStack);
              operandStack.push({ queryValue: op });
            }
            operatorStack.push(q);
          }
        }
      }
    }
  });

  while (operatorStack.length) {
    const op = doProcess(operandStack, operatorStack);
    operandStack.push({ queryValue: op });
  }

  return operandStack.pop();
};
