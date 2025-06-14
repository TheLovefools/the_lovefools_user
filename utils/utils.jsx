import { customAlphabet } from 'nanoid';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const nanoid = customAlphabet(alphabet, 16); // or 20, under 21 chars

export const generateUniqueId = () => nanoid();

export function formatInput(input) {
  const cleaned = input.replace(/[^\d.]/g, "");

  const parts = cleaned.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  let lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  const formattedInteger =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  let result = formattedInteger;
  if (decimalPart.length > 0 || input.includes(".")) {
    result += "." + decimalPart;
  }

  return result;
}

export const generateOptions = (
  options,
  valueKey,
  labelKey,
  idkey,
  groupKey = null,
  groupTitleKey = null,
  isDirectValues = false
) => {
  if (options && options.length > 0 && options[0]?.data) {
    return options.map((group) => {
      const groupTitle = groupTitleKey ? group[groupTitleKey] : group.title;

      const unique = group.data.filter((obj, index) => {
        return index === group.data.findIndex((o) => obj.id === o.id);
      });

      return {
        label: groupTitle
          ?.toLowerCase()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (match) => match.toUpperCase()),
        options: unique.map((item) => ({
          value: isDirectValues ? item : item[valueKey],
          label: `${item?.employeeId} - ${item[labelKey]
            ?.toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (match) => match.toUpperCase())}`,
        })),
      };
    });
  } else {
    return options?.length > 0
      ? options.map((item) => {
          if (groupKey && item[groupKey]) {
            return {
              label: item[groupKey]
                ?.toLowerCase()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (match) => match.toUpperCase()),
              options: item[groupKey].map((status) => ({
                value: isDirectValues ? status : status[valueKey],
                label: status[labelKey]
                  ?.toLowerCase()
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (match) => match.toUpperCase()),
              })),
            };
          } else {
            const label = isDirectValues ? item : item[labelKey];
            return {
              value: isDirectValues ? item : item[valueKey],
              label: `${idkey ? `${item[idkey]} - ` : ""}${label
                ?.toLowerCase()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (match) => match.toUpperCase())}`,
            };
          }
        })
      : [];
  }
};

export function convertTimeObjectToString(timeObj) {
  const hour = timeObj?.hour ? timeObj?.hour.toString().padStart(2, "0") : "00"; // Ensure 2 digits
  const minute = timeObj?.minute
    ? timeObj?.minute.toString().padStart(2, "0")
    : "00";
  const second = timeObj?.second
    ? timeObj?.second.toString().padStart(2, "0")
    : "00";

  return `${hour}:${minute}:${second}`;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateForApi = (date) => {
  const localDate = new Date(date); // Ensure it's a Date object
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
};

export const findSingleSelectedValueLabelOptionOld = (options, selectedValue) => {
  return options.find((item) => item?.value === selectedValue) || null;
};

export const findSingleSelectedValueLabelOption = (options, selectedValue) => {
  const val = selectedValue?.value || selectedValue;
  return options.find((item) => item?.value === val) || null;
};

export const convertToAmPm = (timeString) => {
  const [hourStr, minute, second] = timeString.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12; // handle midnight & noon

  return `${hour}:${minute} ${ampm}`;
}

export const getUTCMidnightISOString = (date) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
};