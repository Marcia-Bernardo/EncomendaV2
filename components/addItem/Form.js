import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

registerLocale("pt", pt);

const Form = ({ setOrder, order }) => {
  const [date, setDate] = useState();

  useEffect(() => {
    if (order.date) {
      setDate(new Date(order.date));
    }
  }, date);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Cliente</label>
        <br />
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Nome"
          value={order.name}
          onChange={(e) => {
            setOrder({ ...order, name: e.target.value });
          }}
        />
      </div>
      <br />
      <div className="form-group" style={{ fontSize: "20px !important" }}>
        <label htmlFor="data_hora">Data e hora de recolha</label>
        <br />
        <DatePicker
          placeholderText="Defina aqui"
          selected={date}
          onChange={(newDate) => {
            console.log(newDate);
            setOrder({ ...order, date: newDate });
            setDate(newDate);
          }}
          locale="pt"
          dateFormat="Pp"
          showTimeSelect
          timeFormat="p"
          timeIntervals={5}
        />
      </div>

      <br />

      <div className="form-group">
        <label htmlFor="obs">Obs:</label>
        <input
          type="text"
          className="form-control"
          id="obs"
          placeholder="Observação"
          value={order.obs}
          onChange={(e) => {
            setOrder({ ...order, obs: e.target.value });
          }}
        />
      </div>
      <br />
    </form>
  );
};

export default Form;
