import { useEffect } from "react";
import { useState } from "react";

function formatDate(date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const useFormattedDate = (date) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const newDate = formatDate(date || new Date());
    console.log("new date: ", newDate);
    setFormattedDate("poep");
  });

  return [formattedDate, setFormattedDate];
};

export default useFormattedDate;
