import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

const ListDate = ({ setDateToFilter }) => {
  const [date, setDate] = useState();

  return (
    <div>
      <DatePicker
        placeholderText="Escolha a data"
        selected={date}
        onChange={(newDate) => {
          setDate(newDate);

          setDateToFilter(newDate);
        }}
        locale="pt"
        dateFormat="P"
        timeFormat="p"
        timeIntervals={5}
        onFocus={(e) => {
          e.currentTarget.blur();
        }}
      />
    </div>
  );
};

export default ListDate;
