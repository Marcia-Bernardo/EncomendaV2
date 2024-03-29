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
  }, [order.date]);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Cliente</label>
        <br />
        <input
          style={{ fontSize: "20px" }}
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
            setOrder({ ...order, date: newDate });
            setDate(newDate);
          }}
          locale="pt"
          dateFormat="Pp"
          showTimeSelect
          timeFormat="p"
          timeIntervals={5}
          onFocus={(e) => {
            e.currentTarget.blur();
          }}
        />
      </div>

      <br />

      <div className="form-group">
        <label htmlFor="obs">Obs:</label>
        <input
          type="text"
          className="form-control"
          id="obs"
          style={{ fontSize: "20px" }}
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
