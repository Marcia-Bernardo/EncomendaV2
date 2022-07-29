import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

const Form = ({ setOrder, order }) => {
  const [date, setDate] = useState();
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Cliente</label>
        <br />
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Nome"
          defaultValue={order.name}
          onChange={(e) => {
            setOrder({ ...order, name: e.target.value });
          }}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Data e hora de recolha</label>
        <br />
        <DatePicker
          placeholderText="Data e hora de entrega"
          selected={date}
          onChange={(newDate) => {
            setDate(newDate);
            setOrder({ ...order, date: newDate });
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
        <label htmlFor="exampleInputPassword1">Obs:</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Observação"
          defaultValue={order.obs}
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
