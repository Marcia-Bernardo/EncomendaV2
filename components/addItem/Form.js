import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);
const Form = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [name, setName] = useState("");
  const [obs, setObs] = useState("");
  console.log(name);
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Cliente</label>
        <br />
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Data e hora de recolha</label>
        <br />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
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
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Observação"
          onChange={(e) => setObs(e.target.value)}
        />
      </div>
      <br />
    </form>
  );
};

export default Form;
